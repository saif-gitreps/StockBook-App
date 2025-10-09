using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using StockBook_App.Data;
using StockBook_App.Dtos.Stock;
using StockBook_App.Mappers;
using StockBook_App.Models.Entities;
using System.Data.Entity;

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
        public async Task<IActionResult> GetAllStocks()
        {
            List<Stock> stocks = await _dbContext.Stocks.AsNoTracking().ToListAsync();

            return Ok(stocks.Select(s => s.ToStockDto()));
        }

        [HttpGet]
        [Route("{id:guid}")]
        public async Task<IActionResult> GetStockById([FromRoute] Guid id)
        {
            Stock? stock = await _dbContext.Stocks.FindAsync(id);

            if (stock == null)
            {
                return NotFound("No such stock available");
            }
            
                
            return Ok(stock.ToStockDto())
        }

        [HttpPost]
        public async Task<IActionResult> AddStock([FromBody] AddStockDto addStockDto)
        {
            Stock stock = addStockDto.ToStockFromAddStockDto();

            await _dbContext.Stocks.AddAsync(stock);
            await _dbContext.SaveChangesAsync();

            return CreatedAtAction(nameof(GetStockById), new { id = stock.Id }, stock.ToStockDto());
        }

        [HttpPut]
        [Route("{id:guid}")]
        public async Task<IActionResult> UpdateAStock([FromRoute] Guid id, [FromBody] UpdateStockDto updteStockDto)
        {
            var existingStock = await _dbContext.Stocks.FindAsync(id);

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

            await _dbContext.SaveChangesAsync();

            return Ok(existingStock.ToStockDto());
        }

        [HttpPatch]
        [Route("{id:guid}")]
        public async Task<IActionResult> PartiallyUpdateAStock([FromRoute] Guid id, [FromBody] PatiallyUpdateStockDto patiallyUpdateStockDto)
        {
            var existingStock = await _dbContext.Stocks.FindAsync(id);

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
            await _dbContext.SaveChangesAsync();

            return Ok(existingStock.ToStockDto());
        }

        [HttpDelete]
        [Route("{id:guid}")]

        public async Task<IActionResult> DeleteAStock([FromRoute] Guid id)
        {
            Stock? existingStock = await _dbContext.Stocks.FindAsync(id);
            
            if (existingStock == null)
            {
                return NotFound("No such stock");
            }

            _dbContext.Stocks.Remove(existingStock);
            await _dbContext.SaveChangesAsync();
            return NoContent();
        }

    }
}
