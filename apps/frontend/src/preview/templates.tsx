import React from 'react'
import type { ResumeData } from '../forms/types'
import { TemplateKey } from './types'

type TemplateProps = { resume: ResumeData }

function formatDate(startDate?: string, endDate?: string) {
  if (startDate && endDate) return `(${startDate} - ${endDate})`
  if (startDate) return `(${startDate})`
  if (endDate) return `(${endDate})`
  return ''
}

export const ClassicProfessionalTemplate: React.FC<TemplateProps> = ({ resume }) => {
  const { basics, work, education, skills, projects } = resume
  return (
    <article aria-labelledby="classic-name" style={{ fontFamily: 'system-ui, Arial', color: '#1f2937' }}>
      <header style={{ borderBottom: '2px solid #e5e7eb', padding: '8px 0' }}>
        <h1 id="classic-name" style={{ margin: 0 }}>{basics?.name ?? ''}</h1>
        <address aria-label="Contact Information" style={{ fontSize: 14, display: 'block', marginTop: 6 }}>
          {basics?.email && (
            <a href={`mailto:${basics?.email}`} aria-label="Email">{basics?.email}</a>
          )}
          {basics?.phone && <span> {' '} </span>}
          {basics?.phone && (
            <a href={`tel:${basics?.phone}`} aria-label="Phone">{basics?.phone}</a>
          )}
        </address>
        {basics?.location && (
          <div style={{ fontSize: 12, color: '#6b7280' }}>{basics?.location}</div>
        )}
      </header>
      {basics?.summary && (
        <section aria-labelledby="classic-summary-title" style={{ marginTop: 12 }}>
          <h2 id="classic-summary-title" style={{ fontSize: 18, margin: 0 }}>Summary</h2>
          <p style={{ marginTop: 6 }}>{basics.summary}</p>
        </section>
      )}
      {work && work.length > 0 && (
        <section aria-labelledby="classic-work-title" style={{ marginTop: 16 }}>
          <h2 id="classic-work-title" style={{ fontSize: 18, margin: 0 }}>Work Experience</h2>
          {work.map((w, idx) => (
            <div key={idx} style={{ marginTop: 8 }}>
              <strong>{w.position ?? ''}</strong> at <em>{w.company ?? ''}</em>{' '}
              {formatDate(w.startDate, w.endDate)}
              {w.description && <div style={{ marginTop: 4 }}>{w.description}</div>}
            </div>
          ))}
        </section>
      )}
      {education && education.length > 0 && (
        <section aria-labelledby="classic-education-title" style={{ marginTop: 16 }}>
          <h2 id="classic-education-title" style={{ fontSize: 18, margin: 0 }}>Education</h2>
          {education.map((e, idx) => (
            <div key={idx} style={{ marginTop: 8 }}>
              <strong>{e.degree ?? ''}</strong> in <em>{e.area ?? ''}</em> from {e.school ?? ''}
              {formatDate(e.startDate, e.endDate)}
            </div>
          ))}
        </section>
      )}
      {skills && skills.length > 0 && (
        <section aria-labelledby="classic-skills-title" style={{ marginTop: 16 }}>
          <h2 id="classic-skills-title" style={{ fontSize: 18, margin: 0 }}>Skills</h2>
          <ul aria-label="Skills" style={{ display: 'flex', flexWrap: 'wrap', gap: 8, padding: 0, listStyle: 'none', marginTop: 6 }}>
            {skills.map((s, i) => (
              <li key={i} style={{ padding: '4px 8px', border: '1px solid #d1d5db', borderRadius: 4 }}>{s.name}</li>
            ))}
          </ul>
        </section>
      )}
      {projects && projects.length > 0 && (
        <section aria-labelledby="classic-projects-title" style={{ marginTop: 16 }}>
          <h2 id="classic-projects-title" style={{ fontSize: 18, margin: 0 }}>Projects</h2>
          {projects.map((p, idx) => (
            <div key={idx} style={{ marginTop: 8 }}>
              <strong>{p.name}</strong>
              {p.description && <div style={{ marginTop: 4 }}>{p.description}</div>}
              {p.url && (
                <div style={{ marginTop: 4 }}>
                  <a href={p.url}>{p.url}</a>
                </div>
              )}
            </div>
          ))}
        </section>
      )}
    </article>
  )
}

