using HelpDesk.Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace HelpDesk.Data.SeedData
{
    public class UserSeed
    {
        public static void Seed(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>().HasData(
            new User
            {
                UserId = 1,
                FullName = "Admin User",
                Email = "admin@helpdesk.com",
                Password = "10000;7QDWbztCkz2Od2yGckTxfQ==;p2b8MyIfP6GewNCjXlt9RG0jkeF+ilFk1yWKpLIeI0c=",
                RoleId = 3,
                IsActive = true,
                CreatedDate = new DateTime(2025, 1, 1, 0, 0, 0, DateTimeKind.Utc)
            },
            new User
            {
                UserId = 2,
                FullName = "Agent User",
                Email = "agent@helpdesk.com",
                Password = "10000;0Qbe4dvXQ7st/ETWyCePVg==;L9kfrgZe1ZroqBYWPAJDxiDmM3tQ3wmSTbK5smx66Sc=",
                RoleId = 2,
                IsActive = true,
                CreatedDate = new DateTime(2025, 1, 1, 0, 0, 0, DateTimeKind.Utc)
            }
        );
        }
    }
}