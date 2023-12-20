import * as mysql from 'mysql';
import { DatabaseError, DatabaseServiceInterface } from './databaseServiceInterface'
import { MysqlError } from 'mysql'

export class MysqlService implements DatabaseServiceInterface {
  private db: mysql.Connection
  constructor(db: mysql.Connection) {
    this.db = db
  }

  query(query: string): void{
    this.db.query(query)
  }
  queryCallback(options: string, callback?: (error: DatabaseError  | null, result: any | null) => void): void {
    this.db.query(options, (error: MysqlError | null, result: any[]) => {
      if (! callback) { return }
      if (error) {
        callback(new DatabaseError(error.message), null);
      } else {
        callback(null, result);
      }
    });
  }
  queryCallbackValues(options: string, values: any[], callback?: (error: DatabaseError  | null, result: any[] | null) => void): void {
    this.db.query(options, values, (error: MysqlError | null, result: any[]) => {
      if (! callback) { return }
      if (error) {
        callback(new DatabaseError(error.message), null);
      } else {
        callback(null, result);
      }
    });
  }

}