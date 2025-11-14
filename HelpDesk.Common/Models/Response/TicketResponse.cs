namespace HelpDesk.Common.Models.Response
{
    public class TicketResponse
    {
        public int TicketId { get; set; }

        public string Title { get; set; } = string.Empty;

        public string Description { get; set; } = string.Empty;

        public PriorityResponse? Priority { get; set; }

        public StatusResponse? Status { get; set; }

        public CategoryResponse? Category { get; set; }

        public UserResponse? CreatedBy { get; set; }

        public UserResponse? AssignedTo { get; set; }

        public DateTime CreatedDate { get; set; } = DateTime.UtcNow;

        public DateTime? UpdatedDate { get; set; }
    }
}