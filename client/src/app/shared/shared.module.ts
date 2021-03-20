import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { PagingHeaderComponent } from './components/paging-header/paging-header.component';
import { PagingControlComponent } from './components/paging-control/paging-control.component';

@NgModule({
  declarations: [
    PagingHeaderComponent,
    PagingControlComponent
  ],
  imports: [
    CommonModule,
    PaginationModule.forRoot()
  ],
  exports: [
    PaginationModule,
    PagingControlComponent,
    PagingHeaderComponent
  ]
})
export class SharedModule { }
