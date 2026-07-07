using Microsoft.EntityFrameworkCore;
using SalesOrderApp.Domain.Entities;

namespace SalesOrderApp.Infrastructure.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        public DbSet<Client> Client { get; set; }
        public DbSet<Item> Item { get; set; }
        public DbSet<SalesOrder> SalesOrder { get; set; }
        public DbSet<SalesOrderDetail> SalesOrderDetail { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

             modelBuilder.Entity<SalesOrder>()
                .HasOne(o => o.Client)
                .WithMany()
                .HasForeignKey(o => o.ClientID)
                .OnDelete(DeleteBehavior.Restrict);
                
             modelBuilder.Entity<SalesOrder>()
                .HasMany(o => o.OrderDetails)
                .WithOne()
                .HasForeignKey(od => od.OrderID);

            // Configure decimal properties
            modelBuilder.Entity<Item>().Property(i => i.UnitPrice).HasColumnType("decimal(18,2)");
            modelBuilder.Entity<SalesOrder>().Property(o => o.TotalExcl).HasColumnType("decimal(18,2)");
            modelBuilder.Entity<SalesOrder>().Property(o => o.TotalIncl).HasColumnType("decimal(18,2)");
            modelBuilder.Entity<SalesOrder>().Property(o => o.TotalTax).HasColumnType("decimal(18,2)");
            modelBuilder.Entity<SalesOrderDetail>().Property(od => od.ExclAmount).HasColumnType("decimal(18,2)");
            modelBuilder.Entity<SalesOrderDetail>().Property(od => od.InclAmount).HasColumnType("decimal(18,2)");
            modelBuilder.Entity<SalesOrderDetail>().Property(od => od.Price).HasColumnType("decimal(18,2)");
            modelBuilder.Entity<SalesOrderDetail>().Property(od => od.TaxAmount).HasColumnType("decimal(18,2)");
            modelBuilder.Entity<SalesOrderDetail>().Property(od => od.TaxRate).HasColumnType("decimal(18,2)");
        }
    }
}