namespace weatherApp.Server.Models;

public class Location
{
    public string name { get; set; } = string.Empty;
    public string region { get; set; } = string.Empty;
    public string country { get; set; } = string.Empty;
    public float lat { get; set; }
    public float lon { get; set; }
    public string tz_id { get; set; } = string.Empty;
    public int localtime_epoch { get; set; }
    public string localtime { get; set; }
}
