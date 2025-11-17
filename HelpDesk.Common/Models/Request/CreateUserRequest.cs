namespace HelpDesk.Common.Models.Request
{
    using System.ComponentModel.DataAnnotations;
    using HelpDesk.Common.Constants;

    public class CreateUserRequest
    {
        [Required(ErrorMessage = Message.Validation.RequiredTemplate)]
        [MaxLength(100, ErrorMessage = Message.Validation.MaxLengthTemplate)]
        public string FullName { get; set; } = string.Empty;

        [Required(ErrorMessage = Message.Validation.RequiredTemplate)]
        [EmailAddress(ErrorMessage = Message.Validation.InvalidEmail)]
        [MaxLength(100, ErrorMessage = Message.Validation.MaxLengthTemplate)]
        public string Email { get; set; } = string.Empty;

        [Required(ErrorMessage = Message.Validation.RequiredTemplate)]
        public int RoleId { get; set; }
    }

}