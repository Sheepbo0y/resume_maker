import React from 'react'
import type { ResumeData } from '../../forms/types'

type TemplateProps = { resume: ResumeData }

function formatDate(startDate?: string, endDate?: string) {
  if (startDate && endDate) return `${startDate} - ${endDate}`
  if (startDate) return `${startDate} - Present`
  if (endDate) return `Until ${endDate}`
  return ''
}

export const TealEnergeticTemplate: React.FC<TemplateProps> = ({ resume }) => {
  const { basics, work, education, skills, projects } = resume

  return (
    <article style={{
      fontFamily: "'Inter', 'SF Pro Display', -apple-system, sans-serif",
      color: '#1f2937',
      background: '#ffffff',
      maxWidth: '850px',
      lineHeight: '1.65',
      overflow: 'hidden',
    }}>
      {/* Modern Header with Teal Gradient */}
      <header style={{
        background: 'linear-gradient(135deg, #0d9488 0%, #14b8a6 50%, #06b6d4 100%)',
        padding: '50px 45px',
        color: '#fff',
        position: 'relative',
      }}>
        {/* Decorative circles */}
        <div style={{
          position: 'absolute',
          top: '-50px',
          right: '-50px',
          width: '200px',
          height: '200px',
          background: 'rgba(255,255,255,0.1)',
          borderRadius: '50%',
        }} />
        <div style={{
          position: 'absolute',
          bottom: '-30px',
          left: '10%',
          width: '100px',
          height: '100px',
          background: 'rgba(255,255,255,0.08)',
          borderRadius: '50%',
        }} />

        <div style={{ position: 'relative', zIndex: 1 }}>
          <h1 style={{
            fontSize: '48px',
            fontWeight: '800',
            margin: '0 0 10px 0',
            letterSpacing: '-1px',
            textShadow: '0 2px 10px rgba(0,0,0,0.1)',
          }}>
            {basics?.name || 'Your Name'}
          </h1>
          {basics?.label && (
            <div style={{
              fontSize: '20px',
              fontWeight: '500',
              opacity: 0.95,
              marginBottom: '24px',
            }}>
              {basics.label}
            </div>
          )}

          {/* Contact Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '12px',
            fontSize: '14px',
            opacity: 0.9,
          }}>
            {basics?.email && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{
                  width: '28px',
                  height: '28px',
                  background: 'rgba(255,255,255,0.2)',
                  borderRadius: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                  </svg>
                </div>
                {basics.email}
              </div>
            )}
            {basics?.phone && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{
                  width: '28px',
                  height: '28px',
                  background: 'rgba(255,255,255,0.2)',
                  borderRadius: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                  </svg>
                </div>
                {basics.phone}
              </div>
            )}
            {basics?.location && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{
                  width: '28px',
                  height: '28px',
                  background: 'rgba(255,255,255,0.2)',
                  borderRadius: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                  </svg>
                </div>
                {basics.location}
              </div>
            )}
            {basics?.website && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{
                  width: '28px',
                  height: '28px',
                  background: 'rgba(255,255,255,0.2)',
                  borderRadius: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                  </svg>
                </div>
                {basics.website}
              </div>
            )}
          </div>
        </div>
      </header>

      <div style={{ padding: '40px 45px' }}>
        {/* Summary with teal accent */}
        {basics?.summary && (
          <section style={{
            marginBottom: '35px',
            padding: '25px 30px',
            background: 'linear-gradient(135deg, #f0fdfa 0%, #ccfbf1 100%)',
            borderRadius: '12px',
            borderLeft: '5px solid #0d9488',
          }}>
            <h2 style={{
              fontSize: '16px',
              fontWeight: '700',
              color: '#0f766e',
              margin: '0 0 12px 0',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}>
              <span style={{
                width: '8px',
                height: '8px',
                background: '#0d9488',
                borderRadius: '50%',
              }} />
              Professional Summary
            </h2>
            <p style={{
              margin: 0,
              fontSize: '15px',
              color: '#374151',
              lineHeight: '1.7',
            }}>
              {basics.summary}
            </p>
          </section>
        )}

        {/* Experience Section */}
        {work && work.length > 0 && (
          <section style={{ marginBottom: '35px' }}>
            <h2 style={{
              fontSize: '20px',
              fontWeight: '700',
              color: '#0d9488',
              margin: '0 0 24px 0',
              paddingBottom: '12px',
              borderBottom: '2px solid #ccfbf1',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
            }}>
              <span style={{
                width: '36px',
                height: '36px',
                background: 'linear-gradient(135deg, #0d9488 0%, #14b8a6 100%)',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                  <path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.1.89 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z"/>
                </svg>
              </span>
              Experience
            </h2>
            {work.map((w, idx) => (
              <div key={idx} style={{
                marginBottom: '24px',
                padding: '24px',
                background: '#ffffff',
                borderRadius: '12px',
                boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                border: '1px solid #e5e7eb',
                position: 'relative',
              }}>
                {/* Teal accent line */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '3px',
                  background: 'linear-gradient(90deg, #0d9488 0%, #14b8a6 100%)',
                  borderRadius: '12px 12px 0 0',
                }} />

                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: '12px',
                }}>
                  <div>
                    <div style={{
                      fontSize: '18px',
                      fontWeight: '700',
                      color: '#111827',
                    }}>
                      {w.position || 'Position'}
                    </div>
                    <div style={{
                      fontSize: '15px',
                      color: '#0d9488',
                      fontWeight: '600',
                      marginTop: '4px',
                    }}>
                      {w.company || 'Company'}
                      {w.location && (
                        <span style={{ color: '#6b7280', fontWeight: '400' }}> • {w.location}</span>
                      )}
                    </div>
                  </div>
                  <span style={{
                    fontSize: '13px',
                    color: '#0d9488',
                    fontWeight: '600',
                    background: '#f0fdfa',
                    padding: '6px 14px',
                    borderRadius: '20px',
                  }}>
                    {formatDate(w.startDate, w.endDate)}
                  </span>
                </div>

                {w.description && (
                  <p style={{
                    margin: '0 0 12px 0',
                    fontSize: '14px',
                    color: '#4b5563',
                    lineHeight: '1.7',
                  }}>
                    {w.description}
                  </p>
                )}

                {w.highlights && w.highlights.length > 0 && (
                  <ul style={{
                    margin: 0,
                    paddingLeft: '0',
                    listStyle: 'none',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                  }}>
                    {w.highlights.map((h, i) => (
                      <li key={i} style={{
                        fontSize: '14px',
                        color: '#4b5563',
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '10px',
                      }}>
                        <span style={{
                          width: '6px',
                          height: '6px',
                          background: '#14b8a6',
                          borderRadius: '50%',
                          marginTop: '7px',
                          flexShrink: 0,
                        }} />
                        {h}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </section>
        )}

        {/* Education Section */}
        {education && education.length > 0 && (
          <section style={{ marginBottom: '35px' }}>
            <h2 style={{
              fontSize: '20px',
              fontWeight: '700',
              color: '#0d9488',
              margin: '0 0 24px 0',
              paddingBottom: '12px',
              borderBottom: '2px solid #ccfbf1',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
            }}>
              <span style={{
                width: '36px',
                height: '36px',
                background: 'linear-gradient(135deg, #0d9488 0%, #14b8a6 100%)',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                  <path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z"/>
                </svg>
              </span>
              Education
            </h2>
            <div style={{ display: 'grid', gap: '16px' }}>
              {education.map((e, idx) => (
                <div key={idx} style={{
                  padding: '20px 24px',
                  background: 'linear-gradient(135deg, #fafafa 0%, #f3f4f6 100%)',
                  borderRadius: '10px',
                  borderLeft: '4px solid #14b8a6',
                }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: '8px',
                  }}>
                    <div style={{
                      fontSize: '17px',
                      fontWeight: '700',
                      color: '#111827',
                    }}>
                      {e.school || 'School'}
                    </div>
                    <span style={{
                      fontSize: '13px',
                      color: '#0d9488',
                      fontWeight: '600',
                    }}>
                      {formatDate(e.startDate, e.endDate)}
                    </span>
                  </div>
                  <div style={{
                    fontSize: '15px',
                    color: '#4b5563',
                  }}>
                    {e.degree && <span style={{ fontWeight: '600' }}>{e.degree}</span>}
                    {e.degree && e.area && <span> in </span>}
                    {e.area && <span style={{ color: '#0d9488', fontWeight: '500' }}>{e.area}</span>}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills Section */}
        {skills && skills.length > 0 && (
          <section style={{ marginBottom: '35px' }}>
            <h2 style={{
              fontSize: '20px',
              fontWeight: '700',
              color: '#0d9488',
              margin: '0 0 24px 0',
              paddingBottom: '12px',
              borderBottom: '2px solid #ccfbf1',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
            }}>
              <span style={{
                width: '36px',
                height: '36px',
                background: 'linear-gradient(135deg, #0d9488 0%, #14b8a6 100%)',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                  <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L3.16 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/>
                </svg>
              </span>
              Skills
            </h2>
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '12px',
            }}>
              {skills.map((s, i) => (
                <div key={i} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 18px',
                  background: 'linear-gradient(135deg, #f0fdfa 0%, #ccfbf1 100%)',
                  border: '2px solid #99f6e4',
                  borderRadius: '25px',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#0f766e',
                }}>
                  <span style={{
                    width: '8px',
                    height: '8px',
                    background: '#14b8a6',
                    borderRadius: '50%',
                  }} />
                  {s.name}
                  {s.level && (
                    <span style={{
                      fontSize: '12px',
                      color: '#5eead4',
                      fontWeight: '500',
                    }}>
                      {s.level}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects Section */}
        {projects && projects.length > 0 && (
          <section>
            <h2 style={{
              fontSize: '20px',
              fontWeight: '700',
              color: '#0d9488',
              margin: '0 0 24px 0',
              paddingBottom: '12px',
              borderBottom: '2px solid #ccfbf1',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
            }}>
              <span style={{
                width: '36px',
                height: '36px',
                background: 'linear-gradient(135deg, #0d9488 0%, #14b8a6 100%)',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
                </svg>
              </span>
              Projects
            </h2>
            <div style={{ display: 'grid', gap: '16px' }}>
              {projects.map((p, idx) => (
                <div key={idx} style={{
                  padding: '22px',
                  background: '#ffffff',
                  borderRadius: '12px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                  border: '1px solid #e5e7eb',
                  position: 'relative',
                  overflow: 'hidden',
                }}>
                  {/* Teal corner accent */}
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    width: '60px',
                    height: '60px',
                    background: 'linear-gradient(135deg, transparent 50%, #ccfbf1 50%)',
                  }} />

                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: '10px',
                    position: 'relative',
                  }}>
                    <span style={{
                      fontSize: '17px',
                      fontWeight: '700',
                      color: '#111827',
                    }}>
                      {p.name || 'Project Name'}
                    </span>
                    {p.url && (
                      <a href={p.url} style={{
                        fontSize: '13px',
                        color: '#0d9488',
                        textDecoration: 'none',
                        fontWeight: '600',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                      }}>
                        View
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
                        </svg>
                      </a>
                    )}
                  </div>

                  {p.description && (
                    <p style={{
                      margin: '0 0 12px 0',
                      fontSize: '14px',
                      color: '#4b5563',
                      lineHeight: '1.7',
                    }}>
                      {p.description}
                    </p>
                  )}

                  {p.technologies && p.technologies.length > 0 && (
                    <div style={{
                      display: 'flex',
                      gap: '8px',
                      flexWrap: 'wrap',
                    }}>
                      {p.technologies.map((tech, i) => (
                        <span key={i} style={{
                          fontSize: '12px',
                          padding: '5px 12px',
                          background: '#f0fdfa',
                          color: '#0d9488',
                          borderRadius: '15px',
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
    </article>
  )
}
