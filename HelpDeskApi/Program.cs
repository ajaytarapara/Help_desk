// Create a new WebApplication builder instance
using HelpDesk.Business.Mapping;
using HelpDesk.Data;
using HelpDeskApi.Extensions;
using HelpDeskApi.Middleware;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// ----------------------------------------------
// Configure Services (Dependency Injection)
// ----------------------------------------------

// Register PostgreSQL DbContext
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

// Add support for controllers (enables MVC-style APIs)
builder.Services.AddControllers();

// --- Swagger ---
builder.Services.AddSwaggerWithJwt();

// --- JWT Authentication ---
builder.Services.AddJwtAuthentication(builder.Configuration);

builder.Services.AddHttpContextAccessor();
builder.Services.AddBusinessServices();

builder.Services.AddAutoMapper(typeof(AutoMapperProfile));

// --- CORS Policy (Allow All) ---
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", builder =>
    {
        builder.WithOrigins("http://localhost:3000")
               .AllowCredentials()
               .AllowAnyHeader()
               .AllowAnyMethod();
    });
});

// ----------------------------------------------
// Build the application
// ----------------------------------------------
var app = builder.Build();

// ----------------------------------------------
// Configure the HTTP request pipeline (Middleware setup)
// ----------------------------------------------
if (app.Environment.IsDevelopment())
{
    // Enable Swagger and Swagger UI only in development environment
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Redirect all HTTP requests to HTTPS
app.UseHttpsRedirection();

// ✅ Use CORS before authentication and endpoints
app.UseCors("AllowFrontend");

// Add global exception handler
app.UseMiddleware<ExceptionMiddleware>();
app.UseAuthentication();
app.UseAuthorization();

// Map controller routes (enables API endpoints from controllers)
app.MapControllers();

// Run the application
app.Run();
