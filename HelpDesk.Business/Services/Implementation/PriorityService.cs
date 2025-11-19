using System.Linq.Expressions;
using AutoMapper;
using HelpDesk.Business.Services.Interfaces;
using HelpDesk.Common.Models.Common;
using HelpDesk.Common.Models.Response;
using HelpDesk.Data.Entities;
using HelpDesk.Data.Repositories.Interfaces;

namespace HelpDesk.Business.Services.Implementation
{
    public class PriorityService : IPriorityService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        public PriorityService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;

        }

        public async Task<PaginationResponse<PriorityResponse>> GetAllPriority(PaginationRequest request)
        {
            string searchKey = request.Search?.Trim().ToLower();

            Expression<Func<Priority, bool>> filter = x =>
                !x.IsDelete &&
                (string.IsNullOrEmpty(searchKey)
                    || x.PriorityName.ToLower().Contains(searchKey));

            var pagedData = await _unitOfWork.Priorities.GetPagedData(request, filter);

            var mappedItems = _mapper.Map<List<PriorityResponse>>(pagedData.Items);

            return new PaginationResponse<PriorityResponse>(
                mappedItems,
                pagedData.TotalCount,
                pagedData.PageNumber,
                pagedData.PageSize
            );
        }

    }
}