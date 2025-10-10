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
        public CommentController(ICommentRepository commentRepo)
        {
            _commentRepo = commentRepo;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllCommentsAsync()
        {
            List<Comment> comments = await _commentRepo.GetAllCommentsAsync();

            return Ok(comments.Select(c => c.ToCommentDto()));
        }
    }
}
