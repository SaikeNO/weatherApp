using AutoMapper;
using weatherApp.Server.Exceptions;
using weatherApp.Server.Models;

namespace weatherApp.Server.Services;

public interface ICityService
{
    CityDto CreateCity(CreateCityDto dto);
    void DeleteCity(int id);
    List<CityDto> GetAllCities();
    CityDto GetCityById(int id);
    CityDto UpdateCity(int id, CreateCityDto dto);
}

public class CityService : ICityService
{
    private readonly CityContext _cityContext;
    private readonly IMapper _mapper;

    public CityService(CityContext cityContext, IMapper mapper)
    {
        _cityContext = cityContext;
        _mapper = mapper;
    }

    public List<CityDto> GetAllCities()
    {
        var cities = _cityContext.Cities.ToList();

        return _mapper.Map<List<CityDto>>(cities);
    }

    public CityDto GetCityById(int id)
    {
        return _mapper.Map<CityDto>(GetCity(id));
    }

    public void DeleteCity(int id)
    {
        var city = GetCity(id);

        _cityContext.Cities.Remove(city);
        _cityContext.SaveChangesAsync();
    }

    public CityDto CreateCity(CreateCityDto dto)
    {
        var city = _cityContext.Cities.FirstOrDefault(c => c.Name == dto.Name);

        if (city is not null)
            throw new AlreadyExistException("City already exist");

        var newCity = _mapper.Map<City>(dto);

        _cityContext.Add(newCity);
        _cityContext.SaveChanges();

        return _mapper.Map<CityDto>(newCity);
    }

    public CityDto UpdateCity(int id, CreateCityDto dto)
    {
        var city = GetCity(id);

        city.Name = dto.Name;

        _cityContext.SaveChanges();

        return _mapper.Map<CityDto>(city);
    }

    private City GetCity(int id)
    {
        var city = _cityContext.Cities.FirstOrDefault(c => c.Id == id);

        if (city is null)
            throw new NotFoundException("City does not exist");

        return city;
    }
}
