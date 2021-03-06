import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Basket } from '../shared/models/basket';
import { BasketService } from './basket.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {

  constructor(public basketService: BasketService) { }

  ngOnInit(): void {

  }

}
