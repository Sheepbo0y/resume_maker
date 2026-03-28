import { Request, Response, NextFunction } from 'express';
import { ResumeService } from '../services/resumeService';

export class ResumeController {
  private resumeService = new ResumeService();

  async list(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).user?.id;
      if (!userId) {
        return res.status(401).json({ ok: false, error: 'Unauthorized' });
      }
      const data = await this.resumeService.list(userId);
      res.json({ ok: true, data });
    } catch (err) {
      next(err);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).user?.id;
      if (!userId) {
        return res.status(401).json({ ok: false, error: 'Unauthorized' });
      }
      const data = await this.resumeService.create(userId, req.body);
      res.status(201).json({ ok: true, data });
    } catch (err) {
      next(err);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).user?.id;
      if (!userId) {
        return res.status(401).json({ ok: false, error: 'Unauthorized' });
      }
      const id = Number(req.params.id);
      const data = await this.resumeService.update(id, userId, req.body);
      res.json({ ok: true, data });
    } catch (err) {
      next(err);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).user?.id;
      if (!userId) {
        return res.status(401).json({ ok: false, error: 'Unauthorized' });
      }
      const id = Number(req.params.id);
      await this.resumeService.delete(id, userId);
      res.json({ ok: true, message: 'Resume deleted' });
    } catch (err) {
      next(err);
    }
  }
}

export default new ResumeController();
