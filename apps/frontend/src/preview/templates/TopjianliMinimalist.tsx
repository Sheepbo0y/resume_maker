import React from 'react'
import type { ResumeData } from '../../forms/types'

type TemplateProps = { resume: ResumeData }

function formatDate(startDate?: string, endDate?: string): string {
  if (startDate && endDate) return `${startDate} – ${endDate}`
  if (startDate) return `${startDate} – Present`
  if (endDate) return endDate
  return ''
}

export const MinimalistTemplate: React.FC<TemplateProps> = ({ resume }) => {
  const { basics, work, education, skills, projects } = resume

  const styles = {
    container: {
      fontFamily: "'Helvetica Neue', 'Arial', sans-serif",
      color: '#2d3748',
      background: '#ffffff',
      padding: '48px',
      maxWidth: '720px',
      lineHeight: 1.6,
    } as React.CSSProperties,
    header: {
      marginBottom: '32px',
      paddingBottom: '24px',
      borderBottom: '1px solid #e2e8f0',
    } as React.CSSProperties,
    name: {
      fontFamily: "'Playfair Display', 'Georgia', 'Times New Roman', serif",
      fontSize: '36px',
      fontWeight: 600,
      margin: '0 0 8px 0',
      color: '#1a202c',
      letterSpacing: '-0.5px',
    } as React.CSSProperties,
    title: {
      fontSize: '15px',
      color: '#718096',
      fontWeight: 400,
      marginBottom: '16px',
      letterSpacing: '0.5px',
    } as React.CSSProperties,
    contactRow: {
      display: 'flex',
      flexWrap: 'wrap' as const,
      gap: '16px',
      fontSize: '13px',
      color: '#4a5568',
    } as React.CSSProperties,
    contactItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
    } as React.CSSProperties,
    section: {
      marginBottom: '28px',
    } as React.CSSProperties,
    sectionTitle: {
      fontSize: '11px',
      fontWeight: 600,
      color: '#1a202c',
      textTransform: 'uppercase' as const,
      letterSpacing: '2px',
      marginBottom: '16px',
      paddingBottom: '8px',
      borderBottom: '1px solid #e2e8f0',
    } as React.CSSProperties,
    summary: {
      fontSize: '14px',
      color: '#4a5568',
      lineHeight: 1.7,
      margin: 0,
    } as React.CSSProperties,
    workItem: {
      marginBottom: '20px',
    } as React.CSSProperties,
    workHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'baseline',
      marginBottom: '4px',
    } as React.CSSProperties,
    position: {
      fontSize: '15px',
      fontWeight: 600,
      color: '#1a202c',
    } as React.CSSProperties,
    company: {
      fontSize: '14px',
      color: '#4a5568',
      fontStyle: 'italic',
      marginBottom: '6px',
    } as React.CSSProperties,
    date: {
      fontSize: '13px',
      color: '#718096',
      fontWeight: 400,
    } as React.CSSProperties,
    description: {
      fontSize: '14px',
      color: '#4a5568',
      lineHeight: 1.6,
      margin: 0,
    } as React.CSSProperties,
    educationItem: {
      marginBottom: '16px',
    } as React.CSSProperties,
    school: {
      fontSize: '15px',
      fontWeight: 600,
      color: '#1a202c',
    } as React.CSSProperties,
    degree: {
      fontSize: '14px',
      color: '#4a5568',
    } as React.CSSProperties,
    skillsContainer: {
      display: 'flex',
      flexWrap: 'wrap' as const,
      gap: '8px',
    } as React.CSSProperties,
    skillTag: {
      padding: '4px 12px',
      background: '#f7fafc',
      border: '1px solid #e2e8f0',
      borderRadius: '3px',
      fontSize: '13px',
      color: '#4a5568',
      fontWeight: 500,
    } as React.CSSProperties,
    projectItem: {
      marginBottom: '16px',
    } as React.CSSProperties,
    projectName: {
      fontSize: '15px',
      fontWeight: 600,
      color: '#1a202c',
      marginBottom: '4px',
    } as React.CSSProperties,
    projectUrl: {
      fontSize: '13px',
      color: '#4a5568',
      textDecoration: 'none',
    } as React.CSSProperties,
    divider: {
      width: '100%',
      height: '1px',
      background: '#e2e8f0',
      margin: '24px 0',
    } as React.CSSProperties,
  }

  return (
    <article style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.name}>{basics?.name || 'Your Name'}</h1>
        {basics?.label && <div style={styles.title}>{basics.label}</div>}
        <div style={styles.contactRow}>
          {basics?.email && (
            <span style={styles.contactItem}>{basics.email}</span>
          )}
          {basics?.phone && (
            <span style={styles.contactItem}>{basics.phone}</span>
          )}
          {basics?.location && (
            <span style={styles.contactItem}>{basics.location}</span>
          )}
          {basics?.website && (
            <span style={styles.contactItem}>{basics.website}</span>
          )}
        </div>
      </header>

      {basics?.summary && (
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Profile</h2>
          <p style={styles.summary}>{basics.summary}</p>
        </section>
      )}

      {work && work.length > 0 && (
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Experience</h2>
          {work.map((w, idx) => (
            <div key={idx} style={styles.workItem}>
              <div style={styles.workHeader}>
                <span style={styles.position}>{w.position || 'Position'}</span>
                <span style={styles.date}>
                  {formatDate(w.startDate, w.endDate)}
                </span>
              </div>
              <div style={styles.company}>{w.company}</div>
              {w.description && <p style={styles.description}>{w.description}</p>}
            </div>
          ))}
        </section>
      )}

      {education && education.length > 0 && (
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Education</h2>
          {education.map((e, idx) => (
            <div key={idx} style={styles.educationItem}>
              <div style={styles.workHeader}>
                <span style={styles.school}>{e.school}</span>
                <span style={styles.date}>
                  {formatDate(e.startDate, e.endDate)}
                </span>
              </div>
              <div style={styles.degree}>
                {e.degree}
                {e.degree && e.area && ' – '}
                {e.area}
              </div>
            </div>
          ))}
        </section>
      )}

      {skills && skills.length > 0 && (
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Skills</h2>
          <div style={styles.skillsContainer}>
            {skills.map((s, idx) => (
              <span key={idx} style={styles.skillTag}>
                {s.name}
              </span>
            ))}
          </div>
        </section>
      )}

      {projects && projects.length > 0 && (
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Projects</h2>
          {projects.map((p, idx) => (
            <div key={idx} style={styles.projectItem}>
              <div style={styles.workHeader}>
                <span style={styles.projectName}>{p.name}</span>
                {p.url && (
                  <a
                    href={p.url}
                    style={styles.projectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {p.url}
                  </a>
                )}
              </div>
              {p.description && <p style={styles.description}>{p.description}</p>}
            </div>
          ))}
        </section>
      )}
    </article>
  )
}
