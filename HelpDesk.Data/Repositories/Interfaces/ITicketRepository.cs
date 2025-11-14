using HelpDesk.Common.Models.Response;
using HelpDesk.Data.Entities;

namespace HelpDesk.Data.Repositories.Interfaces
{
    public interface ITicketRepository : IGenericRepository<Ticket>
    {
        Task<FunAgentResolutionTimeResponse> GetAverageResolutionTimeByAgentAsync(int agentId);
    }
}