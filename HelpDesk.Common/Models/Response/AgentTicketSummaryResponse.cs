namespace HelpDesk.Common.Models.Response
{
    public class AgentTicketSummaryResponse
    {
        public int Open { get; set; }
        public int InProgress { get; set; }
        public int Closed { get; set; }
        public int TotalTickets { get; set; }
    }
}