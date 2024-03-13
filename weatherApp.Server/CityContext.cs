using Microsoft.EntityFrameworkCore;
using weatherApp.Server.Models;

namespace weatherApp.Server;

public class CityContext : DbContext
{
    public CityContext(DbContextOptions<CityContext> options) : base(options) { }

    public DbSet<City> Cities { get; set; } = null!;

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<City>()
            .Property(c => c.Name)
            .IsRequired()
            .HasMaxLength(50);
    }
}