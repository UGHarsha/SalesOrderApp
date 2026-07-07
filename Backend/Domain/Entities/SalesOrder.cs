using System;
using System.Collections.Generic;

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

        public Client? Client { get; set; }

        [System.ComponentModel.DataAnnotations.Schema.NotMapped]
        public string? CustomerName => Client?.CustomerName;

        public ICollection<SalesOrderDetail> OrderDetails { get; set; } = new List<SalesOrderDetail>();
    }
}