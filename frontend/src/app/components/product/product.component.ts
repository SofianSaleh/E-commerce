import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ProductService} from '../../services/product.service';
import {CartService} from '../../services/cart.service';
import {ActivatedRoute} from '@angular/router';
import {ignore} from 'selenium-webdriver/testing';
import {map} from 'rxjs/operators';

declare let $: any;

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit, AfterViewInitit {
  id: number;
  product;
  thumbImages: any[] = [];

  constructor(private productService: ProductService,
              private cartService: CartService,
              private route: ActivatedRoute) {}

  ngOnInit(): void {
    console.log(`hit`)
    this.route.paramMap
      .pipe(
        map((param: ParamMap) => {
          console.log(param)
          return param.params.id;
        })
      )
      .subscribe(prodId => {
        console.log(prodId)
        this.id = prodId;
        this.productService.getSingleProduct(JSON.stringify(this.id)).subscribe(prod => {
          console.log(prod)
          this.product = prod

          if(prod.product.images !== null){
            this.thumbImages = prod.product.images;
          }
        })
      });
  }

  ngAfterViewInit(): void {

    // Product Main img Slick
    $('#product-main-img').slick({
      infinite: true,
      speed: 300,
      dots: false,
      arrows: true,
      fade: true,
      asNavFor: '#product-imgs',
    });

    // Product imgs Slick
    $('#product-imgs').slick({
      slidesToShow: 3,
      slidesToScroll: 1,
      arrows: true,
      centerMode: true,
      focusOnSelect: true,
      centerPadding: 0,
      vertical: true,
      asNavFor: '#product-main-img',
      responsive: [{
        breakpoint: 991,
        settings: {
          vertical: false,
          arrows: false,
          dots: true,
        }
      },
      ]
    });

    // Product img zoom
    const zoomMainProduct = document.getElementById('product-main-img');
    if (zoomMainProduct) {
      $('#product-main-img .product-preview').zoom();
    }
  }


}
