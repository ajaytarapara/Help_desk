namespace HelpDesk.Common.Models.Common
{
    public class PaginationResponse<T>
    {
        public List<T> Items { get; set; }
        public int PageNumber { get; set; }
        public int TotalCount { get; set; }
        public int TotalPages { get; set; }
        public int PageSize { get; set; }

        public PaginationResponse(List<T> items, int count, int pageNumber, int pageSize)
        {
            Items = items;
            TotalCount = count;
            PageNumber = pageNumber;
            TotalPages = (int)Math.Ceiling(count / (double)pageSize);
            PageSize = pageSize;
        }
    }
}