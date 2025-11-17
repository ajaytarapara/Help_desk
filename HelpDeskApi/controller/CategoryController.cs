using HelpDesk.Business.Services.Interfaces;
using HelpDesk.Common.Constants;
using HelpDesk.Common.Models.Common;
using HelpDesk.Common.Models.Request;
using HelpDesk.Common.Models.Response;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace HelpDeskApi.controller
{
    [ApiController]
    [Route("api/[controller]")]
    public class CategoryController : BaseApiController
    {
        private ICategoryService _categoryService;
        public CategoryController(ICategoryService categoryService)
        {
            _categoryService = categoryService;
        }

        [Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<IActionResult> Create(CreateCategoryRequest request)
        {
            await _categoryService.CreateAsync(request);
            return Success(Message.Success.CreatedSuccess("Category"));
        }

        [Authorize(Roles = "Admin")]
        [HttpGet("categoryId")]
        public async Task<IActionResult> GetById(int categoryId)
        {
            CategoryResponse category = await _categoryService.GetByIdAsync(categoryId);
            return Success(category);
        }

        [Authorize(Roles = "Admin")]
        [HttpPut("categoryId")]
        public async Task<IActionResult> Update(int categoryId, CreateCategoryRequest request)
        {
            await _categoryService.UpdateAsync(categoryId, request);
            return Success(Message.Success.UpdateSuccess("Category"));
        }

        [Authorize(Roles = "Admin")]
        [HttpPost("get-all")]
        public async Task<IActionResult> GetAll(PaginationRequest paginationRequest)
        {
            PaginationResponse<CategoryResponse> response = await _categoryService.GetAllAsync(paginationRequest);
            return Success(response);
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("categoryId")]
        public async Task<IActionResult> Delete(int categoryId)
        {
            await _categoryService.DeleteAsync(categoryId);
            return Success(Message.Success.DeleteSuccess("Category"));
        }
    }
}