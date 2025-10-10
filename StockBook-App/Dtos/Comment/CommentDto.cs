namespace StockBook_App.Dtos.Comment
{
    public class CommentDto

    {
        public Guid Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Content { get; set; } = string.Empty;

        public DateTime Date { get; set; } = DateTime.Now;
        public Guid? StockId { get; set; }
    }
}
