export interface Category {
  title: string;
}

export interface ProductModelServer {
  _id: number;
  title: string;
  description: string;
  image: string;
  quantity: number;
  price: number;
  category_id: Category;
}


export interface ServerResponse {
  count: number;
  message: string;
  products: ProductModelServer[];
}
