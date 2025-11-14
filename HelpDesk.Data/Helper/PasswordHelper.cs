namespace HelpDesk.Data.Helper
{
    using System.Security.Cryptography;

    public static class PasswordHelper
    {
        private const int SaltSize = 16; // 128 bit
        private const int KeySize = 32;  // 256 bit
        private const int Iterations = 10000; // number of iterations for PBKDF2

        private const char Delimiter = ';';

        /// <summary>
        /// Hash a password using PBKDF2 with a random salt.
        /// </summary>
        public static string HashPassword(string password)
        {
            if (string.IsNullOrWhiteSpace(password))
                throw new ArgumentException("Password cannot be empty.", nameof(password));

            using var algorithm = new Rfc2898DeriveBytes(
                password,
                SaltSize,
                Iterations,
                HashAlgorithmName.SHA256
            );

            var key = Convert.ToBase64String(algorithm.GetBytes(KeySize));
            var salt = Convert.ToBase64String(algorithm.Salt);

            return $"{Iterations}{Delimiter}{salt}{Delimiter}{key}";
        }

        /// <summary>
        /// Verify a password against a stored hash.
        /// </summary>
        public static bool VerifyPassword(string password, string hashedPassword)
        {
            if (string.IsNullOrWhiteSpace(hashedPassword))
                return false;

            var parts = hashedPassword.Split(Delimiter);
            if (parts.Length != 3)
                return false;

            var iterations = Convert.ToInt32(parts[0]);
            var salt = Convert.FromBase64String(parts[1]);
            var key = Convert.FromBase64String(parts[2]);

            using var algorithm = new Rfc2898DeriveBytes(
                password,
                salt,
                iterations,
                HashAlgorithmName.SHA256
            );

            var keyToCheck = algorithm.GetBytes(KeySize);

            return keyToCheck.SequenceEqual(key);
        }
    }
}