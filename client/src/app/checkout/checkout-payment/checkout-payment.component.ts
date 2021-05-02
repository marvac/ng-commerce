import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BasketService } from 'src/app/basket/basket.service';
import { Basket } from 'src/app/shared/models/basket';
import { Order } from 'src/app/shared/models/order';
import { CheckoutService } from '../checkout.service';

@Component({
  selector: 'app-checkout-payment',
  templateUrl: './checkout-payment.component.html',
  styleUrls: ['./checkout-payment.component.scss']
})
export class CheckoutPaymentComponent implements OnInit {
  @Input() checkoutForm: FormGroup;

  constructor(private basketService: BasketService, private checkoutService: CheckoutService, private toastr: ToastrService, private router: Router) { }

  ngOnInit(): void {
  }

  submitOrder(){
    const basket: Basket = this.basketService.getCurrentBasketValue();
    const orderToCreate = this.getOrderToCreate(basket);
    this.checkoutService.createOrder(orderToCreate).subscribe((order: Order) => {
      this.basketService.deleteLocalBasket(basket.id);
      this.toastr.success('Order created successfully');

      const navExtras: NavigationExtras = {state: order};
      this.router.navigate(['/checkout/success'], navExtras);
      
      console.log(order);
    }, error => {
      this.toastr.error(error);
    });
  }

  getOrderToCreate(basket: Basket){
    return {
      basketId: basket.id,
      deliveryMethodId: +this.checkoutForm.get('deliveryForm').get('deliveryMethod').value,
      shipToAddress: this.checkoutForm.get('addressForm').value
    };
  }

}
