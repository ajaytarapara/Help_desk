using System.Linq.Expressions;
using AutoMapper;
using HelpDesk.Business.Services.Interfaces;
using HelpDesk.Common.Constants;
using HelpDesk.Common.Models.Common;
using HelpDesk.Common.Models.Request;
using HelpDesk.Common.Models.Response;
using HelpDesk.Data.Entities;
using HelpDesk.Data.Repositories.Interfaces;
using static HelpDesk.Common.Exceptions.Exceptions;

namespace HelpDesk.Business.Services.Implementation
{
    public class TicketService : ITicketService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        private readonly ICurrentUserService _currentUserService;

        public TicketService(IUnitOfWork unitOfWork, IMapper mapper, ICurrentUserService currentUserService)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _currentUserService = currentUserService;
        }

        public async Task<Ticket> CreateAsync(CreateTicketRequest ticketRequest)
        {
            int UserId = _currentUserService.GetCurrentUserId();

            await CategoryExist(ticketRequest.CategoryId);
            await PriorityExist(ticketRequest.PriorityId);

            Ticket ticket = _mapper.Map<Ticket>(ticketRequest);
            ticket.CreatedById = UserId;
            await _unitOfWork.Tickets.AddAsync(ticket);
            await _unitOfWork.SaveAsync();
            return ticket;
        }

        public async Task<TicketResponse> GetByIdAsync(int ticketId)
        {
            int UserId = _currentUserService.GetCurrentUserId();

            string UserRole = _currentUserService.GetCurrentUserRole();

            Ticket ticket = await TicketExist(ticketId);

            if (ticket.CreatedById != UserId && UserRole == Constants.UserRoles.User)
                throw new BadRequestException(Message.Error.UnauthorizedAccess("Ticket"));

            TicketResponse ticketResponse = _mapper.Map<TicketResponse>(ticket);
            return ticketResponse;
        }

        public async Task<Ticket> UpdateAgentAsync(int ticketId, AgentTicketUpdateRequest request)
        {
            int currentUserId = _currentUserService.GetCurrentUserId();

            // Ensure the ticket exists
            Ticket ticket = await TicketExist(ticketId);

            // Ensure the assigned agent exists
            if (request.AssignedToId.HasValue)
            {
                User agent = await UserExist(request.AssignedToId);

                // 1. Assigned user must have Agent role
                if (agent.Role.RoleName != Constants.UserRoles.Agent)
                    throw new BadRequestException(Message.Error.AssignedUserMustBeAgent);
            }

            // 2. Closed tickets cannot be modified
            ValidateTicketNotClosed(ticket);

            // 3. Ticket must be in a valid state for assignment
            ValidateAssignableState(ticket);

            //4.first time change status by default in progress
            if (ticket.AssignedToId == null && request.AssignedToId != null)
            {
                ticket.StatusId = await GetStatusID(Constants.TicketStatus.InProgress);
                ticket.AssignedDate = DateTime.UtcNow;
            }

            // Handle user assigned
            bool isAssignmentChanged = ticket.AssignedToId != request.AssignedToId;
            if (isAssignmentChanged && request.AssignedToId != null)
            {
                ticket.AssignedToId = request.AssignedToId;
                ticket.AssignedDate = DateTime.UtcNow;
            }

            // Handle status Change
            bool isStatusChanged = request.StatusId.HasValue && ticket.StatusId != request.StatusId.Value;
            if (isStatusChanged)
            {
                //5.  Only the assigned agent can change status
                ValidateStatusChangePermission(ticket, currentUserId);

                //6. Check if status change follows valid transition rules
                await ValidateStatusTransition(ticket, request.StatusId);

                ticket.StatusId = request.StatusId.Value;
            }

            if (request.StatusId != null && await GetStatusName(request.StatusId) == Constants.TicketStatus.Closed)
            {
                ticket.ClosedDate = DateTime.UtcNow;
            }

            ticket.UpdatedDate = DateTime.UtcNow;
            _unitOfWork.Tickets.Update(ticket);
            await _unitOfWork.SaveAsync();
            return ticket;
        }

        public async Task<Ticket> AssignTicketAsync(int ticketId, AssignTicketRequest ticketRequest)
        {
            //user exist
            User user = await UserExist(ticketRequest.AssignedToId);

            //if ticket status = “Open”
            Ticket ticket = await TicketExist(ticketId);
            if (ticket.Status.StatusName.ToLower() != Constants.TicketStatus.Open.ToLower())
                throw new BadRequestException(Message.Error.TicketMustBeOpen);

            //check role
            if (user.Role.RoleName != Constants.UserRoles.Agent)
                throw new BadRequestException(Message.Error.AssignedUserMustBeAgent);

            Ticket assignedTicket = _mapper.Map(ticketRequest, ticket);
            _unitOfWork.Tickets.Update(assignedTicket);
            await _unitOfWork.SaveAsync();
            return assignedTicket;
        }
        public async Task<Ticket> UpdateUserAsync(int ticketId, CreateTicketRequest ticketUpdateRequest)
        {
            int UserId = _currentUserService.GetCurrentUserId();

            Ticket ticket = await TicketExist(ticketId);

            await CategoryExist(ticketUpdateRequest.CategoryId);
            await PriorityExist(ticketUpdateRequest.PriorityId);

            //check user ticket
            if (ticket.CreatedById != UserId)
                throw new BadRequestException(Message.Error.TicketCanOnlyBeUpdatedByCreator);

            //check ticket status
            if (ticket.Status.StatusName != Constants.TicketStatus.Open)
                throw new BadRequestException(Message.Error.TicketCanOnlyBeEditedWhenOpen);

            Ticket updatedTicket = _mapper.Map(ticketUpdateRequest, ticket);
            updatedTicket.UpdatedDate = DateTime.UtcNow;
            _unitOfWork.Tickets.Update(updatedTicket);
            await _unitOfWork.SaveAsync();
            return updatedTicket;
        }

        public async Task<Ticket> DeleteAsync(int ticketId)
        {
            int UserId = _currentUserService.GetCurrentUserId();

            Ticket ticket = await TicketExist(ticketId);
            if (ticket.CreatedById != UserId)
            {
                throw new BadRequestException(Message.Error.DeleteTicketCreateByCreator);
            }
            if (ticket.Status.StatusName == Constants.TicketStatus.InProgress)
            {
                throw new BadRequestException(Message.Error.TicketMustNotBeInProgress);
            }
            ticket.IsDeleted = true;
            ticket.UpdatedDate = DateTime.UtcNow;
            _unitOfWork.Tickets.Update(ticket);
            await _unitOfWork.SaveAsync();
            return ticket;
        }

        public async Task<PaginationResponse<TicketResponse>> GetUserTicketsAsync(
            UserTicketPaginationRequest paginationRequest,
            bool onlyAssignedTickets = false
        )
        {
            int userId = _currentUserService.GetCurrentUserId();
            string role = _currentUserService.GetCurrentUserRole();
            DateTime? fromDate = null;
            DateTime? toDate = null;

            if (!string.IsNullOrWhiteSpace(paginationRequest.FromDate))
            {
                fromDate = DateTime.SpecifyKind(
                    DateTime.Parse(paginationRequest.FromDate).Date,
                    DateTimeKind.Utc
                );
            }

            if (!string.IsNullOrWhiteSpace(paginationRequest.ToDate))
            {
                toDate = DateTime.SpecifyKind(
                    DateTime.Parse(paginationRequest.ToDate).Date.AddDays(1).AddTicks(-1),
                    DateTimeKind.Utc
                );
            }

            string searchKey = paginationRequest.Search?.Trim()?.ToLower();

            if (paginationRequest.OrderBy == "Id" || string.IsNullOrWhiteSpace(paginationRequest.OrderBy))
            {
                paginationRequest.OrderBy = "CreatedDate";
                paginationRequest.IsDescending = true;
            }

            // ✅ Dynamic Filter Logic (based on the new parameter)
            Expression<Func<Ticket, bool>> filter;

            if (onlyAssignedTickets)
            {
                // For MyAgentTickets — show only tickets assigned to current user
                filter = x =>
                    x.AssignedToId == userId &&
                    !x.IsDeleted &&
                    (paginationRequest.StatusId == 0 || x.StatusId == paginationRequest.StatusId) &&
                    (paginationRequest.PriorityId == 0 || x.PriorityId == paginationRequest.PriorityId) &&
                    (fromDate == null || x.CreatedDate >= fromDate.Value) &&
                    (toDate == null || x.CreatedDate <= toDate.Value) &&
                    (string.IsNullOrEmpty(searchKey)
                        || x.Title.ToLower().Contains(searchKey)
                    );
            }
            else
            {
                // For GetAll — your previous logic
                filter = x =>
                   (role != Constants.UserRoles.User || x.CreatedById == userId) &&
                    !x.IsDeleted &&
                    (paginationRequest.AssignedToId == 0 || x.AssignedToId == paginationRequest.AssignedToId) &&
                    (paginationRequest.StatusId == 0 || x.StatusId == paginationRequest.StatusId) &&
                    (paginationRequest.PriorityId == 0 || x.PriorityId == paginationRequest.PriorityId) &&
                    (fromDate == null || x.CreatedDate >= fromDate.Value) &&
                    (toDate == null || x.CreatedDate <= toDate.Value) &&
                    (string.IsNullOrEmpty(searchKey)
                        || x.Title.ToLower().Contains(searchKey)
                    );
            }

            var result = await _unitOfWork.Tickets.GetPagedData(
                paginationRequest,
                filter,
                x => x.AssignedTo,
                x => x.CreatedBy,
                x => x.Status,
                x => x.Category,
                x => x.Priority
            );

            var mappedItems = _mapper.Map<List<TicketResponse>>(result.Items);

            return new PaginationResponse<TicketResponse>(
                mappedItems,
                result.TotalCount,
                result.PageNumber,
                paginationRequest.PageSize
            );
        }


        private async Task<Category> CategoryExist(int categoryId)
        {
            Category? category = await _unitOfWork.Categories.GetFirstOrDefault(c => c.CategoryId == categoryId);
            if (category == null)
            {
                throw new NotFoundException(Message.Error.NotFound("Category"));
            }
            return category;
        }

        private async Task<Priority> PriorityExist(int priorityId)
        {
            Priority? priority = await _unitOfWork.Priorities.GetFirstOrDefault(p => p.PriorityId == priorityId);
            if (priority == null)
            {
                throw new NotFoundException(Message.Error.NotFound("Priority"));
            }
            return priority;
        }

        private async Task<Ticket> TicketExist(int ticketId)
        {
            Ticket? ticket = await _unitOfWork.Tickets.GetFirstOrDefault(p => p.TicketId == ticketId && !p.IsDeleted, p => p.AssignedTo, p => p.Category, p => p.Status, p => p.Priority, p => p.CreatedBy);
            if (ticket == null)
            {
                throw new NotFoundException(Message.Error.NotFound("Ticket"));
            }
            return ticket;
        }

        private async Task<User> UserExist(int? userId)
        {
            User? user = await _unitOfWork.Users.GetFirstOrDefault(u => u.UserId == userId, u => u.Role);
            if (user == null)
            {
                throw new NotFoundException(Message.Error.NotFound("User"));
            }
            return user;
        }

        private void ValidateTicketNotClosed(Ticket ticket)
        {
            if (ticket.Status.StatusName.Equals(Constants.TicketStatus.Closed, StringComparison.OrdinalIgnoreCase))
                throw new BadRequestException(Message.Error.TicketAlreadyClosed);
        }

        private void ValidateAssignableState(Ticket ticket)
        {
            var status = ticket.Status.StatusName.ToLower();

            if (status == Constants.TicketStatus.Closed.ToLower())
                throw new BadRequestException(Message.Error.TicketInClosedAssignmentNotPossible);
        }

        private void ValidateStatusChangePermission(Ticket ticket, int currentUserId)
        {
            if (ticket.AssignedToId == null)
                throw new BadRequestException(Message.Error.TicketMustBeAssignedBeforeStatusChange);

            if (ticket.AssignedToId != currentUserId)
                throw new BadRequestException(Message.Error.OnlyAssignedAgentCanChangeStatus);
        }
        private async Task ValidateStatusTransition(Ticket ticket, int? newStatusId)
        {
            var newStatus = await _unitOfWork.Status.GetFirstOrDefault(s => s.StatusId == newStatusId);

            if (newStatus == null)
                throw new BadRequestException(Message.Error.NotFound("Status"));

            var currentStatus = ticket.Status.StatusName;

            switch (currentStatus)
            {
                case Constants.TicketStatus.Open:
                    // Open → must go only to InProgress
                    if (newStatus.StatusName != Constants.TicketStatus.InProgress)
                        throw new BadRequestException(Message.Error.TicketOpenToInProgressOnly);
                    break;

                case Constants.TicketStatus.InProgress:
                    // InProgress → can go anywhere except Open
                    if (newStatus.StatusName == Constants.TicketStatus.Open)
                        throw new BadRequestException(Message.Error.TicketCannotGoBackToOpen);
                    break;

                case Constants.TicketStatus.Closed:
                    // Closed → cannot change status at all
                    throw new BadRequestException(Message.Error.ClosedTicketsCannotChangeStatus);

                default:
                    // Other states between InProgress and Closed
                    // (e.g. “OnHold”, “Review”, etc.)
                    if (newStatus.StatusName == Constants.TicketStatus.Open)
                        throw new BadRequestException(Message.Error.TicketCannotGoBackToOpen);
                    break;
            }

        }

        private async Task<int> GetStatusID(string statusName)
        {
            Status status = await _unitOfWork.Status.GetFirstOrDefault(s => s.StatusName.ToLower() == statusName.ToLower());
            return status.StatusId;
        }

        private async Task<string> GetStatusName(int? statusId)
        {
            Status status = await _unitOfWork.Status.GetFirstOrDefault(s => s.StatusId == statusId);
            return status.StatusName;
        }
    }
}