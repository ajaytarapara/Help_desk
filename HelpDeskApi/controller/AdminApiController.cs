using HelpDesk.Business.Services.Interfaces;
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
    }
}