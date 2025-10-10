using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using StockBook_App.Data;
using StockBook_App.Dtos.Stock;
using StockBook_App.Interfaces;
using StockBook_App.Mappers;
using StockBook_App.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace StockBook_App.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StockController : ControllerBase
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly IStockRepository _stockRepo;
        public StockController(ApplicationDbContext dbContext, IStockRepository stockRepo)
        {
            _dbContext = dbContext;
            _stockRepo = stockRepo;

        }

        [HttpGet]
        public async Task<IActionResult> GetAllStocks()
        {
            var stocks = await _stockRepo.GetALLStockAsync();

            return Ok(stocks.Select(s => s.ToStockDto()));
        }

        [HttpGet]
        [Route("{id:guid}")]
        public async Task<IActionResult> GetStockById([FromRoute] Guid id)
        {
            Stock? stock = await _stockRepo.GetStockByIdAsync(id);

            if (stock == null)
            {
                return NotFound("No such stock available");
            }


            return Ok(stock.ToStockDto());
        }

        [HttpPost]
        public async Task<IActionResult> AddStock([FromBody] AddStockDto addStockDto)
        {
            Stock stock = await _stockRepo.AddStockAsync(addStockDto.ToStockFromAddStockDto());

            return CreatedAtAction(nameof(GetStockById), new { id = stock.Id }, stock.ToStockDto());
        }

        [HttpPut]
        [Route("{id:guid}")]
        public async Task<IActionResult> UpdateAStock([FromRoute] Guid id, [FromBody] UpdateStockDto updteStockDto)
        {
            var existingStock = await _stockRepo.UpdateStockAsync(id, updteStockDto);

            if (existingStock == null)
            {
                return NotFound();
            }

            return Ok(existingStock.ToStockDto());
        }

        [HttpPatch]
        [Route("{id:guid}")]
        public async Task<IActionResult> PartiallyUpdateAStock([FromRoute] Guid id, [FromBody] PatiallyUpdateStockDto patiallyUpdateStockDto)
        {
            var existingStock = await _stockRepo.
                PartiallyUpdateStockAsync(id, patiallyUpdateStockDto);

            if (existingStock == null)
            {
                return NotFound("No such stock");
            }

            return Ok(existingStock.ToStockDto());
        }

        [HttpDelete]
        [Route("{id:guid}")]

        public async Task<IActionResult> DeleteAStock([FromRoute] Guid id)
        {
            Stock? stock = await _stockRepo.DeleteStockAsync(id);
            if (stock == null)
            {
                return NotFound("No such stock");
            }
            return NoContent();
        }

    }
}
