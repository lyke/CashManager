export interface Order {
  id?: number;
  insertId?: number;
  desc: Text;
}

export interface DeleteOrderResponse {
  id: number;
}
