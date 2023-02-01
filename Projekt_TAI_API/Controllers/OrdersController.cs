using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Projekt_TAI_API.Data;
using Projekt_TAI_API.Models;
using System.ComponentModel.DataAnnotations;

namespace Projekt_TAI_API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OrdersController : Controller
    {
        private readonly FullStackDbContext _context;
        public OrdersController(FullStackDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> AddOrder([FromBody] order orderRequest)
        {
            orderRequest.id = Guid.NewGuid();
            DateTime date = DateTime.Now;
            orderRequest.date = date.ToShortDateString();
            
            await _context.Orders.AddAsync(orderRequest);
            await _context.SaveChangesAsync();

            return Ok(orderRequest);
        }
        [HttpGet]
        [Route("{email}")]
        public async Task<IActionResult> GetAllOrders([FromRoute] string email)
        {
            var orders = await _context.Orders.Where(x=>x.email == email).ToListAsync();

            if (orders == null)
                return BadRequest("Jeszcze nie złożyłeś żadnego zamówienia!");

            return Ok(orders);
        }

    }
}
