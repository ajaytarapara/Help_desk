using HelpDesk.Common.Models.Request;
using HelpDesk.Common.Models.Response;
using HelpDesk.Data.Entities;

namespace HelpDesk.Business.Services.Interfaces
{
    public interface IAuthService
    {
        Task<AuthTokens> LoginAsync(LoginRequest loginRequest);
        Task<User> RegisterAsync(RegisterRequest request);
        Task<AuthTokens> RefreshAsync(string refreshToken);
    }
}