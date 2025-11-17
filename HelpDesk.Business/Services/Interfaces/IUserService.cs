using HelpDesk.Common.Models.Common;
using HelpDesk.Common.Models.Request;
using HelpDesk.Common.Models.Response;

namespace HelpDesk.Business.Services.Interfaces
{
    public interface IUserService
    {
        Task<PaginationResponse<UserListResponse>> UserList(UserPaginationRequest userPaginationRequest);
        Task<UserListResponse> GetByIdUser(int id);
        Task<int> CreateUser(CreateUserRequest request);
        Task<bool> DeleteUser(int id);
        Task<bool> UpdateUser(int userId, CreateUserRequest request);
    }
}