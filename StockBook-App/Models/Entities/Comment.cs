namespace StockBook_App.Models.Entities
{
    public class Comment
    {
        public Guid Id { get; set; }

        public string Title { get; set; } = string.Empty;
        public string Content { get; set; } = string.Empty;


        public Guid? StockId { get; set; }

        // Navigation property to the related Stock entity
        public Stock? Stock { get; set; }
    }
}
