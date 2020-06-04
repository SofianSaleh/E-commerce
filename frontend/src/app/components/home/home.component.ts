import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';
import {ProductModelServer, ServerResponse} from '../../module/product.module';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  products: ProductModelServer[] = [];

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.productService
      .getAllProducts(3)
      .subscribe(
        (prods: ServerResponse) => {
          console.log(prods);
          this.products = prods.products;
        }
      );
  }
  selectedProduct(id: Number) {
    console.log(id);
    this.router.navigate(['/product', id]).then()
  }
}
