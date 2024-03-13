using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using weatherApp.Server;
using weatherApp.Server.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();

builder.Services.AddDbContext<CityContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("Database")));

builder.Services.AddAutoMapper(typeof(Program).Assembly);

builder.Services.AddScoped<HttpClient>();
builder.Services.AddScoped<ISeeder, Seeder>();
builder.Services.AddScoped<ICityService, CityService>();

builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "Weather app API", Version = "v1" });
});

var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Configure the HTTP request pipeline.

app.UseHttpsRedirection();

var scope = app.Services.CreateScope();
var seeder = scope.ServiceProvider.GetRequiredService<ISeeder>();

await seeder.Seed();

app.MapControllers();

app.MapFallbackToFile("/index.html");

app.Run();