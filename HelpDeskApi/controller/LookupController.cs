using HelpDesk.Business.Services.Interfaces;
using HelpDesk.Common.Models.Response;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace HelpDeskApi.controller
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class LookupController : BaseApiController
    {
        private readonly ILookupService _lookupService;
        public LookupController(ILookupService lookupService)
        {
            _lookupService = lookupService;
        }

        [HttpGet("get-all-category")]
        public async Task<IActionResult> GetAllCategory()
        {
            IEnumerable<SelectListItemResponse> categoryList = await _lookupService.GetAllCategoryAsync();
            return Success(categoryList);
        }

        [HttpGet("get-all-status")]
        public async Task<IActionResult> GetAllStatus()
        {
            IEnumerable<SelectListItemResponse> statusList = await _lookupService.GetAllStatusAsync();
            return Success(statusList);
        }

        [HttpGet("get-all-priority")]
        public async Task<IActionResult> GetAllPriority()
        {
            IEnumerable<SelectListItemResponse> priorityList = await _lookupService.GetAllPriorityAsync();
            return Success(priorityList);
        }

        [Authorize(Roles = "Agent,Admin")]
        [HttpGet("get-all-agent")]
        public async Task<IActionResult> GetAllAgent()
        {
            IEnumerable<SelectListItemResponse> agentList = await _lookupService.GetAllAgentAsync();
            return Success(agentList);
        }

        [Authorize(Roles = "User")]
        [HttpGet("ticket-user-summary")]
        public async Task<IActionResult> GetTicketCount()
        {
            UserTicketSummary summaryResponse = await _lookupService.GetTicketCountByStatus();
            return Success(summaryResponse);
        }

        [Authorize(Roles = "Admin")]
        [HttpGet("get-all-roles")]
        public async Task<IActionResult> GetUserRoles()
        {
            IEnumerable<SelectListItemResponse> summaryResponse = await _lookupService.GetAllRoleAsync();
            return Success(summaryResponse);
        }
    }
}