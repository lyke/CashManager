import * as bcrypt from 'bcrypt';
import { DatabaseError, DatabaseServiceInterface } from './database/databaseServiceInterface'

import { Admin, DeleteAdminResponse } from '../types/admin';
import { DatabaseServiceFactory } from './database/databaseServiceFactory'

export class AdminsDao {
  private db: DatabaseServiceInterface
  constructor() {
    this.db = new DatabaseServiceFactory().getDatabaseService()
  }

  public async getAllAdmins(): Promise<Admin[]> {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM admin';

      this.db.queryCallback(query, (error: DatabaseError | null, results: Admin[]) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });


    });
  }

  public async getAdminById(id: number): Promise<Admin> {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM admin WHERE id = ?';

      this.db.queryCallbackValues(query, [id], (error: DatabaseError | null, results: Admin) => {
        if (error) {
          reject(error);
        } else {

          if (Array.isArray(results)) {
            resolve(results[0]);
          } else {
            resolve(results);
          }

        }
      });
    });
  }

  public async createAdmin(admin: Admin): Promise<Admin> {
    console.log("create Admin");

    try {
      const { password, ...adminData } = admin;
      const hashedPassword = await bcrypt.hash(password, 10);
      console.log(hashedPassword);
      const adminWithHashedPassword = { ...adminData, password: hashedPassword };

      const query = 'INSERT INTO admin SET ?';

      return new Promise((resolve, reject) => {
        this.db.queryCallbackValues(query, [adminWithHashedPassword], (error: DatabaseError | null, results: Admin) => {
          if (error) {
            reject(error);
          } else {
            resolve(adminWithHashedPassword);
          }
        });
      });
    } catch (error) {
      throw new Error('Erreur lors de la création de l\'administrateur');
    }
  }

  public async updateAdmin(id: number, admin: Admin): Promise<Admin> {
    return new Promise((resolve, reject) => {
      const query = 'UPDATE admin SET ? WHERE id = ?';

      this.db.queryCallbackValues(query, [admin, id], (error: DatabaseError | null) => {
        if (error) {
          reject(error);
        } else {
          resolve({ id, ...admin });
        }
      });
    });
  }

  public async deleteAdmin(id: number): Promise<DeleteAdminResponse> {
    return new Promise<DeleteAdminResponse>((resolve, reject) => {
      const query = 'DELETE FROM admin WHERE id = ?';

      this.db.queryCallbackValues(query, [id], (error: DatabaseError | null) => {
        if (error) {
          reject(error);
        } else {
          resolve({ id });
        }
      });
    });
  }

  public async auth(username: string, password: string): Promise<string> {
    return new Promise(async (resolve, reject) => {
      try {
        console.log(username +" / " +password);

        const query = 'SELECT * FROM admin WHERE username = ?';

        this.db.queryCallbackValues(query, [username], async (error: DatabaseError | null, results: Admin) => {
          if (error) {
            reject('Erreur lors de l\'authentification');
            return;
          }

          if (!results) {
            reject('Nom d\'utilisateur invalide');
            return;
          }

          const jsondata = JSON.stringify(results)
          const parsedData = JSON.parse(jsondata)

          const hashedPassword = parsedData[0].password
          const passwordMatch = await bcrypt.compare(password, hashedPassword);

          if (!passwordMatch) {
            reject('Mot de passe incorrect');
            return;
          }

          // Générez le jeton d'authentification (vous devrez utiliser la bibliothèque appropriée pour cela)
          const token = 'votre_token';

          resolve(token);
        });
      } catch (error) {
        reject('Erreur lors de l\'authentification');
      }
    });
  }


}
