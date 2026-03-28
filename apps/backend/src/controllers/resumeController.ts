import { Request, Response, NextFunction } from 'express';
import { ResumeService } from '../services/resumeService';

export class ResumeController {
  private resumeService = new ResumeService();

  async list(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await this.resumeService.list();
      res.json({ ok: true, data });
    } catch (err) {
      next(err);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await this.resumeService.create(req.body);
      res.status(201).json({ ok: true, data });
    } catch (err) {
      next(err);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const data = await this.resumeService.update(id, req.body);
      res.json({ ok: true, data });
    } catch (err) {
      next(err);
    }
  }
}

export default new ResumeController();
