import { JsonResume } from '../types/resume.js';

// Lightweight HTML renderer for JSON Resume data
// Supports multiple templates by name; currently provides a default, simple layout.

// Basic HTML escape to prevent XSS in resume fields
const escapeHtml = (str: string) =>
  str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const safe = (v: any) => (typeof v === 'string' ? escapeHtml(v) : escapeHtml(JSON.stringify(v)));

// Helper to format date range
const formatDateRange = (start?: string, end?: string) => {
  const s = start || '';
  const e = end || 'Present';
  if (!s) return '';
  return `${s} - ${e}`;
};

// Default template - clean and professional
function renderDefaultTemplate(resume: JsonResume): string {
  const basics = resume?.basics || {};
  const name = safe(basics.name || 'Untitled Resume');
  const email = safe(basics.email || '');
  const phone = safe(basics.phone || '');
  const url = safe(basics.url || '');
  const summary = safe(basics.summary || '');
  const location = safe(basics.location?.city || basics.location || '');

  const work = (resume?.work || []).map((w: any) => `
    <div class="work-item">
      <div class="item-header">
        <span class="item-title">${safe(w.company || '')}</span>
        <span class="item-date">${safe(formatDateRange(w.startDate, w.endDate))}</span>
      </div>
      <div class="item-subtitle">${safe(w.position || '')}</div>
      ${w.summary ? `<div class="item-summary">${safe(w.summary)}</div>` : ''}
      ${(w.highlights || []).length > 0 ? `
        <ul class="highlights">
          ${w.highlights.map((h: string) => `<li>${safe(h)}</li>`).join('')}
        </ul>
      ` : ''}
    </div>
  `).join('');

  const education = (resume?.education || []).map((e: any) => `
    <div class="education-item">
      <div class="item-header">
        <span class="item-title">${safe(e.institution || '')}</span>
        <span class="item-date">${safe(formatDateRange(e.startDate, e.endDate))}</span>
      </div>
      <div class="item-subtitle">${safe([e.studyType, e.area].filter(Boolean).join(' - '))}</div>
    </div>
  `).join('');

  const skills = (resume?.skills || []).map((s: any) => `
    <div class="skill-item">
      <span class="skill-name">${safe(s.name || '')}</span>
      ${(s.keywords || []).length > 0 ? `
        <span class="skill-keywords">${s.keywords.map((k: string) => safe(k)).join(', ')}</span>
      ` : ''}
    </div>
  `).join('');

  const projects = (resume?.projects || []).map((p: any) => `
    <div class="project-item">
      <div class="item-header">
        <span class="item-title">${safe(p.name || '')}</span>
        ${p.url ? `<a href="${safe(p.url)}" class="item-link">${safe(p.url)}</a>` : ''}
      </div>
      ${p.description ? `<div class="item-summary">${safe(p.description)}</div>` : ''}
    </div>
  `).join('');

  return `<!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${name} - Resume</title>
    <style>
      :root { --bg: #fff; --fg: #111; --muted: #555; --accent: #667eea; }
      html, body { margin: 0; padding: 0; background: var(--bg); color: var(--fg); font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', Arial, sans-serif; font-size: 14px; line-height: 1.6; }
      .container { width: 100%; max-width: 800px; margin: 0 auto; padding: 40px; box-sizing: border-box; }
      header { border-bottom: 2px solid var(--accent); padding-bottom: 20px; margin-bottom: 30px; text-align: center; }
      h1 { font-size: 32px; margin: 0 0 10px; color: var(--accent); }
      .contact { color: var(--muted); font-size: 14px; }
      .contact span { margin: 0 10px; }
      .section { margin-bottom: 30px; }
      .section-title { font-size: 18px; font-weight: 600; color: var(--accent); border-bottom: 1px solid #ddd; padding-bottom: 8px; margin-bottom: 15px; text-transform: uppercase; letter-spacing: 1px; }
      .item-header { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 5px; }
      .item-title { font-weight: 600; font-size: 16px; }
      .item-date { color: var(--muted); font-size: 13px; }
      .item-subtitle { color: var(--muted); font-style: italic; margin-bottom: 8px; }
      .item-summary { margin-bottom: 8px; }
      .item-link { color: var(--accent); text-decoration: none; font-size: 13px; }
      .highlights { margin: 8px 0; padding-left: 20px; }
      .highlights li { margin-bottom: 4px; }
      .skill-item { margin-bottom: 10px; }
      .skill-name { font-weight: 600; display: block; }
      .skill-keywords { color: var(--muted); font-size: 13px; }
      @media print {
        body { -webkit-print-color-adjust: exact; }
        .container { padding: 20px; }
      }
    </style>
  </head>
  <body>
    <div class="container">
      <header>
        <h1>${name}</h1>
        <div class="contact">
          ${email ? `<span>${email}</span>` : ''}
          ${phone ? `<span>${phone}</span>` : ''}
          ${location ? `<span>${location}</span>` : ''}
          ${url ? `<span>${url}</span>` : ''}
        </div>
        ${summary ? `<p>${summary}</p>` : ''}
      </header>

      ${work ? `<div class="section"><div class="section-title">Work Experience</div>${work}</div>` : ''}
      ${education ? `<div class="section"><div class="section-title">Education</div>${education}</div>` : ''}
      ${skills ? `<div class="section"><div class="section-title">Skills</div>${skills}</div>` : ''}
      ${projects ? `<div class="section"><div class="section-title">Projects</div>${projects}</div>` : ''}
    </div>
  </body>
  </html>`;
}

