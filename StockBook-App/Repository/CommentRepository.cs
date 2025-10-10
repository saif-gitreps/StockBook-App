using StockBook_App.Data;
using StockBook_App.Interfaces;
using StockBook_App.Models.Entities;
using System.Data.Entity;

namespace StockBook_App.Repository
{
    public class CommentRepository : ICommentRepository
    {
        private readonly ApplicationDbContext _dbContext;
        public CommentRepository(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        public async Task<List<Comment>> GetAllCommentsAsync()
        {
            return await _dbContext.Comments.ToListAsync();
        }
    }
}
