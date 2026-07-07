using Microsoft.EntityFrameworkCore;
using SalesOrderApp.Application.Interfaces;
using SalesOrderApp.Domain.Entities;
using SalesOrderApp.Infrastructure.Data;

namespace SalesOrderApp.Infrastructure.Data.Repositories
{
    public class SalesOrderRepository : ISalesOrderRepository
    {
        private readonly ApplicationDbContext _context;

        public SalesOrderRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Client>> GetClientsAsync() => await _context.Client.ToListAsync();

        public async Task<IEnumerable<Item>> GetItemsAsync() => await _context.Item.ToListAsync();

        public async Task<IEnumerable<SalesOrder>> GetOrdersAsync() => 
            await _context.SalesOrder.Include(o => o.OrderDetails).ToListAsync();

        public async Task<SalesOrder?> GetOrderByIdAsync(int id) => 
            await _context.SalesOrder.Include(o => o.OrderDetails).FirstOrDefaultAsync(o => o.OrderID == id);

        public async Task<SalesOrder> CreateOrderAsync(SalesOrder order)
        {
            _context.SalesOrder.Add(order);
            await _context.SaveChangesAsync();
            return order;
        }

        public async Task<SalesOrder?> UpdateOrderAsync(int id, SalesOrder updatedOrder)
        {
            var existingOrder = await _context.SalesOrder.Include(o => o.OrderDetails).FirstOrDefaultAsync(o => o.OrderID == id);
            if (existingOrder == null) return null;

            existingOrder.InvoiceNo = updatedOrder.InvoiceNo;
            existingOrder.InvoiceDate = updatedOrder.InvoiceDate;
            existingOrder.ReferenceNo = updatedOrder.ReferenceNo;
            existingOrder.ClientID = updatedOrder.ClientID;
            existingOrder.TotalExcl = updatedOrder.TotalExcl;
            existingOrder.TotalTax = updatedOrder.TotalTax;
            existingOrder.TotalIncl = updatedOrder.TotalIncl;

            _context.SalesOrderDetail.RemoveRange(existingOrder.OrderDetails);
            existingOrder.OrderDetails = updatedOrder.OrderDetails;

            await _context.SaveChangesAsync();
            return existingOrder;
        }
    }
}