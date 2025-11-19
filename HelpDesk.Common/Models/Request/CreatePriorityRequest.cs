using System.ComponentModel.DataAnnotations;
using HelpDesk.Common.Constants;

namespace HelpDesk.Common.Models.Request
{
    public class CreatePriorityRequest
    {
        [Required(ErrorMessage = Message.Validation.RequiredTemplate)]
        [MaxLength(50, ErrorMessage = Message.Validation.MaxLengthTemplate)]
        public string PriorityName { get; set; } = string.Empty;
    }
}