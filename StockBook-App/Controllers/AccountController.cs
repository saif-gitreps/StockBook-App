using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using StockBook_App.Dtos.Account;
using StockBook_App.Models.Entities;

namespace StockBook_App.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        public AccountController(UserManager<User> userManager)
        {
            _userManager = userManager;
        }

        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDto registerDto)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);   
                }

                User user = new User
                {
                    UserName = registerDto.UserName,
                    Email = registerDto.Email
                };

                IdentityResult? createdUser = await _userManager.CreateAsync(user, registerDto.Password);

                if (createdUser.Succeeded)
                {
                    IdentityResult? addRoleResult = await _userManager.AddToRoleAsync(user, "User");
                    if (addRoleResult.Succeeded)
                    {
                        return Ok("User registered successfully");
                    }
                    else
                    {
                        return StatusCode(500, addRoleResult.Errors);
                    }
                } else
                {
                    return StatusCode(500, createdUser.Errors);
                }
            } catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
    }
}
