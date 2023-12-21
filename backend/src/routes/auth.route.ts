import express, { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';

export class AuthRoute {
    private api: Router = express.Router();
    private readonly authController: AuthController;

    constructor() {
        this.authController = new AuthController();
        this.routes();
    }

    public getRouter(): Router {
        return this.api;
    }

    private routes(): void {
        this.api.post(
            '/login',
            this.authController.login.bind(this.authController)
        );

        this.api.post(
            '/register',
            this.authController.register.bind(this.authController)
        );

        this.api.post(
            '/logout',
            this.authController.logout.bind(this.authController)
        );
    }
}