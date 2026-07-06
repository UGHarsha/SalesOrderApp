using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SalesOrderApp.Domain.Entities;
using SalesOrderApp.Infrastructure.Data;

namespace SalesOrderApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public OrdersController(ApplicationDbContext context)
        {
            _context = context;
        }

        // 1. Screen 2 (Home Screen) එකේ පෙන්වන්න ඔක්කොම orders ටික ගන්න[cite: 1]
        [HttpGet]
        public async Task<IActionResult> GetOrders()
        {
            var orders = await _context.SalesOrder.Include(o => o.OrderDetails).ToListAsync();
            return Ok(orders);
        }

        // 2. Double-click කරාම එක order එකක විස්තර විතරක් ගන්න[cite: 1]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetOrderById(int id)
        {
            var order = await _context.SalesOrder.Include(o => o.OrderDetails)
                .FirstOrDefaultAsync(o => o.OrderID == id);

            if (order == null) return NotFound();
            return Ok(order);
        }

        // 3. Screen 1 වලින් එන අලුත් Order එකක් Save කරගන්න[cite: 1]
        [HttpPost]
        public async Task<IActionResult> CreateOrder([FromBody] SalesOrder order)
        {
            if (order == null) return BadRequest();

            _context.SalesOrder.Add(order);
            await _context.SaveChangesAsync();

            return Ok(order);
        }

        // 4. කලින් සේව් කරපු Order එකක් Edit කරලා ආයෙත් Save (Update) කරන්න[cite: 1]
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateOrder(int id, [FromBody] SalesOrder updatedOrder)
        {
            if (id != updatedOrder.OrderID) return BadRequest();

            // කලින් තිබ්බ විස්තර අයින් කරලා අලුත් ඒවා දාන්න ලේසිම ක්‍රමය[cite: 1]
            var existingOrder = await _context.SalesOrder.Include(o => o.OrderDetails)
                .FirstOrDefaultAsync(o => o.OrderID == id);

            if (existingOrder == null) return NotFound();

            // Update Header[cite: 1]
            existingOrder.InvoiceNo = updatedOrder.InvoiceNo;
            existingOrder.InvoiceDate = updatedOrder.InvoiceDate;
            existingOrder.ReferenceNo = updatedOrder.ReferenceNo;
            existingOrder.ClientID = updatedOrder.ClientID;
            existingOrder.TotalExcl = updatedOrder.TotalExcl;
            existingOrder.TotalTax = updatedOrder.TotalTax;
            existingOrder.TotalIncl = updatedOrder.TotalIncl;

            // Remove old details and add new details[cite: 1]
            _context.SalesOrderDetail.RemoveRange(existingOrder.OrderDetails);
            existingOrder.OrderDetails = updatedOrder.OrderDetails;

            await _context.SaveChangesAsync();
            return Ok(existingOrder);
        }
    }
}