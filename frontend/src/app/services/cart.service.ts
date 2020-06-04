import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ProductService} from './product.service';
import {OrderService} from './order.service';
import {environment} from '../../environments/environment';
import {CartModelPublic, CartModelServer} from "../module/cart.module";
import {ProductModelServer} from "../module/product.module";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private serverUrl = environment.SERVICE_URL

  /* Variable to store data in the local storage*/
  private cartDataClient: CartModelPublic = {
    total: 0,
    prodData: [{
      inCart: 0,
      _id: 0
    }]
}

  /* Variable to store data in the server */
  private cartDataClient: CartModelServer = {
    total: 0,
    data: [{
      product: undefined,
      numberOfItemsInCart: 0
  }]
  }




  constructor(private http: HttpClient,
              private productService: ProductService,
              private orderService: OrderService) { }
}
