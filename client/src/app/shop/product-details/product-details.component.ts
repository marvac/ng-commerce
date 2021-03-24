import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BasketService } from 'src/app/basket/basket.service';
import { Product } from 'src/app/shared/models/product';
import { BreadcrumbService } from 'xng-breadcrumb';
import { ShopService } from '../shop.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  product: Product;
  quantity = 1;

  constructor(
    private shopService: ShopService,
    private activatedRoute: ActivatedRoute,
    private breadcrumbService: BreadcrumbService,
    private basketService: BasketService) {

    this.breadcrumbService.set('@productDetails', ' ');
  }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.shopService.getProduct(+id).subscribe((product: Product) => {
      this.product = product;
      this.breadcrumbService.set('@productDetails', product.name);
    }, error => {
      console.log(error);
    });
  }

  addItemToBasket() {
    this.basketService.addItemToBasket(this.product, this.quantity);
  }

  incrementQuantity() {
    this.quantity += 1
  }

  decrementQuantity() {
    if (this.quantity > 1) {
      this.quantity -= 1;
    }
  }

}
