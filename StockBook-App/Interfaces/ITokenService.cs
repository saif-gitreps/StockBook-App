using StockBook_App.Models.Entities;

namespace StockBook_App.Interfaces
{
    public interface ITokenService
    {
        string CreateToken(User user);
    }
}
