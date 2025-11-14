using System.Linq.Expressions;
using HelpDesk.Common.Models.Common;
using HelpDesk.Data.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace HelpDesk.Data.Repositories.Implementations
{

    public class GenericRepository<T> : IGenericRepository<T> where T : class
    {
        protected readonly DbContext _context;
        protected readonly DbSet<T> _dbSet;

        public GenericRepository(DbContext context)
        {
            _context = context;
            _dbSet = context.Set<T>();
        }

        public async Task<IEnumerable<T>> GetAllAsync(Expression<Func<T, bool>>? filter = null, Func<IQueryable<T>, IOrderedQueryable<T>>? orderBy = null, params Expression<Func<T, object>>[] includes)
        {
            IQueryable<T> query = _dbSet;

            if (filter != null)
            {
                query = query.Where(filter);
            }

            if (includes != null)
            {
                foreach (var include in includes)
                {
                    query = query.Include(include);
                }
            }

            if (orderBy != null)
            {
                return await orderBy(query).ToListAsync();
            }

            return await query.ToListAsync();
        }


        public async Task<T?> GetByIdAsync(int id) => await _dbSet.FindAsync(id);

        public async Task<IEnumerable<T>> FindAsync(Expression<Func<T, bool>> predicate)
            => await _dbSet.Where(predicate).ToListAsync();

        public async Task AddAsync(T entity) => await _dbSet.AddAsync(entity);

        public void Update(T entity) => _dbSet.Update(entity);

        public void Delete(T entity) => _dbSet.Remove(entity);

        public async Task<T?> GetFirstOrDefault(
          Expression<Func<T, bool>> filter,
          params Expression<Func<T, object>>[] includes)
        {
            IQueryable<T> query = _dbSet.Where(filter);

            if (includes != null)
            {
                foreach (var include in includes)
                {
                    query = query.Include(include);
                }
            }

            return await query.FirstOrDefaultAsync();
        }

        //
        public async Task<PaginationResponse<T>> GetPagedData(PaginationRequest request, Expression<Func<T, bool>>? filter = null, params Expression<Func<T, object>>[] includeProperties)
        {
            IQueryable<T> query = _dbSet;

            //Includes
            foreach (var include in includeProperties)
                query = query.Include(include);

            //Apply Filtering
            if (filter != null)
                query = query.Where(filter);

            //Apply Sorting (using reflection)
            if (!string.IsNullOrWhiteSpace(request.OrderBy))
            {
                // Find the property ignoring case
                var property = typeof(T).GetProperties()
                    .FirstOrDefault(p => p.Name.Equals(request.OrderBy, StringComparison.OrdinalIgnoreCase));

                if (property != null)
                {
                    string correctPropertyName = property.Name; // This ensures correct casing

                    query = request.IsDescending
                        ? query.OrderByDescending(x => EF.Property<object>(x, correctPropertyName))
                        : query.OrderBy(x => EF.Property<object>(x, correctPropertyName));
                }
            }

            //Count total before pagination
            var totalCount = await query.CountAsync();

            //Pagination
            var items = await query
                .Skip((request.PageNumber - 1) * request.PageSize)
                .Take(request.PageSize)
                .ToListAsync();

            return new PaginationResponse<T>(items, totalCount, request.PageNumber, request.PageSize);
        }

        public void UpdateRange(IEnumerable<T> entities)
        {
            if (entities == null)
                throw new ArgumentNullException(nameof(entities));

            _dbSet.UpdateRange(entities);
        }

    }
}