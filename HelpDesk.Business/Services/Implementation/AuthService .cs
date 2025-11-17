using AutoMapper;
using HelpDesk.Business.Helpers;
using HelpDesk.Business.Services.Interfaces;
using HelpDesk.Common.Constants;
using HelpDesk.Common.Models.Request;
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

        public async Task<string> LoginAsync(LoginRequest loginRequest)
        {
            User? user = await _unitOfWork.Users.GetFirstOrDefault(x => x.Email == loginRequest.Email && x.IsActive, u => u.Role );
            if (user == null)
                throw new NotFoundException(Message.Error.UserNotFound);
            string HashCodes = PasswordHelper.HashPassword(loginRequest.Password);
            bool isPasswordValid = PasswordHelper.VerifyPassword(loginRequest.Password, user.Password);
            if (!isPasswordValid)
                throw new BadRequestException(Message.Error.InvalidCred);

            string token = JwtTokenGenerator.GenerateToken(user, _configuration);
            return token;
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

    }
}