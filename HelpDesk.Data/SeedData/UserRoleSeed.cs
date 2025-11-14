using HelpDesk.Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace HelpDesk.Data.SeedData;

public static class UserRoleSeed
{
    public static void Seed(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<UserRole>().HasData(
            new UserRole { RoleId = 1, RoleName = "User" },
            new UserRole { RoleId = 2, RoleName = "Agent" },
            new UserRole { RoleId = 3, RoleName = "Admin" }
        );
    }
}
