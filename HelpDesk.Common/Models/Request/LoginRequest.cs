using System.ComponentModel.DataAnnotations;
using HelpDesk.Common.Constants;
using static HelpDesk.Common.Constants.Constants;

namespace HelpDesk.Common.Models.Request
{
    public class LoginRequest
    {
        [Required(ErrorMessage = Message.Validation.RequiredTemplate)]
        [EmailAddress(ErrorMessage = Message.Validation.InvalidEmail)]
        [MaxLength(100, ErrorMessage = Message.Validation.MaxLengthTemplate)]
        public string Email { get; set; } = string.Empty;

        [Required(ErrorMessage = Message.Validation.RequiredTemplate)]
        [MinLength(8, ErrorMessage = Message.Validation.InvalidPassword)]
        [MaxLength(50, ErrorMessage = Message.Validation.MaxLengthTemplate)]
        [RegularExpression(
            RegexPattern.Password,
            ErrorMessage = Message.Validation.InvalidPassword
        )]
        public string Password { get; set; } = string.Empty;
    }
}