using System.ComponentModel.DataAnnotations.Schema;

namespace StockBook_App.Models.Entities
{
    public class Stock
    {
        public Guid Id { get; set; }
        public required string Symbol { get; set; }

        public required string CompanyName { get; set; }

        [Column(TypeName = "decimal(18,4)")]
        public required decimal Purchase { get; set; }

        [Column(TypeName = "decimal(18,4)")]
        public required decimal LastDiv { get; set; }
        public required string Industry { get; set; }
        public required long MarketCap { get; set; }
        public List<Comment> Comments { get; set; } = new List<Comment>();

    }
}
