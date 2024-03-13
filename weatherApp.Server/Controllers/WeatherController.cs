using Microsoft.AspNetCore.Mvc;

namespace weatherApp.Server.Controllers;

[ApiController]
[Route("api/[controller]")]
public class WeatherController : ControllerBase
{
    private readonly HttpClient _httpClient;
    private readonly string API_KEY = "952948c63ccc4850bfb214707241303";
    private readonly string BASE_URL = "https://api.weatherapi.com/v1/current.json";
    private readonly string apiUrl;

    public WeatherController(HttpClient httpClient)
    {
        _httpClient = httpClient;
        apiUrl = $"{BASE_URL}?key={API_KEY}";
    }

    [HttpGet]
    public async Task<ActionResult<string>> GetWeather()
    {
        var response = await _httpClient.GetAsync($"{apiUrl}&q=warsaw");
        if (response.IsSuccessStatusCode)
        {
            var data = await response.Content.ReadAsStringAsync();

            return Ok(data);
        }
        else
        {
            return StatusCode((int)response.StatusCode);
        }
    }
}
