using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace StockBook_App.Dtos.Stock

{
    public class PatiallyUpdateStockDto
    {
        [MinLength(1, ErrorMessage = "Symbol must be at least 1 character long.")]
        public string? Symbol { get; set; }

        [MinLength(1, ErrorMessage = "Company Name must be at least 1 character long.")]
        public string? CompanyName { get; set; }

        [Range(1, int.MaxValue, ErrorMessage = "Shares must be at least 1")]
        public decimal? Purchase { get; set; }

        [Range(0.01, double.MaxValue, ErrorMessage = "Last Dividend must be at least 0.01")]
        public decimal? LastDiv { get; set; }

        [MinLength(1, ErrorMessage = "Industry must be at least 1 character long.")]
        public string? Industry { get; set; }

        [Range(0, long.MaxValue, ErrorMessage = "Market Cap must be a non-negative value.")]
        public long? MarketCap { get; set; }

    }
}
