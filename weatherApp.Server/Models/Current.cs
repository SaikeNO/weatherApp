namespace weatherApp.Server.Models;

public class Current
{
    public float temp_c { get; set; }
    public int is_day { get; set; }
    public Condition condition { get; set; } = new Condition();
    public float wind_mph { get; set; }
    public float wind_kph { get; set; }
    public string wind_dir { get; set; } = string.Empty;
    public float cloud { get; set; }
    public float feelslike_c { get; set; }
}
