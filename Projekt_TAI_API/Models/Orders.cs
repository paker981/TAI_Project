namespace Projekt_TAI_API.Models
{
    public class order
    {
        public Guid id { get; set; }

        public string date { get; set; }

        public int quantity { get; set; }

        public long price { get; set; }

        public string paid { get; set; }

        public string status { get; set; }

        public string email { get; set; }
    }
}