// Chinese Social template - optimized for Chinese job market
function renderChineseSocialTemplate(resume: JsonResume): string {
  const basics = resume?.basics || {};
  const name = safe(basics.name || '');
  const email = safe(basics.email || '');
  const phone = safe(basics.phone || '');
  const summary = safe(basics.summary || '');

  return `<!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8" />
    <title>${name} - 简历</title>
    <style>
      body { margin: 0; padding: 40px; font-family: 'PingFang SC', 'Microsoft YaHei', sans-serif; font-size: 14px; line-height: 1.6; color: #333; }
      .header { text-align: center; border-bottom: 2px solid #c41e3a; padding-bottom: 20px; margin-bottom: 30px; }
      .name { font-size: 28px; font-weight: bold; color: #c41e3a; margin-bottom: 10px; }
      .contact { color: #666; font-size: 13px; }
      .section { margin-bottom: 25px; }
      .section-title { background: #c41e3a; color: white; padding: 8px 15px; font-weight: bold; margin-bottom: 15px; }
      .item { margin-bottom: 15px; }
      .item-title { font-weight: bold; color: #333; }
      .item-subtitle { color: #666; font-size: 13px; }
      @media print { body { padding: 20px; } }
    </style>
  </head>
  <body>
    <div class="header">
      <div class="name">${name}</div>
      <div class="contact">${phone} | ${email}</div>
    </div>
    ${summary ? `<div class="section"><div class="section-title">个人简介</div><div class="item">${summary}</div></div>` : ''}
    <!-- Content sections would go here -->
  </body>
  </html>`;
}

// Template registry
const templates: Record<string, (resume: JsonResume) => string> = {
  'default': renderDefaultTemplate,
  'classicprofessional': renderDefaultTemplate,
  'chinesesocial': renderChineseSocialTemplate,
  'chineseprofessional': renderChineseSocialTemplate,
  'modernminimal': renderDefaultTemplate,
  'creativesimple': renderDefaultTemplate,
  'topjianliminimalist': renderDefaultTemplate,
  'topjianlishanghai': renderChineseSocialTemplate,
  'topjianlicreative': renderDefaultTemplate,
  'greensimple': renderDefaultTemplate,
  'borderedclean': renderDefaultTemplate,
  'redmodern': renderChineseSocialTemplate,
  'tealenergetic': renderDefaultTemplate,
  'redclassic': renderChineseSocialTemplate,
};

export function renderTemplate(resume: JsonResume, templateName: string = 'default'): string {
  const normalizedName = templateName.toLowerCase().replace(/[^a-z0-9]/g, '');
  const renderer = templates[normalizedName] || templates['default'];
  return renderer(resume);
}
