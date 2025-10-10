using StockBook_App.Models.Entities;

namespace StockBook_App.Interfaces
{
    public interface ICommentRepository
    {
        Task<List<Comment>> GetAllCommentsAsync();
    }
}
