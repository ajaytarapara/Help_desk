namespace HelpDesk.Common.Constants
{
    public class Constants
    {
        public static class UserRoles
        {
            public const string User = "User";
            public const string Agent = "Agent";
        }

        public static class TicketStatus
        {
            public const string Open = "Open";
            public const string Closed = "Closed";
            public const string InProgress = "In Progress";
        }

        public static class RegexPattern
        {
            public const string Password =
                @"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,50}$";
        }

        public static class TicketPriority
        {
            public const string Low = "Low";
            public const string Medium = "Medium";
            public const string High = "High";
        }
    }
}