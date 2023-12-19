export interface Product {
  id?: number;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
  insertId?: number;
}

export interface DeleteProductResponse {
  id: number;
}
