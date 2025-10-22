using StockBook_App.Models.Entities;

namespace StockBook_App.Interfaces
{
    public interface IPortfolioRepository
    {
        Task<List<Stock>> GetUserPortfolioAsync(User user);
        Task<Portfolio?> CreatePortfolioAsync(Portfolio portfolio);
        Task<Portfolio?> DeletePortfolioAsync(User user, string symbol);
    }
}
