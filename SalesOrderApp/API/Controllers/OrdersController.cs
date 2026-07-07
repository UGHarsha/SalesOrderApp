using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using SalesOrderApp.Application.Interfaces;
using SalesOrderApp.Domain.Entities;
using SalesOrderApp.API.Models;

namespace SalesOrderApp.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private readonly ISalesOrderRepository _repository;
        private readonly IMapper _mapper;

        public OrdersController(ISalesOrderRepository repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetOrders()
        {
            var orders = await _repository.GetOrdersAsync();
            var ordersDto = _mapper.Map<IEnumerable<SalesOrderDto>>(orders);
            return Ok(ordersDto);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetOrderById(int id)
        {
            var order = await _repository.GetOrderByIdAsync(id);
            if (order == null) return NotFound();
            var orderDto = _mapper.Map<SalesOrderDto>(order);
            return Ok(orderDto);
        }

        [HttpPost]
        public async Task<IActionResult> CreateOrder([FromBody] SalesOrderDto orderDto)
        {
            if (orderDto == null) return BadRequest();
            var order = _mapper.Map<SalesOrder>(orderDto);
            var createdOrder = await _repository.CreateOrderAsync(order);
            return Ok(_mapper.Map<SalesOrderDto>(createdOrder));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateOrder(int id, [FromBody] SalesOrderDto orderDto)
        {
            if (id != orderDto.OrderID) return BadRequest();
            var order = _mapper.Map<SalesOrder>(orderDto);
            var updatedOrder = await _repository.UpdateOrderAsync(id, order);
            if (updatedOrder == null) return NotFound();
            return Ok(_mapper.Map<SalesOrderDto>(updatedOrder));
        }
    }
}