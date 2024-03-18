using Microsoft.AspNetCore.Mvc;
using weatherApp.Server.Services;

namespace weatherApp.Server.Controllers;

[ApiController]
[Route("api/[controller]")]
public class WeatherController(IWeatherService weatherService) : ControllerBase
{
    [HttpGet("{city}")]
    public async Task<IActionResult> GetWeather([FromRoute] string city)
    {
        var weather = await weatherService.GetWeatherForCity(city);

        return Ok(weather);
    }
}
