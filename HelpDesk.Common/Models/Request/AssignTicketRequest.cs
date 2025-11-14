using System.ComponentModel.DataAnnotations;
using HelpDesk.Common.Constants;

namespace HelpDesk.Common.Models.Request
{
    public class AssignTicketRequest
    {
        [Required(ErrorMessage = Message.Validation.RequiredTemplate)]
        public int AssignedToId { get; set; }
    }
}