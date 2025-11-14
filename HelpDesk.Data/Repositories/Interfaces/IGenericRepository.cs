using System.Linq.Expressions;
using HelpDesk.Common.Models.Common;

namespace HelpDesk.Data.Repositories.Interfaces
{
    public interface IGenericRepository<T> where T : class
    {
        Task<IEnumerable<T>> GetAllAsync(Expression<Func<T, bool>>? filter = null, Func<IQueryable<T>, IOrderedQueryable<T>>? orderBy = null, params Expression<Func<T, object>>[] includes);
        Task<T?> GetByIdAsync(int id);
        Task<IEnumerable<T>> FindAsync(Expression<Func<T, bool>> predicate);
        Task AddAsync(T entity);
        void Update(T entity);
        void Delete(T entity);
        Task<T?> GetFirstOrDefault(Expression<Func<T, bool>> filter, params Expression<Func<T, object>>[] includes);
        Task<PaginationResponse<T>> GetPagedData(PaginationRequest request, Expression<Func<T, bool>>? filter = null, params Expression<Func<T, object>>[] includeProperties);
        void UpdateRange(IEnumerable<T> entities);
    }
}