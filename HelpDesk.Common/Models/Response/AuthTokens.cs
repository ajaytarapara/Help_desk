namespace HelpDesk.Common.Models.Response
{
    public class AuthTokens
    {
        public string AccessToken { get; set; } = string.Empty;
        public string RefreshToken { get; set; } = string.Empty;
    }
}