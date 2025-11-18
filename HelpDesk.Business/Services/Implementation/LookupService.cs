using AutoMapper;
using HelpDesk.Business.Services.Interfaces;
using HelpDesk.Common.Constants;
using HelpDesk.Common.Models.Response;
using HelpDesk.Data.Entities;
using HelpDesk.Data.Repositories.Interfaces;

namespace HelpDesk.Business.Services.Implementation
{
    public class LookupService : ILookupService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly ICurrentUserService _currentUserService;
        public LookupService(IUnitOfWork unitOfWork, IMapper mapper, ICurrentUserService currentUserService)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _currentUserService = currentUserService;
        }
        public async Task<IEnumerable<SelectListItemResponse>> GetAllCategoryAsync()
        {
            IEnumerable<Category> categories = await _unitOfWork.Categories.GetAllAsync(c => !c.IsDelete);
            return _mapper.Map<IEnumerable<SelectListItemResponse>>(categories);
        }

        public async Task<IEnumerable<SelectListItemResponse>> GetAllStatusAsync()
        {
            IEnumerable<Status> statuses = await _unitOfWork.Status.GetAllAsync(s => !s.IsDelete);
            return _mapper.Map<IEnumerable<SelectListItemResponse>>(statuses);
        }

        public async Task<IEnumerable<SelectListItemResponse>> GetAllPriorityAsync()
        {
            IEnumerable<Priority> priorities = await _unitOfWork.Priorities.GetAllAsync(p => !p.IsDelete);
            return _mapper.Map<IEnumerable<SelectListItemResponse>>(priorities);
        }

        public async Task<IEnumerable<SelectListItemResponse>> GetAllAgentAsync()
        {
            IEnumerable<User> agents = await _unitOfWork.Users.GetAllAsync(a => a.IsActive && a.Role.RoleName.ToLower() == Constants.UserRoles.Agent.ToLower());
            return _mapper.Map<IEnumerable<SelectListItemResponse>>(agents);
        }

        public async Task<UserTicketSummary> GetTicketCountByStatus()
        {
            var openCount = await GetTicketCountByStatusName(Constants.TicketStatus.Open);
            var inProgressCount = await GetTicketCountByStatusName(Constants.TicketStatus.InProgress);
            var closedCount = await GetTicketCountByStatusName(Constants.TicketStatus.Closed);
            var TotalTickets = await _unitOfWork.Tickets.GetAllAsync(x => !x.IsDeleted &&
            x.CreatedById == _currentUserService.GetCurrentUserId());
            var ticketSummaryResponse = new UserTicketSummary
            {
                Open = openCount,
                InProgress = inProgressCount,
                Closed = closedCount,
                TotalTicket = TotalTickets.Count()
            };
            return ticketSummaryResponse;
        }

        public async Task<IEnumerable<SelectListItemResponse>> GetAllRoleAsync()
        {
            IEnumerable<UserRole> roles = await _unitOfWork.Roles.GetAllAsync(a => !a.IsDelete);
            return _mapper.Map<IEnumerable<SelectListItemResponse>>(roles);
        }

        private async Task<int> GetTicketCountByStatusName(string statusName)
        {
            IEnumerable<Ticket> tickets = await _unitOfWork.Tickets.GetAllAsync(t => t.Status.StatusName.ToLower() == statusName.ToLower() && !t.IsDeleted && t.CreatedById == _currentUserService.GetCurrentUserId());
            return tickets.Count();
        }
    }
}