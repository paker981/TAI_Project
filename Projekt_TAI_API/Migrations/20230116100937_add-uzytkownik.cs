using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ProjektTAIAPI.Migrations
{
    /// <inheritdoc />
    public partial class adduzytkownik : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Uzytkownicy",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    imie = table.Column<string>(type: "text", nullable: true),
                    email = table.Column<string>(type: "text", nullable: true),
                    numer = table.Column<long>(type: "bigint", nullable: false),
                    firma = table.Column<string>(type: "text", nullable: true),
                    haslo = table.Column<string>(type: "text", nullable: true),
                    plec = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Uzytkownicy", x => x.id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Uzytkownicy");
        }
    }
}
