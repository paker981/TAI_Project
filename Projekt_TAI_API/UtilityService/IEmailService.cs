using Projekt_TAI_API.Models;

namespace Projekt_TAI_API.UtilityService
{
    public interface IEmailService
    {
        void SendEmail(EmailModel emailModel);

    }
}
