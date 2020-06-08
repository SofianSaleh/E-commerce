export interface Category {
  title: string;
}

export interface ProductModelServer {
  product: {
    images: any[];
    _id: string;
    title: string;
    description: string;
    image: string;
    quantity: number;
    price: number;
    category_id: Category;
  };

}export interface ProductModelServer1 {
  // product: {
    _id: string;
    title: string;
    description: string;
    image: string;
    quantity: number;
    price: number;
    category_id: Category;
  // };
}



export interface ServerResponse {
  count: number;
  message: string;
  products: ProductModelServer[];
}
