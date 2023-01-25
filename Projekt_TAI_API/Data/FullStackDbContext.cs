using Microsoft.EntityFrameworkCore;
using Projekt_TAI_API.Models;

namespace Projekt_TAI_API.Data
{
    public class FullStackDbContext : DbContext
    {
        public FullStackDbContext(DbContextOptions options) : base(options)
        {
        }
        public DbSet<uzytkownik> Uzytkownicy { get; set; }

        public DbSet<pracownik> Pracownicy { get; set; }
    }
}
