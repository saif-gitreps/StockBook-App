namespace StockBook_App.Dtos.Comment
{
    public class UpdateCommentRequestDto
    {
        public required string Title { get; set; }
        public required string Content { get; set; }
    }
}
