namespace HelpDesk.Common.Models.Response
{
    public class CommentResponse
    {
        public int CommentId { get; set; }
        public string Message { get; set; } = string.Empty;
        public string CreatedBy { get; set; } = string.Empty;
        public DateTime CreatedDate { get; set; }
        public int? ParentCommentId { get; set; }
        public List<CommentResponse> Replies { get; set; } = new();
        public DateTime? EditedDate { get; set; }
        public int CreatedByUserId { get; set; }
    }
}