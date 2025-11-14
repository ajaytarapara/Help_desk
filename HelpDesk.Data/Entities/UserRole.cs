using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HelpDesk.Data.Entities;

public class UserRole
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int RoleId { get; set; }

    [Required, MaxLength(50)]
    public string RoleName { get; set; } = null!; // e.g., "Admin", "Agent", "User"

    public bool IsDelete { get; set; } = false;
}
