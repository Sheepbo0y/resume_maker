import express from 'express';
import authController from '../controllers/authController.js';
import resumeController from '../controllers/resumeController.js';
import pdfRoutes from './pdfRoutes.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import validateRegistration from '../validation/middleware/validateRegistration.js';
import validateLogin from '../validation/middleware/validateLogin.js';
import validateResume from '../validation/middleware/validateResume.js';

const router = express.Router();

router.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

router.post('/auth/register', validateRegistration, (req, res, next) => authController.register(req, res, next));
router.post('/auth/login', validateLogin, (req, res, next) => authController.login(req, res, next));

router.get('/resumes', authMiddleware, (req, res, next) => resumeController.list(req, res, next));
router.post('/resumes', authMiddleware, validateResume, (req, res, next) => resumeController.create(req, res, next));
router.put('/resumes/:id', authMiddleware, validateResume, (req, res, next) => resumeController.update(req, res, next));
router.delete('/resumes/:id', authMiddleware, (req, res, next) => resumeController.delete(req, res, next));

// PDF export routes
router.use('/pdf', pdfRoutes);

export default router;
