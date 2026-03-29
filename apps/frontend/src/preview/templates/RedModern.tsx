import React from 'react'
import type { ResumeData } from '../../forms/types'

type TemplateProps = { resume: ResumeData }

function formatDate(startDate?: string, endDate?: string) {
  if (startDate && endDate) return `${startDate} - ${endDate}`
  if (startDate) return `${startDate} - Present`
  if (endDate) return `Until ${endDate}`
  return ''
}

export const RedModernTemplate: React.FC<TemplateProps> = ({ resume }) => {
  const { basics, work, education, skills, projects } = resume

  return (
    <article style={{
      fontFamily: "'Segoe UI', 'Helvetica Neue', Arial, sans-serif",
      color: '#2d3748',
      background: '#ffffff',
      maxWidth: '850px',
      lineHeight: '1.7',
      boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
      borderRadius: '8px',
      overflow: 'hidden',
    }}>
      {/* Header with modern gradient */}
      <header style={{
        background: 'linear-gradient(135deg, #dc2626 0%, #991b1b 100%)',
        padding: '48px 40px',
        color: '#fff',
        position: 'relative',
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '200px',
          height: '200px',
          background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
          borderRadius: '50%',
          transform: 'translate(30%, -30%)',
        }} />
        <h1 style={{
          fontSize: '44px',
          fontWeight: '800',
          margin: '0 0 12px 0',
          letterSpacing: '-0.5px',
          position: 'relative',
          zIndex: 1,
        }}>
          {basics?.name || 'Your Name'}
        </h1>
        {basics?.label && (
          <div style={{
            fontSize: '18px',
            fontWeight: '500',
            opacity: 0.95,
            marginBottom: '20px',
            position: 'relative',
            zIndex: 1,
          }}>
            {basics.label}
          </div>
        )}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '24px',
          fontSize: '14px',
          opacity: 0.9,
          position: 'relative',
          zIndex: 1,
        }}>
          {basics?.email && (
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ opacity: 0.8 }}>
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
              </svg>
              {basics.email}
            </span>
          )}
          {basics?.phone && (
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ opacity: 0.8 }}>
                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
              </svg>
              {basics.phone}
            </span>
          )}
          {basics?.location && (
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ opacity: 0.8 }}>
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
              {basics.location}
            </span>
          )}
          {basics?.website && (
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ opacity: 0.8 }}>
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
              </svg>
              {basics.website}
            </span>
          )}
        </div>
      </header>

      <div style={{ display: 'flex', padding: '40px', gap: '40px' }}>
        {/* Left Sidebar */}
        <div style={{ width: '220px', flexShrink: 0 }}>
          {/* Photo Placeholder - Modern Style */}
          <div style={{
            width: '140px',
            height: '140px',
            background: 'linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)',
            borderRadius: '50%',
            margin: '0 auto 32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '14px',
            color: '#991b1b',
            boxShadow: '0 4px 12px rgba(220, 38, 38, 0.15)',
            border: '4px solid #fef2f2',
          }}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="#dc2626" style={{ opacity: 0.4 }}>
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            </svg>
          </div>

          {/* Skills Section */}
          {skills && skills.length > 0 && (
            <div style={{ marginBottom: '32px' }}>
              <h3 style={{
                fontSize: '13px',
                fontWeight: '700',
                color: '#dc2626',
                margin: '0 0 16px 0',
                textTransform: 'uppercase',
                letterSpacing: '1.5px',
                paddingBottom: '8px',
                borderBottom: '2px solid #dc2626',
              }}>
                Skills
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {skills.map((s, i) => (
                  <div key={i} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '13px',
                    color: '#4a5568',
                  }}>
                    <span style={{
                      width: '6px',
                      height: '6px',
                      background: '#dc2626',
                      borderRadius: '50%',
                    }} />
                    {s.name}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Languages */}
          <div style={{ marginBottom: '32px' }}>
            <h3 style={{
              fontSize: '13px',
              fontWeight: '700',
              color: '#dc2626',
              margin: '0 0 16px 0',
              textTransform: 'uppercase',
              letterSpacing: '1.5px',
              paddingBottom: '8px',
              borderBottom: '2px solid #dc2626',
            }}>
              Languages
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px' }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '8px 12px',
                background: '#fef2f2',
                borderRadius: '6px',
              }}>
                <span style={{ fontWeight: '600', color: '#2d3748' }}>English</span>
                <span style={{ color: '#dc2626', fontSize: '12px' }}>Native</span>
              </div>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '8px 12px',
                background: '#fef2f2',
                borderRadius: '6px',
              }}>
                <span style={{ fontWeight: '600', color: '#2d3748' }}>Spanish</span>
                <span style={{ color: '#dc2626', fontSize: '12px' }}>Fluent</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div style={{ flex: 1 }}>
          {/* Summary */}
          {basics?.summary && (
            <section style={{ marginBottom: '32px' }}>
              <h2 style={{
                fontSize: '18px',
                fontWeight: '700',
                color: '#1a202c',
                margin: '0 0 16px 0',
                paddingBottom: '10px',
                borderBottom: '3px solid #dc2626',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
              }}>
                <span style={{
                  width: '28px',
                  height: '28px',
                  background: '#dc2626',
                  borderRadius: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
                  </svg>
                </span>
                Professional Summary
              </h2>
              <p style={{
                margin: 0,
                fontSize: '15px',
                color: '#4a5568',
                lineHeight: '1.7',
              }}>
                {basics.summary}
              </p>
            </section>
          )}

          {/* Experience */}
          {work && work.length > 0 && (
            <section style={{ marginBottom: '32px' }}>
              <h2 style={{
                fontSize: '18px',
                fontWeight: '700',
                color: '#1a202c',
                margin: '0 0 20px 0',
                paddingBottom: '10px',
                borderBottom: '3px solid #dc2626',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
              }}>
                <span style={{
                  width: '28px',
                  height: '28px',
                  background: '#dc2626',
                  borderRadius: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                    <path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z"/>
                  </svg>
                </span>
                Experience
              </h2>
              {work.map((w, idx) => (
                <div key={idx} style={{
                  marginBottom: '24px',
                  padding: '20px',
                  background: '#fafafa',
                  borderRadius: '10px',
                  borderLeft: '4px solid #dc2626',
                }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: '8px',
                  }}>
                    <div>
                      <div style={{
                        fontSize: '17px',
                        fontWeight: '700',
                        color: '#1a202c',
                      }}>
                        {w.position || 'Position'}
                      </div>
                      <div style={{
                        fontSize: '15px',
                        color: '#dc2626',
                        fontWeight: '600',
                        marginTop: '2px',
                      }}>
                        {w.company || 'Company'}
                        {w.location && (
                          <span style={{ color: '#718096', fontWeight: '400' }}> | {w.location}</span>
                        )}
                      </div>
                    </div>
                    <span style={{
                      fontSize: '13px',
                      color: '#dc2626',
                      fontWeight: '600',
                      background: '#fef2f2',
                      padding: '4px 12px',
                      borderRadius: '20px',
                    }}>
                      {formatDate(w.startDate, w.endDate)}
                    </span>
                  </div>
                  {w.description && (
                    <p style={{
                      margin: '10px 0 0 0',
                      fontSize: '14px',
                      color: '#4a5568',
                      lineHeight: '1.6',
                    }}>
                      {w.description}
                    </p>
                  )}
                  {w.highlights && w.highlights.length > 0 && (
                    <ul style={{
                      margin: '12px 0 0 0',
                      paddingLeft: '20px',
                      fontSize: '14px',
                      color: '#4a5568',
                      lineHeight: '1.6',
                    }}>
                      {w.highlights.map((h, i) => (
                        <li key={i} style={{ marginBottom: '4px' }}>{h}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </section>
          )}

          {/* Education */}
          {education && education.length > 0 && (
            <section style={{ marginBottom: '32px' }}>
              <h2 style={{
                fontSize: '18px',
                fontWeight: '700',
                color: '#1a202c',
                margin: '0 0 20px 0',
                paddingBottom: '10px',
                borderBottom: '3px solid #dc2626',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
              }}>
                <span style={{
                  width: '28px',
                  height: '28px',
                  background: '#dc2626',
                  borderRadius: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                    <path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z"/>
                  </svg>
                </span>
                Education
              </h2>
              {education.map((e, idx) => (
                <div key={idx} style={{
                  marginBottom: '20px',
                  padding: '18px',
                  background: '#fafafa',
                  borderRadius: '10px',
                  borderLeft: '4px solid #dc2626',
                }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: '6px',
                  }}>
                    <div style={{
                      fontSize: '16px',
                      fontWeight: '700',
                      color: '#1a202c',
                    }}>
                      {e.school || 'School'}
                    </div>
                    <span style={{
                      fontSize: '13px',
                      color: '#718096',
                      fontWeight: '500',
                    }}>
                      {formatDate(e.startDate, e.endDate)}
                    </span>
                  </div>
                  <div style={{
                    fontSize: '15px',
                    color: '#4a5568',
                  }}>
                    {e.degree && <span style={{ fontWeight: '600' }}>{e.degree}</span>}
                    {e.degree && e.area && <span> in </span>}
                    {e.area && <span style={{ color: '#dc2626' }}>{e.area}</span>}
                  </div>
                </div>
              ))}
            </section>
          )}

          {/* Projects */}
          {projects && projects.length > 0 && (
            <section style={{ marginBottom: '32px' }}>
              <h2 style={{
                fontSize: '18px',
                fontWeight: '700',
                color: '#1a202c',
                margin: '0 0 20px 0',
                paddingBottom: '10px',
                borderBottom: '3px solid #dc2626',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
              }}>
                <span style={{
                  width: '28px',
                  height: '28px',
                  background: '#dc2626',
                  borderRadius: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
                  </svg>
                </span>
                Projects
              </h2>
              <div style={{ display: 'grid', gap: '16px' }}>
                {projects.map((p, idx) => (
                  <div key={idx} style={{
                    padding: '18px',
                    background: '#fafafa',
                    borderRadius: '10px',
                    borderLeft: '4px solid #dc2626',
                  }}>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '8px',
                    }}>
                      <span style={{
                        fontSize: '16px',
                        fontWeight: '700',
                        color: '#1a202c',
                      }}>
                        {p.name || 'Project Name'}
                      </span>
                      {p.url && (
                        <a href={p.url} style={{
                          fontSize: '13px',
                          color: '#dc2626',
                          textDecoration: 'none',
                          fontWeight: '600',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px',
                        }}>
                          View →
                        </a>
                      )}
                    </div>
                    {p.description && (
                      <p style={{
                        margin: '0',
                        fontSize: '14px',
                        color: '#4a5568',
                        lineHeight: '1.6',
                      }}>
                        {p.description}
                      </p>
                    )}
                    {p.technologies && p.technologies.length > 0 && (
                      <div style={{
                        marginTop: '10px',
                        display: 'flex',
                        gap: '8px',
                        flexWrap: 'wrap',
                      }}>
                        {p.technologies.map((tech, i) => (
                          <span key={i} style={{
                            fontSize: '12px',
                            padding: '4px 10px',
                            background: '#fef2f2',
                            color: '#dc2626',
                            borderRadius: '12px',
                            fontWeight: '500',
                          }}>
                            {tech}
                          </span>
                        ))}
                      </div>
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
