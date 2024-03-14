namespace weatherApp.Server.Models;

public class AirQuality
{
    public float co { get; set; }
    public float no2 { get; set; }
    public float o3 { get; set; }
    public float so2 { get; set; }
    public float pm2_5 { get; set; }
    public float pm10 { get; set; }
    public int us_pa_index { get; set; }
    public int gb_defra_index { get; set; }
}