using System.ComponentModel.DataAnnotations.Schema;

namespace StockBook_App.Dtos.Stock

{
    public class PatiallyUpdateStockDto
    {
        public string? Symbol { get; set; }
        public string? CompanyName { get; set; }
        [Column(TypeName = "decimal(18,4)")]
        public decimal? Purchase { get; set; }

        [Column(TypeName = "decimal(18,4)")]
        public decimal? LastDiv { get; set; }
        public string? Industry { get; set; }
        public long? MarketCap { get; set; }

    }
}
