using Microsoft.AspNetCore.Mvc;
using weatherApp.Server.Models;
using weatherApp.Server.Services;

namespace weatherApp.Server.Controllers;

[Route("api/[controller]")]
[ApiController]
public class CityController : ControllerBase
{
    private readonly ICityService _cityService;

    public CityController(ICityService cityService)
    {
        _cityService = cityService;
    }

    [HttpGet]
    public ActionResult<List<CityDto>> GetAll()
    {
        return Ok(_cityService.GetAllCities());
    }

    [HttpGet("{id}")]
    public ActionResult<CityDto> GetAll([FromRoute] int id)
    {
        return Ok(_cityService.GetCityById(id));
    }

    [HttpDelete("{id}")]
    public ActionResult Delete([FromRoute] int id)
    {
        _cityService.DeleteCity(id);
        return NoContent();
    }

    [HttpPost]
    public ActionResult<CityDto> Create([FromBody] CreateCityDto dto)
    {
        if(!ModelState.IsValid)
            return BadRequest(ModelState);

        var city = _cityService.CreateCity(dto);
        return Ok(city);
    }

    [HttpPut("{id}")]
    public ActionResult<CityDto> Update([FromRoute] int id, [FromBody] CreateCityDto dto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var city = _cityService.UpdateCity(id, dto);
        return Ok(city);
    }
}
