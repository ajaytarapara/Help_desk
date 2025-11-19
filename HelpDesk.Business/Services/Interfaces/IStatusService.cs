using HelpDesk.Common.Models.Common;
using HelpDesk.Common.Models.Request;
using HelpDesk.Common.Models.Response;

namespace HelpDesk.Business.Services.Interfaces
{
    public interface IStatusService
    {
        Task<PaginationResponse<StatusResponse>> GetAllStatus(PaginationRequest paginationRequest);
        Task<StatusResponse> GetById(int statusId);
        Task Create(CreateStatusRequest createPriorityRequest);
        Task Edit(int statusId, CreateStatusRequest editRequest);
        Task Delete(int statusId);

    }
}