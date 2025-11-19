using HelpDesk.Common.Models.Common;
using HelpDesk.Common.Models.Response;

namespace HelpDesk.Business.Services.Interfaces
{
    public interface IPriorityService
    {
        Task<PaginationResponse<PriorityResponse>> GetAllPriority(PaginationRequest paginationRequest);
    }
}