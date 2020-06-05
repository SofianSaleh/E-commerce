import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private products: ProductResponseInterface[] = []
  private serverUrl = environment.SERVICE_URL

  constructor(private http: HttpClient) { }

// get single order

  getSingleOrder(id: string){
    return this.http.get<ProductResponseInterface>(`${this.serverUrl}/order/${id}`).toPromise();
  }
}


interface ProductResponseInterface {
  _id: number;
  title: string;
  description: string;
  price: number;
  quantity: number;
  image: string;
}
