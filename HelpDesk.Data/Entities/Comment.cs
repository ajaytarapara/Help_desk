using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HelpDesk.Data.Entities;

public class Comment
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int CommentId { get; set; }

    [Required]
    public int TicketId { get; set; }

    [ForeignKey(nameof(TicketId))]
    public Ticket? Ticket { get; set; }

    [Required]
    public int UserId { get; set; }

    [ForeignKey(nameof(UserId))]
    public User? User { get; set; }

    public int? ParentCommentId { get; set; }

    [ForeignKey(nameof(ParentCommentId))]
    public Comment? ParentComment { get; set; }

    [Required]
    public string Message { get; set; } = string.Empty;

    public DateTime CreatedDate { get; set; } = DateTime.UtcNow;

    public bool IsDelete { get; set; } = false;

    public DateTime? EditedDate { get; set; } = DateTime.UtcNow;
}
