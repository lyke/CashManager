import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/auth.service';

export class AuthController {
    private authService: AuthService

    constructor(){
        this.authService = new AuthService();
    }
    public async login(req: Request, res: Response, next: NextFunction) {
        try {
            console.log("Tentative de connexion");
            
            const { username, password } = req.body;
            const admin = await this.authService.login(username,password)

            // Retournez une réponse avec le jeton d'authentification
            res.status(200).json({ message: 'Vous êtes connecté.' });
        } catch (error) {
            console.error('AuthController.login - Erreur lors de la connexion : ', error);
            res.status(500).json({ error: 'Erreur lors de la connexion' });
            next(error);
        }
    }

}