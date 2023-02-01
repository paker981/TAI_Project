using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging.Abstractions;
using Microsoft.IdentityModel.Tokens;
using Projekt_TAI_API.Data;
using Projekt_TAI_API.Helpers;
using Projekt_TAI_API.Models;
using Projekt_TAI_API.Models.Dto;
using System;
using System.ComponentModel.DataAnnotations;
using System.Data;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Text.RegularExpressions;

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

            if(await CheckEmailExistAsync(uzytkownikrequest.email))
                return BadRequest(new {Message = "Email Already Exist!"});

            var pass = CheckPasswordStrength(uzytkownikrequest.haslo);

            if (!string.IsNullOrEmpty(pass))
                return BadRequest(new {Message = pass.ToString() });
    
            uzytkownikrequest.id = Guid.NewGuid();
            uzytkownikrequest.haslo = PasswordHashed.HashPassword(uzytkownikrequest.haslo);
            uzytkownikrequest.role = "User";
            uzytkownikrequest.token = "";
            await _fullStackDbContext.Uzytkownicy.AddAsync(uzytkownikrequest);
            await _fullStackDbContext.SaveChangesAsync();

            return Ok(uzytkownikrequest);

        }

        

        [HttpPost("authenticate")]
        public async Task<IActionResult> Authenticate([FromBody] uzytkownik userObj)
        {
            if(userObj == null)
                return BadRequest();

            var user = await _fullStackDbContext.Uzytkownicy.FirstOrDefaultAsync(x => x.email == userObj.email);

            if(user==null)
                return NotFound(new 
                {Message= "User Not Found!"});

            if(!PasswordHashed.VerifyPassword(userObj.haslo, user.haslo))
            {
                return BadRequest(new { Message = "Haslo jest nieprawidłowe!" });
            }


            user.token = CreateJwt(user);
            var newAccessToken = user.token;
            var newRefreshToken = CreateRefreshToken();
            user.refreshToken = newRefreshToken;
            user.refreshTokenExpiryTime = DateTime.Now.AddDays(5);
            await _fullStackDbContext.SaveChangesAsync();


            return Ok(new TokenApiDto()
            {
                AccessToken = newAccessToken,
                RefreshToken = newRefreshToken
            }); ;
        }
        
        
        private async Task<bool> CheckEmailExistAsync(string email)
        {
            return await _fullStackDbContext.Uzytkownicy.AnyAsync(x => x.email == email);
        }

        private string CheckPasswordStrength(string password)
        {
            StringBuilder sb = new StringBuilder();
            if(password.Length < 6)
                     sb.Append("Minimalna dlługość hasło powinna wynosić 6 znaków" + Environment.NewLine);    
            if(!(Regex.IsMatch(password,"[a-z]") && Regex.IsMatch(password,"[A-Z]") && Regex.IsMatch(password,"[0-9]")))  
                     sb.Append("Hasło powinno być zawierać tylko znaki Alfanumeryczne" + Environment.NewLine);
            if (!Regex.IsMatch(password,"[<,>,;,.,!,@,']"))
                    sb.Append("Hasło powinno zawierać znak specjalny"+Environment.NewLine);

            return sb.ToString();
        }

        private string CreateJwt(uzytkownik user) 
        {
            var jwtTokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes("veryverysecret.....");
            var identity = new ClaimsIdentity(new Claim[]
            {
                new Claim(ClaimTypes.Role, user.role),
                new Claim(ClaimTypes.Name, user.imie),
                new Claim(ClaimTypes.Email, user.email)
            });
            var credentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = identity,
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = credentials
            };

            var token = jwtTokenHandler.CreateToken(tokenDescriptor);
            return jwtTokenHandler.WriteToken(token);
        }




        [HttpGet]
        [Route("{email}")]
        public async Task<IActionResult> GetEmailUzyt([FromRoute] string email)
        {
            var uzytkownik = await _fullStackDbContext.Uzytkownicy.FirstOrDefaultAsync(x => x.email == email);

            if (uzytkownik == null)
            {
                return NotFound();

            }

            return Ok(uzytkownik);

        }

        private string CreateRefreshToken()
        {
            var tokenByte = RandomNumberGenerator.GetBytes(64);
            var refreshToken = Convert.ToBase64String(tokenByte);

            var tokenInUser = _fullStackDbContext.Uzytkownicy.Any(x => x.refreshToken == refreshToken);

            if (tokenInUser) { return CreateRefreshToken(); }
            return refreshToken;
        }

        private ClaimsPrincipal GetPrincipleFromExpierdToken( string token)
        {
            var key = Encoding.ASCII.GetBytes("veryverysecret.....");
            var tokenValidateParameters = new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(key),
                ValidateAudience = false,
                ValidateIssuer = false,
                ValidateLifetime = false
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            SecurityToken securityToken;
            var principal = tokenHandler.ValidateToken(token,tokenValidateParameters, out securityToken);
            var jwtSecurityToken = securityToken as JwtSecurityToken;
            if (jwtSecurityToken == null || jwtSecurityToken.Header.Alg.Equals(SecurityAlgorithms.HmacSha256,StringComparison.InvariantCultureIgnoreCase)) {
                throw new SecurityTokenException("This is Invalid Token");
            }
            return principal;

        }

        [Authorize]
        [HttpGet]
        public async Task<ActionResult<uzytkownik>> GetAllUsers()
        {
            return Ok(await _fullStackDbContext.Uzytkownicy.ToListAsync());
        }


        [HttpPost("refresh")]
        public async Task<IActionResult> Refresh(TokenApiDto tokenApiDto)
        {
            if (tokenApiDto is null)
                return BadRequest("Błąd przy generowaniu tokenu!");
            string accessToken = tokenApiDto.AccessToken;
            string refreshToken = tokenApiDto.RefreshToken;
            var principal = GetPrincipleFromExpierdToken(accessToken);
            var name = principal.Identity.Name;
            var user = await _fullStackDbContext.Uzytkownicy.FirstOrDefaultAsync(x => x.imie == name);
            if (user is null || user.refreshToken != refreshToken || user.refreshTokenExpiryTime <= DateTime.Now)
                return BadRequest("Nieprawidłowe żądanie!");
            var newAccessToken = CreateJwt(user);
            var newRefreshToken = CreateRefreshToken();
            user.refreshToken = newRefreshToken;
            await _fullStackDbContext.SaveChangesAsync();
            return Ok(new TokenApiDto()
            {
                AccessToken = newAccessToken,
                RefreshToken = newRefreshToken
            }); 

          
        }

        [HttpPut]
        [Route("{id:Guid}")]
        public async Task<IActionResult> Update([FromRoute] Guid id, uzytkownik updateUzytkownik)
        {

            var uzytkownik = await _fullStackDbContext.Uzytkownicy.FindAsync(id);
            if (uzytkownik == null)
            {
                return NotFound();
            }
            uzytkownik.imie = updateUzytkownik.imie;
            uzytkownik.email = updateUzytkownik.email;
            uzytkownik.numer = updateUzytkownik.numer;
            uzytkownik.firma = updateUzytkownik.firma;
            uzytkownik.role  = updateUzytkownik.role;


            await _fullStackDbContext.SaveChangesAsync();
            return Ok(uzytkownik);
        }

        [HttpPut]
        [Route("{email}")]
        public async Task<IActionResult> UpdateByEmail([FromRoute] string email, uzytkownik updateUzytkownik)
        {

            var uzytkownik = await _fullStackDbContext.Uzytkownicy.FindAsync(email);
            if (uzytkownik == null)
            {
                return NotFound();
            }
            uzytkownik.imie = updateUzytkownik.imie;
            uzytkownik.email = updateUzytkownik.email;
            uzytkownik.numer = updateUzytkownik.numer;
            uzytkownik.firma = updateUzytkownik.firma;
            uzytkownik.role = updateUzytkownik.role;


            await _fullStackDbContext.SaveChangesAsync();
            return Ok(uzytkownik);
        }

        [HttpDelete]
        [Route("{id:Guid}")]
        public async Task<IActionResult> Delete([FromRoute] Guid id)
        {
            var uzytkownik = await _fullStackDbContext.Uzytkownicy.FindAsync(id);
            if (uzytkownik == null)
            {
                return NotFound();
            }
            _fullStackDbContext.Uzytkownicy.Remove(uzytkownik);
            await _fullStackDbContext.SaveChangesAsync();
            return Ok();
        }




    }
}
