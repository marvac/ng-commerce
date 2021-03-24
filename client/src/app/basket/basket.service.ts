import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Basket, BasketImpl, BasketItem, BasketTotals } from '../shared/models/basket';
import { Product } from '../shared/models/product';

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  baseUrl = environment.apiUrl;
  private basketSource = new BehaviorSubject<Basket>(null);
  basket$ = this.basketSource.asObservable();
  private basketTotalSource = new BehaviorSubject<BasketTotals>(null);
  basketTotal$ = this.basketTotalSource.asObservable();

  constructor(private http: HttpClient) { }

  getBasket(id: string) {
    return this.http.get(`${this.baseUrl}/basket?id=${id}`)
      .pipe(map((basket: Basket) => {
        this.basketSource.next(basket);
        this.calculateTotals();
      }));
  }

  setBasket(basket: Basket) {
    return this.http.post(`${this.baseUrl}/basket`, basket).subscribe((res: Basket) => {
      this.basketSource.next(res);
      this.calculateTotals();
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

  removeItemFromBasket(item: BasketItem) {
    const basket = this.getCurrentBasketValue();
    if (basket.items.some(x => x.id === item.id)) {
      basket.items = basket.items.filter(i => i.id !== item.id);
      if (basket.items.length > 0) {
        this.setBasket(basket);
      }
      else {
        this.deleteBasket(basket);
      }
    }
  }

  deleteBasket(basket: Basket) {
    this.http.delete(`${this.baseUrl}/basket?id=${basket.id}`).subscribe(() => {
      this.basketSource.next(null);
      this.basketTotalSource.next(null);
      localStorage.removeItem('basket_id');
    }, error => {
      console.log(error);
    });
  }

  incrementItemQuantity(item: BasketItem) {
    const basket = this.getCurrentBasketValue();
    const foundItemIndex = basket.items.findIndex(x => x.id === item.id);
    basket.items[foundItemIndex].quantity += 1;
    this.setBasket(basket);
  }

  decrementItemQuantity(item: BasketItem) {
    const basket = this.getCurrentBasketValue();
    const foundItemIndex = basket.items.findIndex(x => x.id === item.id);
    if (basket.items[foundItemIndex].quantity > 1) {
      basket.items[foundItemIndex].quantity -= 1;
    }
    else {
      this.removeItemFromBasket(item);
    }
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

  private calculateTotals() {
    const basket = this.getCurrentBasketValue();
    const shippingCost = 0;
    const subtotal = basket.items.reduce((prev, item) => (item.price * item.quantity) + prev, 0);
    const total = shippingCost + subtotal;
    this.basketTotalSource.next({
      shippingCost, total, subtotal
    });
  }

}

