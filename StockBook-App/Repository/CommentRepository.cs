using StockBook_App.Data;
using StockBook_App.Interfaces;
using StockBook_App.Models.Entities;
using Microsoft.EntityFrameworkCore;
using StockBook_App.Dtos.Comment;
using System.Runtime.InteropServices;

namespace StockBook_App.Repository
{     
    public class CommentRepository : ICommentRepository
    {
        private readonly ApplicationDbContext _dbContext;
        public CommentRepository(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<Comment> CreateCommentAsync(Comment comment)
        {
            await _dbContext.Comments.AddAsync(comment);
            await _dbContext.SaveChangesAsync();

            return comment;
        }

        public async Task<bool> DeleteCommentAsync(Guid id)
        {
            Comment? comment = await _dbContext.Comments.FindAsync(id);
            if (comment == null)
            {
                return false;
            }

            _dbContext.Comments.Remove(comment);
            await _dbContext.SaveChangesAsync();

            return true;
        }

        public async Task<List<Comment>> GetAllCommentsAsync(CommentQueryDto commentQueryDto)
        {
            IQueryable<Comment> comments = _dbContext.Comments.Include(c => c.User).AsQueryable();
            if (!string.IsNullOrEmpty(commentQueryDto.Symbol))
            {
                comments = comments.Where(c => c.Stock.Symbol == commentQueryDto.Symbol);
            }
            if (commentQueryDto.isDesc == true)
            {
                comments = comments.OrderByDescending(c => c.Date);
            }

            return await comments.ToListAsync();
        }

        public async Task<Comment?> GetCommentByIdAsync(Guid id)
        {
            return await _dbContext.Comments.Include(c => c.User).FirstOrDefaultAsync(c => c.Id == id);
        }

        public async Task<Comment?> UpdateCommentAsync(Guid id, Comment comment)
        {
            Comment? existingComment = await _dbContext.Comments.FindAsync(id);
            if (existingComment == null) {
                return null;
            }

            existingComment.Title = comment.Title;
            existingComment.Content = comment.Content;
            await _dbContext.SaveChangesAsync();

            return existingComment;
        }
    }
}
