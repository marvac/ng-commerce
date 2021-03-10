import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Pagination } from './models/pagination';
import { Product } from './models/product';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  products: Product[] = [];

  constructor(private http: HttpClient) {
  }
  
  ngOnInit(): void {
    let get = this.http.get<Pagination>('https://localhost:5001/api/products')
    get.subscribe((products: Pagination) => {
      this.products = products.data;
    }, error => {
      console.log(error);
    });
  }
  
 
}
