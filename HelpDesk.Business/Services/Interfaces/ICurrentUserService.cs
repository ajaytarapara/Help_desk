namespace HelpDesk.Business.Services.Interfaces
{
    public interface ICurrentUserService
    {
        int GetCurrentUserId();
        string GetCurrentUserRole();
    }
}