using System.ComponentModel.DataAnnotations; 
namespace SalesOrderApp.Domain.Entities
{
    public class SalesOrder
    {
        [Key] 
        public int OrderID { get; set; }

        public string InvoiceNo { get; set; } = string.Empty;
        public DateTime InvoiceDate { get; set; }
        public string? ReferenceNo { get; set; }
        public int ClientID { get; set; }
        public decimal TotalExcl { get; set; }
        public decimal TotalTax { get; set; }
        public decimal TotalIncl { get; set; }

        // Navigation Property
        public List<SalesOrderDetail> OrderDetails { get; set; } = new();
    }
}