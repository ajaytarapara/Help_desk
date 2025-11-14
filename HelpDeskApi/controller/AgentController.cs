using HelpDesk.Business.Services.Interfaces;
using HelpDesk.Common.Models.Response;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace HelpDeskApi.controller
{
    [ApiController]
    [Route("api/[controller]")]
    public class AgentController : BaseApiController
    {
        private readonly IAgentService _agentService;
        public AgentController(IAgentService agentService)
        {
            _agentService = agentService;
        }

        [Authorize(Roles = "Agent")]
        [HttpGet("ticket-status-summary")]
        public async Task<IActionResult> GetTicketCount()
        {
            AgentTicketSummaryResponse summaryResponse = await _agentService.GetTicketCountByStatus();
            return Success(summaryResponse);
        }

        [Authorize(Roles = "Agent")]
        [HttpGet("high-priority-pending-ticket")]
        public async Task<IActionResult> GetPendingTicket()
        {
            IEnumerable<TicketResponse> ticketResponse = await _agentService.GetPendingTicketAsync();
            return Success(ticketResponse);
        }

        [Authorize(Roles = "Agent")]
        [HttpGet("avg-resolution-time")]
        public async Task<IActionResult> GetAvgResolutionTime()
        {
            FunAgentResolutionTimeResponse timeResponse = await _agentService.GetResolutionTimePerAgent();
            return Success(timeResponse);
        }

    }
}