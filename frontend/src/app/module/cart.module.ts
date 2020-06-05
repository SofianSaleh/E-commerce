import {ProductModelServer} from "./product.module";

export interface CartModelServer {
  total: number;
  data: [{
    product: ProductModelServer,
    numInCart: number;
  }];
}

export interface CartModelPublic {
  total: number;
  prodData: [{
    _id: string;
    incart: number;
  }];
}
