using System;
using System.Collections.Generic;

namespace SalesOrderApp.API.Models
{
    public class SalesOrderDto
    {
        public int OrderID { get; set; }
        public string InvoiceNo { get; set; } = string.Empty;
        public DateTime InvoiceDate { get; set; }
        public string? ReferenceNo { get; set; }
        public int ClientID { get; set; }
        public decimal TotalExcl { get; set; }
        public decimal TotalTax { get; set; }
        public decimal TotalIncl { get; set; }
        

        public List<SalesOrderDetailDto> OrderDetails { get; set; } = new();
    }
}