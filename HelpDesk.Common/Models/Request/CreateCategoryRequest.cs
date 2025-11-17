using System.ComponentModel.DataAnnotations;
using HelpDesk.Common.Constants;

namespace HelpDesk.Common.Models.Request
{
    public class CreateCategoryRequest
    {
        [Required(ErrorMessage = Message.Validation.RequiredTemplate)]
        [MaxLength(100, ErrorMessage = Message.Validation.MaxLengthTemplate)]
        public string CategoryName { get; set; } = string.Empty;
    }
}