using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using HelpDesk.Business.Services.Interfaces;
using HelpDesk.Common.Constants;
using HelpDesk.Common.Models.Request;
using HelpDesk.Data.Entities;
using Microsoft.AspNetCore.Authorization;
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
            var cookieOptions = new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.None,
                Expires = DateTime.UtcNow.AddMinutes(60)
            };
            Response.Cookies.Append("auth_token", response, cookieOptions);
            return Success("", Message.Success.Login);
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterRequest request)
        {
            User response = await _authService.RegisterAsync(request);
            return Success(response, Message.Success.Register);
        }

        [HttpPost("logout")]
        public async Task<IActionResult> Logout()
        {
            Response.Cookies.Append("auth_token", "", new CookieOptions
            {
                Expires = DateTime.UtcNow.AddDays(-1),
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.None
            });

            return Success("", Message.Success.LogOutSuccess);
        }

        [Authorize]
        [HttpGet("me")]
        public IActionResult Me()
        {
            var user = new
            {
                UserId = User.FindFirst("UserId")?.Value,
                FullName = User.FindFirst("FullName")?.Value,
                Role = User.FindFirst(ClaimTypes.Role)?.Value,
                Email = User.FindFirst(JwtRegisteredClaimNames.Email)?.Value
            };

            return Success(user);
        }

    }
}