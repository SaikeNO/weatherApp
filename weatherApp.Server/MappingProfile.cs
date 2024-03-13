using AutoMapper;
using weatherApp.Server.Models;

namespace weatherApp.Server;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<City, CityDto>();

        CreateMap<CreateCityDto, CityDto>();
    }
}
