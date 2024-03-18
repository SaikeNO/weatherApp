using Microsoft.EntityFrameworkCore;
using weatherApp.Server.Models;

namespace weatherApp.Server;

public interface ISeeder
{
    Task Seed();
}

public class Seeder(CityContext cityContext) : ISeeder
{
    public async Task Seed()
    {
        if (cityContext.Database.GetPendingMigrations().Any())
        {
            await cityContext.Database.MigrateAsync();
        }

        if (await cityContext.Database.CanConnectAsync())
        {
            if (!cityContext.Cities.Any())
            {
                var cities = Cities;
                await cityContext.AddRangeAsync(cities);
                await cityContext.SaveChangesAsync();
            }
        }
    }

    private static IEnumerable<City> Cities
    {
        get
        {
            List<City> cities = [
                new(){ Name = "Warsaw" },
                new(){ Name = "Berlin" }
            ];

            return cities;
        }
    }
}
