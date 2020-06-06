import { Component, OnInit } from '@angular/core';
import {CartModelServer} from "../../module/cart.module";
import {CartService} from "../../services/cart.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  cartData: CartModelServer;
  cartTotal: number


  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cartService.cartTotal$.subscribe(total => this.cartTotal = total);
    this.cartService.cartDataObs$.subscribe(data => this.cartData = data);


  }

}
