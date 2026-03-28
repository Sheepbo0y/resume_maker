import puppeteer from 'puppeteer';

export interface PdfOptions {
  width?: number; // not used directly by Puppeteer, kept for future extension
  height?: number;
  margin?: {
    top?: string;
    right?: string;
    bottom?: string;
    left?: string;
  };
  format?: 'A4' | 'Letter' | string;
}

export class PdfService {
  private browser?: puppeteer.Browser;

  private async ensureBrowser(): Promise<puppeteer.Browser> {
    if (this.browser) return this.browser;
    // It's common to pass --no-sandbox in certain environments (CI, containers)
    this.browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] });
    return this.browser;
  }

  public async generatePDF(htmlContent: string, options: PdfOptions = {}): Promise<Buffer> {
    const browser = await this.ensureBrowser();
    const page = await browser.newPage();
    // Security: sanitize HTML and disable script execution unless explicitly allowed by template renderer
    // We rely on templateRenderer to produce safe HTML; here we just set content.
    await page.setContent(htmlContent, { waitUntil: 'networkidle0' });

    // Default A4 print settings with margins
    const margin = options.margin ?? { top: '10mm', right: '10mm', bottom: '10mm', left: '10mm' };
    const pdfBuffer = await page.pdf({
      format: options.format ?? 'A4',
      printBackground: true,
      margin,
    } as puppeteer.PDFOptions);

    await page.close();
    return pdfBuffer;
  }
}

export default new PdfService();
