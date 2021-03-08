using API.DTOs;
using AutoMapper;
using Core.Entities;

namespace API.Helpers
{
    public class Mappings : Profile
    {
        public Mappings()
        {
            CreateMap<Product, ProductToReturnDTO>()
                .ForMember(d => d.ProductBrand, opt => opt.MapFrom(s => s.ProductBrand.Name))
                .ForMember(d => d.ProductType, opt => opt.MapFrom(s => s.ProductType.Name))
                .ForMember(d => d.ImageUrl, opt => opt.MapFrom<ProductUrlResolver>());
        }
    }
}