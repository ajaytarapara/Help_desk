using System.Linq.Expressions;
using AutoMapper;
using HelpDesk.Business.Services.Interfaces;
using HelpDesk.Common.Constants;
using HelpDesk.Common.Models.Common;
using HelpDesk.Common.Models.Request;
using HelpDesk.Common.Models.Response;
using HelpDesk.Data.Entities;
using HelpDesk.Data.Repositories.Interfaces;
using static HelpDesk.Common.Exceptions.Exceptions;

namespace HelpDesk.Business.Services.Implementation
{
    public class CategoryService : ICategoryService
    {
        private readonly IUnitOfWork _unitOfWork;
        private IMapper _mapper;
        public CategoryService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task CreateAsync(CreateCategoryRequest request)
        {
            await IsCategoryNameExist(request.CategoryName);
            Category category = _mapper.Map<Category>(request);
            category.CreatedDate = DateTime.UtcNow;
            await _unitOfWork.Categories.AddAsync(category);
            await _unitOfWork.SaveAsync();
        }

        public async Task<CategoryResponse> GetByIdAsync(int categoryId)
        {
            Category category = await GetCategoryById(categoryId);
            CategoryResponse response = _mapper.Map<CategoryResponse>(category);
            return response;
        }

        public async Task UpdateAsync(int categoryId, CreateCategoryRequest request)
        {
            Category category = await GetCategoryById(categoryId);
            await IsCategoryNameExist(request.CategoryName);
            category.UpdatedDate = DateTime.UtcNow;
            _mapper.Map(request, category);
            await _unitOfWork.SaveAsync();
        }

        public async Task<PaginationResponse<CategoryResponse>> GetAllAsync(PaginationRequest request)
        {
            string searchKey = request.Search?.Trim().ToLower();

            Expression<Func<Category, bool>> filter = x =>
                !x.IsDelete &&
                (string.IsNullOrEmpty(searchKey)
                    || x.CategoryName.ToLower().Contains(searchKey));

            var pagedData = await _unitOfWork.Categories.GetPagedData(request, filter);

            var mappedItems = _mapper.Map<List<CategoryResponse>>(pagedData.Items);

            return new PaginationResponse<CategoryResponse>(
                mappedItems,
                pagedData.TotalCount,
                pagedData.PageNumber,
                pagedData.PageSize
            );
        }

        public async Task DeleteAsync(int categoryId)
        {
            Category category = await GetCategoryById(categoryId);
            category.IsDelete = true;
            category.UpdatedDate = DateTime.UtcNow;
            _unitOfWork.Categories.Update(category);
            await _unitOfWork.SaveAsync();
        }

        private async Task<Category> IsCategoryNameExist(string categoryName)
        {
            Category? category = await _unitOfWork.Categories.GetFirstOrDefault(c => c.CategoryName.ToLower() == categoryName.ToLower() && !c.IsDelete);
            if (category != null)
            {
                throw new BadRequestException(Message.Error.CategoryAlreadyExist);
            }
            return category;
        }

        private async Task<Category> GetCategoryById(int categoryId)
        {
            Category? category = await _unitOfWork.Categories.GetFirstOrDefault(c => c.CategoryId == categoryId && !c.IsDelete);
            if (category == null)
            {
                throw new NotFoundException(Message.Error.NotFound("Category"));
            }
            return category;
        }
    }
}