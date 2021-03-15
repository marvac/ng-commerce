import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Product } from '../shared/models/product';
import { ProductBrand } from '../shared/models/productBrand';
import { ProductType } from '../shared/models/productType';
import { ShopParams } from '../shared/models/shopParams';
import { ShopService } from './shop.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  products: Product[];
  brands: ProductBrand[];
  types: ProductType[];
  sortingOptions = [
    { name: 'Alphabetical', value: 'name' },
    { name: 'Price: Low to High', value: 'priceAsc' },
    { name: 'Price: High to Low', value: 'priceDesc' }
  ];
  shopParams = new ShopParams();
  totalCount: number;
  @ViewChild("searchInput", { static: false }) searchInput: ElementRef;

  constructor(private shopService: ShopService) { }

  ngOnInit(): void {
    this.getProducts();
    this.getBrands();
    this.getTypes();
  }

  getProducts() {
    this.shopService.getProducts(this.shopParams).subscribe(res => {
      this.products = res.data;
      this.shopParams.pageNumber = res.pageIndex;
      this.shopParams.pageSize = res.pageSize;
      this.totalCount = res.count;
    }, error => {
      console.log(error);
    });
  }

  getBrands() {
    return this.shopService.getBrands().subscribe((brands: ProductBrand[]) => {
      const allBrandsPlaceholder: ProductBrand = { id: 0, name: 'All' };
      this.brands = [allBrandsPlaceholder, ...brands];
    }, error => {
      console.log(error);
    });
  }

  getTypes() {
    return this.shopService.getTypes().subscribe((types: ProductType[]) => {
      const allTypesPlaceholder: ProductType = { id: 0, name: 'All' };
      this.types = [allTypesPlaceholder, ...types];
    }, error => {
      console.log(error);
    });
  }

  onBrandSelected(brandId: number) {
    this.shopParams.brandId = brandId;
    this.shopParams.pageNumber = 1;
    this.getProducts();
  }

  onTypeSelected(typeId: number) {
    this.shopParams.typeId = typeId;
    this.shopParams.pageNumber = 1;
    this.getProducts();
  }

  onSortSelected(sorting: string) {
    this.shopParams.sorting = sorting;
    this.getProducts();
  }

  onPageChanged(event: any) {
    //to prevent double-firing this event
    if (this.shopParams.pageNumber !== event) {
      this.shopParams.pageNumber = event.page;
      this.getProducts();
    }
  }

  onSearch() {
    this.shopParams.searchText = this.searchInput.nativeElement.value;
    this.shopParams.pageNumber = 1;
    this.getProducts();
  }

  onReset() {
    this.searchInput.nativeElement.value = '';
    this.shopParams = new ShopParams();
    this.getProducts();
  }
}
