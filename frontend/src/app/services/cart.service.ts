import {Injectable} from '@angular/core';
import {ProductService} from './product.service';
import {BehaviorSubject} from 'rxjs';
import {CartModelPublic, CartModelServer} from '../module/cart.module';
import {ProductModelServer} from '../module/product.module';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {NavigationExtras, Router} from '@angular/router';
import {OrderService} from './order.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {ToastrService} from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})


export class CartService {

  ServerURL  = environment.SERVICE_URL;

  /* Variable to store data in the local storage*/
  // @ts-ignore
  private cartDataClient: CartModelPublic = {prodData: [{incart: 0, id: ''}], total: 0};


  /* Variable to store data in the server */
  // @ts-ignore
  private cartDataServer: CartModelServer = {
    data: [{
      product: undefined,
      numInCart: 0
    }],
    total: 0
  };

  // Observables to subscribe
  cartTotal$ = new BehaviorSubject<number>(0);
  // Data variable to store the cart information on the client's local storage

  cartDataObs$ = new BehaviorSubject<CartModelServer>(this.cartDataServer);


  constructor(private productService: ProductService,
              private orderService: OrderService,
              private httpClient: HttpClient,
              private router: Router,
              private spinner: NgxSpinnerService,
              private toastr: ToastrService) {


    this.cartTotal$.next(this.cartDataServer.total);
    this.cartDataObs$.next(this.cartDataServer);


    //  get the info from local Storage (if any)
    const info: CartModelPublic = JSON.parse(localStorage.getItem('cart'));

    if (info !== null && info !== undefined && info.prodData[0].incart !== 0) {
      // assign the value to our data variable which corresponds to the LocalStorage data format
      this.cartDataClient = info;
      // Loop through each entry and put it in the cartDataServer object
      this.cartDataClient.prodData.forEach(p => {
        this.productService.getSingleProduct(p._id).subscribe((actualProdInfo: ProductModelServer) => {
          if (this.cartDataServer.data[0].numInCart === 0) {
            this.cartDataServer.data[0].numInCart = p.incart;
            this.cartDataServer.data[0].product = actualProdInfo;
            this.CalculateTotal();
            this.cartDataClient.total = this.cartDataServer.total;
            localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
          } else {
            this.cartDataServer.data.push({
              numInCart: p.incart,
              product: actualProdInfo
            });
            this.CalculateTotal();
            this.cartDataClient.total = this.cartDataServer.total;
            localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
          }
          this.cartDataObs$.next({...this.cartDataServer});
        });
      });
    }
  }

  CalculateSubTotal(index): number {
    let subTotal = 0;

    const p = this.cartDataServer.data[index];
    // @ts-ignore
    subTotal = p.product.price * p.numInCart;

    return subTotal;
  }

//  add items to the cart
  AddProductToCart(id: string, quantity?: number) {

    this.productService.getSingleProduct(id).subscribe(prod => {
      // If the cart is empty
      const product = prod.product;

      if (this.cartDataServer.data[0].product === undefined) {
        this.cartDataServer.data[0].product = product;
        this.cartDataServer.data[0].numInCart = quantity !== undefined ? quantity : 1;
        this.CalculateTotal();

        this.cartDataClient.prodData[0].incart = this.cartDataServer.data[0].numInCart;
        // @ts-ignore
        this.cartDataClient.prodData[0].id = product._id;
        this.cartDataClient.total = this.cartDataServer.total;

        localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
        this.cartDataObs$.next({...this.cartDataServer});
        this.toastr.success(`${product.title} added to the cart.`, 'Product Added', {
          timeOut: 1500,
          progressBar: true,
          progressAnimation: 'increasing',
          positionClass: 'toast-top-right'
        });
      }  // END of IF
      // Cart is not empty
      else {
        // @ts-ignore
        // this.cartDataServer.data.product.
        const index = this.cartDataServer.data.findIndex(p => p.product._id ===  product._id);

        // 1. If chosen product is already in cart array
        if (index !== -1) {

  if (quantity !== undefined && quantity <= product.quantity) {
            // @ts-ignore
            // tslint:disable-next-line:max-line-length
            this.cartDataServer.data[index].numInCart =
              this.cartDataServer.data[index].numInCart < product.quantity ?
                quantity : product.quantity;
          } else {
            // @ts-ignore
            // tslint:disable-next-line:no-unused-expression
    this.cartDataServer.data[index].numInCart < product.quantity ?
              this.cartDataServer.data[index].numInCart++ : product.quantity;
          }


  this.cartDataClient.prodData[index].incart = this.cartDataServer.data[index].numInCart;
  this.toastr.info(`${product.title} quantity updated in the cart.`, 'Product Updated', {
            timeOut: 1500,
            progressBar: true,
            progressAnimation: 'increasing',
            positionClass: 'toast-top-right'
          });
        }
        // 2. If chosen product is not in cart array
        else {
          this.cartDataServer.data.push({
            product,
            numInCart: 1
          });
          this.cartDataClient.prodData.push({
            incart: 1,
            _id: product._id
          });
          this.toastr.success(`${product.title} added to the cart.`, 'Product Added', {
            timeOut: 1500,
            progressBar: true,
            progressAnimation: 'increasing',
            positionClass: 'toast-top-right'
          });
        }
        this.CalculateTotal();
        this.cartDataClient.total = this.cartDataServer.total;
        localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
        this.cartDataObs$.next({...this.cartDataServer});
      }  // END of ELSE


    });
  }

