using HelpDesk.Business.Services.Interfaces;
using HelpDesk.Common.Models.Common;
using HelpDesk.Common.Models.Response;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace HelpDeskApi.controller
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(Roles = "Admin")]
    public class PriorityController : BaseApiController
    {
        private readonly IPriorityService _priorityService;
        public PriorityController(IPriorityService priorityService)
        {
            _priorityService = priorityService;
        }

        [HttpGet]
        public async Task<IActionResult> Get(PaginationRequest paginationRequest)
        {
            PaginationResponse<PriorityResponse> priorityResponse = await _priorityService.GetAllPriority(paginationRequest);
            return Success(priorityResponse);
        }

    }
}