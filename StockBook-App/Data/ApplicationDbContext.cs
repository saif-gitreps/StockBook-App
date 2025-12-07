using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using StockBook_App.Models.Entities;

namespace StockBook_App.Data
{
    public class ApplicationDbContext : IdentityDbContext<User>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options) { }

        public DbSet<Stock> Stocks { get; set; }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<Portfolio> Portfolios { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            // Enable UUID extension
            builder.HasPostgresExtension("uuid-ossp");

            builder.Entity<User>()
                .Property(u => u.Id)
                .HasColumnType("text"); // important

            builder.Entity<Comment>()
                .Property(c => c.UserId)
                .HasColumnType("text");

            // Fix Identity string PK type for PostgreSQL
            builder.Entity<IdentityRole>(entity =>
            {
                entity.Property(r => r.Id).HasColumnType("text");
            });

            builder.Entity<User>(entity =>
            {
                entity.Property(u => u.Id).HasColumnType("text");
            });

            // Composite Key
            builder.Entity<Portfolio>(x =>
                x.HasKey(p => new { p.UserId, p.StockId })
            );

            // Relationships
            builder.Entity<Portfolio>()
                .HasOne(p => p.User)
                .WithMany(u => u.Portfolios)
                .HasForeignKey(p => p.UserId);

            builder.Entity<Portfolio>()
                .HasOne(p => p.Stock)
                .WithMany(s => s.Portfolios)
                .HasForeignKey(p => p.StockId);

            // Seed Roles
            List<IdentityRole> roles = new List<IdentityRole>()
            {
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

            // Convert all table names to lowercase (PostgreSQL safety)
            foreach (var entity in builder.Model.GetEntityTypes())
            {
                entity.SetTableName(entity.GetTableName().ToLower());
            }
        }
    }
}
