import {ProductModelServer} from "./product.module";

export interface CartModelServer {
  total: number;
  data: [{
    product: ProductModelServer,
    numberOfItemsInCart: number;
  }];
}

export interface CartModelPublic {
  total: number;
  prodData: [{
    _id: number,
    inCart: number;
  }];
}
