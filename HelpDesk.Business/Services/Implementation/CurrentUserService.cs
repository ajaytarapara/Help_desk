using System.Security.Claims;
using HelpDesk.Business.Services.Interfaces;
using Microsoft.AspNetCore.Http;

namespace HelpDesk.Business.Services.Implementation
{
    public class CurrentUserService : ICurrentUserService
    {
        private readonly IHttpContextAccessor _httpContextAccessor;

        public CurrentUserService(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }

        public int GetCurrentUserId()
        {
            var userIdClaim = _httpContextAccessor.HttpContext?.User?.FindFirst(ClaimTypes.NameIdentifier);
            return int.Parse(userIdClaim.Value);
        }

        public string GetCurrentUserRole()
        {
            var userIdClaim = _httpContextAccessor.HttpContext?.User?.FindFirst(ClaimTypes.Role);
            return userIdClaim.Value;
        }
    }
}