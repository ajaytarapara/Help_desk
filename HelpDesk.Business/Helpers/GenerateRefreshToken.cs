using System.Security.Cryptography;

namespace HelpDesk.Business.Helpers
{
    public class GenerateRefreshToken
    {

        public static string GenerateRefreshTokenHelper()
        {
            var random = new byte[64];
            using var rng = RandomNumberGenerator.Create();
            rng.GetBytes(random);
            return Convert.ToBase64String(random);
        }

    }
}