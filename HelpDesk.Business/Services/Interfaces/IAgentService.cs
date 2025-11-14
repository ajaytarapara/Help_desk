using HelpDesk.Common.Models.Response;

namespace HelpDesk.Business.Services.Interfaces
{
    public interface IAgentService
    {
        Task<AgentTicketSummaryResponse> GetTicketCountByStatus();

        Task<IEnumerable<TicketResponse>> GetPendingTicketAsync();

        Task<FunAgentResolutionTimeResponse> GetResolutionTimePerAgent();

    }
}