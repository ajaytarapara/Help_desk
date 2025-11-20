namespace HelpDesk.Common.Constants
{
    public static class Message
    {
        public static class Error
        {
            public const string Unauthorized = "Unauthorized access. Please login to continue.";

            public const string AccessDenied = "Access denied. You do not have permission to perform this action.";

            public const string Unexpected = "An unexpected error occurred.";
            public const string Validation = "Validation failed.";

            public const string UserNotFound = "User not found.";

            public const string InvalidCred = "Invalid credentials.";

            public const string EmailAlreadyExist = "Email already registered.";

            public static readonly Func<string, string> NotFound = (entityName) => $"{entityName} not found.";

            public static string UnauthorizedAccess(string entityName) => $"You are not authorized to access this {entityName}.";

            public const string AssignedUserMustBeAgent = "The selected user cannot be assigned to this ticket because they are not a support Agent.";

            public const string TicketMustBeOpen = "A ticket can only be assigned when it is in the Open status.";

            public const string TicketCanOnlyBeEditedWhenOpen = "This ticket can only be edited while it is in the Open.";

            public const string TicketCanOnlyBeUpdatedByCreator = "You can only update tickets that you have created.";
            public const string DeleteTicketCreateByCreator = "You can only delete tickets that you created.";
            public const string TicketMustNotBeInProgress = "This ticket cannot be deleted because it is currently In Progress.";

            public const string TicketAlreadyClosed = "This ticket is already closed and cannot be modified.";

            public const string OnlyAssignedAgentCanChangeStatus = "Only the assigned agent can change the status of this ticket.";

            public const string TicketMustBeOpenOrInProgressToAssign = "This ticket can only be assigned when it is in Open or In Progress status.";

            public const string TicketMustBeAssignedBeforeStatusChange = "You cannot change the ticket status because it is not assigned to any user.";

            public const string TicketOpenToInProgressOnly = "A ticket can only move from Open to In Progress.";

            public const string TicketInProgressToClosedOnly = "A ticket can only move from In Progress to Closed..";

            public const string ClosedTicketsCannotChangeStatus = "This ticket is already closed, so its status cannot be changed.";

            public const string InvalidStatusTransition = "The ticket cannot be moved to the selected status.";
            public const string CommentNotFound = "Comment not found.";
            public const string ParentCommentNotFound = "Parent comment not found.";
            public const string ParentTicketMismatch = "Parent comment must belong to the same ticket.";
            public const string YouAreAuthToComment = "You are not authorized to comment on this ticket.";
            public const string NotOwner = "Only the owner of the comment is allowed to edit.";
            public const string YouCanNotDelete = "You cannot delete your own account.";
            public const string CategoryAlreadyExist = "The entered category already exists in the system. Provide a unique category name.";
            public const string CanNotDeleteTicket = "Cannot delete this category. Tickets are still open or in progress.";
            public const string UserHaveAssignedTicket = "This agent has active tickets. Close or reassign the tickets before deleting the user.";
            public const string UserRoleNotEditIfTicket = "Role cannot be changed. This agent has active tickets (Open or In Progress). " +
                        "Please close or reassign these tickets before changing the role.";
            public const string PriorityAlreadyExist = "The entered priority already exists in the system. Provide a unique priority name.";
            public const string ItIsSystemGenerated = "This is System generated, you can't modify or delete";
            public const string CanNotDeleteTicketPriority = "Cannot delete this priority. Tickets are still open or in progress.";
            public const string StatusAlreadyExist = "The entered status already exists in the system. Provide a unique status name.";
            public const string CanNotDeleteTicketStatus = "Cannot delete this status. Tickets are still open or in progress.";

        }

        public static class Success
        {
            public const string Request = "Request successful.";

            public const string Login = "Login successfully.";

            public const string Register = "User registered successfully.";

            public static readonly Func<string, string> CreatedSuccess = (entityName) => $"{entityName} created successfully.";
            public static readonly Func<string, string> UpdateSuccess = (entityName) => $"{entityName} updated successfully.";
            public static readonly Func<string, string> DeleteSuccess = (entityName) => $"{entityName} deleted successfully.";
            public const string CommentAdded = "Comment added successfully.";
            public const string LogOutSuccess = "Logout Successfully.";
        }

        public static class Validation
        {
            public const string RequiredTemplate = "{0} is required.";
            public const string InvalidEmail = "Please enter a valid email address.";
            public const string MaxLengthTemplate = "{0} cannot exceed {1} characters.";
            public const string InvalidPassword = "Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a number, and a special character.";
            public const string GreaterThanZeroTemplate = "{0} must be greater than zero.";
            public const string MinLengthTemplate = "{0} must be at least {1} characters.";

        }
    }
}