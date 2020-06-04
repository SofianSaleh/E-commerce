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
    this.productService.getSingleProduct(id).subscribe(prod => {

      // 1. If the cart is not empty

      if (this.cartDataServer.data[0] === undefined) {
        this.cartDataServer.data[0].product = prod;
        this.cartDataServer.data[0].numberOfItemsInCart = quantity !== undefined ? quantity : 1 ;
      //  TODO: count the total
        this.cartDataClient.prodData[0].inCart = this.cartDataServer.data[0].numberOfItemsInCart;
        this.cartDataClient.prodData[0]._id = prod._id;
        this.cartDataClient.total = this.cartDataServer.total;

        localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
        this.cartData$.next({...this.cartDataServer});
        //  TODO: push notification
      }else{
    //  2. If cart is not empty
        const index = this.cartDataServer.data.findIndex(p => p.product._id === prod._id); // will be -1 or positive number
    //  2.a If the product already exists
        if (index !== -1){
          if (quantity !== undefined && quantity <= prod.quantity){
            this.cartDataServer.data[index].numberOfItemsInCart =
              this.cartDataServer.data[index].numberOfItemsInCart < prod.quantity ? quantity : prod.quantity;
          }else {
            this.cartDataServer.data[index].numberOfItemsInCart =
              this.cartDataServer.data[index].numberOfItemsInCart < prod.quantity ?
                this.cartDataServer.data[index].numberOfItemsInCart++ : prod.quantity;
          }
          this.cartDataClient.prodData[index].inCart = this.cartDataServer.data[index].numberOfItemsInCart;
          //  TODO: push notification
      }else {
        this.cartDataServer.data.push({
          numberOfItemsInCart: 1,
          product: prod
        });
        this.cartDataClient.prodData.push({
            inCart: 1,
            _id: prod._id
          });
          //  TODO: push notification
          //  TODO: count the total
        this.cartDataClient.total = this.cartDataServer.total;
        localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
        this.cartData$.next(({...this.cartDataServer}));

        }
      }

    });
  }

  updateCartItems(index: number, increase: boolean){
    const data = this.cartDataServer.data[index];
    if (increase) {
      data.numberOfItemsInCart < data.product.quantity ? data.numberOfItemsInCart++ : data.product.quantity;
      this.cartDataClient.prodData[index].inCart = data.numberOfItemsInCart;
      //  TODO: count the total
      this.cartDataClient.total = this.cartDataServer.total;
      localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
      this.cartData$.next(({...this.cartDataServer}));
    }else {
      data.numberOfItemsInCart--;

      if (data.numberOfItemsInCart < 1) {
      //  TODO: Delete prosuct from cart
        this.cartData$.next(({...this.cartDataServer}));
      }else{
        this.cartData$.next(({...this.cartDataServer}));
        this.cartDataClient.prodData[index].inCart = data.numberOfItemsInCart;
        //  TODO: count the total
        this.cartDataClient.total = this.cartDataServer.total;
        localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
      }
    }
  }

  deleteProductFromCart(index: number) {
    if (window.confirm(`You want to remove this item from your cart`)) {
      this.cartDataServer.data.splice(index, 1);
      this.cartDataClient.prodData.splice(index, 1);
      //  TODO: count the total
      this.cartDataClient.total = this.cartDataServer.total;

      if (this.cartDataClient.total === 0){
        this.cartDataClient = {
          total: 0,
          prodData: [{
            inCart: 0,
            _id: 0
          }]
        };
        localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
      }else {
        localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
      }
      if (this.cartDataServer.total === 0){
        this.cartDataServer = {
          total: 0,
          data: [{
            product: undefined,
            numberOfItemsInCart: 0
          }]
        };
        this.cartData$.next(({...this.cartDataServer}));

      }else {
        this.cartData$.next(({...this.cartDataServer}));

      }
    }else {
      // TODO: if the user clicks the cancel button
    }
  }
}
