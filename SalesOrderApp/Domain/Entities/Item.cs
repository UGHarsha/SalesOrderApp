namespace SalesOrderApp.Domain.Entities
{
    public class Item
    {
        public int ItemID { get; set; }
        public string ItemCode { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public decimal UnitPrice { get; set; }
    }
}