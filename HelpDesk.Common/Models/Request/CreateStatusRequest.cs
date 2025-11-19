using System.ComponentModel.DataAnnotations;
using HelpDesk.Common.Constants;

namespace HelpDesk.Common.Models.Request
{
    public class CreateStatusRequest
    {
        [Required(ErrorMessage = Message.Validation.RequiredTemplate)]
        [MaxLength(50, ErrorMessage = Message.Validation.MaxLengthTemplate)]
        public string StatusName { get; set; } = string.Empty;
    }
}