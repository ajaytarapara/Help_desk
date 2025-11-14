using AutoMapper;
using HelpDesk.Business.Services.Interfaces;
using HelpDesk.Common.Constants;
using HelpDesk.Common.Models.Request;
using HelpDesk.Common.Models.Response;
using HelpDesk.Data.Entities;
using HelpDesk.Data.Repositories.Interfaces;
using static HelpDesk.Common.Exceptions.Exceptions;

namespace HelpDesk.Business.Services.Implementation
{
    public class CommentService : ICommentService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly ICurrentUserService _currentUserService;

        public CommentService(IUnitOfWork unitOfWork, IMapper mapper, ICurrentUserService currentUserService)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _currentUserService = currentUserService;
        }

        public async Task<string> CreateCommentAsync(CommentCreateRequest dto)
        {
            int currentUserId = _currentUserService.GetCurrentUserId();

            User currentUser = await GetCurrentUserAsync(currentUserId);
            Ticket ticket = await GetTicketAsync(dto.TicketId);

            ValidateUserPermission(currentUser, ticket);
            await ValidateParentCommentAsync(dto);

            Comment entity = _mapper.Map<Comment>(dto);
            entity.UserId = currentUserId;

            await _unitOfWork.Comment.AddAsync(entity);
            await _unitOfWork.SaveAsync();

            return Message.Success.CreatedSuccess("Comment");
        }

        public async Task<List<CommentResponse>> GetCommentsByTicketIdAsync(int ticketId)
        {
            int currentUserId = _currentUserService.GetCurrentUserId();

            User? currentUser = await _unitOfWork.Users
                .GetFirstOrDefault(x => x.UserId == currentUserId, x => x.Role);

            if (currentUser == null)
                throw new NotFoundException(Message.Error.UserNotFound);

            Ticket? ticket = await _unitOfWork.Tickets.GetByIdAsync(ticketId);
            if (ticket == null)
                throw new NotFoundException(Message.Error.NotFound("Ticket"));

            bool isAgent = string.Equals(currentUser.Role?.RoleName, "Agent", StringComparison.OrdinalIgnoreCase)
                        || string.Equals(currentUser.Role?.RoleName, "SupportAgent", StringComparison.OrdinalIgnoreCase);

            bool isOwner = ticket.CreatedById == currentUserId;

            if (!isAgent && !isOwner)
                throw new BadRequestException(Message.Error.YouAreAuthToComment);

            List<Comment> comments = (await _unitOfWork.Comment.GetAllAsync(
                x => x.TicketId == ticketId && !x.IsDelete,
                null,
                x => x.User
            )).ToList();

            List<CommentResponse> mapped = _mapper.Map<List<CommentResponse>>(comments);

            List<CommentResponse> roots = mapped
                .Where(c => c.ParentCommentId == null)
                .ToList();

            foreach (CommentResponse comment in mapped)
            {
                if (comment.ParentCommentId.HasValue)
                {
                    CommentResponse? parent = mapped.FirstOrDefault(p => p.CommentId == comment.ParentCommentId);
                    parent?.Replies.Add(comment);
                }
            }
            return roots.OrderByDescending(c => c.CreatedDate).ToList();
        }

        public async Task EditCommentAsync(int commentId, string newMessage)
        {
            int currentUserId = _currentUserService.GetCurrentUserId();
            Comment? comment = await _unitOfWork.Comment.GetByIdAsync(commentId);

            if (comment == null)
                throw new NotFoundException(Message.Error.NotFound("Comment"));

            if (comment.UserId != currentUserId)
                throw new BadRequestException(Message.Error.NotOwner);

            comment.Message = newMessage;
            comment.EditedDate = DateTime.UtcNow;

            _unitOfWork.Comment.Update(comment);
            await _unitOfWork.SaveAsync();
        }

        public async Task SoftDeleteCommentAsync(int commentId)
        {
            int currentUserId = _currentUserService.GetCurrentUserId();

            Comment targetComment = await _unitOfWork.Comment.GetByIdAsync(commentId)
                ?? throw new NotFoundException(Message.Error.NotFound("Comment"));

            if (targetComment.UserId != currentUserId)
                throw new BadRequestException(Message.Error.NotOwner);

            IEnumerable<Comment> relatedComments = await _unitOfWork.Comment.GetAllAsync(
                c => c.TicketId == targetComment.TicketId && !c.IsDelete);

            List<Comment> commentsToDelete = GetCommentHierarchy(relatedComments.ToList(), commentId);

            DateTime utcNow = DateTime.UtcNow;
            foreach (Comment comment in commentsToDelete)
            {
                comment.IsDelete = true;
                comment.EditedDate = utcNow;
            }

            _unitOfWork.Comment.UpdateRange(commentsToDelete);
            await _unitOfWork.SaveAsync();
        }

        private List<Comment> GetCommentHierarchy(List<Comment> allComments, int commentId)
        {
            List<Comment> result = new List<Comment>();

            Comment? parent = allComments.FirstOrDefault(c => c.CommentId == commentId);
            if (parent != null)
                result.Add(parent);

            List<Comment> children = allComments
                .Where(c => c.ParentCommentId == commentId)
                .ToList();

            foreach (Comment child in children)
                result.AddRange(GetCommentHierarchy(allComments, child.CommentId));

            return result;
        }

        private async Task<User> GetCurrentUserAsync(int userId)
        {
            User? user = await _unitOfWork.Users
                .GetFirstOrDefault(x => x.UserId == userId, x => x.Role);

            if (user == null)
                throw new NotFoundException(Message.Error.UserNotFound);

            return user;
        }

        private async Task<Ticket> GetTicketAsync(int ticketId)
        {
            Ticket? ticket = await _unitOfWork.Tickets.GetByIdAsync(ticketId);
            if (ticket == null)
                throw new NotFoundException(Message.Error.NotFound("Ticket"));

            return ticket;
        }

        private static void ValidateUserPermission(User currentUser, Ticket ticket)
        {
            bool isAgent = string.Equals(currentUser.Role?.RoleName, "Agent", StringComparison.OrdinalIgnoreCase)
                        || string.Equals(currentUser.Role?.RoleName, "SupportAgent", StringComparison.OrdinalIgnoreCase);

            bool isOwner = ticket.CreatedById == currentUser.UserId;

            if (!isAgent && !isOwner)
                throw new BadRequestException(Message.Error.YouAreAuthToComment);
        }

        private async Task ValidateParentCommentAsync(CommentCreateRequest dto)
        {
            if (!dto.ParentCommentId.HasValue)
                return;

            Comment? parent = await _unitOfWork.Comment
                .GetFirstOrDefault(x => x.CommentId == dto.ParentCommentId.Value);

            if (parent == null)
                throw new NotFoundException(Message.Error.ParentCommentNotFound);

            if (parent.TicketId != dto.TicketId)
                throw new BadRequestException(Message.Error.ParentTicketMismatch);
        }


    }
}