namespace HelpDesk.Common.Models.Common
{
    public class PaginationRequest
    {
        public int PageNumber { get; set; } = 1;
        public int PageSize { get; set; } = 10;

        public string? Search { get; set; }

        public string? OrderBy { get; set; } = "Id";
        public bool IsDescending { get; set; } = false;
    }
}