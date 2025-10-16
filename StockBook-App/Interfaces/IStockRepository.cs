using StockBook_App.Dtos.Stock;
using StockBook_App.Models.Entities;

namespace StockBook_App.Interfaces
{
    public interface IStockRepository
    {
        Task<List<Stock>> GetALLStockAsync();
        Task<Stock?> GetStockByIdAsync(Guid id);
        Task<Stock> AddStockAsync(Stock stock);
        Task<Stock?> UpdateStockAsync(Guid id, UpdateStockDto updateStockDto);

        Task<Stock?> PartiallyUpdateStockAsync(Guid id, PatiallyUpdateStockDto patiallyUpdateStockDto);
        Task<Stock?> DeleteStockAsync(Guid id);

        Task<bool> StockExists(Guid id);

    }
}
