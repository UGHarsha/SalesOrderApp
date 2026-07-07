using System.ComponentModel.DataAnnotations;

namespace SalesOrderApp.Domain.Entities
{
    public class Item
    {
        [Key]
        public int ItemID { get; set; }
        public string ItemCode { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public decimal UnitPrice { get; set; }
    }
}