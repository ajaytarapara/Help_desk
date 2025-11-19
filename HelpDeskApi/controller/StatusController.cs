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
    public class StatusController : BaseApiController
    {
        private readonly IStatusService _statusService;
        public StatusController(IStatusService statusService)
        {
            _statusService = statusService;
        }

        [HttpPost("get-all")]
        public async Task<IActionResult> Get(PaginationRequest paginationRequest)
        {
            PaginationResponse<StatusResponse> statusResponse = await _statusService.GetAllStatus(paginationRequest);
            return Success(statusResponse);
        }

        [HttpGet("{statusId}")]
        public async Task<IActionResult> GetById(int statusId)
        {
            StatusResponse statusResponse = await _statusService.GetById(statusId);
            return Success(statusResponse);
        }

        [HttpPost("create")]
        public async Task<IActionResult> Create(CreateStatusRequest request)
        {
            await _statusService.Create(request);
            return Success("", Message.Success.CreatedSuccess("Status"));
        }

        [HttpPut("{statusId}")]
        public async Task<IActionResult> EditStatus(int statusId, [FromBody] CreateStatusRequest request)
        {
            await _statusService.Edit(statusId, request);
            return Success(Message.Success.Request, Message.Success.UpdateSuccess("Status"));
        }

        [HttpDelete("{statusId}")]
        public async Task<IActionResult> DeleteStatus(int statusId)
        {
            await _statusService.Delete(statusId);
            return Success(Message.Success.Request, Message.Success.DeleteSuccess("Status"));
        }
    }
}