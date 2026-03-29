import React from 'react'
import type { ResumeData } from '../../forms/types'

type TemplateProps = { resume: ResumeData }

function formatDate(startDate?: string, endDate?: string) {
  if (startDate && endDate) return `${startDate} - ${endDate}`
  if (startDate) return `${startDate} - 至今`
  if (endDate) return `至 ${endDate}`
  return ''
}

export const ChineseProfessionalTemplate: React.FC<TemplateProps> = ({ resume }) => {
  const { basics, work, education, skills, projects } = resume

  return (
    <article style={{
      fontFamily: "'PingFang SC', 'Microsoft YaHei', -apple-system, sans-serif",
      color: '#1f2937',
      background: '#ffffff',
      maxWidth: '850px',
      lineHeight: '1.7',
      overflow: 'hidden',
      boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
    }}>
      {/* Modern Header with Gradient */}
      <header style={{
        background: 'linear-gradient(135deg, #1e3a5f 0%, #2c5282 50%, #3182ce 100%)',
        padding: '45px 40px',
        color: '#fff',
        position: 'relative',
      }}>
        {/* Decorative elements */}
        <div style={{
          position: 'absolute',
          top: '-40px',
          right: '-40px',
          width: '180px',
          height: '180px',
          background: 'rgba(255,255,255,0.08)',
          borderRadius: '50%',
        }} />
        <div style={{
          position: 'absolute',
          bottom: '-20px',
          left: '5%',
          width: '80px',
          height: '80px',
          background: 'rgba(255,255,255,0.06)',
          borderRadius: '50%',
        }} />

        <div style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', gap: '30px' }}>
          {/* Photo placeholder */}
          <div style={{
            width: '100px',
            height: '100px',
            background: 'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.1) 100%)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '3px solid rgba(255,255,255,0.3)',
          }}>
            <span style={{ fontSize: '36px' }}>👤</span>
          </div>

          <div style={{ flex: 1 }}>
            <h1 style={{
              fontSize: '38px',
              fontWeight: '700',
              margin: '0 0 8px 0',
              letterSpacing: '2px',
            }}>
              {basics?.name || '姓名'}
            </h1>
            {basics?.label && (
              <div style={{
                fontSize: '16px',
                opacity: 0.9,
                marginBottom: '16px',
              }}>
                {basics.label}
              </div>
            )}

            {/* Contact info */}
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '20px',
              fontSize: '13px',
              opacity: 0.85,
            }}>
              {basics?.phone && (
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span>📱</span> {basics.phone}
                </span>
              )}
              {basics?.email && (
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span>✉️</span> {basics.email}
                </span>
              )}
              {basics?.location && (
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span>📍</span> {basics.location}
                </span>
              )}
              {basics?.website && (
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span>🌐</span> {basics.website}
                </span>
              )}
            </div>
          </div>
        </div>
      </header>

      <div style={{ display: 'flex' }}>
        {/* Left Sidebar */}
        <div style={{
          width: '240px',
          flexShrink: 0,
          background: '#f8fafc',
          padding: '35px 25px',
          borderRight: '1px solid #e2e8f0',
        }}>
          {/* Summary */}
          {basics?.summary && (
            <div style={{ marginBottom: '28px' }}>
              <h3 style={{
                fontSize: '13px',
                fontWeight: '700',
                color: '#1e3a5f',
                margin: '0 0 12px 0',
                paddingBottom: '8px',
                borderBottom: '2px solid #1e3a5f',
              }}>
                求职意向
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
            <div style={{ marginBottom: '28px' }}>
              <h3 style={{
                fontSize: '13px',
                fontWeight: '700',
                color: '#1e3a5f',
                margin: '0 0 12px 0',
                paddingBottom: '8px',
                borderBottom: '2px solid #1e3a5f',
              }}>
                技能专长
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {skills.map((s, i) => (
                  <div key={i} style={{
                    padding: '8px 12px',
                    background: '#fff',
                    borderRadius: '6px',
                    border: '1px solid #e2e8f0',
                    fontSize: '13px',
                    color: '#374151',
                    fontWeight: '500',
                  }}>
                    {s.name}
                    {s.level && (
                      <span style={{
                        fontSize: '11px',
                        color: '#3182ce',
                        marginLeft: '6px',
                      }}>
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
            <div style={{ marginBottom: '28px' }}>
              <h3 style={{
                fontSize: '13px',
                fontWeight: '700',
                color: '#1e3a5f',
                margin: '0 0 12px 0',
                paddingBottom: '8px',
                borderBottom: '2px solid #1e3a5f',
              }}>
                教育背景
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {education.map((e, idx) => (
                  <div key={idx}>
                    <div style={{
                      fontSize: '14px',
                      fontWeight: '600',
                      color: '#1f2937',
                      marginBottom: '2px',
                    }}>
                      {e.school || '学校'}
                    </div>
                    <div style={{
                      fontSize: '12px',
                      color: '#6b7280',
                      lineHeight: '1.5',
                    }}>
                      {e.degree}{e.degree && e.area && ' · '}{e.area}
                    </div>
                    <div style={{
                      fontSize: '11px',
                      color: '#3182ce',
                      marginTop: '4px',
                    }}>
                      {formatDate(e.startDate, e.endDate)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Languages */}
          <div>
            <h3 style={{
              fontSize: '13px',
              fontWeight: '700',
              color: '#1e3a5f',
              margin: '0 0 12px 0',
              paddingBottom: '8px',
              borderBottom: '2px solid #1e3a5f',
            }}>
              语言能力
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '8px 12px',
                background: '#fff',
                borderRadius: '6px',
                fontSize: '13px',
              }}>
                <span style={{ fontWeight: '500' }}>中文</span>
                <span style={{ color: '#22c55e', fontWeight: '600', fontSize: '12px' }}>母语</span>
              </div>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '8px 12px',
                background: '#fff',
                borderRadius: '6px',
                fontSize: '13px',
              }}>
                <span style={{ fontWeight: '500' }}>英语</span>
                <span style={{ color: '#3182ce', fontWeight: '600', fontSize: '12px' }}>流利</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div style={{ flex: 1, padding: '35px 35px' }}>
          {/* Work Experience */}
          {work && work.length > 0 && (
            <section style={{ marginBottom: '32px' }}>
              <h2 style={{
                fontSize: '17px',
                fontWeight: '700',
                color: '#1e3a5f',
                margin: '0 0 20px 0',
                paddingBottom: '10px',
                borderBottom: '2px solid #1e3a5f',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
              }}>
                <span style={{
                  width: '8px',
                  height: '20px',
                  background: '#3182ce',
                  borderRadius: '4px',
                }} />
                工作经历
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {work.map((w, idx) => (
                  <div key={idx} style={{
                    padding: '18px',
                    background: '#f8fafc',
                    borderRadius: '8px',
                    borderLeft: '4px solid #3182ce',
                  }}>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      marginBottom: '6px',
                    }}>
                      <div>
                        <div style={{
                          fontSize: '16px',
                          fontWeight: '700',
                          color: '#1f2937',
                        }}>
                          {w.company || '公司'}
                        </div>
                        <div style={{
                          fontSize: '14px',
                          color: '#3182ce',
                          fontWeight: '600',
                          marginTop: '2px',
                        }}>
                          {w.position || '职位'}
                          {w.location && (
                            <span style={{ color: '#6b7280', fontWeight: '400' }}> · {w.location}</span>
                          )}
                        </div>
                      </div>
                      <span style={{
                        fontSize: '12px',
                        color: '#3182ce',
                        fontWeight: '600',
                        background: '#dbeafe',
                        padding: '4px 10px',
                        borderRadius: '4px',
                      }}>
                        {formatDate(w.startDate, w.endDate)}
                      </span>
                    </div>

                    {w.description && (
                      <p style={{
                        margin: '10px 0 0 0',
                        fontSize: '13px',
                        color: '#4b5563',
                        lineHeight: '1.7',
                      }}>
                        {w.description}
                      </p>
                    )}

                    {w.highlights && w.highlights.length > 0 && (
                      <ul style={{
                        margin: '10px 0 0 0',
                        paddingLeft: '18px',
                        fontSize: '13px',
                        color: '#4b5563',
                        lineHeight: '1.7',
                      }}>
                        {w.highlights.map((h, i) => (
                          <li key={i} style={{ marginBottom: '3px' }}>{h}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Projects */}
          {projects && projects.length > 0 && (
            <section>
              <h2 style={{
                fontSize: '17px',
                fontWeight: '700',
                color: '#1e3a5f',
                margin: '0 0 20px 0',
                paddingBottom: '10px',
                borderBottom: '2px solid #1e3a5f',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
              }}>
                <span style={{
                  width: '8px',
                  height: '20px',
                  background: '#22c55e',
                  borderRadius: '4px',
                }} />
                项目经验
              </h2>
              <div style={{ display: 'grid', gap: '14px' }}>
                {projects.map((p, idx) => (
                  <div key={idx} style={{
                    padding: '16px',
                    background: '#f8fafc',
                    borderRadius: '8px',
                    borderLeft: '4px solid #22c55e',
                  }}>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '6px',
                    }}>
                      <span style={{
                        fontSize: '15px',
                        fontWeight: '700',
                        color: '#1f2937',
                      }}>
                        {p.name || '项目名称'}
                      </span>
                      {p.url && (
                        <a href={p.url} style={{
                          fontSize: '12px',
                          color: '#22c55e',
                          textDecoration: 'none',
                          fontWeight: '600',
                        }}>
                          查看 →
                        </a>
                      )}
                    </div>

                    {p.description && (
                      <p style={{
                        margin: '0 0 8px 0',
                        fontSize: '13px',
                        color: '#4b5563',
                        lineHeight: '1.6',
                      }}>
                        {p.description}
                      </p>
                    )}

                    {p.technologies && p.technologies.length > 0 && (
                      <div style={{
                        display: 'flex',
                        gap: '6px',
                        flexWrap: 'wrap',
                      }}>
                        {p.technologies.map((tech, i) => (
                          <span key={i} style={{
                            fontSize: '11px',
                            padding: '3px 10px',
                            background: '#dbeafe',
                            color: '#3182ce',
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
