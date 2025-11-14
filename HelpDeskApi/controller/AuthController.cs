using HelpDesk.Business.Services.Interfaces;
using HelpDesk.Common.Constants;
using HelpDesk.Common.Models.Request;
using HelpDesk.Data.Entities;
using Microsoft.AspNetCore.Mvc;

namespace HelpDeskApi.controller
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : BaseApiController
    {
        private readonly IAuthService _authService;
        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            string response = await _authService.LoginAsync(request);
            return Success(response, Message.Success.Login);
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterRequest request)
        {
            User response = await _authService.RegisterAsync(request);
            return Success(response, Message.Success.Register);
        }

    }
}