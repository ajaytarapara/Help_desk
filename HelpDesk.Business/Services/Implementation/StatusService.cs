using System.Linq.Expressions;
using AutoMapper;
using HelpDesk.Business.Services.Interfaces;
using HelpDesk.Common.Constants;
using HelpDesk.Common.Models.Common;
using HelpDesk.Common.Models.Request;
using HelpDesk.Common.Models.Response;
using HelpDesk.Data.Entities;
using HelpDesk.Data.Repositories.Interfaces;
using static HelpDesk.Common.Constants.Constants;
using static HelpDesk.Common.Exceptions.Exceptions;

namespace HelpDesk.Business.Services.Implementation
{
    public class StatusService : IStatusService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        public StatusService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;

        }
        public async Task<PaginationResponse<StatusResponse>> GetAllStatus(PaginationRequest request)
        {
            string searchKey = request.Search?.Trim().ToLower();

            Expression<Func<Status, bool>> filter = x =>
                !x.IsDelete &&
                (string.IsNullOrEmpty(searchKey)
                    || x.StatusName.ToLower().Contains(searchKey));

            var pagedData = await _unitOfWork.Status.GetPagedData(request, filter);

            var mappedItems = _mapper.Map<List<StatusResponse>>(pagedData.Items);

            return new PaginationResponse<StatusResponse>(
                mappedItems,
                pagedData.TotalCount,
                pagedData.PageNumber,
                pagedData.PageSize
            );
        }

        public async Task<StatusResponse> GetById(int priorityId)
        {
            Status? status = await _unitOfWork.Status.GetFirstOrDefault(x => x.StatusId == priorityId && !x.IsDelete);
            if (status == null)
                throw new BadRequestException(Message.Error.NotFound("Status"));
            StatusResponse statusResponse = _mapper.Map<StatusResponse>(status);
            return statusResponse;
        }

        public async Task Create(CreateStatusRequest request)
        {
            await IsStatusNameExist(request.StatusName);
            Status status = _mapper.Map<Status>(request);
            status.CreatedDate = DateTime.UtcNow;
            await _unitOfWork.Status.AddAsync(status);
            await _unitOfWork.SaveAsync();
        }

        public async Task Edit(int statusId, CreateStatusRequest request)
        {
            Status? status = await GetStatusById(statusId);
            if (status.IsSystemGenerated)
            {
                throw new BadRequestException(Message.Error.ItIsSystemGenerated);
            }
            await IsStatusNameExist(request.StatusName, statusId);
            status.StatusName = request.StatusName;
            status.UpdatedDate = DateTime.UtcNow;
            await _unitOfWork.SaveAsync();
        }

        public async Task Delete(int statusId)
        {
            Status? status = await GetStatusById(statusId);
            if (status.IsSystemGenerated)
                throw new BadRequestException(Message.Error.ItIsSystemGenerated);

            IEnumerable<Ticket> hasActiveTickets = await _unitOfWork.Tickets.GetAllAsync(t => t.StatusId == status.StatusId && !t.IsDeleted);

            if (hasActiveTickets.Count() > 0)
                throw new BadRequestException(Message.Error.CanNotDeleteTicketStatus);

            status.IsDelete = true;
            await _unitOfWork.SaveAsync();
        }

        private async Task<Status?> IsStatusNameExist(string statusName, int? currentStatusId = null)
        {
            Status? status = await _unitOfWork.Status.GetFirstOrDefault(c =>
                c.StatusName.ToLower() == statusName.ToLower() &&
                !c.IsDelete &&
                (!currentStatusId.HasValue || c.StatusId != currentStatusId.Value)
            );

            if (status != null)
            {
                throw new BadRequestException(Message.Error.StatusAlreadyExist);
            }

            return status;
        }

        private async Task<Status> GetStatusById(int statusId)
        {
            Status? status = await _unitOfWork.Status.GetFirstOrDefault(c => c.StatusId == statusId && !c.IsDelete);
            if (status == null)
            {
                throw new NotFoundException(Message.Error.NotFound("status"));
            }
            return status;
        }
    }
}