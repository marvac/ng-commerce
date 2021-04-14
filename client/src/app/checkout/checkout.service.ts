import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { DeliveryMethod } from '../shared/models/deliveryMethod';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
baseUrl= environment.apiUrl;
  constructor(private http: HttpClient) { }

  getDeliveryMethods(){
    return this.http.get(`${this.baseUrl}/orders/deliveryMethods`).pipe(
      map((deliveryMethods: DeliveryMethod[]) => {
        return deliveryMethods.sort((a, b) => b.price - a.price);
      })
    );
  }
}
