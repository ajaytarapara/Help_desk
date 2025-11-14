using HelpDesk.Common.Models.Common;
using HelpDesk.Common.Models.Request;
using HelpDesk.Common.Models.Response;
using HelpDesk.Data.Entities;

namespace HelpDesk.Business.Services.Interfaces
{
    public interface ITicketService
    {
        Task<Ticket> CreateAsync(CreateTicketRequest ticketRequest);

        Task<TicketResponse> GetByIdAsync(int ticketId);

        Task<Ticket> UpdateAgentAsync(int ticketId, AgentTicketUpdateRequest ticketUpdateRequest);

        Task<Ticket> AssignTicketAsync(int ticketId, AssignTicketRequest ticketRequest);

        Task<Ticket> UpdateUserAsync(int ticketId, CreateTicketRequest ticketUpdateRequest);

        Task<Ticket> DeleteAsync(int ticketId);

        Task<PaginationResponse<TicketResponse>> GetUserTicketsAsync(UserTicketPaginationRequest paginationRequest, bool onlyAssignedTickets = false);
    }
}