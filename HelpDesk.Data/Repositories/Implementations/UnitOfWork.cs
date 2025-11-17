using HelpDesk.Data.Repositories.Interfaces;

namespace HelpDesk.Data.Repositories.Implementations
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly AppDbContext _context;
        private IUserRepository? _userRepository;
        private ITicketRepository? _ticketRepository;
        private ICategoryRepository? _categoryRepository;
        private IPriorityRepository? _priorityRepository;
        private IStatusRepository? _statusRepository;
        private ICommentRepository? _commentRepository;
        private IRoleRepository? _roleRepository;

        public UnitOfWork(AppDbContext context)
        {
            _context = context;
        }

        public IUserRepository Users => _userRepository ??= new UserRepository(_context);

        public async Task<int> SaveAsync() => await _context.SaveChangesAsync();

        public void Dispose() => _context.Dispose();

        public ITicketRepository Tickets => _ticketRepository ??= new TicketRepository(_context);

        public ICategoryRepository Categories => _categoryRepository ??= new CategoryRepository(_context);

        public IPriorityRepository Priorities => _priorityRepository ??= new PriorityRepository(_context);

        public IStatusRepository Status => _statusRepository ??= new StatusRepository(_context);

        public ICommentRepository Comment => _commentRepository ??= new CommentRepository(_context);

        public IRoleRepository Roles => _roleRepository ??= new RoleRepository(_context);
    }

}