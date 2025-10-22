using Microsoft.EntityFrameworkCore;
using StockBook_App.Data;
using StockBook_App.Interfaces;
using StockBook_App.Models.Entities;

namespace StockBook_App.Repository
{
    public class PortfolioRepository : IPortfolioRepository
    {
        private readonly ApplicationDbContext _dbContext;
        public PortfolioRepository(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<Portfolio?> CreatePortfolioAsync(Portfolio portfolio)
        {
            await _dbContext.Portfolios.AddAsync(portfolio);
            await _dbContext.SaveChangesAsync();
            return portfolio;
        }

        public async Task<Portfolio?> DeletePortfolioAsync(User user, string symbol)
        {
            Portfolio? existingPortfolio = await _dbContext.Portfolios.FirstOrDefaultAsync(
                p => p.UserId == user.Id && p.Stock.Symbol.ToLower() == symbol.ToLower());

            if (existingPortfolio == null)
            {
                               return null;
            }

            _dbContext.Portfolios.Remove(existingPortfolio);
            await _dbContext.SaveChangesAsync();

            return existingPortfolio;
        }

        public async Task<List<Stock>> GetUserPortfolioAsync(User user)
        {
            return await _dbContext.Portfolios.Where(u => u.UserId == user.Id).Select(stock => new Stock
            {
                Id = stock.StockId,
                Symbol = stock.Stock.Symbol,
                CompanyName = stock.Stock.CompanyName,
                Purchase = stock.Stock.Purchase,
                Industry = stock.Stock.Industry,
                LastDiv = stock.Stock.LastDiv,
                MarketCap = stock.Stock.MarketCap
            }).ToListAsync();
        }
    }
}
