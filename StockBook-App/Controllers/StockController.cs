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

        [HttpGet("")]
        public IActionResult GetAllStocks()
        {
            List<StockDto> stocks = _dbContext.Stocks.Select(s => s.ToStockDto()).ToList();

            return Ok(stocks);
        }

        [HttpGet("{id:guid}")]
        public IActionResult GetStockById([FromRoute] Guid id)
        {
            Stock? stock = _dbContext.Stocks.Find(id);

            if (stock == null)
            {
                return NotFound("No such stock available");
            }
            else
            {
                return Ok(stock.ToStockDto());
            }
        }

        [HttpPost("")]
        public IActionResult AddStock([FromBody] AddStockDto stockDto)
        {
            Stock stock = stockDto.ToStockFromAddStockDto();

            _dbContext.Stocks.Add(stock);
            _dbContext.SaveChanges();

            return CreatedAtAction(nameof(GetStockById), new { id = stock.Id }, stock.ToStockDto());
        }


    }
}
