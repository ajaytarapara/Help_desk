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
                    || x.FullName.ToLower().Contains(searchKey)
                    || x.Email.ToLower().Contains(searchKey)) &&
             (!request.IsActive.HasValue || x.IsActive == request.IsActive.Value);

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
                .GetFirstOrDefault(x => x.UserId == id && !x.IsDelete);

            if (user == null)
                throw new BadRequestException(Message.Error.NotFound("User"));

            user.IsDelete = true;
            user.IsActive = false;

            _unitOfWork.Users.Update(user);
            await _unitOfWork.SaveAsync();

            return true;
        }

        public async Task<bool> UpdateUser(int userId, CreateUserRequest request)
        {
            User? user = await _unitOfWork.Users
                .GetFirstOrDefault(x => x.UserId == userId);

            if (user == null)
                throw new BadRequestException(Message.Error.NotFound("User"));

            User? emailExists = await _unitOfWork.Users
                .GetFirstOrDefault(x => x.Email.ToLower() == request.Email.ToLower()
                                     && x.UserId != userId
                                     && !x.IsDelete);

            if (emailExists != null)
                throw new BadRequestException(Message.Error.EmailAlreadyExist);
            UserRole? roleExists = await _unitOfWork.Roles
                .GetFirstOrDefault(r => r.RoleId == request.RoleId);

            if (roleExists == null)
                throw new BadRequestException(Message.Error.NotFound("Role"));

            user.FullName = request.FullName ?? user.FullName;
            user.Email = request.Email ?? user.Email;
            user.Password = user.Password;
            user.RoleId = request.RoleId != 0 ? request.RoleId : user.RoleId;
            user.IsActive = request.IsActive;
            _unitOfWork.Users.Update(user);
            await _unitOfWork.SaveAsync();
            return true;
        }

    }
}