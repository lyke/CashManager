import { DatabaseServiceInterface } from './databaseServiceInterface'
import * as mysql from 'mysql'
import { MysqlService } from './mysqlService'

export class DatabaseServiceFactory {
  private static db: DatabaseServiceInterface
  constructor() {
    if ( ! DatabaseServiceFactory.db ){
      this.createDatabase()
    }
  }

  public getDatabaseService(): DatabaseServiceInterface {
    return DatabaseServiceFactory.db
  }

  private createDatabase(): void{
    const db = mysql.createConnection({
      host: 'db4free.net',
      port: 3306,
      user: 'yvanyvan',
      password: 'yvanyvan',
      database: 'cash_manager',
    });

    db.connect((err) => {
      if (err) {
        console.error('Erreur de connexion à la base de données : ', err);
        process.exit(1);
      } else {
        console.log('Connecté à la base de données!');
      }
    });

    DatabaseServiceFactory.db = new MysqlService(db)
  }

}
