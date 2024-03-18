using Microsoft.EntityFrameworkCore;
using weatherApp.Server.Models;

namespace weatherApp.Server;

public class CityContext(DbContextOptions<CityContext> options) : DbContext(options)
{
    public DbSet<City> Cities { get; set; } = null!;

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<City>()
            .Property(c => c.Name)
            .IsRequired()
            .HasMaxLength(50);

        modelBuilder.Entity<City>()
            .Property(c => c.Alias)
            .HasMaxLength(50);
    }
}