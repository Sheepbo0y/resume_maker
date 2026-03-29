import React from 'react'
import type { ResumeData } from '../../forms/types'

type TemplateProps = { resume: ResumeData }

function formatDate(startDate?: string, endDate?: string) {
  if (startDate && endDate) return `${startDate} - ${endDate}`
  if (startDate) return `${startDate} - Present`
  if (endDate) return `Until ${endDate}`
  return ''
}

export const GreenSimpleTemplate: React.FC<TemplateProps> = ({ resume }) => {
  const { basics, work, education, skills, projects } = resume

  return (
    <article style={{
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      color: '#374151',
      background: '#ffffff',
      maxWidth: '850px',
      lineHeight: '1.65',
      overflow: 'hidden',
      boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
    }}>
      {/* Elegant Header with Deep Green */}
      <header style={{
        background: '#1a4731',
        color: '#fff',
        padding: '50px 45px',
        position: 'relative',
      }}>
        {/* Subtle pattern overlay */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          opacity: 0.5,
        }} />

        <div style={{ position: 'relative', zIndex: 1 }}>
          {/* Label tag */}
          {basics?.label && (
            <div style={{
              fontSize: '12px',
              textTransform: 'uppercase',
              letterSpacing: '3px',
              marginBottom: '12px',
              opacity: 0.8,
              fontWeight: '500',
            }}>
              {basics.label}
            </div>
          )}

          <h1 style={{
            fontSize: '46px',
            fontWeight: '700',
            margin: '0 0 20px 0',
            letterSpacing: '-0.5px',
          }}>
            {basics?.name || 'Your Name'}
          </h1>

          {/* Contact info in a row */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '28px',
            fontSize: '14px',
            opacity: 0.9,
          }}>
            {basics?.email && (
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ opacity: 0.7 }}>✉</span> {basics.email}
              </span>
            )}
            {basics?.phone && (
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ opacity: 0.7 }}>☎</span> {basics.phone}
              </span>
            )}
            {basics?.location && (
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ opacity: 0.7 }}>📍</span> {basics.location}
              </span>
            )}
            {basics?.website && (
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ opacity: 0.7 }}>🔗</span> {basics.website}
              </span>
            )}
          </div>
        </div>
      </header>

      <div style={{ display: 'flex' }}>
        {/* Left Sidebar */}
        <div style={{
          width: '260px',
          flexShrink: 0,
          background: '#f8faf7',
          padding: '35px 30px',
          borderRight: '1px solid #e5ebe3',
        }}>
          {/* Summary */}
          {basics?.summary && (
            <div style={{ marginBottom: '32px' }}>
              <h3 style={{
                fontSize: '12px',
                fontWeight: '700',
                color: '#1a4731',
                margin: '0 0 14px 0',
                textTransform: 'uppercase',
                letterSpacing: '2px',
                paddingBottom: '8px',
                borderBottom: '2px solid #1a4731',
              }}>
                Summary
              </h3>
              <p style={{
                fontSize: '13px',
                color: '#4b5563',
                lineHeight: '1.7',
                margin: 0,
              }}>
                {basics.summary}
              </p>
            </div>
          )}

          {/* Skills */}
          {skills && skills.length > 0 && (
            <div style={{ marginBottom: '32px' }}>
              <h3 style={{
                fontSize: '12px',
                fontWeight: '700',
                color: '#1a4731',
                margin: '0 0 14px 0',
                textTransform: 'uppercase',
                letterSpacing: '2px',
                paddingBottom: '8px',
                borderBottom: '2px solid #1a4731',
              }}>
                Skills
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {skills.map((s, i) => (
                  <div key={i} style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '8px 0',
                    borderBottom: i < skills.length - 1 ? '1px solid #e5ebe3' : 'none',
                  }}>
                    <span style={{ fontSize: '13px', color: '#374151', fontWeight: '500' }}>
                      {s.name}
                    </span>
                    {s.level && (
                      <span style={{ fontSize: '11px', color: '#6b7280' }}>
                        {s.level}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {education && education.length > 0 && (
            <div style={{ marginBottom: '32px' }}>
              <h3 style={{
                fontSize: '12px',
                fontWeight: '700',
                color: '#1a4731',
                margin: '0 0 14px 0',
                textTransform: 'uppercase',
                letterSpacing: '2px',
                paddingBottom: '8px',
                borderBottom: '2px solid #1a4731',
              }}>
                Education
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {education.map((e, idx) => (
                  <div key={idx}>
                    <div style={{
                      fontSize: '14px',
                      fontWeight: '600',
                      color: '#1f2937',
                      marginBottom: '4px',
                    }}>
                      {e.school || 'School'}
                    </div>
                    <div style={{
                      fontSize: '12px',
                      color: '#6b7280',
                      lineHeight: '1.5',
                    }}>
                      {e.degree}{e.degree && e.area && ', '}{e.area}
                    </div>
                    <div style={{
                      fontSize: '11px',
                      color: '#1a4731',
                      marginTop: '4px',
                      fontWeight: '500',
                    }}>
                      {formatDate(e.startDate, e.endDate)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Projects */}
          {projects && projects.length > 0 && (
            <div>
              <h3 style={{
                fontSize: '12px',
                fontWeight: '700',
                color: '#1a4731',
                margin: '0 0 14px 0',
                textTransform: 'uppercase',
                letterSpacing: '2px',
                paddingBottom: '8px',
                borderBottom: '2px solid #1a4731',
              }}>
                Projects
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {projects.map((p, idx) => (
                  <div key={idx}>
                    <div style={{
                      fontSize: '13px',
                      fontWeight: '600',
                      color: '#1f2937',
                    }}>
                      {p.name || 'Project'}
                    </div>
                    {p.url && (
                      <a href={p.url} style={{
                        fontSize: '11px',
                        color: '#1a4731',
                        textDecoration: 'none',
                      }}>
                        View →
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Main Content */}
        <div style={{ flex: 1, padding: '40px 45px' }}>
          {/* Work Experience */}
          {work && work.length > 0 && (
            <section>
              <h2 style={{
                fontSize: '16px',
                fontWeight: '700',
                color: '#1a4731',
                margin: '0 0 25px 0',
                textTransform: 'uppercase',
                letterSpacing: '2px',
                paddingBottom: '10px',
                borderBottom: '3px solid #1a4731',
              }}>
                Work Experience
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
                {work.map((w, idx) => (
                  <div key={idx} style={{
                    position: 'relative',
                    paddingLeft: '20px',
                    borderLeft: '3px solid #dcfce7',
                  }}>
                    {/* Timeline dot */}
                    <div style={{
                      position: 'absolute',
                      left: '-8px',
                      top: '4px',
                      width: '12px',
                      height: '12px',
                      background: '#22c55e',
                      borderRadius: '50%',
                      border: '3px solid #fff',
                      boxShadow: '0 0 0 2px #22c55e',
                    }} />

                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      marginBottom: '6px',
                    }}>
                      <div>
                        <div style={{
                          fontSize: '17px',
                          fontWeight: '700',
                          color: '#111827',
                        }}>
                          {w.position || 'Position'}
                        </div>
                        <div style={{
                          fontSize: '14px',
                          color: '#1a4731',
                          fontWeight: '600',
                          marginTop: '2px',
                        }}>
                          {w.company || 'Company'}
                          {w.location && (
                            <span style={{ color: '#6b7280', fontWeight: '400' }}> • {w.location}</span>
                          )}
                        </div>
                      </div>
                      <span style={{
                        fontSize: '12px',
                        color: '#22c55e',
                        fontWeight: '600',
                        background: '#dcfce7',
                        padding: '4px 12px',
                        borderRadius: '4px',
                      }}>
                        {formatDate(w.startDate, w.endDate)}
                      </span>
                    </div>

                    {w.description && (
                      <p style={{
                        margin: '10px 0 0 0',
                        fontSize: '14px',
                        color: '#4b5563',
                        lineHeight: '1.7',
                      }}>
                        {w.description}
                      </p>
                    )}

                    {w.highlights && w.highlights.length > 0 && (
                      <ul style={{
                        margin: '12px 0 0 0',
                        paddingLeft: '18px',
                        fontSize: '13px',
                        color: '#4b5563',
                        lineHeight: '1.7',
                      }}>
                        {w.highlights.map((h, i) => (
                          <li key={i} style={{ marginBottom: '4px' }}>{h}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </article>
  )
}
