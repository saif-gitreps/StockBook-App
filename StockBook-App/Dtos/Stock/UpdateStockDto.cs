using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace StockBook_App.Dtos.Stock
{
    public class UpdateStockDto
    {
        [Required]
        [MaxLength(10, ErrorMessage = "Symbol cannot be greater than 10 characters")]
        public required string Symbol { get; set; }
        [Required]
        [MaxLength(256, ErrorMessage = "Company Name cannot be greater than 256 characters")]
        public required string CompanyName { get; set; }

        [Required]
        [Range(1, int.MaxValue, ErrorMessage = "Shares must be at least 1")]
        public required decimal Purchase { get; set; }

        [Required]
        [Range(0.01, double.MaxValue, ErrorMessage = "Price must be at least 0.01")]
        public required decimal LastDiv { get; set; }

        [Required]
        [MaxLength(256, ErrorMessage = "Industry cannot be greater than 256 characters")]
        public required string Industry { get; set; }

        [Required]
        [Range(0, long.MaxValue, ErrorMessage = "Market Cap must be at least 0")]
        public required long MarketCap { get; set; }
    }
}
