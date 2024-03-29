import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';
import {ProductModelServer, ServerResponse} from '../../module/product.module';
import {CartService} from '../../services/cart.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  products: ProductModelServer[] = [];

  constructor(private productService: ProductService,
              private cartService: CartService,
              private router: Router) {}
  ngOnInit(): void {
    this.productService
      .getAllProducts(5)
      .subscribe(
        (prods: ServerResponse) => {

          this.products = prods.products;
        }
      );
    console.log(this.products)
  }

  selectedProduct(id: string) {
    this.router.navigate(['/product', id]).then()
  }


  addToCart(id: string) {
    this.cartService.AddProductToCart(id);
  }
}
