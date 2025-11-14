using System.ComponentModel.DataAnnotations;
using HelpDesk.Common.Constants;

namespace HelpDesk.Common.Models.Request
{
    public class CommentCreateRequest
    {
        [Required(ErrorMessage = Message.Validation.RequiredTemplate)]
        [Range(1, int.MaxValue, ErrorMessage = Message.Validation.GreaterThanZeroTemplate)]
        public int TicketId { get; set; }

        [Required(ErrorMessage = Message.Validation.RequiredTemplate)]
        [MaxLength(1000, ErrorMessage = Message.Validation.MaxLengthTemplate)]
        public string CommentMessage { get; set; } = string.Empty;
        public int? ParentCommentId { get; set; }
    }
}