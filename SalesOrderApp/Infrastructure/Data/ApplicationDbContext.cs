using Microsoft.EntityFrameworkCore;
using SalesOrderApp.Domain.Entities;

namespace SalesOrderApp.Infrastructure.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        public DbSet<Client> Client { get; set; }
        public DbSet<Item> Item { get; set; }
        public DbSet<SalesOrder> SalesOrder { get; set; }
        public DbSet<SalesOrderDetail> SalesOrderDetail { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            //   SalesOrder and SalesOrderDetail between Foreign Key 
            modelBuilder.Entity<SalesOrder>()
                .HasMany(o => o.OrderDetails)
                .WithOne()
                .HasForeignKey(d => d.OrderID);
        }
    }
}