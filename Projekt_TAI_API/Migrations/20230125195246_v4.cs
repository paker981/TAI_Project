using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ProjektTAIAPI.Migrations
{
    /// <inheritdoc />
    public partial class v4 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "role",
                table: "Uzytkownicy",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "token",
                table: "Uzytkownicy",
                type: "text",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "role",
                table: "Uzytkownicy");

            migrationBuilder.DropColumn(
                name: "token",
                table: "Uzytkownicy");
        }
    }
}
