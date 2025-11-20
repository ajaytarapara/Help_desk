using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using HelpDesk.Business.Services.Interfaces;
using HelpDesk.Common.Constants;
using HelpDesk.Common.Models.Request;
using HelpDesk.Common.Models.Response;
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
            AuthTokens tokens = await _authService.LoginAsync(request);
            Response.Cookies.Append("access_token", tokens.AccessToken, new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.None,
                Expires = DateTime.UtcNow.AddMinutes(15)
            });

            Response.Cookies.Append("refresh_token", tokens.RefreshToken, new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.None,
                Expires = DateTime.UtcNow.AddDays(7)
            });
            return Success("", Message.Success.Login);
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterRequest request)
        {
            User response = await _authService.RegisterAsync(request);
            return Success(response, Message.Success.Register);
        }

        [Authorize]
        [HttpPost("logout")]
        public IActionResult Logout()
        {
            Response.Cookies.Delete("access_token");
            Response.Cookies.Delete("refresh_token");

            return Success("", "Logged out successfully");
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

        [HttpPost("refresh")]
        public async Task<IActionResult> Refresh()
        {
            string? refreshToken = Request.Cookies["refresh_token"];

            if (refreshToken == null)
                return Unauthorized("Refresh token missing");

            var newTokens = await _authService.RefreshAsync(refreshToken);

            Response.Cookies.Append("access_token", newTokens.AccessToken, new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.None,
                Expires = DateTime.UtcNow.AddMinutes(15)
            });
            return Success("", "Token refreshed");
        }


    }
}