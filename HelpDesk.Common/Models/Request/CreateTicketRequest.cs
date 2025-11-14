using System.ComponentModel.DataAnnotations;
using HelpDesk.Common.Constants;

namespace HelpDesk.Common.Models.Request
{
    public class CreateTicketRequest
    {

        [Required(ErrorMessage = Message.Validation.RequiredTemplate)]
        [MaxLength(200, ErrorMessage = Message.Validation.MaxLengthTemplate)]
        public string Title { get; set; } = string.Empty;

        [Required(ErrorMessage = Message.Validation.RequiredTemplate)]
        [MaxLength(500, ErrorMessage = Message.Validation.MaxLengthTemplate)]
        public string Description { get; set; } = string.Empty;

        [Required(ErrorMessage = Message.Validation.RequiredTemplate)]
        public int PriorityId { get; set; }

        [Required(ErrorMessage = Message.Validation.RequiredTemplate)]
        public int CategoryId { get; set; }
    }
}