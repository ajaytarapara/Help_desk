using HelpDesk.Business.Services.Interfaces;
using HelpDesk.Data.Repositories.Interfaces;
using Microsoft.AspNetCore.SignalR;

namespace HelpDesk.Business.Hubs
{
    public class CommentHub : Hub
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly ICurrentUserService _currentUserService;

        public CommentHub(IUnitOfWork unitOfWork, ICurrentUserService currentUserService)
        {
            _unitOfWork = unitOfWork;
            _currentUserService = currentUserService;
        }

        public override async Task OnConnectedAsync()
        {
            // Nothing special right now
            await base.OnConnectedAsync();
        }

        public override async Task OnDisconnectedAsync(Exception? exception)
        {
            // Leave all groups automatically (SignalR does this on disconnect).
            await base.OnDisconnectedAsync(exception);
        }

        // Client calls this to join updates for a specific ticket
        public async Task JoinTicketGroup(int ticketId)
        {
            // Validate user has permission to see this ticket before adding to group
            var currentUserId = _currentUserService.GetCurrentUserId();
            var ticket = await _unitOfWork.Tickets.GetByIdAsync(ticketId);
            if (ticket == null)
            {
                // ignore or optionally throw to client
                return;
            }

            // If you want to restrict join to owners/agents (same logic as service):
            var user = await _unitOfWork.Users.GetFirstOrDefault(x => x.UserId == currentUserId, x => x.Role);
            bool isAgent = user != null && (string.Equals(user.Role?.RoleName, "Agent", StringComparison.OrdinalIgnoreCase)
                                            || string.Equals(user.Role?.RoleName, "SupportAgent", StringComparison.OrdinalIgnoreCase));
            bool isOwner = ticket.CreatedById == currentUserId;

            if (!isAgent && !isOwner)
            {
                // don't add to group; unauthorized to watch
                return;
            }

            await Groups.AddToGroupAsync(Context.ConnectionId, GetGroupName(ticketId));
        }

        public async Task LeaveTicketGroup(int ticketId)
        {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, GetGroupName(ticketId));
        }

        private static string GetGroupName(int ticketId) => $"ticket-{ticketId}";

    }
}