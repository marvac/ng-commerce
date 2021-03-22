import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Basket, BasketImpl, BasketItem } from '../shared/models/basket';
import { Product } from '../shared/models/product';

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  baseUrl = environment.apiUrl;
  private basketSource = new BehaviorSubject<Basket>(null);
  basket$ = this.basketSource.asObservable();

  constructor(private http: HttpClient) { }

  getBasket(id: string) {
    return this.http.get(`${this.baseUrl}/basket?id=${id}`)
      .pipe(map((basket: Basket) => {
        this.basketSource.next(basket);
        console.log(this.getCurrentBasketValue());
      }));
  }

  setBasket(basket: Basket) {
    return this.http.post(`${this.baseUrl}/basket`, basket).subscribe((res: Basket) => {
      this.basketSource.next(res);
      console.log(res);
    }, error => {
      console.log(error);
    });
  }

  getCurrentBasketValue() {
    return this.basketSource.value;
  }

  addItemToBasket(item: Product, quantity = 1) {
    const itemToAdd: BasketItem = this.mapToBasketItem(item, quantity);
    const basket = this.getCurrentBasketValue() ?? this.createBasket();
    basket.items = this.updateItem(basket.items, itemToAdd, quantity);
    this.setBasket(basket);
  }

  private updateItem(items: BasketItem[], itemToAdd: BasketItem, quantity: number): BasketItem[] {
    const index = items.findIndex(i => i.id === itemToAdd.id);
    if (index < 0) {
      //item not found
      itemToAdd.quantity = quantity;
      items.push(itemToAdd);
    } else {
      items[index].quantity += quantity;
    }

    return items;
  }

  private createBasket() {
    const basket = new BasketImpl();
    localStorage.setItem('basket_id', basket.id);
    return basket;
  }

  private mapToBasketItem(item: Product, quantity: number): BasketItem {
    return {
      id: item.id,
      productName: item.name,
      price: item.price,
      imageUrl: item.imageUrl,
      quantity,
      brand: item.productBrand,
      type: item.productType
    };
  }

}

