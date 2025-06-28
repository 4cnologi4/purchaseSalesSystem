import { Request, Response as ExpressResponse } from 'express';
import { AuthService } from '../services/auth.service';

export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  async login(req: Request, res: ExpressResponse): Promise<void> {
    const { email, password } = req.body;
    const response = await this.authService.login(email, password);
    res.status(response.status).json(response);
  }
} 