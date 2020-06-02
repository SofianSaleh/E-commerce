import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private SERVER_URL = environment.SERVICE_URL;

  constructor(private http: HttpClient) {}

  getAllProducts(numberOfResults = 10) {
    return this.http.get(`${this.SERVER_URL}/product`, {
      params: {
        limit: numberOfResults.toString(),
      },
    });
  }
}
