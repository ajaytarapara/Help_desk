using HelpDesk.Business.Services.Implementation;
using HelpDesk.Business.Services.Interfaces;
using HelpDesk.Data.Repositories.Implementations;
using HelpDesk.Data.Repositories.Interfaces;

namespace HelpDeskApi.Extensions
{
    public static class ServiceRegistration
    {
        public static void AddBusinessServices(this IServiceCollection services)
        {
            // Register Unit of Work
            services.AddScoped<IUnitOfWork, UnitOfWork>();

            // Register Services
            services.AddScoped<IAuthService, AuthService>();

            services.AddScoped<ICurrentUserService, CurrentUserService>();

            services.AddScoped<ITicketService, TicketService>();

            services.AddScoped<IAgentService, AgentService>();

            services.AddScoped<ILookupService, LookupService>();

            services.AddScoped<ICommentService, CommentService>();

            services.AddScoped<IUserService, UserService>();

            services.AddScoped<ICategoryService, CategoryService>();

            services.AddScoped<IPriorityService, PriorityService>();

            services.AddScoped<IStatusService, StatusService>();
        }
    }
}