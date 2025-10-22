using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using StockBook_App.Models.Entities;

namespace StockBook_App.Data
{
    public class ApplicationDbContext : IdentityDbContext<User>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options): base(options) 
        {
            
        }

        public DbSet<Stock> Stocks { get; set; }
        public DbSet<Comment> Comments { get; set; }

        public DbSet<Portfolio> Portfolios { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            // this is for creating the composite/compound key for Portfolio table
            builder.Entity<Portfolio> (x => x.HasKey(p => new { p.UserId, p.StockId }));

            // defining the relationships of Portfolio with User and Stock
            builder.Entity<Portfolio>()
                .HasOne(u => u.User)
                .WithMany(u => u.Portfolios)
                .HasForeignKey(p => p.UserId);

            // defining the relationships of Portfolio with User and Stock
            builder.Entity<Portfolio>()
                .HasOne(u => u.Stock)
                .WithMany(u => u.Portfolios)
                .HasForeignKey(p => p.StockId);

            List<IdentityRole> roles = new List<IdentityRole>() {
                new IdentityRole
                {
                    Id = "b26f0f60-56ef-4a90-9b32-12872e5a6b99",  
                    Name = "Admin",
                    NormalizedName = "ADMIN"
                },
                new IdentityRole
                {
                    Id = "7e3f2a9f-23d7-4ed4-8017-9a18f51c718c", 
                    Name = "User",
                    NormalizedName = "USER"
                }
            };

            builder.Entity<IdentityRole>().HasData(roles);
        }
    }
}
