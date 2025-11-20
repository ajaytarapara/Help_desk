namespace HelpDesk.Data.Repositories.Interfaces
{
    public interface IUnitOfWork : IDisposable
    {
        IUserRepository Users { get; }
        Task<int> SaveAsync();
        ITicketRepository Tickets { get; }
        ICategoryRepository Categories { get; }
        IPriorityRepository Priorities { get; }
        IStatusRepository Status { get; }
        ICommentRepository Comment { get; }
        IRoleRepository Roles { get; }
        IRefreshTokenRepository RefreshToken { get; }
    }
}