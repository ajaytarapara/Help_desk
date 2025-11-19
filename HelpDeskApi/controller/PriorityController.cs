using HelpDesk.Business.Services.Interfaces;
using HelpDesk.Common.Constants;
using HelpDesk.Common.Models.Common;
using HelpDesk.Common.Models.Request;
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

        [HttpPost("get-all")]
        public async Task<IActionResult> Get(PaginationRequest paginationRequest)
        {
            PaginationResponse<PriorityResponse> priorityResponse = await _priorityService.GetAllPriority(paginationRequest);
            return Success(priorityResponse);
        }

        [HttpGet("{priorityId}")]
        public async Task<IActionResult> GetById(int priorityId)
        {
            PriorityResponse priorityResponse = await _priorityService.GetById(priorityId);
            return Success(priorityResponse);
        }

        [HttpPost]
        public async Task<IActionResult> Create(CreatePriorityRequest request)
        {
            await _priorityService.Create(request);
            return Success("", Message.Success.CreatedSuccess("Priority"));
        }
    }
}