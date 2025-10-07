using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using StockBook_App.Data;

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

    }
}
