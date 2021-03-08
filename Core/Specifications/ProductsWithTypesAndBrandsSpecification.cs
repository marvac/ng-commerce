using Core.Entities;

namespace Core.Specifications
{
    public class ProductsWithTypesAndBrandsSpecification : SpecificationBase<Product>
    {
        public ProductsWithTypesAndBrandsSpecification(ProductSpecParams productParams) 
            : base(x => 
            (!productParams.HasSearchText || x.Name.ToLower().Contains(productParams.SearchText)) &&
            (!productParams.BrandId.HasValue || x.ProductBrandId == productParams.BrandId) && 
            (!productParams.TypeId.HasValue || x.ProductTypeId == productParams.TypeId))
        {
            AddInclude(p => p.ProductType);
            AddInclude(p => p.ProductBrand);
            AddOrderBy(p => p.Name);

            if (productParams.HasSortParameter)
            {
                switch (productParams.Sort)
                {
                    case "priceAsc":
                            AddOrderBy(p => p.Price);
                        break;
                    case "priceDesc":
                        AddOrderByDescending(p => p.Price);
                        break;
                    default:
                        AddOrderBy(p => p.Name);
                        break;
                }
            }

            AddPaging(productParams.PageSize * (productParams.PageIndex - 1), productParams.PageSize);
        }

        public ProductsWithTypesAndBrandsSpecification(int id) : base(criteria: x => x.Id == id)
        {
            AddInclude(p => p.ProductBrand);
            AddInclude(p => p.ProductType);
        }
    }
}