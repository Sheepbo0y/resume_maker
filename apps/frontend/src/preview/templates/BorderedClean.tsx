import React from 'react'
import type { ResumeData } from '../../forms/types'

type TemplateProps = { resume: ResumeData }

function formatDate(startDate?: string, endDate?: string) {
  if (startDate && endDate) return `${startDate} - ${endDate}`
  if (startDate) return `${startDate} - Present`
  if (endDate) return `Until ${endDate}`
  return ''
}

export const BorderedCleanTemplate: React.FC<TemplateProps> = ({ resume }) => {
  const { basics, work, education, skills, projects } = resume

  return (
    <article style={{
      fontFamily: "'Georgia', 'Times New Roman', serif",
      color: '#1a1a1a',
      background: '#ffffff',
      maxWidth: '850px',
      lineHeight: '1.65',
      overflow: 'hidden',
      boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
    }}>
      {/* Elegant bordered header */}
      <header style={{
        border: '4px double #1a1a1a',
        padding: '40px',
        margin: '30px',
        textAlign: 'center',
      }}>
        <h1 style={{
          fontSize: '42px',
          fontWeight: '700',
          margin: '0 0 16px 0',
          textTransform: 'uppercase',
          letterSpacing: '4px',
          color: '#1a1a1a',
        }}>
          {basics?.name || 'Your Name'}
        </h1>

        {basics?.label && (
          <div style={{
            fontSize: '16px',
            fontStyle: 'italic',
            color: '#555',
            marginBottom: '20px',
            letterSpacing: '1px',
          }}>
            {basics.label}
          </div>
        )}

        {/* Decorative line */}
        <div style={{
          width: '100px',
          height: '2px',
          background: '#1a1a1a',
          margin: '0 auto 20px',
        }} />

        {/* Contact info */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: '24px',
          fontSize: '14px',
          color: '#444',
        }}>
          {basics?.email && <span>{basics.email}</span>}
          {basics?.phone && <span>{basics.phone}</span>}
          {basics?.location && <span>{basics.location}</span>}
          {basics?.website && <span>{basics.website}</span>}
        </div>
      </header>

      <div style={{ padding: '0 30px 30px' }}>
        {/* Summary Section */}
        {basics?.summary && (
          <section style={{
            marginBottom: '28px',
            padding: '25px',
            border: '2px solid #1a1a1a',
            position: 'relative',
          }}>
            <h2 style={{
              fontSize: '14px',
              fontWeight: '700',
              margin: '0 0 16px 0',
              textTransform: 'uppercase',
              letterSpacing: '2px',
              textAlign: 'center',
            }}>
              Professional Summary
            </h2>
            <p style={{
              margin: 0,
              fontSize: '14px',
              color: '#444',
              lineHeight: '1.7',
              textAlign: 'justify',
            }}>
              {basics.summary}
            </p>
          </section>
        )}

        {/* Skills Section */}
        {skills && skills.length > 0 && (
          <section style={{
            marginBottom: '28px',
            padding: '25px',
            border: '1px solid #1a1a1a',
          }}>
            <h2 style={{
              fontSize: '14px',
              fontWeight: '700',
              margin: '0 0 16px 0',
              textTransform: 'uppercase',
              letterSpacing: '2px',
              textAlign: 'center',
              paddingBottom: '12px',
              borderBottom: '1px solid #ddd',
            }}>
              Skills
            </h2>
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '12px',
            }}>
              {skills.map((s, i) => (
                <span key={i} style={{
                  padding: '8px 16px',
                  border: '1px solid #1a1a1a',
                  fontSize: '13px',
                  fontWeight: '500',
                }}>
                  {s.name}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Work Experience Section */}
        {work && work.length > 0 && (
          <section style={{
            marginBottom: '28px',
            padding: '25px',
            border: '1px solid #1a1a1a',
          }}>
            <h2 style={{
              fontSize: '14px',
              fontWeight: '700',
              margin: '0 0 20px 0',
              textTransform: 'uppercase',
              letterSpacing: '2px',
              textAlign: 'center',
              paddingBottom: '12px',
              borderBottom: '1px solid #ddd',
            }}>
              Work Experience
            </h2>
            {work.map((w, idx) => (
              <div key={idx} style={{
                marginBottom: '20px',
                paddingBottom: '20px',
                borderBottom: idx < work.length - 1 ? '1px solid #eee' : 'none',
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: '6px',
                }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '16px', fontWeight: '700' }}>
                      {w.position || 'Position'}
                    </div>
                    <div style={{
                      fontSize: '14px',
                      color: '#555',
                      fontStyle: 'italic',
                      marginTop: '2px',
                    }}>
                      {w.company || 'Company'}
                      {w.location && (
                        <span style={{ color: '#888' }}> · {w.location}</span>
                      )}
                    </div>
                  </div>
                  <span style={{
                    fontSize: '13px',
                    color: '#666',
                    fontStyle: 'italic',
                    textAlign: 'right',
                  }}>
                    {formatDate(w.startDate, w.endDate)}
                  </span>
                </div>

                {w.description && (
                  <p style={{
                    margin: '10px 0 0 0',
                    fontSize: '14px',
                    color: '#444',
                    lineHeight: '1.6',
                  }}>
                    {w.description}
                  </p>
                )}

                {w.highlights && w.highlights.length > 0 && (
                  <ul style={{
                    margin: '10px 0 0 0',
                    paddingLeft: '20px',
                    fontSize: '14px',
                    color: '#444',
                    lineHeight: '1.6',
                  }}>
                    {w.highlights.map((h, i) => (
                      <li key={i} style={{ marginBottom: '3px' }}>{h}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </section>
        )}

        {/* Education Section */}
        {education && education.length > 0 && (
          <section style={{
            marginBottom: '28px',
            padding: '25px',
            border: '1px solid #1a1a1a',
          }}>
            <h2 style={{
              fontSize: '14px',
              fontWeight: '700',
              margin: '0 0 20px 0',
              textTransform: 'uppercase',
              letterSpacing: '2px',
              textAlign: 'center',
              paddingBottom: '12px',
              borderBottom: '1px solid #ddd',
            }}>
              Education
            </h2>
            {education.map((e, idx) => (
              <div key={idx} style={{
                marginBottom: '16px',
                paddingBottom: '16px',
                borderBottom: idx < education.length - 1 ? '1px solid #eee' : 'none',
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: '4px',
                }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '16px', fontWeight: '700' }}>
                      {e.school || 'School'}
                    </div>
                    <div style={{ fontSize: '14px', color: '#555', marginTop: '2px' }}>
                      {e.degree}{e.degree && e.area && ' in '}{e.area}
                    </div>
                  </div>
                  <span style={{
                    fontSize: '13px',
                    color: '#666',
                    fontStyle: 'italic',
                  }}>
                    {formatDate(e.startDate, e.endDate)}
                  </span>
                </div>
              </div>
            ))}
          </section>
        )}

        {/* Projects Section */}
        {projects && projects.length > 0 && (
          <section style={{
            padding: '25px',
            border: '1px solid #1a1a1a',
          }}>
            <h2 style={{
              fontSize: '14px',
              fontWeight: '700',
              margin: '0 0 20px 0',
              textTransform: 'uppercase',
              letterSpacing: '2px',
              textAlign: 'center',
              paddingBottom: '12px',
              borderBottom: '1px solid #ddd',
            }}>
              Projects
            </h2>
            {projects.map((p, idx) => (
              <div key={idx} style={{
                marginBottom: '16px',
                paddingBottom: '16px',
                borderBottom: idx < projects.length - 1 ? '1px solid #eee' : 'none',
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'baseline',
                }}>
                  <span style={{ fontSize: '16px', fontWeight: '700' }}>
                    {p.name || 'Project Name'}
                  </span>
                  {p.url && (
                    <a href={p.url} style={{
                      fontSize: '13px',
                      color: '#1a1a1a',
                      textDecoration: 'underline',
                      fontStyle: 'italic',
                    }}>
                      {p.url}
                    </a>
                  )}
                </div>
                {p.description && (
                  <p style={{
                    margin: '8px 0 0 0',
                    fontSize: '14px',
                    color: '#444',
                    lineHeight: '1.6',
                  }}>
                    {p.description}
                  </p>
                )}
                {p.technologies && p.technologies.length > 0 && (
                  <p style={{
                    margin: '8px 0 0 0',
                    fontSize: '13px',
                    color: '#666',
                    fontStyle: 'italic',
                  }}>
                    Technologies: {p.technologies.join(', ')}
                  </p>
                )}
              </div>
            ))}
          </section>
        )}
      </div>
    </article>
  )
}
