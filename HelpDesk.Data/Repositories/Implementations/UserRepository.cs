using HelpDesk.Data.Entities;
using HelpDesk.Data.Repositories.Interfaces;

namespace HelpDesk.Data.Repositories.Implementations
{
    public class UserRepository : GenericRepository<User>, IUserRepository
    {
        public UserRepository(AppDbContext context) : base(context) { }
    }

}