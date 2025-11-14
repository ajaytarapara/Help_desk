using HelpDesk.Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace HelpDesk.Data.SeedData
{
    public static class StatusSeed
    {
        public static void Seed(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Status>().HasData(
                new Status { StatusId = 1, StatusName = "Open" },
                new Status { StatusId = 2, StatusName = "In Progress" },
                new Status { StatusId = 3, StatusName = "Closed" }
            );
        }
    }
}