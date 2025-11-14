using HelpDesk.Business.Services.Interfaces;
using HelpDesk.Common.Constants;
using HelpDesk.Common.Models.Common;
using HelpDesk.Common.Models.Request;
using HelpDesk.Common.Models.Response;
using HelpDesk.Data.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace HelpDeskApi.controller
{
    [ApiController]
    [Authorize]
    [Route("api/[controller]")]
    public class TicketController : BaseApiController
    {
        private readonly ITicketService _ticketService;
        public TicketController(ITicketService ticketService)
        {
            _ticketService = ticketService;
        }

        [Authorize(Roles = "User")]
        [HttpPost]
        public async Task<IActionResult> Create(CreateTicketRequest ticketRequest)
        {
            Ticket ticket = await _ticketService.CreateAsync(ticketRequest);
            return Success(ticket, Message.Success.CreatedSuccess("Ticket"));
        }

        [Authorize]
        [HttpGet]
        public async Task<IActionResult> GetById(int ticketId)
        {
            TicketResponse ticket = await _ticketService.GetByIdAsync(ticketId);
            return Success(ticket);
        }

        [Authorize(Roles = "Agent")]
        [HttpPut("agent-update/{ticketId}")]
        public async Task<IActionResult> UpdateAgent(int ticketId, AgentTicketUpdateRequest ticketUpdateRequest)
        {
            Ticket ticket = await _ticketService.UpdateAgentAsync(ticketId, ticketUpdateRequest);
            return Success(ticket, Message.Success.UpdateSuccess("Ticket"));
        }

        //back-up not requirement
        [Authorize(Roles = "Agent")]
        [HttpPut("assign-ticket/{ticketId}")]
        public async Task<IActionResult> AssignTicket(int ticketId, AssignTicketRequest ticketRequest)
        {
            Ticket ticket = await _ticketService.AssignTicketAsync(ticketId, ticketRequest);
            return Success(ticket);
        }

        [Authorize(Roles = "User")]
        [HttpPut("user-update/{ticketId}")]
        public async Task<IActionResult> UpdateUser(int ticketId, CreateTicketRequest ticketUpdateRequest)
        {
            Ticket ticket = await _ticketService.UpdateUserAsync(ticketId, ticketUpdateRequest);
            return Success(ticket, Message.Success.UpdateSuccess("Ticket"));
        }

        [Authorize(Roles = "User")]
        [HttpDelete("user-delete/{ticketId}")]
        public async Task<IActionResult> Delete(int ticketId)
        {
            Ticket ticket = await _ticketService.DeleteAsync(ticketId);
            return Success(ticket, Message.Success.DeleteSuccess("Ticket"));
        }

        [Authorize]
        [HttpPost("get-all")]
        public async Task<IActionResult> UserTickets(UserTicketPaginationRequest paginationRequest)
        {
            PaginationResponse<TicketResponse> tickets = await _ticketService.GetUserTicketsAsync(paginationRequest);
            return Success(tickets);
        }

        [Authorize(Roles = "Agent")]
        [HttpPost("my-agent-tickets")]
        public async Task<IActionResult> GetMyAgentTickets([FromBody] UserTicketPaginationRequest paginationRequest)
        {
            var tickets = await _ticketService.GetUserTicketsAsync(paginationRequest, onlyAssignedTickets: true);
            return Success(tickets);
        }
    }
}