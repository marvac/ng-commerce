import { HttpClient, HttpParams } from '@angular/common/http';
import { mapToMapExpression } from '@angular/compiler/src/render3/util';
import { Injectable } from '@angular/core';
import { Pagination } from '../shared/models/pagination';
import { ProductBrand } from '../shared/models/productBrand';
import { ProductType } from '../shared/models/productType';
import { map } from 'rxjs/operators';
import { ShopParams } from '../shared/models/shopParams';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  baseUrl = 'https://localhost:5001/api'
  constructor(private http: HttpClient) { }

  getProducts(shopParams: ShopParams) {
    let params = new HttpParams();
    if (shopParams.brandId !== 0) {
      params = params.append('brandId', shopParams.brandId.toString());
    }
    if (shopParams.typeId !== 0) {
      params = params.append('typeId', shopParams.typeId.toString());
    }
    if (shopParams.searchText) {
      params = params.append('searchText', shopParams.searchText);
    }

    params = params.append('sort', shopParams.sorting);
    params = params.append('pageIndex', shopParams.pageNumber.toString());
    params = params.append('pageSize', shopParams.pageSize.toString());

    return this.http.get<Pagination>(`${this.baseUrl}/products`, { observe: 'response', params })
      .pipe(map(response => {
        return response.body;
      }));
  }

  getTypes() {
    return this.http.get<ProductType[]>(`${this.baseUrl}/products/types`);
  }

  getBrands() {
    return this.http.get<ProductBrand[]>(`${this.baseUrl}/products/brands`);
  }
}
