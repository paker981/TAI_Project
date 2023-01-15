using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Projekt_TAI_API.Data;
using Projekt_TAI_API.Models;

namespace Projekt_TAI_API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PracownicyController : Controller
    {
        private readonly FullStackDbContext _fullStackDbContext;

        public PracownicyController(FullStackDbContext fullStackDbContext)
        {
            _fullStackDbContext = fullStackDbContext;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllPracownicy()
        {
            var pracownicy = await _fullStackDbContext.Pracownicy.ToListAsync();

            return Ok(pracownicy);

        }

        [HttpPost]
        public async Task<IActionResult> AddPracownik([FromBody] pracownik pracownikrequest)
        {
            pracownikrequest.id = Guid.NewGuid();
           
            await _fullStackDbContext.Pracownicy.AddAsync(pracownikrequest);
            await _fullStackDbContext.SaveChangesAsync();

            return Ok(pracownikrequest);

        }
        [HttpGet]
        [Route("{id:Guid}")]
             
        public async Task<IActionResult> GetPracownik([FromRoute] Guid id)
        {
            var pracownik = await _fullStackDbContext.Pracownicy.FirstOrDefaultAsync(x => x.id == id);
            
                if(pracownik == null)
            {
                return NotFound();
            }

                return Ok(pracownik);
        }

        [HttpPut]
        [Route("{id:Guid}")]
        public async Task<IActionResult> UpdatePracownik([FromRoute] Guid id, pracownik updatePracownikRequest){

             var pracownik = await _fullStackDbContext.Pracownicy.FindAsync(id);
            if (pracownik == null)
            {
                return NotFound();
            }
            pracownik.imie = updatePracownikRequest.imie;
            pracownik.email = updatePracownikRequest.email;
            pracownik.numer = updatePracownikRequest.numer;
            pracownik.firma = updatePracownikRequest.firma;
        

            await _fullStackDbContext.SaveChangesAsync();
            return Ok(pracownik);
        }
        [HttpDelete]
        [Route("{id:Guid}")]
        public async Task<IActionResult> DeletePracownik([FromRoute] Guid id)
        {
            var pracownik = await _fullStackDbContext.Pracownicy.FindAsync(id);
            if (pracownik == null)
            {
                return NotFound();
            }
            _fullStackDbContext.Pracownicy.Remove(pracownik);
            await _fullStackDbContext.SaveChangesAsync();
            return Ok();
        }


    }


}