  UpdateCartData(index, increase: boolean) {
    const data = this.cartDataServer.data[index];
    if (increase) {
      // @ts-ignore
      // tslint:disable-next-line:no-unused-expression
      data.numInCart < data.product.quantity ? data.numInCart++ : data.product.quantity;
      this.cartDataClient.prodData[index].incart = data.numInCart;
      this.CalculateTotal();

      this.cartDataClient.total = this.cartDataServer.total;


      this.cartDataObs$.next({...this.cartDataServer});
      localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
    } else {
      // @ts-ignore
      data.numInCart--;

      // @ts-ignore
      if (data.numInCart < 1) {
        this.DeleteProductFromCart(index);
        this.cartDataObs$.next({...this.cartDataServer});
      } else {
        // @ts-ignore
        this.cartDataObs$.next({...this.cartDataServer});
        this.cartDataClient.prodData[index].incart = data.numInCart;
        this.CalculateTotal();
        this.cartDataClient.total = this.cartDataServer.total;
        localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
      }

    }

  }


  DeleteProductFromCart(index) {

    if (window.confirm('Are you sure you want to delete the item?')) {
      this.cartDataServer.data.splice(index, 1);
      this.cartDataClient.prodData.splice(index, 1);
      this.CalculateTotal();
      this.cartDataClient.total = this.cartDataServer.total;

      if (this.cartDataClient.total === 0) {
        this.cartDataClient = {prodData: [{incart: 0, id: ''}], total: 0};
        localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
      } else {
        localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
      }

      if (this.cartDataServer.total === 0) {
        this.cartDataServer = {
          data: [{
            product: undefined,
            numInCart: 0
          }],
          total: 0
        };
        this.cartDataObs$.next({...this.cartDataServer});
      } else {
        this.cartDataObs$.next({...this.cartDataServer});
      }
    }
    // If the user doesn't want to delete the product, hits the CANCEL button
    else {
      return;
    }


  }

  CheckoutFromCart(userId: number) {

    this.httpClient.post(`${this.ServerURL}orders/payment`, null).subscribe((res: { success: boolean }) => {
      console.clear();

      if (res.success) {


        this.resetServerData();
        this.httpClient.post(`${this.ServerURL}orders/new`, {
          user_Id: userId,
          products: this.cartDataClient.prodData
        }).subscribe((data: OrderConfirmationResponse) => {

          this.orderService.getSingleOrder(data.order._id).then(prods => {
            if (data.success) {
              const navigationExtras: NavigationExtras = {
                state: {
                  message: data.message,
                  products: prods,
                  orderId: data.order._id,
                  total: this.cartDataClient.total
                }
              };
              this.spinner.hide().then();
              this.router.navigate(['/thankyou'], navigationExtras).then(p => {
                // @ts-ignore
                this.cartDataClient = {prodData: [{incart: 0, id: ''}], total: 0};
                this.cartTotal$.next(0);
                localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
              });
            }
          });

        });
      } else {
        this.spinner.hide().then();
        this.router.navigateByUrl('/checkout').then();
        this.toastr.error(`Sorry, failed to book the order`, 'Order Status', {
          timeOut: 1500,
          progressBar: true,
          progressAnimation: 'increasing',
          positionClass: 'toast-top-right'
        });
      }
    });
  }

  private CalculateTotal() {
    let Total = 0;
    this.cartDataServer.data.forEach(p => {
      const {numInCart} = p;
      const {price} = p.product;

      Total += numInCart * price;
    });
    this.cartDataServer.total = Total;
    this.cartTotal$.next(this.cartDataServer.total);
  }

  private resetServerData() {
    this.cartDataServer = {
      data: [{
        product: undefined,
        numInCart: 0
      }],
      total: 0
    };
    this.cartDataObs$.next({...this.cartDataServer});
  }

}

interface OrderConfirmationResponse {
  success: boolean;
  message: string;
  order: {
    _id: string
    user_id: string,
    orders_id: any[]
  };
}


