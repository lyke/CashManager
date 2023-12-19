export interface Admin {
  id?: number;
  username: string;
  password: string;
  insertId?: number;
}

export interface DeleteAdminResponse {
  id: number;
}
