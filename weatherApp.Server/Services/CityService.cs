using AutoMapper;
using Microsoft.EntityFrameworkCore;
using weatherApp.Server.Exceptions;
using weatherApp.Server.Models;

namespace weatherApp.Server.Services;

public interface ICityService
{
    Task<CityDto> CreateCity(CreateCityDto dto);
    Task DeleteCity(int id);
    Task<IEnumerable<CityDto>> GetAllCities();
    Task<CityDto> GetCityById(int id);
    Task<CityDto> UpdateCity(int id, CreateCityDto dto);
}

public class CityService(CityContext cityContext, IMapper mapper) : ICityService
{
    public async Task<IEnumerable<CityDto>> GetAllCities()
    {
        var cities = await cityContext.Cities.ToListAsync();

        return mapper.Map<List<CityDto>>(cities);
    }

    public async Task<CityDto> GetCityById(int id)
    {
        var city = await GetCity(id);
        return mapper.Map<CityDto>(city);
    }

    public async Task DeleteCity(int id)
    {
        var city = await GetCity(id);

        cityContext.Cities.Remove(city);
        await cityContext.SaveChangesAsync();
    }

    public async Task<CityDto> CreateCity(CreateCityDto dto)
    {
        var city = await cityContext.Cities.FirstOrDefaultAsync(c => c.Name == dto.Name);

        if (city is not null)
            throw new AlreadyExistException("City already exist");

        var newCity = mapper.Map<City>(dto);

        await cityContext.AddAsync(newCity);
        await cityContext.SaveChangesAsync();

        return mapper.Map<CityDto>(newCity);
    }

    public async Task<CityDto> UpdateCity(int id, CreateCityDto dto)
    {
        var city = await GetCity(id);

        city.Name = dto.Name;
        city.Alias = dto.Alias;

        await cityContext.SaveChangesAsync();

        return mapper.Map<CityDto>(city);
    }

    private async Task<City> GetCity(int id)
    {
        var city = await cityContext.Cities.FirstOrDefaultAsync(c => c.Id == id);

        if (city is null)
            throw new NotFoundException("City does not exist");

        return city;
    }
}
