import express from 'express';
import { exportPDF } from '../controllers/pdfController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import validatePdfExport from '../validation/middleware/validatePdfExport.js';

const router = express.Router();

// POST /api/pdf/export
router.post('/export', authMiddleware, validatePdfExport, exportPDF);

export default router;
