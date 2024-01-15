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
    /**
     * @swagger
     * /auth/:
     *   post:
     *     tags: ["Authentication"]
     *     summary: User login
     *     produces:
     *       - application/json
     *     parameters:
     *       - in: body
     *         name: credentials
     *         description: The user credentials
     *         schema:
     *           type: object
     *           properties:
     *             username:
     *               type: string
     *               example: john_doe
     *             password:
     *               type: string
     *               example: secret_password
     *     responses:
     *       200:
     *         description: Success - user logged in
     *       400:
     *         description: Malformed request syntax
     *       401:
     *         description: Unauthorized
     *       500:
     *         description: Error during authentication
     */
    this.api.post(
        '/',
        this.authController.login.bind(this.authController)
    );
    }
}