using System.Linq.Expressions;
using AutoMapper;
using HelpDesk.Business.Services.Interfaces;
using HelpDesk.Common.Constants;
using HelpDesk.Common.Models.Common;
using HelpDesk.Common.Models.Request;
using HelpDesk.Common.Models.Response;
using HelpDesk.Data.Entities;
using HelpDesk.Data.Repositories.Interfaces;
using static HelpDesk.Common.Exceptions.Exceptions;

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

        public async Task<PriorityResponse> GetById(int priorityId)
        {
            Priority? priority = await _unitOfWork.Priorities.GetFirstOrDefault(x => x.PriorityId == priorityId && !x.IsDelete);
            if (priority == null)
                throw new BadRequestException(Message.Error.NotFound("Priority"));
            PriorityResponse priorityResponse = _mapper.Map<PriorityResponse>(priority);
            return priorityResponse;
        }

        public async Task Create(CreatePriorityRequest request)
        {
            await IsPriorityNameExist(request.PriorityName);
            Priority priority = _mapper.Map<Priority>(request);
            priority.CreatedDate = DateTime.UtcNow;
            await _unitOfWork.Priorities.AddAsync(priority);
            await _unitOfWork.SaveAsync();
        }

        private async Task<Priority?> IsPriorityNameExist(string priorityName, int? currentPriorityId = null)
        {
            Priority? priority = await _unitOfWork.Priorities.GetFirstOrDefault(c =>
                c.PriorityName.ToLower() == priorityName.ToLower() &&
                !c.IsDelete &&
                (!currentPriorityId.HasValue || c.PriorityId != currentPriorityId.Value)
            );

            if (priority != null)
            {
                throw new BadRequestException(Message.Error.PriorityAlreadyExist);
            }

            return priority;
        }

    }
}