using HelpDesk.Common.Models.Common;
using HelpDesk.Common.Models.Request;
using HelpDesk.Common.Models.Response;

namespace HelpDesk.Business.Services.Interfaces
{
    public interface ICategoryService
    {
        Task CreateAsync(CreateCategoryRequest request);

        Task<CategoryResponse> GetByIdAsync(int categoryId);

        Task UpdateAsync(int categoryId, CreateCategoryRequest request);

        Task<PaginationResponse<CategoryResponse>> GetAllAsync(PaginationRequest paginationRequest);
        Task DeleteAsync(int categoryId);
    }
}