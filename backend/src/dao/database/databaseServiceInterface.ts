export interface DatabaseServiceInterface {
  query(query: string): void;

  queryCallback(options: string, callback?: (error: DatabaseError | null, result: any | null) => void): void;

  queryCallbackValues(options: string, values: any[], callback?: (error: DatabaseError | null, result: any | null) => void): void;
}

export class DatabaseError {
  message: string

  constructor(message: string) {
    this.message = message
  }

}