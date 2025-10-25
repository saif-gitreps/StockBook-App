using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using StockBook_App.Dtos.Comment;
using StockBook_App.Extensions;
using StockBook_App.Interfaces;
using StockBook_App.Models.Entities;
using StockBook_App.Services;

namespace StockBook_App.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PortfolioController : ControllerBase
    {
        private readonly IStockRepository _stockRepo;
        private readonly UserManager<User> _userManager;
        private readonly IPortfolioRepository _portfolioRepo;
        private readonly IFMPService _fmpService;
        public PortfolioController(
            UserManager<User> userManager, 
            IStockRepository stockRepo, 
            IPortfolioRepository portfolioRepo,
            IFMPService fmpService
        )
        {
            _stockRepo = stockRepo;
            _userManager = userManager;
            _portfolioRepo = portfolioRepo;
            _fmpService = fmpService;
        }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetUserPortfolio()
        {
            string? userName = User.GetUserName();
            if (userName == null)
            {
                return Unauthorized("Unauthorized");
            }

            User? user = await _userManager.FindByNameAsync(userName);

            if (user == null)
            {
                return Unauthorized("Unauthorized");
            }

            var userPortfolio = await _portfolioRepo.GetUserPortfolioAsync(user);

            return Ok(userPortfolio);
        }

        [HttpPost]
        [Authorize]

        public async Task<IActionResult> AddStockToPortfolio(string symbol)
        {
            // we get this User object from the JWT token
            var userName = User.GetUserName();
            User? user = await _userManager.FindByNameAsync(userName);
            
            if (user == null)
            {
                return Unauthorized("Unauthorized");
            }

            var existingPortfolio = await _portfolioRepo.GetUserPortfolioAsync(user);

            if (existingPortfolio.Any(p => p.Symbol.ToLower() == symbol.ToLower()))
            {
                return BadRequest("Stock already exists in portfolio");
            }

            Stock? stock = await _stockRepo.GetStockBySymbolAsync(symbol);

            if (stock == null)
            {
                stock = await _fmpService.FindStockBySymbolAsync(symbol);
                if (stock == null)
                {
                    return BadRequest("No such stock exists");
                }
                else
                {
                    await _stockRepo.AddStockAsync(stock);
                }
            }

            Portfolio portfolio = new Portfolio
            {
                StockId = stock.Id,
                UserId = user.Id
            };

            await _portfolioRepo.CreatePortfolioAsync(portfolio);

            if (portfolio == null)
            {
                return BadRequest("Failed to add stock to portfolio");
            } else
            {
                return Created();
            }
        }

        [HttpDelete]
        [Authorize]
        public async Task<IActionResult> DeletePortfolio(string symbol)
        {
            string? userName = User.GetUserName();
            if (userName == null)
            {
                return Unauthorized("Unauthorized");
            }

            User? user = await _userManager.FindByNameAsync(userName);
            if (user == null)
            {
                return Unauthorized("Unauthorized");
            }

            List<Stock> portfolios = await _portfolioRepo.GetUserPortfolioAsync(user);
            var portfolioToDelete = portfolios.Where(s => s.Symbol.ToLower() == symbol.ToLower()).ToList();

            if (portfolioToDelete.Count == 0)
            {
                return BadRequest("No such stock in portfolio to delete");
            }

            await _portfolioRepo.DeletePortfolioAsync(user, symbol);
            return Ok("Stock deleted successfully");
        }

    }
}
