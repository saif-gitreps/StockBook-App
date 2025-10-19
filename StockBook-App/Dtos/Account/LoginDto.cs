using System.ComponentModel.DataAnnotations;

namespace StockBook_App.Dtos.Account
{
    public class LoginDto
    {
        [Required]
        public required string UserName { get; set; }

        [Required]
        public required string Password { get; set; }
    }
}
