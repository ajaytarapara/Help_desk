using HelpDesk.Common.Models.Request;
using HelpDesk.Common.Models.Response;

namespace HelpDesk.Business.Services.Interfaces
{
    public interface ICommentService
    {
        Task<string> CreateCommentAsync(CommentCreateRequest dto);
        Task<List<CommentResponse>> GetCommentsByTicketIdAsync(int ticketId);
        Task EditCommentAsync(int commentId, string newMessage);
        Task SoftDeleteCommentAsync(int commentId);
    }
}