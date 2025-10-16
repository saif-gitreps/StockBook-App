using StockBook_App.Data;
using StockBook_App.Interfaces;
using StockBook_App.Models.Entities;
using Microsoft.EntityFrameworkCore;

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

        public async Task<List<Comment>> GetAllCommentsAsync()
        {
            return await _dbContext.Comments.ToListAsync();
        }

        public async Task<Comment?> GetCommentByIdAsync(Guid id)
        {
            Comment? existingComment = await _dbContext.Comments.FirstOrDefaultAsync(c => c.Id == id);

            if (existingComment == null)
            {
                return null;
            }

            return existingComment;
        }
    }
}
