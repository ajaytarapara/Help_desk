using HelpDesk.Business.Services.Interfaces;
using HelpDesk.Common.Constants;
using HelpDesk.Common.Models.Request;
using HelpDesk.Common.Models.Response;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace HelpDeskApi.controller
{
    [ApiController]
    [Authorize]
    [Route("api/[controller]")]
    public class CommentController : BaseApiController
    {
        private readonly ICommentService _commentService;

        public CommentController(ICommentService commentService)
        {
            _commentService = commentService;
        }

        [HttpPost("create")]
        public async Task<IActionResult> Create([FromBody] CommentCreateRequest dto)
        {
            string response = await _commentService.CreateCommentAsync(dto);
            return Success(response, Message.Success.CreatedSuccess("Comment"));
        }

        [HttpGet("ticket/{ticketId}/comments")]
        public async Task<IActionResult> GetCommentsByTicket(int ticketId)
        {
            List<CommentResponse> response = await _commentService.GetCommentsByTicketIdAsync(ticketId);
            return Success(response, Message.Success.CommentAdded);
        }

        [HttpPut("{commentId}")]
        public async Task<IActionResult> EditComment(int commentId, [FromBody] EditCommentRequest request)
        {
            await _commentService.EditCommentAsync(commentId, request.CommentMessage);
            return Success(Message.Success.Request,Message.Success.UpdateSuccess("Comment"));
        }

        [HttpDelete("{commentId}")]
        public async Task<IActionResult> SoftDeleteComment(int commentId)
        {
            await _commentService.SoftDeleteCommentAsync(commentId);
            return Success(Message.Success.Request,Message.Success.DeleteSuccess("Comment"));
        }

    }
}