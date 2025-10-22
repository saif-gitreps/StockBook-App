using System.ComponentModel.DataAnnotations.Schema;

namespace StockBook_App.Models.Entities
{
    [Table("Portfolios")]
    public class Portfolio
    {
        public string UserId { get; set; }
        public Guid StockId { get; set; }
        public User User { get; set; }
        public Stock Stock { get; set; }
    }
}
