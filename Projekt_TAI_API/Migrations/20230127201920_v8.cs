using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ProjektTAIAPI.Migrations
{
    /// <inheritdoc />
    public partial class v8 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "potwierdz",
                table: "Uzytkownicy");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "potwierdz",
                table: "Uzytkownicy",
                type: "text",
                nullable: true);
        }
    }
}
