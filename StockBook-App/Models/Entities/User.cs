using Microsoft.AspNetCore.Identity;

namespace StockBook_App.Models.Entities
{
    public class User: IdentityUser
    {
        public List<Portfolio> Portfolios { get; set; } = new List<Portfolio>();
    }
}
