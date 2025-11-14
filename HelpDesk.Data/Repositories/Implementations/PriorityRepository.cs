using HelpDesk.Data.Entities;
using HelpDesk.Data.Repositories.Interfaces;

namespace HelpDesk.Data.Repositories.Implementations
{
    public class PriorityRepository : GenericRepository<Priority>, IPriorityRepository
    {
        public PriorityRepository(AppDbContext context) : base(context)
        {

        }
    }
}