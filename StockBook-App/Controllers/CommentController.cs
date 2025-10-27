using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using StockBook_App.Dtos.Comment;
using StockBook_App.Extensions;
using StockBook_App.Interfaces;
using StockBook_App.Mappers;
using StockBook_App.Models.Entities;

namespace StockBook_App.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommentController : ControllerBase
    {
        private readonly ICommentRepository _commentRepo;
        private readonly IStockRepository _stockRepo;
        private readonly UserManager<User> _userManager;
        private readonly IFMPService _fmpService;
        public CommentController(
            ICommentRepository commentRepo, 
            IStockRepository stockRepo, 
            UserManager<User> userManager,
            IFMPService fmpService)
        {
            _commentRepo = commentRepo;
            _stockRepo = stockRepo;
            _userManager = userManager;
            _fmpService = fmpService;
        }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetAllCommentsAsync([FromQuery] CommentQueryDto commentQueryDto)
        {
            List<Comment> comments = await _commentRepo.GetAllCommentsAsync(commentQueryDto);

            return Ok(comments.Select(c => c.ToCommentDto()));
        }

        [HttpGet]
        [Route("{id:guid}")]
        public async Task<IActionResult> GetCommentByIdAsync([FromRoute] Guid id)
        {
            if (ModelState.IsValid == false)
            {
                return BadRequest(ModelState);
            }

            Comment? comment = await _commentRepo.GetCommentByIdAsync(id);
            if (comment == null)
            {
                return NotFound("No such comment available");
            }

            return Ok(comment.ToCommentDto());
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> CreateCommentAsync([FromBody] CreateCommentDto createCommentDto)
        {
            if (ModelState.IsValid == false)
            {
                return BadRequest(ModelState);
            }

            Stock? stock = await _stockRepo.GetStockBySymbolAsync(createCommentDto.Symbol);

            if (stock == null)
            {
                stock = await _fmpService.FindStockBySymbolAsync(createCommentDto.Symbol);
                if (stock == null)
                {
                    return BadRequest("No such stock exists");
                }
                else
                {
                    await _stockRepo.AddStockAsync(stock);
                }
            }

            //if (await _stockRepo.StockExists(createCommentDto.StockId) == false)
            //{
            //    return BadRequest("No such stock available to add comment");
            //}

            string? userName = User.GetUsername();
            //if (userName == null)
            //{
            //    return Unauthorized();
            //}

            User? user = await _userManager.FindByNameAsync(userName);
            //if (user == null)
            //{
            //    return Unauthorized();
            //}

            Comment comment = createCommentDto.ToCommentFromCreateDto(stock.Id);
            comment.UserId = user.Id;
            await _commentRepo.CreateCommentAsync(comment);

            return Ok(comment.ToCommentDto());
        }

        [HttpPut]
        [Route("{id:guid}")]
        [Authorize]
        public async Task<IActionResult> UpdateCommentAsync([FromRoute] Guid id, [FromBody] UpdateCommentRequestDto updateCommentDto)
        {
            if (ModelState.IsValid == false)
            {
                return BadRequest(ModelState);
            }

            Comment? updatedComment = await _commentRepo.UpdateCommentAsync(id, updateCommentDto.ToCommentFromUpdateCommentRequestDto());
            if (updatedComment == null)
            {
                return NotFound("No such comment available to update");
            }

            return Ok(updatedComment.ToCommentDto());
        }

        [HttpDelete]
        [Route("{id:guid}")]
        [Authorize]
        public async Task<IActionResult> DeleteCommentAsync([FromRoute] Guid id)
        {
            if (ModelState.IsValid == false)
            {
                return BadRequest(ModelState);
            }

            bool isDeleted = await _commentRepo.DeleteCommentAsync(id);

            if (isDeleted == false)
            {
                return NotFound("No such comment available to delete");
            }

            return Ok(isDeleted);
        }
    }
}
