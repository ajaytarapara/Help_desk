using HelpDesk.Common.Models.Common;
using Microsoft.AspNetCore.Mvc;
using HelpDesk.Common.Constants;

namespace HelpDeskApi.controller
{
    [ApiController]
    [Route("api/[controller]")]
    public abstract class BaseApiController : ControllerBase
    {
        protected IActionResult Success<T>(T data, string message = Message.Success.Request, int statusCode = 200)
        {
            var response = ApiResponse<T>.SuccessResponse(data, message, statusCode);
            return StatusCode(statusCode, response);
        }

        protected IActionResult Error(string message, int statusCode = 400, List<string>? errors = null)
        {
            var response = ApiResponse<object>.ErrorResponse(message, statusCode, errors);
            return StatusCode(statusCode, response);
        }

        protected IActionResult ValidationError()
        {
            var errors = ModelState.Values.SelectMany(v => v.Errors)
                                          .Select(e => e.ErrorMessage)
                                          .ToList();

            var response = ApiResponse<object>.ErrorResponse(Message.Error.Validation, 400, errors);
            return BadRequest(response);
        }
    }
}