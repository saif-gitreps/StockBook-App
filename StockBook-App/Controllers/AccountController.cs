using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using StockBook_App.Dtos.Account;
using StockBook_App.Extensions;
using StockBook_App.Interfaces;
using StockBook_App.Models.Entities;

namespace StockBook_App.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly ITokenService _tokenService;
        private readonly SignInManager<User> _signInManager;
        private readonly ILogger<AccountController> _logger;

        public AccountController(
            UserManager<User> userManager,
            ITokenService tokenService,
            SignInManager<User> signInManager,
            ILogger<AccountController> logger
            )
        {
            _userManager = userManager;
            _tokenService = tokenService;
            _signInManager = signInManager;
            _logger = logger;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDto loginDto)
        {
            if (!ModelState.IsValid)
            { 
                return BadRequest(ModelState);
            }

            var user = await _userManager.FindByNameAsync(loginDto.UserName);
            if (user == null)
            {
                return Unauthorized("Invalid username or password.");
            }

            var result = await _signInManager.CheckPasswordSignInAsync(user, loginDto.Password, false);
            if (!result.Succeeded)
            {
                return Unauthorized("Invalid username or password.");
            }

            var token = _tokenService.CreateToken(user);

            Response.Cookies.Append("auth_token",
                token,
                new CookieOptions
                {
                    HttpOnly = true,
                    Secure = true,
                    SameSite= SameSiteMode.None,
                    Path = "/"
                }
            );

            return Ok(new NewUserDto
            {
                Id = user.Id,
                Email = user.Email,
                UserName = user.UserName,
            });
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDto registerDto)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var user = new User
                {
                    UserName = registerDto.UserName,
                    Email = registerDto.Email
                };

                var createdUser = await _userManager.CreateAsync(user, registerDto.Password);

                if (!createdUser.Succeeded)
                {
                    return BadRequest(createdUser.Errors);
                }

                var addRoleResult = await _userManager.AddToRoleAsync(user, "User");

                if (!addRoleResult.Succeeded)
                {
                    return StatusCode(500, addRoleResult.Errors);
                }

                var token = _tokenService.CreateToken(user);

                Response.Cookies.Append("auth_token",
                    token,
                    new CookieOptions {
                        HttpOnly = true,
                        Secure = false,
                        Expires = DateTimeOffset.UtcNow.AddHours(1),
                        Path="/"
                    }
                );

                return Ok(new NewUserDto
                { 
                    Id = user.Id,
                    Email = user.Email,
                    UserName = user.UserName,
                });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred during user registration.");
                return StatusCode(500, new { message = "An unexpected error occurred during registration." });
            }
        }

        [HttpGet("me")]
        [Authorize]
        public async Task<IActionResult> GetCurrentUser()
        {
            var userName = User.GetUsername();
            User? user = await _userManager.FindByNameAsync(userName);

            if (user == null)
            {
                return Unauthorized();
            }

            return Ok(user);
        }

        [HttpPost("logout")]
        [Authorize]
        public IActionResult Logout()
        {
            Response.Cookies.Delete("auth_token", new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.None,
                Path = "/"
            });
            return Ok(new { message = "Logged out successfully." });
        }

        [HttpPut]
        [Authorize]
        public IActionResult UpdateUser([FromBody] RegisterDto updateDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var currentUser = User.GetUsername();
            var existingUser = _userManager.FindByNameAsync(currentUser).Result;

            if (existingUser == null)
            {
                return Unauthorized();
            }

            existingUser.UserName = updateDto.UserName ?? existingUser.UserName;
            existingUser.Email = updateDto.Email ?? existingUser.Email;
            existingUser.PasswordHash = _userManager.PasswordHasher.HashPassword(existingUser, updateDto.Password);
            var result = _userManager.UpdateAsync(existingUser).Result;

            if (!result.Succeeded)
            {
                return BadRequest(result.Errors);
            }

            return Ok(new NewUserDto
            {
                Id = existingUser.Id,
                Email = existingUser.Email,
                UserName = existingUser.UserName,
            });
        }
    }
}