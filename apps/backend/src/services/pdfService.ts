import puppeteer, { Browser, PDFOptions } from 'puppeteer';

export interface PdfOptions {
  width?: number;
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
  private browser?: Browser;

  private async ensureBrowser(): Promise<Browser> {
    if (this.browser) return this.browser;
    this.browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] });
    return this.browser;
  }

  public async generatePDF(htmlContent: string, options: PdfOptions = {}): Promise<Buffer> {
    const browser = await this.ensureBrowser();
    const page = await browser.newPage();
    await page.setContent(htmlContent, { waitUntil: 'networkidle0' });

    const margin = options.margin ?? { top: '10mm', right: '10mm', bottom: '10mm', left: '10mm' };
    const pdfUint8Array = await page.pdf({
      format: options.format ?? 'A4',
      printBackground: true,
      margin,
    } as PDFOptions);

    await page.close();
    // Convert Uint8Array to Buffer for proper Express response
    return Buffer.from(pdfUint8Array);
  }
}

export default new PdfService();
