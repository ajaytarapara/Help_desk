namespace HelpDesk.Common.Models.Response
{
    public class UserListResponse
    {
        public int UserId { get; set; }
        public string FullName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Role { get; set; } = string.Empty;
        public bool IsActive { get; set; }
        public int RoleId { get; set; }
    }
}