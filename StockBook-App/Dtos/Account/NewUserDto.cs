namespace StockBook_App.Dtos.Account
{
    public class NewUserDto
    {
        public required string Id {get; set;}
        public required string Email { get; set; }
        public required string UserName { get; set; }
    }
}
