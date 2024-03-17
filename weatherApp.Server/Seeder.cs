using Microsoft.EntityFrameworkCore;
using weatherApp.Server.Models;

namespace weatherApp.Server;

public interface ISeeder
{
    Task Seed();
}

public class Seeder : ISeeder
{
    private readonly CityContext _cityContext;

    public Seeder(CityContext cityContext)
    {
        _cityContext = cityContext;
    }
    public async Task Seed()
    {
        if (_cityContext.Database.GetPendingMigrations().Any())
        {
            await _cityContext.Database.MigrateAsync();
        }

        if (await _cityContext.Database.CanConnectAsync())
        {
            if (!_cityContext.Cities.Any())
            {
                var cities = GetCities();
                await _cityContext.AddRangeAsync(cities);
                await _cityContext.SaveChangesAsync();
            }
        }
    }

    private static IEnumerable<City> GetCities()
    {
        List<City> cities = [
            new(){
                Name = "Warsaw"
            },
            new(){
                Name = "Berlin"
            }
        ];

        return cities;
    }
}
