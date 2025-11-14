using System.Net;
using System.Text.Json;
using HelpDesk.Common.Constants;
using HelpDesk.Common.Models.Common;
using static HelpDesk.Common.Exceptions.Exceptions;

namespace HelpDeskApi.Middleware
{
    public class ExceptionMiddleware
    {
        private readonly RequestDelegate _next;

        public ExceptionMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                await _next(context);

                if (context.Response.StatusCode == (int)HttpStatusCode.Unauthorized)
                {
                    await HandleCustomErrorAsync(context, HttpStatusCode.Unauthorized, Message.Error.Unauthorized);
                    return;
                }

                if (context.Response.StatusCode == (int)HttpStatusCode.Forbidden)
                {
                    await HandleCustomErrorAsync(context, HttpStatusCode.Forbidden, Message.Error.AccessDenied);
                    return;
                }
            }
            catch (Exception ex)
            {
                await HandleExceptionAsync(context, ex);
            }
        }

        private static Task HandleExceptionAsync(HttpContext context, Exception exception)
        {
            ApiResponse<object> response;
            int statusCode;

            switch (exception)
            {
                case NotFoundException notFoundEx:
                    statusCode = (int)HttpStatusCode.NotFound;
                    response = ApiResponse<object>.ErrorResponse(notFoundEx.Message, statusCode);
                    break;

                case BadRequestException badReqEx:
                    statusCode = (int)HttpStatusCode.BadRequest;
                    response = ApiResponse<object>.ErrorResponse(badReqEx.Message, statusCode);
                    break;

                default:
                    statusCode = (int)HttpStatusCode.InternalServerError;
                    response = ApiResponse<object>.ErrorResponse(Message.Error.Unexpected, statusCode);
                    break;
            }

            context.Response.ContentType = "application/json";
            context.Response.StatusCode = statusCode;

            return context.Response.WriteAsync(JsonSerializer.Serialize(response));
        }

        private static Task HandleCustomErrorAsync(HttpContext context, HttpStatusCode statusCode, string message)
        {
            var response = ApiResponse<object>.ErrorResponse(message, (int)statusCode);
            context.Response.ContentType = "application/json";
            context.Response.StatusCode = (int)statusCode;
            return context.Response.WriteAsync(JsonSerializer.Serialize(response));
        }
    }
}
