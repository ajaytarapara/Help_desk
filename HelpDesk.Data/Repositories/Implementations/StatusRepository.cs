using HelpDesk.Data.Entities;
using HelpDesk.Data.Repositories.Interfaces;

namespace HelpDesk.Data.Repositories.Implementations
{
    public class StatusRepository : GenericRepository<Status>, IStatusRepository
    {
        public StatusRepository(AppDbContext context) : base(context) { }
    }
}