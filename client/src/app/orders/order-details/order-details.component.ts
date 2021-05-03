import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order } from 'src/app/shared/models/order';
import { BreadcrumbService } from 'xng-breadcrumb';
import { OrdersService } from '../orders.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {
  order: Order;

  constructor(private route: ActivatedRoute, private breadcrumbService: BreadcrumbService, 
    private orderService: OrdersService) {
      this.breadcrumbService.set('@OrderDetailed', ' ');
     }

  ngOnInit(): void {
    this.orderService.getOrderDetails(+this.route.snapshot.paramMap.get('id'))
      .subscribe((order: Order) => {
        console.log(order);
        this.order = order;
        this.breadcrumbService.set('@OrderDetails', `Order# ${order.id} - ${order.status}`);
      }, error => {
        console.log(error);
      })
  }
}