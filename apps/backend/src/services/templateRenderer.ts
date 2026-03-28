import { JsonResume } from '../types/resume';

// Lightweight HTML renderer for JSON Resume data
// Supports multiple templates by name; currently provides a default, simple layout.
export function renderTemplate(resume: JsonResume, templateName: string = 'default'): string {
  // Basic HTML escape to prevent XSS in resume fields
  const escapeHtml = (str: string) =>
    str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  const safe = (v: any) => (typeof v === 'string' ? escapeHtml(v) : escapeHtml(JSON.stringify(v)));

  // Minimal, print-friendly template with CSS; can be extended for more templates/styles
  const name = safe(resume?.basics?.name ?? 'Untitled Resume');
  const email = safe(resume?.basics?.email ?? '');
  const summary = safe(resume?.basics?.summary ?? '');
  const location = safe(resume?.basics?.location?.city ?? '');

  // Example: support a couple of simple sections if present
  const sections = [] as string[];
  if (Array.isArray(resume?.sections)) {
    resume.sections.forEach((sec: any) => {
      const title = safe(sec?.title ?? 'Section');
      const items = Array.isArray(sec?.items) ? sec.items.map((it: any) => `<li>${safe(it)}</li>`).join('') : '';
      sections.push(`<section><h2>${title}</h2><ul>${items}</ul></section>`);
    });
  }

  // Default HTML structure
  const html = `<!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${name} - Resume</title>
    <style>
      :root { --bg: #fff; --fg: #111; --muted: #555; }
      html, body { margin: 0; padding: 0; background: var(--bg); color: var(--fg); font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', Arial, sans-serif; }
      .container { width: 100%; max-width: 800px; margin: 0 auto; padding: 20px; }
      header { border-bottom: 1px solid #ddd; padding-bottom: 10px; margin-bottom: 20px; }
      h1 { font-size: 28px; margin: 0; }
      .contact { color: var(--muted); font-size: 14px; }
      section { margin-bottom: 20px; }
      h2 { font-size: 20px; margin: 10px 0; }
      ul { margin: 0; padding-left: 20px; }
      @media print {
        body { -webkit-print-color-adjust: exact; }
      }
    </style>
  </head>
  <body>
    <div class="container">
      <header>
        <h1>${name}</h1>
        <div class="contact">${email ? `Email: ${email}` : ''} ${location ? `• Location: ${location}` : ''}</div>
        ${summary ? `<p>${summary}</p>` : ''}
      </header>
      ${sections.join('\n')}
    </div>
  </body>
  </html>`;

  return html;
}
