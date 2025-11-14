using Microsoft.EntityFrameworkCore;

namespace HelpDesk.Data.SeedData;

public static class BaseSeed
{
    public static void Seed(ModelBuilder modelBuilder)
    {
        UserRoleSeed.Seed(modelBuilder);
        PrioritySeed.Seed(modelBuilder);
        StatusSeed.Seed(modelBuilder);
        CategorySeed.Seed(modelBuilder);
        UserSeed.Seed(modelBuilder);
    }
}
