using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using StockBook_App.Data;
using StockBook_App.Dtos.Stock;
using StockBook_App.Mappers;
using StockBook_App.Models.Entities;

namespace StockBook_App.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StockController : ControllerBase
    {
        private readonly ApplicationDbContext _dbContext;
        public StockController(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;

        }

        [HttpGet]
        public IActionResult GetAllStocks()
        {
            List<StockDto> stocks = _dbContext.Stocks.Select(s => s.ToStockDto()).ToList();

            return Ok(stocks);
        }

        [HttpGet]
        [Route("{id:guid}")]
        public IActionResult GetStockById([FromRoute] Guid id)
        {
            Stock? stock = _dbContext.Stocks.Find(id);

            if (stock == null)
            {
                return NotFound("No such stock available");
            }
            
                
            return Ok(stock.ToStockDto());
            
        }

        [HttpPost]
        public IActionResult AddStock([FromBody] AddStockDto stockDto)
        {
            Stock stock = stockDto.ToStockFromAddStockDto();

            _dbContext.Stocks.Add(stock);
            _dbContext.SaveChanges();

            return CreatedAtAction(nameof(GetStockById), new { id = stock.Id }, stock.ToStockDto());
        }

        [HttpPut]
        [Route("{id:guid}")]
        public IActionResult UpdateAStock([FromRoute] Guid id, [FromBody] UpdateStockDto updteStockDto)
        {
            var existingStock = _dbContext.Stocks.Find(id);

            if (existingStock == null)
            {
                return NotFound("No such stock");
            } 

            existingStock.Symbol = updteStockDto.Symbol;
            existingStock.CompanyName = updteStockDto.CompanyName;
            existingStock.Purchase = updteStockDto.Purchase;
            existingStock.LastDiv = updteStockDto.LastDiv;
            existingStock.Industry = updteStockDto.Industry;
            existingStock.MarketCap = updteStockDto.MarketCap;

            _dbContext.SaveChanges();

            return Ok(existingStock.ToStockDto());
        }

        [HttpPatch]
        [Route("{id:guid}")]
        public IActionResult PartiallyUpdateAStock([FromRoute] Guid id, [FromBody] PatiallyUpdateStockDto patiallyUpdateStockDto)
        {
            var existingStock = _dbContext.Stocks.Find(id);

            if (existingStock == null)
            {
                return NotFound("No such stock");
            }

            if (patiallyUpdateStockDto.Symbol != null)
            {
                existingStock.Symbol = patiallyUpdateStockDto.Symbol;
            }
            if (patiallyUpdateStockDto.CompanyName != null)
            {
                existingStock.CompanyName = patiallyUpdateStockDto.CompanyName;
            }
            if (patiallyUpdateStockDto.Purchase != null)
            {
                existingStock.Purchase = (decimal)patiallyUpdateStockDto.Purchase;
            }
            if (patiallyUpdateStockDto.LastDiv != null)
            {
                existingStock.LastDiv = (decimal)patiallyUpdateStockDto.LastDiv;
            }
            if (patiallyUpdateStockDto.Industry != null)
            {
                existingStock.Industry = patiallyUpdateStockDto.Industry;
            }
            if (patiallyUpdateStockDto.MarketCap != null)
            {
                existingStock.MarketCap = (long)patiallyUpdateStockDto.MarketCap;
            }
            _dbContext.SaveChanges();

            return Ok(existingStock.ToStockDto());
        }

        [HttpDelete]
        [Route("{id:guid}")]

        public IActionResult DeleteAStock([FromRoute] Guid id)
        {
            var existingStock = _dbContext.Stocks.Find(id);
            
            if (existingStock == null)
            {
                return NotFound("No such stock");
            }

            _dbContext.Stocks.Remove(existingStock);
            _dbContext.SaveChanges();
            return NoContent();
        }

    }
}
