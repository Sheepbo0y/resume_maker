import express from 'express';
import authController from '../controllers/authController';
import resumeController from '../controllers/resumeController';
import { authMiddleware } from '../middleware/authMiddleware';
import validateRegistration from '../validation/middleware/validateRegistration';
import validateLogin from '../validation/middleware/validateLogin';
import validateResume from '../validation/middleware/validateResume';

const router = express.Router();

router.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

router.post('/auth/register', validateRegistration, (req, res, next) => authController.register(req, res, next));
router.post('/auth/login', validateLogin, (req, res, next) => authController.login(req, res, next));

// Protected resumes routes
router.get('/resumes', authMiddleware, (req, res, next) => resumeController.list(req, res, next));
router.post('/resumes', authMiddleware, validateResume, (req, res, next) => resumeController.create(req, res, next));
router.put('/resumes/:id', authMiddleware, validateResume, (req, res, next) => resumeController.update(req, res, next));

export default router;
