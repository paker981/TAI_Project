using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ProjektTAIAPI.Migrations
{
    /// <inheritdoc />
    public partial class registerupdate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "haslo",
                table: "Pracownicy",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "plec",
                table: "Pracownicy",
                type: "text",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "haslo",
                table: "Pracownicy");

            migrationBuilder.DropColumn(
                name: "plec",
                table: "Pracownicy");
        }
    }
}
