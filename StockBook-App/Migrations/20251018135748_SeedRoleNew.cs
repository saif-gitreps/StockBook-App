using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace StockBook_App.Migrations
{
    /// <inheritdoc />
    public partial class SeedRoleNew : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "7e3f2a9f-23d7-4ed4-8017-9a18f51c718c", null, "User", "USER" },
                    { "b26f0f60-56ef-4a90-9b32-12872e5a6b99", null, "Admin", "ADMIN" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "7e3f2a9f-23d7-4ed4-8017-9a18f51c718c");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "b26f0f60-56ef-4a90-9b32-12872e5a6b99");
        }
    }
}
