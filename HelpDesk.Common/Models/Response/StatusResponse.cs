namespace HelpDesk.Common.Models.Response
{
    public class StatusResponse
    {
        public int Id { get; set; }
        public string StatusName { get; set; } = string.Empty;
        public bool? IsSystemGenerated { get; set; } = false;
    }
}