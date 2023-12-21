export interface Order {
  id?: number;
  insertId?: number;
  desc: string;
}

export interface DeleteOrderResponse {
  id: number;
}
