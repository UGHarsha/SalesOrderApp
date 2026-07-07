using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SalesOrderApp.Infrastructure.Data;

namespace SalesOrderApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClientsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ClientsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // Screen 1  customer dropdown  clients 
        [HttpGet]
        public async Task<IActionResult> GetClients()
        {
            var clients = await _context.Client.ToListAsync();
            return Ok(clients);
        }
    }
}