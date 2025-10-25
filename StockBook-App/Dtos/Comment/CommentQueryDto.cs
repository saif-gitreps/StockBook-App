namespace StockBook_App.Dtos.Comment
{
    public class CommentQueryDto
    {
        public string Symbol { get; set; } = string.Empty;
        public bool isDesc { get; set; } = true;
    }
}
