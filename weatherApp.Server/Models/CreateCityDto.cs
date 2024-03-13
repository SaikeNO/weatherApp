using System.ComponentModel.DataAnnotations;

namespace weatherApp.Server.Models
{
    public class CreateCityDto
    {
        [Required]
        [MaxLength(50)]
        public string Name { get; set; } = string.Empty;
    }
}
