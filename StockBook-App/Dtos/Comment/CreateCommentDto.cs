using System.ComponentModel.DataAnnotations;

namespace StockBook_App.Dtos.Comment
{
    public class CreateCommentDto
    {
        [Required]
        public required Guid StockId { get; set; }

        [Required]
        [MinLength(5, ErrorMessage = "Title must be at least 5 characters long.")]
        [MaxLength(256, ErrorMessage = "Title cannot be longer than 256 characters.")]
        public required string Title { get; set; }

        [Required]
        [MinLength(5, ErrorMessage = "Content must be at least 5 characters long.")]
        [MaxLength(256, ErrorMessage = "Content cannot be longer than 256 characters.")]
        public required string Content { get; set; }

    }
}
