using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace HelpDesk.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddSeedHashingPass : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "UserId", "CreatedDate", "Email", "FullName", "IsActive", "Password", "RoleId" },
                values: new object[,]
                {
                    { 1, new DateTime(2025, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "admin@helpdesk.com", "Admin User", true, "10000:6EZk2K7C9yoBA==:1nFQAoH8h95uvgHlk1C6OEJzABZ8FTAZ1TT1OnqUJn0=", 3 },
                    { 2, new DateTime(2025, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "agent@helpdesk.com", "Agent User", true, "10000:6EZk2K7C9yoBA==:1nFQAoH8h95uvgHlk1C6OEJzABZ8FTAZ1TT1OnqUJn0=", 2 }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "UserId",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "UserId",
                keyValue: 2);
        }
    }
}
