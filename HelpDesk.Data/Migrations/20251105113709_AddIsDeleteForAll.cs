using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HelpDesk.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddIsDeleteForAll : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsDelete",
                table: "UserRoles",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "IsDelete",
                table: "Statuses",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "IsDelete",
                table: "Priorities",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "IsDelete",
                table: "Comments",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "IsDelete",
                table: "Categories",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "CategoryId",
                keyValue: 1,
                column: "IsDelete",
                value: false);

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "CategoryId",
                keyValue: 2,
                column: "IsDelete",
                value: false);

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "CategoryId",
                keyValue: 3,
                column: "IsDelete",
                value: false);

            migrationBuilder.UpdateData(
                table: "Priorities",
                keyColumn: "PriorityId",
                keyValue: 1,
                column: "IsDelete",
                value: false);

            migrationBuilder.UpdateData(
                table: "Priorities",
                keyColumn: "PriorityId",
                keyValue: 2,
                column: "IsDelete",
                value: false);

            migrationBuilder.UpdateData(
                table: "Priorities",
                keyColumn: "PriorityId",
                keyValue: 3,
                column: "IsDelete",
                value: false);

            migrationBuilder.UpdateData(
                table: "Statuses",
                keyColumn: "StatusId",
                keyValue: 1,
                column: "IsDelete",
                value: false);

            migrationBuilder.UpdateData(
                table: "Statuses",
                keyColumn: "StatusId",
                keyValue: 2,
                column: "IsDelete",
                value: false);

            migrationBuilder.UpdateData(
                table: "Statuses",
                keyColumn: "StatusId",
                keyValue: 3,
                column: "IsDelete",
                value: false);

            migrationBuilder.UpdateData(
                table: "UserRoles",
                keyColumn: "RoleId",
                keyValue: 1,
                column: "IsDelete",
                value: false);

            migrationBuilder.UpdateData(
                table: "UserRoles",
                keyColumn: "RoleId",
                keyValue: 2,
                column: "IsDelete",
                value: false);

            migrationBuilder.UpdateData(
                table: "UserRoles",
                keyColumn: "RoleId",
                keyValue: 3,
                column: "IsDelete",
                value: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsDelete",
                table: "UserRoles");

            migrationBuilder.DropColumn(
                name: "IsDelete",
                table: "Statuses");

            migrationBuilder.DropColumn(
                name: "IsDelete",
                table: "Priorities");

            migrationBuilder.DropColumn(
                name: "IsDelete",
                table: "Comments");

            migrationBuilder.DropColumn(
                name: "IsDelete",
                table: "Categories");
        }
    }
}
