using Microsoft.AspNetCore.Mvc;
using System.Text.Json;
using weatherApp.Server.Models;
using weatherApp.Server.Services;

namespace weatherApp.Server.Controllers;

[ApiController]
[Route("api/[controller]")]
public class WeatherController(IWeatherService weatherService) : ControllerBase
{
    [HttpGet("{city}")]
    public async Task<ActionResult<WeatherResponseDto>> GetWeather([FromRoute] string city)
    {
        var weather = await weatherService.GetWeatherForCity(city);

        return Ok(weather);
    }
}
