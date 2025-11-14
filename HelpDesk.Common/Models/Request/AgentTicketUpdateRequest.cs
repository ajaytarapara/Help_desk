namespace HelpDesk.Common.Models.Request
{
    public class AgentTicketUpdateRequest
    {
        public int? AssignedToId { get; set; }
        public int? StatusId { get; set; }
    }
}