using HelpDesk.Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace HelpDesk.Data.SeedData
{
    public static class CategorySeed
    {
        public static void Seed(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Category>().HasData(
                new Category { CategoryId = 1, CategoryName = "General Inquiry", CreatedDate = new DateTime(2025, 1, 1, 0, 0, 0, DateTimeKind.Utc) },
                new Category { CategoryId = 2, CategoryName = "Bug Report", CreatedDate = new DateTime(2025, 1, 1, 0, 0, 0, DateTimeKind.Utc) },
                new Category { CategoryId = 3, CategoryName = "Feature Request", CreatedDate = new DateTime(2025, 1, 1, 0, 0, 0, DateTimeKind.Utc) }
            );
        }
    }
}