export const ModernMinimalTemplate: React.FC<TemplateProps> = ({ resume }) => {
  const { basics, work, education, skills } = resume
  return (
    <article aria-labelledby="modern-name" style={{ fontFamily: 'Inter, Arial', color: '#111827' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 8, borderBottom: '1px solid #e5e7eb' }}>
        <div>
          <h1 id="modern-name" style={{ fontSize: 20, margin: 0 }}>{basics?.name ?? ''}</h1>
          <div style={{ fontSize: 12, color: '#6b7280' }}>
            <a href={basics?.email ? `mailto:${basics?.email}` : undefined} aria-label="Email">{basics?.email ?? ''}</a>
            {' '}<span aria-hidden>•</span> {basics?.location ?? ''}
          </div>
        </div>
        {basics?.summary && (
          <div style={{ fontSize: 12 }}>{basics?.summary}</div>
        )}
      </header>
      {work && work.length > 0 && (
        <section aria-labelledby="modern-work-title" style={{ padding: 8 }}>
          <h2 id="modern-work-title" style={{ margin: '8px 0' }}>Experience</h2>
          {work.map((w, idx) => (
            <div key={idx} style={{ display: 'flex', gap: 8, marginBottom: 6 }}>
              <time style={{ width: 120, color: '#6b7280' }} dateTime={w.startDate ?? ''}>
                {w.startDate ?? ''}{w.endDate ? ` - ${w.endDate}` : ''}
              </time>
              <div>
                <div><strong>{w.position ?? ''}</strong> at {w.company ?? ''}</div>
                {w.description && <div style={{ fontSize: 12 }}>{w.description}</div>}
              </div>
            </div>
          ))}
        </section>
      )}
      {education && education.length > 0 && (
        <section aria-labelledby="modern-education-title" style={{ padding: 8 }}>
          <h2 id="modern-education-title" style={{ margin: '8px 0' }}>Education</h2>
          {education.map((e, idx) => (
            <div key={idx} style={{ marginBottom: 6 }}>
              <div><strong>{e.school}</strong> - {e.degree ?? ''}</div>
              <div style={{ fontSize: 12, color: '#6b7280' }}>{e.startDate ?? ''}{e.endDate ? ` to ${e.endDate}` : ''}</div>
            </div>
          ))}
        </section>
      )}
      {skills && skills.length > 0 && (
        <section aria-labelledby="modern-skills-title" style={{ padding: 8 }}>
          <h2 id="modern-skills-title" style={{ margin: '8px 0' }}>Skills</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {skills.map((s, i) => (
              <span key={i} style={{ padding: '4px 8px', border: '1px solid #ddd', borderRadius: 4 }}>{s.name}</span>
            ))}
          </div>
        </section>
      )}
    </article>
  )
}

export const CreativeSimpleTemplate: React.FC<TemplateProps> = ({ resume }) => {
  const { basics, work, education, skills, projects } = resume
  return (
    <article aria-labelledby="creative-name" style={{ fontFamily: 'Comic Sans MS, sans-serif', color: '#111' }}>
      <header style={{ padding: 8, background: '#f8fafc', borderBottom: '1px solid #e5e7eb' }}>
        <h1 id="creative-name" style={{ margin: 0 }}>{basics?.name ?? ''}</h1>
        <div style={{ fontSize: 12 }}>{basics?.email ?? ''} • {basics?.location ?? ''}</div>
      </header>
      {work?.length > 0 && (
        <section aria-label="Work" style={{ padding: 8 }}>
          <h2>Experience</h2>
          {work.map((w, idx) => (
            <div key={idx} style={{ marginBottom: 8 }}>
              <div><strong>{w.position ?? ''}</strong> @ {w.company ?? ''}</div>
              {w.description && <div style={{ fontSize: 12 }}>{w.description}</div>}
            </div>
          ))}
        </section>
      )}
      {education?.length > 0 && (
        <section aria-label="Education" style={{ padding: 8 }}>
          <h2>Education</h2>
          {education.map((e, idx) => (
            <div key={idx} style={{ marginBottom: 6 }}>
              <div><strong>{e.school}</strong> - {e.degree ?? ''}</div>
            </div>
          ))}
        </section>
      )}
      {projects?.length > 0 && (
        <section aria-label="Projects" style={{ padding: 8 }}>
          <h2>Projects</h2>
          {projects.map((p, idx) => (
            <div key={idx} style={{ marginBottom: 6 }}>
              <div><strong>{p.name}</strong> {p.url && <a href={p.url}> {p.url}</a>}</div>
              {p.description && <div style={{ fontSize: 12 }}>{p.description}</div>}
            </div>
          ))}
        </section>
      )}
      {skills?.length > 0 && (
        <section aria-label="Skills" style={{ padding: 8 }}>
          <h2>Skills</h2>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {skills.map((s, i) => (
              <span key={i} style={{ padding: '4px 8px', border: '1px solid #ddd', borderRadius: 4 }}>{s.name}</span>
            ))}
          </div>
        </section>
      )}
    </article>
  )
}

// Re-export a tiny registry for name-based access if needed by PreviewPanel
export const TemplateRegistry = {
  ClassicProfessional: ClassicProfessionalTemplate,
  ModernMinimal: ModernMinimalTemplate,
  CreativeSimple: CreativeSimpleTemplate,
} as const
