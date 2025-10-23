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
                StockId = comment.StockId,
                CreatedBy = comment?.User?.UserName ?? "User"
            };

        }

        public static Comment ToCommentFromCreateDto(this CreateCommentDto commentDto, Guid stockId)
        {
            return new Comment
            {
                Title = commentDto.Title,
                Content = commentDto.Content,
                StockId = stockId
            };

        }

        public static Comment ToCommentFromUpdateCommentRequestDto(this UpdateCommentRequestDto updateCommentRequestDto)
        {
            return new Comment
            {
                Title = updateCommentRequestDto.Title,
                Content = updateCommentRequestDto.Content,
            };

        }
    }
}
