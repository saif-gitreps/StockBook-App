using Newtonsoft.Json;
using StockBook_App.Dtos.Stock;
using StockBook_App.Interfaces;
using StockBook_App.Mappers;
using StockBook_App.Models.Entities;

namespace StockBook_App.Services
{
    public class FMPService : IFMPService
    {
        private readonly HttpClient _httpClient;
        private readonly IConfiguration _config;
        public FMPService(HttpClient httpClient, IConfiguration config)
        {
            _httpClient = httpClient;
            _config = config;
        }
        public async Task<Stock?> FindStockBySymbolAsync(string symbol)
        {
            try
            {
                // var result = await _httpClient.GetAsync($"https://financialmodelingprep.com/stable/search-symbol?query={symbol}&apikey={_config["FMPKey"]}");
                var result = await _httpClient.GetAsync($"https://financialmodelingprep.com/stable/search-exchange-variants?symbol={symbol}&apikey={_config["FMPKey"]}");
                if (result.IsSuccessStatusCode)
                {
                    var content = await result.Content.ReadAsStringAsync();
                    var tasks = JsonConvert.DeserializeObject<FMPStock[]>(content);
                    var stock = tasks[0];

                    if (stock != null)
                    {
                        return stock.ToStockFromFMPDtp();
                    }

                    return null;
                }
            } catch (Exception e)
            {
                Console.WriteLine(e);
                return null;

            }

            return null;
            
        }
    }
}
