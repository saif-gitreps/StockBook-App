using StockBook_App.Dtos.Comment;
using StockBook_App.Models.Entities;

namespace StockBook_App.Mappers
{
    public static class CommentMapper
    {
        public static CommentDto ToCommentDto(this Comment comment)
        {
            return new CommentDto
            {
                Id = comment.Id,
                Title = comment.Title,
                Content = comment.Content,
                Date = comment.Date,
                StockId = comment.StockId

            };

        }
    }
}
