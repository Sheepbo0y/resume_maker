import React from 'react'
import type { ResumeData } from '../../forms/types'

type TemplateProps = { resume: ResumeData }

function formatDate(startDate?: string, endDate?: string) {
  if (startDate && endDate) return `${startDate} - ${endDate}`
  if (startDate) return `${startDate} - Present`
  if (endDate) return `Until ${endDate}`
  return ''
}

export const RedClassicTemplate: React.FC<TemplateProps> = ({ resume }) => {
  const { basics, work, education, skills, projects } = resume

  return (
    <article style={{
      fontFamily: "'Helvetica Neue', Arial, sans-serif",
      color: '#333',
      background: '#ffffff',
      maxWidth: '850px',
      lineHeight: '1.65',
      overflow: 'hidden',
      boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
    }}>
      {/* Header with name and contact info */}
      <header style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        padding: '40px',
        background: 'linear-gradient(135deg, #fef2f2 0%, #ffffff 100%)',
        borderBottom: '4px solid #dc2626',
      }}>
        {/* Left: Contact Info */}
        <div style={{
          fontSize: '14px',
          lineHeight: '2',
          color: '#666',
        }}>
          {basics?.phone && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ color: '#dc2626' }}>☎</span> {basics.phone}
            </div>
          )}
          {basics?.email && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ color: '#dc2626' }}>✉</span> {basics.email}
            </div>
          )}
          {basics?.location && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ color: '#dc2626' }}>📍</span> {basics.location}
            </div>
          )}
          {basics?.website && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ color: '#dc2626' }}>🔗</span> {basics.website}
            </div>
          )}
        </div>

        {/* Right: Name */}
        <div style={{ textAlign: 'right' }}>
          <h1 style={{
            fontSize: '44px',
            fontWeight: '800',
            margin: '0 0 8px 0',
            color: '#dc2626',
            letterSpacing: '1px',
          }}>
            {basics?.name || 'Your Name'}
          </h1>
          {basics?.label && (
            <div style={{
              fontSize: '16px',
              color: '#666',
              fontWeight: '500',
            }}>
              {basics.label}
            </div>
          )}
        </div>
      </header>

      <div style={{ padding: '35px 40px' }}>
        {/* Objective Section */}
        {basics?.summary && (
          <section style={{ marginBottom: '28px' }}>
            <div style={{
              background: 'linear-gradient(90deg, #dc2626 0%, #ef4444 100%)',
              color: '#fff',
              padding: '12px 20px',
              fontSize: '15px',
              fontWeight: '700',
              textTransform: 'uppercase',
              letterSpacing: '2px',
              marginBottom: '16px',
              borderRadius: '4px',
            }}>
              Objective
            </div>
            <p style={{
              margin: 0,
              fontSize: '15px',
              color: '#555',
              lineHeight: '1.7',
              padding: '0 10px',
            }}>
              {basics.summary}
            </p>
          </section>
        )}

        {/* Skills Section */}
        {skills && skills.length > 0 && (
          <section style={{ marginBottom: '28px' }}>
            <div style={{
              background: 'linear-gradient(90deg, #dc2626 0%, #ef4444 100%)',
              color: '#fff',
              padding: '12px 20px',
              fontSize: '15px',
              fontWeight: '700',
              textTransform: 'uppercase',
              letterSpacing: '2px',
              marginBottom: '16px',
              borderRadius: '4px',
            }}>
              Skills
            </div>
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '10px',
              padding: '0 10px',
            }}>
              {skills.map((s, i) => (
                <span
                  key={i}
                  style={{
                    padding: '8px 16px',
                    background: '#fef2f2',
                    border: '2px solid #fecaca',
                    color: '#dc2626',
                    borderRadius: '20px',
                    fontSize: '14px',
                    fontWeight: '600',
                  }}
                >
                  {s.name}
                  {s.level && (
                    <span style={{
                      marginLeft: '6px',
                      fontSize: '12px',
                      opacity: 0.8,
                    }}>
                      • {s.level}
                    </span>
                  )}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Experience Section */}
        {work && work.length > 0 && (
          <section style={{ marginBottom: '28px' }}>
            <div style={{
              background: 'linear-gradient(90deg, #dc2626 0%, #ef4444 100%)',
              color: '#fff',
              padding: '12px 20px',
              fontSize: '15px',
              fontWeight: '700',
              textTransform: 'uppercase',
              letterSpacing: '2px',
              marginBottom: '16px',
              borderRadius: '4px',
            }}>
              Experience
            </div>
            <div style={{ padding: '0 10px' }}>
              {work.map((w, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    gap: '24px',
                    marginBottom: '24px',
                    paddingBottom: '24px',
                    borderBottom: idx < work.length - 1 ? '1px solid #e5e5e5' : 'none',
                  }}
                >
                  {/* Left: Job Info */}
                  <div style={{ width: '220px', flexShrink: 0 }}>
                    <div style={{
                      fontSize: '16px',
                      fontWeight: '700',
                      color: '#333',
                      marginBottom: '4px',
                    }}>
                      {w.company || 'Company'}
                    </div>
                    <div style={{
                      fontSize: '14px',
                      color: '#dc2626',
                      fontWeight: '600',
                      marginBottom: '4px',
                    }}>
                      {w.position || 'Position'}
                    </div>
                    <div style={{
                      fontSize: '13px',
                      color: '#666',
                    }}>
                      {formatDate(w.startDate, w.endDate)}
                    </div>
                    {w.location && (
                      <div style={{
                        fontSize: '13px',
                        color: '#999',
                        marginTop: '4px',
                      }}>
                        {w.location}
                      </div>
                    )}
                  </div>
                  {/* Right: Description */}
                  <div style={{ flex: 1 }}>
                    {w.description && (
                      <p style={{
                        margin: '0 0 10px 0',
                        fontSize: '14px',
                        color: '#555',
                        lineHeight: '1.6',
                      }}>
                        {w.description}
                      </p>
                    )}
                    {w.highlights && w.highlights.length > 0 && (
                      <ul style={{
                        margin: 0,
                        paddingLeft: '20px',
                        fontSize: '14px',
                        color: '#555',
                        lineHeight: '1.6',
                      }}>
                        {w.highlights.map((h, i) => (
                          <li key={i} style={{ marginBottom: '3px' }}>{h}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education Section */}
        {education && education.length > 0 && (
          <section style={{ marginBottom: '28px' }}>
            <div style={{
              background: 'linear-gradient(90deg, #dc2626 0%, #ef4444 100%)',
              color: '#fff',
              padding: '12px 20px',
              fontSize: '15px',
              fontWeight: '700',
              textTransform: 'uppercase',
              letterSpacing: '2px',
              marginBottom: '16px',
              borderRadius: '4px',
            }}>
              Education
            </div>
            <div style={{ padding: '0 10px' }}>
              {education.map((e, idx) => (
                <div
                  key={idx}
                  style={{
                    marginBottom: '16px',
                    paddingBottom: '16px',
                    borderBottom: idx < education.length - 1 ? '1px solid #e5e5e5' : 'none',
                  }}
                >
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                  }}>
                    <div>
                      <div style={{
                        fontSize: '16px',
                        fontWeight: '700',
                        color: '#333',
                      }}>
                        {e.school || 'School'}
                      </div>
                      <div style={{
                        fontSize: '14px',
                        color: '#555',
                      }}>
                        {e.degree}{e.degree && e.area && ' in '}{e.area}
                      </div>
                    </div>
                    <span style={{
                      fontSize: '13px',
                      color: '#dc2626',
                      fontWeight: '600',
                      background: '#fef2f2',
                      padding: '4px 12px',
                      borderRadius: '4px',
                    }}>
                      {formatDate(e.startDate, e.endDate)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects Section */}
        {projects && projects.length > 0 && (
          <section style={{ marginBottom: '28px' }}>
            <div style={{
              background: 'linear-gradient(90deg, #dc2626 0%, #ef4444 100%)',
              color: '#fff',
              padding: '12px 20px',
              fontSize: '15px',
              fontWeight: '700',
              textTransform: 'uppercase',
              letterSpacing: '2px',
              marginBottom: '16px',
              borderRadius: '4px',
            }}>
              Projects
            </div>
            <div style={{ padding: '0 10px' }}>
              {projects.map((p, idx) => (
                <div
                  key={idx}
                  style={{
                    marginBottom: '16px',
                    paddingBottom: '16px',
                    borderBottom: idx < projects.length - 1 ? '1px solid #e5e5e5' : 'none',
                  }}
                >
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'baseline',
                  }}>
                    <strong style={{
                      fontSize: '16px',
                      color: '#333',
                    }}>
                      {p.name || 'Project Name'}
                    </strong>
                    {p.url && (
                      <a href={p.url} style={{
                        fontSize: '13px',
                        color: '#dc2626',
                        textDecoration: 'none',
                        fontWeight: '600',
                      }}>
                        View Project →
                      </a>
                    )}
                  </div>
                  {p.description && (
                    <p style={{
                      margin: '8px 0 0 0',
                      fontSize: '14px',
                      color: '#555',
                      lineHeight: '1.6',
                    }}>
                      {p.description}
                    </p>
                  )}
                  {p.technologies && p.technologies.length > 0 && (
                    <div style={{
                      marginTop: '8px',
                      display: 'flex',
                      gap: '6px',
                      flexWrap: 'wrap',
                    }}>
                      {p.technologies.map((tech, i) => (
                        <span key={i} style={{
                          fontSize: '12px',
                          padding: '3px 10px',
                          background: '#fef2f2',
                          color: '#dc2626',
                          borderRadius: '4px',
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

        {/* Languages Section */}
        <section>
          <div style={{
            background: 'linear-gradient(90deg, #dc2626 0%, #ef4444 100%)',
            color: '#fff',
            padding: '12px 20px',
            fontSize: '15px',
            fontWeight: '700',
            textTransform: 'uppercase',
            letterSpacing: '2px',
            marginBottom: '16px',
            borderRadius: '4px',
          }}>
            Languages
          </div>
          <div style={{ padding: '0 10px' }}>
            <div style={{
              display: 'flex',
              gap: '20px',
            }}>
              <div style={{
                fontSize: '14px',
                color: '#555',
                padding: '8px 16px',
                background: '#fef2f2',
                borderRadius: '20px',
              }}>
                <span style={{ fontWeight: '700', color: '#333' }}>English</span>
                <span style={{ color: '#dc2626', marginLeft: '8px', fontWeight: '600' }}>Native</span>
              </div>
              <div style={{
                fontSize: '14px',
                color: '#555',
                padding: '8px 16px',
                background: '#fef2f2',
                borderRadius: '20px',
              }}>
                <span style={{ fontWeight: '700', color: '#333' }}>Spanish</span>
                <span style={{ color: '#dc2626', marginLeft: '8px', fontWeight: '600' }}>Fluent</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </article>
  )
}
