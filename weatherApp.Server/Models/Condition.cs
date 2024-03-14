namespace weatherApp.Server.Models;

public class Condition
{
    public string text { get; set; } = string.Empty;
    public string icon { get; set; } = string.Empty;
    public int code { get; set; }
}
