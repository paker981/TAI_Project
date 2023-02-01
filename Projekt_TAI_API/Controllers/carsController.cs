using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using Projekt_TAI_API.Data;
using Projekt_TAI_API.Models;

namespace Projekt_TAI_API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]

    public class carsController : Controller
    {
        private readonly FullStackDbContext _context;

        public carsController(FullStackDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> Index()
        {
            var samochody = await _context.Cars.ToListAsync();

            return Ok(samochody);
        }

        [HttpPut]
        [Route("{id:int}")]
        public async Task<IActionResult> Update([FromRoute] int id, car updateCar)
        {

            var car = await _context.Cars.FindAsync(id);
            if (car == null)
            {
                return NotFound();
            }
            car.title = updateCar.title;
            car.price = updateCar.price;
            car.description = updateCar.description;
            car.category = updateCar.category;
            car.imgage = updateCar.imgage;


            await _context.SaveChangesAsync();
            return Ok(car);
        }

        [HttpDelete]
        [Route("{id:int}")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            var car = await _context.Cars.FindAsync(id);
            if (car == null)
            {
                return NotFound();
            }
            _context.Cars.Remove(car);
            await _context.SaveChangesAsync();
            return Ok();
        }

        [HttpPost]
        public async Task<IActionResult> AddPracownik([FromBody] car newCar)
        {
       
            await _context.Cars.AddAsync(newCar);
            await _context.SaveChangesAsync();

            return Ok(newCar);

        }


    }
}
