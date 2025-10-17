using StockBook_App.Data;
using StockBook_App.Interfaces;
using StockBook_App.Models.Entities;
using Microsoft.EntityFrameworkCore;
using StockBook_App.Dtos.Stock;

namespace StockBook_App.Repository
{
    public class StockRepository : IStockRepository
    {
        private readonly ApplicationDbContext _dbContext;
        public StockRepository(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<Stock> AddStockAsync(Stock stock)
        {
            await _dbContext.Stocks.AddAsync(stock);
            await _dbContext.SaveChangesAsync();
            return stock;
        }

        public async Task<Stock?> DeleteStockAsync(Guid id)
        {
            Stock? existingStock = await _dbContext.Stocks.FirstOrDefaultAsync(s => s.Id == id);
            if (existingStock == null)
            {
                return null;
            }
            _dbContext.Stocks.Remove(existingStock);
            await _dbContext.SaveChangesAsync();
            return existingStock;
        }

        public async Task<List<Stock>> GetALLStockAsync(StockQueryDto stockQueryDto)
        {
            IQueryable<Stock> stocks = _dbContext.Stocks.Include(s => s.Comments).AsQueryable();

            if (!string.IsNullOrWhiteSpace(stockQueryDto.Symbol))
            {
                stocks = stocks.Where(s => s.Symbol.Contains(stockQueryDto.Symbol));
            }

            if (!string.IsNullOrWhiteSpace(stockQueryDto.CompanyName))
            {
                stocks = stocks.Where(s => s.CompanyName.Contains(stockQueryDto.CompanyName));
            }

            return await stocks.ToListAsync();
        }

        public async Task<Stock?> GetStockByIdAsync(Guid id)
        {
           return await _dbContext.Stocks.Include(s => s.Comments).FirstOrDefaultAsync(s => s.Id == id);
        }

        public async Task<Stock?> UpdateStockAsync(Guid id, UpdateStockDto updateStockDto)
        {
            Stock? existingStock = await _dbContext.Stocks.FirstOrDefaultAsync(s => s.Id == id);
            if (existingStock == null)
            {
                return null;
            }
            existingStock.Symbol = updateStockDto.Symbol;
            existingStock.CompanyName = updateStockDto.CompanyName;
            existingStock.Purchase = updateStockDto.Purchase;
            existingStock.LastDiv = updateStockDto.LastDiv;
            existingStock.Industry = updateStockDto.Industry;
            await _dbContext.SaveChangesAsync();

            return existingStock;
        }

        public async Task<Stock?> PartiallyUpdateStockAsync(Guid id, PatiallyUpdateStockDto updateStockDto)
        {
            Stock? existingStock = await _dbContext.Stocks.FirstOrDefaultAsync(s => s.Id == id);
            if (existingStock == null)
            {
                return null;
            }

            if (!string.IsNullOrWhiteSpace(updateStockDto.Symbol))
            {
                existingStock.Symbol = updateStockDto.Symbol;
            }

            if (!string.IsNullOrWhiteSpace(updateStockDto.CompanyName))
            {
                existingStock.CompanyName = updateStockDto.CompanyName;
            }

            if (updateStockDto.Purchase is not null)
            {
                existingStock.Purchase = (decimal)updateStockDto.Purchase;
            }

            if (updateStockDto.LastDiv is not null)
            {
                existingStock.LastDiv = (decimal)updateStockDto.LastDiv;
            }

            if (!string.IsNullOrWhiteSpace(updateStockDto.Industry))
            {
                existingStock.Industry = updateStockDto.Industry;
            }
            await _dbContext.SaveChangesAsync();
            return existingStock;
        }

        public async Task<bool> StockExists(Guid id)
        {
            return await _dbContext.Stocks.AnyAsync(s => s.Id == id);
        }
    }
}
