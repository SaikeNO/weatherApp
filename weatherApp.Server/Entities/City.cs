﻿namespace weatherApp.Server.Models;

public class City
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string? Alias { get; set; }

}
