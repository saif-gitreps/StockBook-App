namespace StockBook_App.Dtos.Stock
{
    public class StockQueryDto
    {
        public string? Symbol { get; set; } = null;
        public string? CompanyName { get; set; } = null;
        public string? SortBy { get; set; } = null;
        public string? SortOrder { get; set; } = null;
     }
}
