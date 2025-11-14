using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HelpDesk.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddSeedHashingPassHash : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "UserId",
                keyValue: 1,
                column: "Password",
                value: "10000;7QDWbztCkz2Od2yGckTxfQ==;p2b8MyIfP6GewNCjXlt9RG0jkeF+ilFk1yWKpLIeI0c=");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "UserId",
                keyValue: 2,
                column: "Password",
                value: "10000;0Qbe4dvXQ7st/ETWyCePVg==;L9kfrgZe1ZroqBYWPAJDxiDmM3tQ3wmSTbK5smx66Sc=");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "UserId",
                keyValue: 1,
                column: "Password",
                value: "10000:6EZk2K7C9yoBA==:1nFQAoH8h95uvgHlk1C6OEJzABZ8FTAZ1TT1OnqUJn0=");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "UserId",
                keyValue: 2,
                column: "Password",
                value: "10000:6EZk2K7C9yoBA==:1nFQAoH8h95uvgHlk1C6OEJzABZ8FTAZ1TT1OnqUJn0=");
        }
    }
}
