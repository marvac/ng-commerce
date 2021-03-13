import { Component, OnInit } from '@angular/core';
import { Product } from '../shared/models/product';
import { ProductBrand } from '../shared/models/productBrand';
import { ProductType } from '../shared/models/productType';
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
  selectedBrandId: number = 0;
  selectedTypeId: number = 0;


  constructor(private shopService: ShopService) { }

  ngOnInit(): void {
    this.getProducts();
    this.getBrands();
    this.getTypes();
  }

  getProducts() {
    this.shopService.getProducts(this.selectedBrandId, this.selectedTypeId).subscribe(res => {
      this.products = res.data;
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
    this.selectedBrandId = brandId;
    this.getProducts();
  }

  onTypeSelected(typeId: number) {
    this.selectedTypeId = typeId;
    this.getProducts();
  }
}
