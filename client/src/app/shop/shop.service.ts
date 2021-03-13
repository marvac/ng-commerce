import { HttpClient, HttpParams } from '@angular/common/http';
import { mapToMapExpression } from '@angular/compiler/src/render3/util';
import { Injectable } from '@angular/core';
import { Pagination } from '../shared/models/pagination';
import { ProductBrand } from '../shared/models/productBrand';
import { ProductType } from '../shared/models/productType';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  baseUrl = 'https://localhost:5001/api'
  constructor(private http: HttpClient) { }

  getProducts(brandId?: number, typeId?: number) {
    let params = new HttpParams();
    if (brandId) {
      params = params.append('brandId', brandId.toString());
    }
    if (typeId) {
      params = params.append('typeId', typeId.toString());
    }

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
