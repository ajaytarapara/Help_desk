using HelpDesk.Common.Models.Common;

namespace HelpDesk.Common.Models.Request
{
    public class UserPaginationRequest : PaginationRequest
    {
        public bool? IsActive { get; set; }
        public int? RoleId { get; set; }
    }
}