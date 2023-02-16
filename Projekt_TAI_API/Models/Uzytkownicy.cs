namespace Projekt_TAI_API.Models
{
    public class uzytkownik
    {
            public Guid id { get; set; }

            public string imie { get; set; }

            public string email { get; set; }

            public long numer { get; set; }

            public string firma { get; set; }

            public string haslo { get; set; }

            public string plec { get; set; }

            public string token { get; set; }

            public string role { get; set; }

            public string refreshToken { get; set; }

            public DateTime refreshTokenExpiryTime { get; set; }

            public string? resetPasswordToken { get; set; }

            public DateTime resetPasswordExpiry { get; set; }

    }
}
