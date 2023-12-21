import { AdminsController } from "../controllers/admins.controller";
import { AdminsDao } from "../dao/admins.dao";
import { Admin } from "../types/admin";

export class AuthService {
    private adminsDao: AdminsDao;

    constructor() {
        this.adminsDao = new AdminsDao();
    }

    public async login(username: string, password: string): Promise<string> {
        return this.adminsDao.auth(username,password)
    }
}