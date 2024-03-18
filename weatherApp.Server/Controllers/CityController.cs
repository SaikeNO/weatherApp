using Microsoft.AspNetCore.Mvc;
using weatherApp.Server.Models;
using weatherApp.Server.Services;

namespace weatherApp.Server.Controllers;

[Route("api/[controller]")]
[ApiController]
public class CityController(ICityService cityService) : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var cities = await cityService.GetAllCities();
        return Ok(cities);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetAll([FromRoute] int id)
    {
        var city = await cityService.GetCityById(id);
        return Ok(city);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete([FromRoute] int id)
    {
        await cityService.DeleteCity(id);
        return NoContent();
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateCityDto dto)
    {
        if(!ModelState.IsValid)
            return BadRequest(ModelState);

        var city = await cityService.CreateCity(dto);
        return Ok(city);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update([FromRoute] int id, [FromBody] CreateCityDto dto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var city = await cityService.UpdateCity(id, dto);
        return Ok(city);
    }
}
