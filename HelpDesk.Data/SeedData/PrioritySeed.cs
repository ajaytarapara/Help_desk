using HelpDesk.Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace HelpDesk.Data.SeedData
{
    public static class PrioritySeed
    {
        public static void Seed(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Priority>().HasData(
                new Priority { PriorityId = 1, PriorityName = "Low" },
                new Priority { PriorityId = 2, PriorityName = "Medium" },
                new Priority { PriorityId = 3, PriorityName = "High" }
            );
        }
    }
}