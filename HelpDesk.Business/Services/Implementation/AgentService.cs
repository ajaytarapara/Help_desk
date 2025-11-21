using AutoMapper;
using HelpDesk.Business.Services.Interfaces;
using HelpDesk.Common.Constants;
using HelpDesk.Common.Models.Response;
using HelpDesk.Data.Entities;
using HelpDesk.Data.Repositories.Interfaces;

namespace HelpDesk.Business.Services.Implementation
{
    public class AgentService : IAgentService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly ICurrentUserService _currentUserService;
        public AgentService(IUnitOfWork unitOfWork, IMapper mapper, ICurrentUserService currentUserService)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _currentUserService = currentUserService;
        }

        public async Task<AgentTicketSummaryResponse> GetTicketCountByStatus()
        {
            var openCount = await GetTicketCountByStatusName(Constants.TicketStatus.Open);
            var inProgressCount = await GetTicketCountByStatusName(Constants.TicketStatus.InProgress);
            var closedCount = await GetTicketCountByStatusName(Constants.TicketStatus.Closed);
            var totalTickets = await GetTotalTicket();
            var ticketSummaryResponse = new AgentTicketSummaryResponse
            {
                Open = openCount,
                InProgress = inProgressCount,
                Closed = closedCount,
                TotalTickets = totalTickets
            };
            return ticketSummaryResponse;
        }

        public async Task<FunAgentResolutionTimeResponse> GetResolutionTimePerAgent()
        {
            int userId = _currentUserService.GetCurrentUserId();
            FunAgentResolutionTimeResponse responseTime = await _unitOfWork.Tickets.GetAverageResolutionTimeByAgentAsync(userId);
            return responseTime;
        }

        public async Task<IEnumerable<TicketResponse>> GetPendingTicketAsync()
        {
            IEnumerable<Ticket> tickets = await _unitOfWork.Tickets.GetAllAsync(t => t.Status.StatusName == Constants.TicketStatus.Open && t.AssignedToId == null && t.Priority.PriorityName.ToLower() == Constants.TicketPriority.High.ToLower() && !t.IsDeleted, q => q.OrderByDescending(t => t.CreatedDate), t => t.AssignedTo, t => t.CreatedBy, t => t.Category, t => t.Status, t => t.Priority);

            return _mapper.Map<IEnumerable<TicketResponse>>(tickets);
        }

        private async Task<int> GetTicketCountByStatusName(string statusName)
        {
            IEnumerable<Ticket> tickets = await _unitOfWork.Tickets.GetAllAsync(t => t.Status.StatusName.ToLower() == statusName.ToLower() && !t.IsDeleted);
            return tickets.Count();
        }
        private async Task<int> GetTotalTicket()
        {
            IEnumerable<Ticket> tickets = await _unitOfWork.Tickets.GetAllAsync(t => !t.IsDeleted);
            return tickets.Count();
        }

    }
}