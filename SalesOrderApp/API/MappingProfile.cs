using AutoMapper;
using SalesOrderApp.Domain.Entities;
using SalesOrderApp.API.Models;

namespace SalesOrderApp
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<SalesOrder, SalesOrderDto>().ReverseMap();
            CreateMap<SalesOrderDetail, SalesOrderDetailDto>().ReverseMap();
        }
    }
}