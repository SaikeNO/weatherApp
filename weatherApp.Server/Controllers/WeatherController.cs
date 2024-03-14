using Microsoft.AspNetCore.Mvc;
using System.Text.Json;
using weatherApp.Server.Models;

namespace weatherApp.Server.Controllers;

[ApiController]
[Route("api/[controller]")]
public class WeatherController : ControllerBase
{
    private readonly HttpClient _httpClient;
    private readonly string apiUrl;

    public WeatherController(HttpClient httpClient, ApiSettings settings)
    {
        _httpClient = httpClient;
        apiUrl = $"{settings.BaseURL}?key={settings.API_KEY}";
    }

    [HttpGet("{city}")]
    public async Task<ActionResult<string>> GetWeather([FromRoute] string city)
    {
        var response = await _httpClient.GetAsync($"{apiUrl}&q={city}");
        if (response.IsSuccessStatusCode)
        {
            var data = await response.Content.ReadAsStringAsync();

            var weather = JsonSerializer.Deserialize<WeatherResponseDto>(data);

            return Ok(weather);
        }
        else
        {
            return StatusCode((int)response.StatusCode);
        }
    }
}
