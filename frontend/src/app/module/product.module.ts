export interface Category {
  title: string;
}

export interface ProductModelServer {
  _id: number;
  title: string;
  description: string;
  image: string;
  price: number;
  category_id: Category;
}


export interface ServerResponse {
  count: number;
  message: string;
  products: ProductModelServer[];
}
