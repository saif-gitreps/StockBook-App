using System.ComponentModel.DataAnnotations.Schema;

namespace StockBook_App.Models.Entities
{
    [Table("Comments")]
    public class Comment
    {
        public Guid Id { get; set; } 
        public string Title { get; set; } = string.Empty;
        public string Content { get; set; } = string.Empty;

        public DateTime Date { get; set; } = DateTime.Now;
        public Guid? StockId { get; set; }

        // Navigation property to the related Stock entity
        public Stock? Stock { get; set; } 
        public User? User { get; set; }
        public string? UserId { get; set; }
    }
}
