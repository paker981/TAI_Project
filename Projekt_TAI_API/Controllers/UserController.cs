using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Projekt_TAI_API.Data;
using Projekt_TAI_API.Models;

namespace Projekt_TAI_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly FullStackDbContext _fullStackDbContext;
        public UserController(FullStackDbContext fullStackDbContext)
        {
            _fullStackDbContext = fullStackDbContext;
        }

        [HttpPost("register")]
        public async Task<IActionResult> AddUzytkownik([FromBody] uzytkownik uzytkownikrequest)
        {
            if (uzytkownikrequest == null)
                return BadRequest();

            uzytkownikrequest.id = Guid.NewGuid();

            await _fullStackDbContext.Uzytkownicy.AddAsync(uzytkownikrequest);
            await _fullStackDbContext.SaveChangesAsync();

            return Ok(uzytkownikrequest);

        }
        [HttpPost("authenticate")]
        public async Task<IActionResult> Authenticate([FromBody] uzytkownik userObj)
        {
            if(userObj == null)
                return BadRequest();

            var user = await _fullStackDbContext.Uzytkownicy.FirstOrDefaultAsync(x => x.email == userObj.email && x.haslo == userObj.haslo);
            if(user==null)
                return NotFound(new 
                {Message= "User Not Found!"});

            return Ok(new
            {
                Message = "Login Success!"
            });
        }
        
        
        




        [HttpGet]
        [Route("{email}")]
        public async Task<IActionResult> GetEmailUzyt([FromRoute] string email)
        {
            var uzytkownik = await _fullStackDbContext.Uzytkownicy.FirstOrDefaultAsync(x => x.email == email);

            if (uzytkownik == null)
            {
                return Ok();

            }

            return NotFound();

        }
    }
}
