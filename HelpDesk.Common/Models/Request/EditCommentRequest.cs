using System.ComponentModel.DataAnnotations;
using HelpDesk.Common.Constants;

namespace HelpDesk.Common.Models.Request
{
    public class EditCommentRequest
    {
        [Required(ErrorMessage = Message.Validation.RequiredTemplate)]
        [MaxLength(1000, ErrorMessage = Message.Validation.MaxLengthTemplate)]
        public string CommentMessage { get; set; } = string.Empty;
    }
}