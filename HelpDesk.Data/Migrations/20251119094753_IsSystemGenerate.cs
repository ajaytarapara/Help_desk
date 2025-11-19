using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HelpDesk.Data.Migrations
{
    /// <inheritdoc />
    public partial class IsSystemGenerate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsSystemGenerated",
                table: "Statuses",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "IsSystemGenerated",
                table: "Priorities",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.UpdateData(
                table: "Priorities",
                keyColumn: "PriorityId",
                keyValue: 1,
                column: "IsSystemGenerated",
                value: true);

            migrationBuilder.UpdateData(
                table: "Priorities",
                keyColumn: "PriorityId",
                keyValue: 2,
                column: "IsSystemGenerated",
                value: true);

            migrationBuilder.UpdateData(
                table: "Priorities",
                keyColumn: "PriorityId",
                keyValue: 3,
                column: "IsSystemGenerated",
                value: true);

            migrationBuilder.UpdateData(
                table: "Statuses",
                keyColumn: "StatusId",
                keyValue: 1,
                column: "IsSystemGenerated",
                value: true);

            migrationBuilder.UpdateData(
                table: "Statuses",
                keyColumn: "StatusId",
                keyValue: 2,
                column: "IsSystemGenerated",
                value: true);

            migrationBuilder.UpdateData(
                table: "Statuses",
                keyColumn: "StatusId",
                keyValue: 3,
                column: "IsSystemGenerated",
                value: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsSystemGenerated",
                table: "Statuses");

            migrationBuilder.DropColumn(
                name: "IsSystemGenerated",
                table: "Priorities");
        }
    }
}
