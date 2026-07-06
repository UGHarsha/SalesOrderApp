namespace SalesOrderApp.Domain.Entities
{
    public class Client
    {
        public int ClientID { get; set; }
        public string CustomerName { get; set; } = string.Empty;
        public string? Address1 { get; set; }
        public string? Address2 { get; set; }
        public string? Address3 { get; set; }
        public string? State { get; set; }
        public string? PostCode { get; set; }
    }
}