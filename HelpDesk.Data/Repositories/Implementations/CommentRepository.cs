using HelpDesk.Data.Entities;
using HelpDesk.Data.Repositories.Interfaces;

namespace HelpDesk.Data.Repositories.Implementations
{
    public class CommentRepository : GenericRepository<Comment>, ICommentRepository
    {
        public CommentRepository(AppDbContext context) : base(context)
        {

        }
    }

}