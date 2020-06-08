import { Component, OnInit } from '@angular/core';
import {CartModelServer} from "../../module/cart.module";
import {CartService} from "../../services/cart.service";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartData: CartModelServer;
  cartTotal: number;
  subTotal: number

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cartService.cartDataObs$.subscribe((data ) => this.cartData = data);
    this.cartService.cartTotal$.subscribe(total => this.cartTotal = total)
  }


  ChangeQuantity(id: number, increaseQuantity: boolean) {
    this.cartService.UpdateCartData(id, increaseQuantity);
  }
}
