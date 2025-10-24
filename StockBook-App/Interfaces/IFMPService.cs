using StockBook_App.Models.Entities;

namespace StockBook_App.Interfaces
{
    public interface IFMPService
    {
        Task<Stock> FindStockBySymbolAsync(string symbol);
    }
}
