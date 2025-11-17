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
    [Authorize(Roles = "Admin")]
    [Route("api/[controller]")]
    public class AdminApiController : BaseApiController
    {
        private readonly IUserService _userService;
        public AdminApiController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost]
        public async Task<IActionResult> GetUsers(UserPaginationRequest userPaginationRequest)
        {
            PaginationResponse<UserListResponse> users = await _userService.UserList(userPaginationRequest);
            return Success(users);
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<IActionResult> GetUserById(int id)
        {
            UserListResponse user = await _userService.GetByIdUser(id);
            return Success(user);
        }

        [HttpPost("user/create")]
        public async Task<IActionResult> CreateUser(CreateUserRequest request)
        {
            int userId = await _userService.CreateUser(request);
            return Success(new { UserId = userId }, Message.Success.CreatedSuccess("User"));
        }

        [HttpDelete("user/delete/{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            bool deleted = await _userService.DeleteUser(id);
            return Success(deleted, Message.Success.DeleteSuccess("User"));
        }

        [HttpPut("user/update/{id}")]
        public async Task<IActionResult> UpdateUser(int id, CreateUserRequest request)
        {
            bool updated = await _userService.UpdateUser(id, request);
            return Success(Message.Success.UpdateSuccess("User"));
        }

    }
}