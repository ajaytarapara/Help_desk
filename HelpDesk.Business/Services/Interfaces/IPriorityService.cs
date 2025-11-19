using HelpDesk.Common.Models.Common;
using HelpDesk.Common.Models.Request;
using HelpDesk.Common.Models.Response;

namespace HelpDesk.Business.Services.Interfaces
{
    public interface IPriorityService
    {
        Task<PaginationResponse<PriorityResponse>> GetAllPriority(PaginationRequest paginationRequest);
        Task<PriorityResponse> GetById(int priorityId);
        Task Create(CreatePriorityRequest createPriorityRequest);
        Task Edit(int priorityId, CreatePriorityRequest editRequest);
        Task Delete(int priorityId);
    }
}