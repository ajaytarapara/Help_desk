using System.Linq.Expressions;
using AutoMapper;
using HelpDesk.Business.Services.Interfaces;
using HelpDesk.Common.Constants;
using HelpDesk.Common.Models.Common;
using HelpDesk.Common.Models.Request;
using HelpDesk.Common.Models.Response;
using HelpDesk.Data.Entities;
using HelpDesk.Data.Helper;
using HelpDesk.Data.Repositories.Interfaces;
using static HelpDesk.Common.Constants.Constants;
using static HelpDesk.Common.Exceptions.Exceptions;

namespace HelpDesk.Business.Services.Implementation
{
    public class UserService : IUserService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly ICurrentUserService _currentUserService;
        public UserService(IUnitOfWork unitOfWork, IMapper mapper, ICurrentUserService currentUserService)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _currentUserService = currentUserService;
        }

        public async Task<UserListResponse> GetByIdUser(int id)
        {
            User? User = await _unitOfWork.Users.GetFirstOrDefault(x => x.UserId == id, x => x.Role);
            return _mapper.Map<UserListResponse>(User);
        }

        public async Task<PaginationResponse<UserListResponse>> UserList(UserPaginationRequest request)
        {
            string searchKey = request.Search?.Trim().ToLower();

            Expression<Func<User, bool>> filter = x =>
            x.IsDelete == false &&
            (string.IsNullOrEmpty(searchKey)
                || x.FullName.ToLower().Contains(searchKey.ToLower())
                || x.Email.ToLower().Contains(searchKey.ToLower())) &&
            (!request.IsActive.HasValue || x.IsActive == request.IsActive.Value) &&
            (!request.RoleId.HasValue || x.RoleId == request.RoleId.Value);


            if (string.IsNullOrWhiteSpace(request.OrderBy) || request.OrderBy == "UserId")
            {
                request.OrderBy = "UserId";
                request.IsDescending = true;
            }

            var pagedData = await _unitOfWork.Users.GetPagedData(request, filter, x => x.Role);

            var mappedItems = _mapper.Map<List<UserListResponse>>(pagedData.Items);

            return new PaginationResponse<UserListResponse>(
                mappedItems,
                pagedData.TotalCount,
                pagedData.PageNumber,
                pagedData.PageSize
            );
        }

        public async Task<int> CreateUser(CreateUserRequest request)
        {
            User? emailExists = await _unitOfWork.Users
                .GetFirstOrDefault(x => x.Email.ToLower() == request.Email.ToLower() && !x.IsDelete);

            if (emailExists != null)
                throw new BadRequestException(Message.Error.EmailAlreadyExist);

            UserRole? roleExists = await _unitOfWork.Roles
                .GetFirstOrDefault(r => r.RoleId == request.RoleId);

            if (roleExists == null)
                throw new BadRequestException(Message.Error.NotFound("Role"));
            User user = _mapper.Map<User>(request);
            user.Password = PasswordHelper.HashPassword(user.Password);
            user.IsActive = request.IsActive;
            await _unitOfWork.Users.AddAsync(user);
            await _unitOfWork.SaveAsync();

            return user.UserId;
        }
        public async Task<bool> DeleteUser(int id)
        {
            int currentUserId = _currentUserService.GetCurrentUserId();

            if (currentUserId == id)
                throw new BadRequestException(Message.Error.YouCanNotDelete);

            User? user = await _unitOfWork.Users
                .GetFirstOrDefault(x => x.UserId == id && !x.IsDelete, x => x.Role);

            if (user == null)
                throw new BadRequestException(Message.Error.NotFound("User"));

            bool isAgent = user.Role?.RoleName == UserRoles.Agent;

            if (isAgent)
            {
                Status? openStatus = await _unitOfWork.Status
                    .GetFirstOrDefault(s => s.StatusName == TicketStatus.Open);

                Status? inProgressStatus = await _unitOfWork.Status
                    .GetFirstOrDefault(s => s.StatusName == TicketStatus.InProgress);

                IEnumerable<Ticket> hasActiveTickets = await _unitOfWork.Tickets.GetAllAsync(t =>
                    t.AssignedToId == id &&
                    (t.StatusId == openStatus.StatusId ||
                     t.StatusId == inProgressStatus.StatusId)
                );

                if (hasActiveTickets.Count() > 0)
                {
                    throw new BadRequestException(Message.Error.UserHaveAssignedTicket);
                }
            }
            user.IsDelete = true;
            user.IsActive = false;

            _unitOfWork.Users.Update(user);
            await _unitOfWork.SaveAsync();

            return true;
        }


        public async Task<bool> UpdateUser(int userId, CreateUserRequest request)
        {
            // 1. Get user
            User? user = await _unitOfWork.Users
                .GetFirstOrDefault(x => x.UserId == userId, x => x.Role);

            if (user == null)
                throw new BadRequestException(Message.Error.NotFound("User"));

            // 2. Check duplicate email
            User? emailExists = await _unitOfWork.Users
                .GetFirstOrDefault(x =>
                    x.Email.ToLower() == request.Email.ToLower()
                    && x.UserId != userId
                    && !x.IsDelete
                );

            if (emailExists != null)
                throw new BadRequestException(Message.Error.EmailAlreadyExist);

            // 3. Check if new role exists
            UserRole? newRole = await _unitOfWork.Roles
                .GetFirstOrDefault(r => r.RoleId == request.RoleId);

            if (newRole == null)
                throw new BadRequestException(Message.Error.NotFound("Role"));

            // ROLE CHANGE VALIDATION (AGENT → NON-AGENT)
            string? currentRoleName = user.Role != null ? user.Role.RoleName : null;
            string newRoleName = newRole.RoleName;

            bool isCurrentRoleAgent = currentRoleName == UserRoles.Agent;
            bool isNewRoleAgent = newRoleName == UserRoles.Agent;

            if (isCurrentRoleAgent && !isNewRoleAgent)
            {
                // Get Open status
                Status? openStatus = await _unitOfWork.Status
                    .GetFirstOrDefault(s => s.StatusName == TicketStatus.Open);

                // Get In Progress status
                Status? inProgressStatus = await _unitOfWork.Status
                    .GetFirstOrDefault(s => s.StatusName == TicketStatus.InProgress);

                if (openStatus == null || inProgressStatus == null)
                    throw new BadRequestException(Message.Error.NotFound("Status"));

                // Check if agent has active tickets
                IEnumerable<Ticket> hasActiveTickets = await _unitOfWork.Tickets.GetAllAsync(t =>
                    t.AssignedToId == userId &&
                    (t.StatusId == openStatus.StatusId ||
                     t.StatusId == inProgressStatus.StatusId)
                );

                if (hasActiveTickets.Count() > 0)
                {
                    throw new BadRequestException(Message.Error.UserRoleNotEditIfTicket);
                }
            }
            user.FullName = request.FullName ?? user.FullName;
            user.Email = request.Email ?? user.Email;
            user.RoleId = request.RoleId != 0 ? request.RoleId : user.RoleId;
            user.IsActive = request.IsActive;

            _unitOfWork.Users.Update(user);
            await _unitOfWork.SaveAsync();

            return true;
        }

    }
}