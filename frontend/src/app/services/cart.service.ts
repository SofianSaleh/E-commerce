import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ProductService} from './product.service';
import {OrderService} from './order.service';
import {environment} from '../../environments/environment';
import {CartModelPublic, CartModelServer} from '../module/cart.module';
import {BehaviorSubject} from 'rxjs';
import { Router} from '@angular/router';
import {ProductModelServer} from '../module/product.module';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private serverUrl = environment.SERVICE_URL;

  /* Variable to store data in the local storage*/
  private cartDataClient: CartModelPublic = {
    total: 0,
    prodData: [{
      inCart: 0,
      _id: 0
    }]
};

  /* Variable to store data in the server */
  private cartDataServer: CartModelServer = {
    total: 0,
    data: [{
      product: undefined,
      numberOfItemsInCart: 0
  }]
  };

  // Observables to subscribe
  cartTotal$ = new BehaviorSubject<number>(0);
  cartData$ = new BehaviorSubject<CartModelServer>(this.cartDataServer);


  constructor(private http: HttpClient,
              private productService: ProductService,
              private orderService: OrderService,
              private router: Router) {

    this.cartTotal$.next(this.cartDataServer.total);
    this.cartData$.next(this.cartDataServer);
    //  get the info from local Storage (if any)
    const info: CartModelPublic = JSON.parse(localStorage.getItem('cart'));

    if (info !== null && info !== undefined && info.prodData){
      // Local storage is not empty
      this.cartDataClient = info;
      //  Loop through and put it in the cartDataServer
      this.cartDataClient.prodData.forEach((p) => {

        this.productService.getSingleProduct(p._id).subscribe((actualProduct: ProductModelServer) => {

          if (this.cartDataServer.data[0].numberOfItemsInCart === 0){
            this.cartDataServer.data[0].numberOfItemsInCart = p.inCart;
            this.cartDataServer.data[0].product = actualProduct;
          // Calculate the value
            this.cartDataClient.total = this.cartDataServer.total;
            localStorage.setItem('cart', JSON.stringify(this.cartDataClient));

          }else {
          //  that means there is something in the local storage
            this.cartDataServer.data.push({
              numberOfItemsInCart: p.inCart,
              product: actualProduct
            });
            // Calculate the value
            this.cartDataClient.total = this.cartDataServer.total;
            localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
          }
          this.cartData$.next({...this.cartDataServer});
        });
      });
    }
  }

//  add items to the cart
  addProductToCart(id: number, quantity?: number) {
    
  }
}
