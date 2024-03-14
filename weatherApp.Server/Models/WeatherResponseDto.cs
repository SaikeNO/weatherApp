namespace weatherApp.Server.Models;

public class WeatherResponseDto
{
    public Location location { get; set; } = new Location();
    public Current current { get; set; } = new Current();
}
