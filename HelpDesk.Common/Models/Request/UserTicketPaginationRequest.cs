using HelpDesk.Common.Models.Common;

namespace HelpDesk.Common.Models.Request
{
    public class UserTicketPaginationRequest : PaginationRequest
    {
        public int AssignedToId { get; set; }
        public int StatusId { get; set; }
        public int PriorityId { get; set; }

        public string? FromDate { get; set; }
        public string? ToDate { get; set; }
    }
}