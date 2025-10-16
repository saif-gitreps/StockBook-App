namespace StockBook_App.Dtos.Comment
{
    public class CreateCommentDto
    {
        public required Guid StockId { get; set; }
        public required string Title { get; set; }
        public required string Content { get; set; }

    }
}
