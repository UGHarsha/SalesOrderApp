using SalesOrderApp.Domain.Entities;

namespace SalesOrderApp.Application.Interfaces
{
    public interface ISalesOrderRepository
    {
        Task<IEnumerable<Client>> GetClientsAsync();
        Task<IEnumerable<Item>> GetItemsAsync();
        Task<IEnumerable<SalesOrder>> GetOrdersAsync();
        Task<SalesOrder?> GetOrderByIdAsync(int id);
        Task<SalesOrder> CreateOrderAsync(SalesOrder order);
        Task<SalesOrder?> UpdateOrderAsync(int id, SalesOrder order);
    }
}