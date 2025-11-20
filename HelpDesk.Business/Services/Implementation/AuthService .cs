using AutoMapper;
using HelpDesk.Business.Helpers;
using HelpDesk.Business.Services.Interfaces;
using HelpDesk.Common.Constants;
using HelpDesk.Common.Models.Request;
using HelpDesk.Common.Models.Response;
using HelpDesk.Data.Entities;
using HelpDesk.Data.Helper;
using HelpDesk.Data.Repositories.Interfaces;
using Microsoft.Extensions.Configuration;
using static HelpDesk.Common.Exceptions.Exceptions;

namespace HelpDesk.Business.Services.Implementation
{
    public class AuthService : IAuthService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly IConfiguration _configuration;
        public AuthService(IUnitOfWork unitOfWork, IMapper mapper, IConfiguration configuration)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _configuration = configuration;
        }

        public async Task<AuthTokens> LoginAsync(LoginRequest loginRequest)
        {
            User? user = await _unitOfWork.Users.GetFirstOrDefault(x => x.Email == loginRequest.Email && x.IsActive, u => u.Role);
            if (user == null)
                throw new NotFoundException(Message.Error.UserNotFound);
            string HashCodes = PasswordHelper.HashPassword(loginRequest.Password);
            bool isPasswordValid = PasswordHelper.VerifyPassword(loginRequest.Password, user.Password);
            if (!isPasswordValid)
                throw new BadRequestException(Message.Error.InvalidCred);

            string token = JwtTokenGenerator.GenerateToken(user, _configuration);

            var refreshToken = GenerateRefreshToken.GenerateRefreshTokenHelper();

            await _unitOfWork.RefreshToken.AddAsync(new RefreshToken
            {
                UserId = user.UserId,
                Token = refreshToken,
                ExpiresAt = DateTime.UtcNow.AddDays(7)
            });

            await _unitOfWork.SaveAsync();

            return new AuthTokens
            {
                AccessToken = token,
                RefreshToken = refreshToken
            };
        }

        public async Task<User> RegisterAsync(RegisterRequest request)
        {
            User? existingUser = await _unitOfWork.Users.GetFirstOrDefault(X => X.Email == request.Email && X.IsActive);
            if (existingUser != null)
                throw new BadRequestException(Message.Error.EmailAlreadyExist);
            User user = _mapper.Map<User>(request);
            await _unitOfWork.Users.AddAsync(user);
            await _unitOfWork.SaveAsync();
            return user;
        }

        public async Task<AuthTokens> RefreshAsync(string refreshToken)
        {
            RefreshToken? tokenRecord = await _unitOfWork.RefreshToken
                .GetFirstOrDefault(x => x.Token == refreshToken && !x.IsRevoked);

            if (tokenRecord == null)
                throw new BadRequestException("Invalid refresh token");

            if (tokenRecord.ExpiresAt < DateTime.UtcNow)
                throw new BadRequestException("Refresh token expired");
            User? user = await _unitOfWork.Users.GetFirstOrDefault(x => x.UserId == tokenRecord.UserId && x.IsActive, u => u.Role);

            string newAccessToken = JwtTokenGenerator.GenerateToken(user, _configuration);

            return new AuthTokens
            {
                AccessToken = newAccessToken,
                RefreshToken = refreshToken
            };
        }

    }
}