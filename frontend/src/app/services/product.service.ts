import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import {Observable} from 'rxjs';
import {ProductModelServer, ServerResponse} from '../module/product.module';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private SERVER_URL = environment.SERVICE_URL;

  constructor(private http: HttpClient) {}

  // get all products for the home page
  // this wil be changed based on user pref

  getAllProducts(numberOfResults = 10): Observable<ServerResponse> {
    return this.http.get<ServerResponse>(`${this.SERVER_URL}/product`, {
      params: {
        limit: numberOfResults.toString(),
      },
    });
  }

//  Get a single product
  getSingleProduct(id: string): Observable<ProductModelServer>{
    return this.http.get<ProductModelServer>(`${this.SERVER_URL}/product/${id}`);
  }

//  Get products from category
  getCategoryProducts(category: string): Observable<ProductModelServer[]> {
    return this.http.get<ProductModelServer[]>(`${this.SERVER_URL}/PRODUCT/CATEGORY/${category}`);
  }
}
