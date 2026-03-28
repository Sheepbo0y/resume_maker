import { Request, Response } from 'express';
import PdfService from '../services/pdfService';
import { renderTemplate } from '../services/templateRenderer';
import { JsonResume } from '../types/resume';

// Simple controller to export resume as PDF
export async function exportPDF(req: Request, res: Response) {
  try {
    const { resume, template = 'default', options } = req.body as { resume: JsonResume; template?: string; options?: any };

    if (!resume) {
      res.status(400).json({ error: 'Missing resume data' });
      return;
    }

    // Render HTML using template renderer (safe HTML)
    const html = renderTemplate(resume, template);

    // Generate PDF with Puppeteer
    const margin = options?.margin ?? { top: '10mm', right: '10mm', bottom: '10mm', left: '10mm' };
    const pdfBuffer = await PdfService.generatePDF(html, {
      format: 'A4',
      margin,
    });

    // Stream PDF back to client
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="resume.pdf"');
    res.status(200).send(pdfBuffer);
  } catch (err) {
    console.error('PDF export error:', err);
    res.status(500).json({ error: 'Failed to generate PDF' });
  }
}

export default exportPDF;
