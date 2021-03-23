import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { PagingHeaderComponent } from './components/paging-header/paging-header.component';
import { PagingControlComponent } from './components/paging-control/paging-control.component';
import { OrderTotalsComponent } from './components/order-totals/order-totals.component';

@NgModule({
  declarations: [
    PagingHeaderComponent,
    PagingControlComponent,
    OrderTotalsComponent
  ],
  imports: [
    CommonModule,
    PaginationModule.forRoot()
  ],
  exports: [
    PaginationModule,
    PagingControlComponent,
    PagingHeaderComponent,
    OrderTotalsComponent
  ]
})
export class SharedModule { }
