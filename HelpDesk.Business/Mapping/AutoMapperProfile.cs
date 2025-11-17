using AutoMapper;
using HelpDesk.Common.Models.Request;
using HelpDesk.Common.Models.Response;
using HelpDesk.Data.Entities;
using HelpDesk.Data.Helper;

namespace HelpDesk.Business.Mapping
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<RegisterRequest, User>()
                .ForMember(dest => dest.CreatedDate, opt => opt.MapFrom(src => DateTime.UtcNow))
                .ForMember(dest => dest.RoleId, opt => opt.MapFrom(src => 1))
                .ForMember(dest => dest.IsActive, opt => opt.MapFrom(src => true))
                .ForMember(dest => dest.Password, opt => opt.MapFrom(src => PasswordHelper.HashPassword(src.Password)));

            CreateMap<CreateTicketRequest, Ticket>()
            .ForMember(dest => dest.StatusId, opt => opt.MapFrom(src => 1))
            .ForMember(dest => dest.CreatedDate, opt => opt.MapFrom(src => DateTime.UtcNow));

            CreateMap<TicketResponse, Ticket>().ReverseMap();
            CreateMap<Priority, PriorityResponse>().ReverseMap();
            CreateMap<Status, StatusResponse>().ReverseMap();
            CreateMap<Category, CategoryResponse>()
            .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.CategoryId))
            .ReverseMap();
            CreateMap<User, UserResponse>().ReverseMap();

            CreateMap<AssignTicketRequest, Ticket>().ForMember(dest => dest.StatusId, opt => opt.MapFrom(src => 2))
            .ForMember(dest => dest.UpdatedDate, opt => opt.MapFrom(src => DateTime.UtcNow));

            CreateMap<Category, SelectListItemResponse>()
             .ForMember(dest => dest.Label, opt => opt.MapFrom(src => src.CategoryName))
             .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.CategoryId));

            CreateMap<Priority, SelectListItemResponse>()
            .ForMember(dest => dest.Label, opt => opt.MapFrom(src => src.PriorityName))
            .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.PriorityId));

            CreateMap<Status, SelectListItemResponse>()
             .ForMember(dest => dest.Label, opt => opt.MapFrom(src => src.StatusName))
             .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.StatusId));

            CreateMap<User, SelectListItemResponse>()
                        .ForMember(dest => dest.Label, opt => opt.MapFrom(src => src.FullName))
                        .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.UserId));

            CreateMap<CommentCreateRequest, Comment>()
            .ForMember(dest => dest.CommentId, opt => opt.Ignore())
            .ForMember(dest => dest.CreatedDate, opt => opt.MapFrom(_ => DateTime.UtcNow))
            .ForMember(dest => dest.IsDelete, opt => opt.MapFrom(_ => false))
            .ForMember(dest => dest.Message, opt => opt.MapFrom(src => src.CommentMessage))
             .ForMember(dest => dest.EditedDate, opt => opt.MapFrom(_ => (DateTime?)null));


            CreateMap<Comment, CommentResponse>()
            .ForMember(dest => dest.CreatedBy, opt => opt.MapFrom(src => src.User.FullName))
            .ForMember(dest => dest.Replies, opt => opt.Ignore())
            .ForMember(dest => dest.EditedDate, opt => opt.MapFrom(src => src.EditedDate))
            .ForMember(dest => dest.CreatedByUserId, opt => opt.MapFrom(src => src.UserId));

            CreateMap<User, UserListResponse>()
            .ForMember(dest => dest.Role, opt => opt.MapFrom(src => src.Role.RoleName))
            .ForMember(dest => dest.RoleId, opt => opt.MapFrom(src => src.RoleId));

            CreateMap<CreateUserRequest, User>()
            .ForMember(dest => dest.Password, opt => opt.MapFrom(src => "HelpDesk@123"));
            CreateMap<CreateCategoryRequest, Category>();

        }
    }
}