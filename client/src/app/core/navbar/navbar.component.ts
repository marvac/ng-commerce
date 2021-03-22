import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BasketService } from 'src/app/basket/basket.service';
import { Basket } from 'src/app/shared/models/basket';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  //basket$: Observable<Basket>;
  constructor(public basketService: BasketService) { }

  ngOnInit(): void {
    //this.basket$ = this.basketService.basket$;
  }

}
