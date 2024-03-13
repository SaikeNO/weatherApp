using System.Text.Json;
using weatherApp.Server.Models;

namespace weatherApp.Server.Services;

public class WeatherService
{
    private readonly HttpClient _httpClient;
    private readonly string apiUrl = "https://goweather.herokuapp.com/weather";

    public WeatherService(HttpClient httpClient)
    {
        _httpClient = httpClient;
    }

    //public async string GetWeatherForCity(string city)
    //{
    //    var response = await _httpClient.GetAsync($"{apiUrl}/{city}");
    //    if (!response.IsSuccessStatusCode)
    //    {
    //        var data = await response.Content.ReadAsStringAsync();

    //        var weatherDto = JsonSerializer.Deserialize<WeatherDto>(data);

    //        return weatherDto;
    //    }
    //}
}
