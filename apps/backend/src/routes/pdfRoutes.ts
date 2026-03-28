import express from 'express';
import { exportPDF } from '../controllers/pdfController';
import { authMiddleware } from '../middleware/auth';
import validatePdfExport from '../validation/middleware/validatePdfExport';

const router = express.Router();

// POST /api/pdf/export
router.post('/export', authMiddleware, validatePdfExport, exportPDF);

export default router;
