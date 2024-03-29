﻿using System.Text.Json;
using weatherApp.Server.Exceptions;
using weatherApp.Server.Models;

namespace weatherApp.Server.Services;

public interface IWeatherService
{
    Task<WeatherResponseDto> GetWeatherForCity(string city);
}

public class WeatherService(HttpClient httpClient, ApiSettings settings) : IWeatherService
{
    private readonly string _apiUrl = $"{settings.BaseURL}?key={settings.API_KEY}";

    public async Task<WeatherResponseDto> GetWeatherForCity(string city)
    {
        var response = await httpClient.GetAsync($"{_apiUrl}&q={city}");
        if (!response.IsSuccessStatusCode)
            throw new NotFoundException($"{city} does not exist");

        var data = await response.Content.ReadAsStringAsync();

        var weatherDto = JsonSerializer.Deserialize<WeatherResponseDto>(data);

        if (weatherDto is null)
            throw new Exception();

        return weatherDto;
    }
}
