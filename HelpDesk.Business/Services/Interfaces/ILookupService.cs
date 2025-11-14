using HelpDesk.Common.Models.Response;

namespace HelpDesk.Business.Services.Interfaces
{
    public interface ILookupService
    {
        Task<IEnumerable<SelectListItemResponse>> GetAllCategoryAsync();
        Task<IEnumerable<SelectListItemResponse>> GetAllStatusAsync();
        Task<IEnumerable<SelectListItemResponse>> GetAllPriorityAsync();
        Task<IEnumerable<SelectListItemResponse>> GetAllAgentAsync();
        Task<UserTicketSummary> GetTicketCountByStatus();
    }
}
