using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SalesOrderApp.Infrastructure.Data;

namespace SalesOrderApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ItemsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ItemsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // Screen 1 Item Code  Description dropdowns items 
        [HttpGet]
        public async Task<IActionResult> GetItems()
        {
            var items = await _context.Item.ToListAsync();
            return Ok(items);
        }
    }
}