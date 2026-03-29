import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/authService.js';

export class AuthController {
  private authService = new AuthService();

  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.authService.register(req.body);
      res.status(201).json({ ok: true, data: result });
    } catch (err) {
      next(err);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.authService.login(req.body);
      res.json({ ok: true, data: result });
    } catch (err) {
      next(err);
    }
  }
}

export default new AuthController();