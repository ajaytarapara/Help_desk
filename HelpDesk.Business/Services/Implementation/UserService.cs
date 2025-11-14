using System.Linq.Expressions;
using AutoMapper;
using HelpDesk.Business.Services.Interfaces;
using HelpDesk.Common.Models.Common;
using HelpDesk.Common.Models.Request;
using HelpDesk.Common.Models.Response;
using HelpDesk.Data.Entities;
using HelpDesk.Data.Repositories.Interfaces;

namespace HelpDesk.Business.Services.Implementation
{
    public class UserService : IUserService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        public UserService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<UserListResponse> GetByIdUser(int id)
        {
            User? User = await _unitOfWork.Users.GetFirstOrDefault(x => x.UserId == id, x => x.Role);
            return _mapper.Map<UserListResponse>(User);
        }

        public async Task<PaginationResponse<UserListResponse>> UserList(UserPaginationRequest request)
        {
            string searchKey = request.Search?.Trim().ToLower();

            Expression<Func<User, bool>> filter = x =>
                !x.IsDelete &&
                (string.IsNullOrEmpty(searchKey)
                    || x.FullName.ToLower().Contains(searchKey)
                    || x.Email.ToLower().Contains(searchKey)) &&
             (!request.IsActive.HasValue || x.IsActive == request.IsActive.Value);

            var pagedData = await _unitOfWork.Users.GetPagedData(request, filter, x => x.Role);

            var mappedItems = _mapper.Map<List<UserListResponse>>(pagedData.Items);

            return new PaginationResponse<UserListResponse>(
                mappedItems,
                pagedData.TotalCount,
                pagedData.PageNumber,
                pagedData.PageSize
            );
        }

    }
}