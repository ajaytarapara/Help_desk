using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace HelpDesk.Data.Entities;

[Index(nameof(StatusId))]
[Index(nameof(PriorityId))]
[Index(nameof(CategoryId))]
[Index(nameof(AssignedToId))]
[Index(nameof(CreatedById))]
[Index(nameof(CreatedDate))]
public class Ticket
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int TicketId { get; set; }

    [Required, MaxLength(200)]
    public string Title { get; set; } = string.Empty;

    [Required]
    public string Description { get; set; } = string.Empty;

    [Required]
    public int PriorityId { get; set; }
    [ForeignKey(nameof(PriorityId))]
    public Priority? Priority { get; set; }

    [Required]
    public int StatusId { get; set; }
    [ForeignKey(nameof(StatusId))]
    public Status? Status { get; set; }

    [Required]
    public int CategoryId { get; set; }
    [ForeignKey(nameof(CategoryId))]
    public Category? Category { get; set; }

    [Required]
    public int CreatedById { get; set; }

    [ForeignKey(nameof(CreatedById))]
    public User? CreatedBy { get; set; }

    public int? AssignedToId { get; set; }

    [ForeignKey(nameof(AssignedToId))]
    public User? AssignedTo { get; set; }

    public DateTime CreatedDate { get; set; } = DateTime.UtcNow;

    public DateTime? UpdatedDate { get; set; }

    public bool IsDeleted { get; set; } = false;

    public DateTime? AssignedDate { get; set; }

    public DateTime? ClosedDate { get; set; }
}
