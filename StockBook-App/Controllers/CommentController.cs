using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using StockBook_App.Dtos.Comment;
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
        public CommentController(ICommentRepository commentRepo, IStockRepository stockRepo)
        {
            _commentRepo = commentRepo;
            _stockRepo = stockRepo;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllCommentsAsync()
        {
            List<Comment> comments = await _commentRepo.GetAllCommentsAsync();
            //List<CommentDto> commentDtos = [.. comments.Select(c => c.ToCommentDto())];

            return Ok(comments);
        }

        [HttpGet]
        [Route("{id:guid}")]
        public async Task<IActionResult> GetCommentByIdAsync([FromRoute] Guid id)
        {
            Comment? comment = await _commentRepo.GetCommentByIdAsync(id);
            if (comment == null)
            {
                return NotFound("No such comment available");
            }

            return Ok(comment.ToCommentDto());
        }

        [HttpPost]
        public async Task<IActionResult> CreateCommentAsync([FromBody] CreateCommentDto createCommentDto)
        {
            if (await _stockRepo.StockExists(createCommentDto.StockId) == false)
            {
                return BadRequest("No such stock available to add comment");    
            }

            Comment comment = createCommentDto.ToCommentFromCreateDto(createCommentDto.StockId);
            await _commentRepo.CreateCommentAsync(comment);

            return Ok(comment.ToCommentDto());
        }
    }
}
