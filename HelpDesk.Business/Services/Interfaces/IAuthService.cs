using HelpDesk.Common.Models.Request;
using HelpDesk.Data.Entities;

namespace HelpDesk.Business.Services.Interfaces
{
    public interface IAuthService
    {
        Task<string> LoginAsync(LoginRequest loginRequest);
        Task<User> RegisterAsync(RegisterRequest request);
    }
}