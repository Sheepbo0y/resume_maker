import React from 'react'
import type { ResumeData } from '../forms/types'
import { MinimalistTemplate as TopjianliMinimalistTemplate } from './templates/TopjianliMinimalist'
import { ShanghaiTemplate } from './templates/TopjianliShanghai'
import { TopjianliCreativeTemplate } from './templates/TopjianliCreative'
import { GreenSimpleTemplate } from './templates/GreenSimple'
import { BorderedCleanTemplate } from './templates/BorderedClean'
import { RedModernTemplate } from './templates/RedModern'
import { ChineseProfessionalTemplate } from './templates/ChineseProfessional'
import { TealEnergeticTemplate } from './templates/TealEnergetic'
import { RedClassicTemplate } from './templates/RedClassic'

type TemplateProps = { resume: ResumeData }

function formatDate(startDate?: string, endDate?: string) {
  if (startDate && endDate) return `${startDate} - ${endDate}`
  if (startDate) return `${startDate} - 至今`
  if (endDate) return `至 ${endDate}`
  return ''
}

export const ClassicProfessionalTemplate: React.FC<TemplateProps> = ({ resume }) => {
  const { basics, work, education, skills, projects } = resume
  return (
    <article style={{
      fontFamily: "'Georgia', 'Times New Roman', serif",
      color: '#1a1a1a',
      background: '#fff',
      padding: '40px',
      maxWidth: '800px',
      lineHeight: '1.6',
    }}>
      <header style={{
        textAlign: 'center',
        borderBottom: '3px double #2c3e50',
        paddingBottom: '24px',
        marginBottom: '24px',
      }}>
        <h1 style={{
          fontSize: '32px',
          fontWeight: '700',
          margin: '0 0 12px 0',
          color: '#2c3e50',
          letterSpacing: '2px',
          textTransform: 'uppercase',
        }}>
          {basics?.name || 'Your Name'}
        </h1>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: '16px',
          fontSize: '14px',
          color: '#555',
        }}>
          {basics?.email && (
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span>✉</span> {basics.email}
            </span>
          )}
          {basics?.phone && (
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span>☎</span> {basics.phone}
            </span>
          )}
          {basics?.location && (
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span>📍</span> {basics.location}
            </span>
          )}
        </div>
      </header>

      {basics?.summary && (
        <section style={{ marginBottom: '24px' }}>
          <h2 style={{
            fontSize: '16px',
            fontWeight: '700',
            color: '#2c3e50',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            borderBottom: '2px solid #3498db',
            paddingBottom: '8px',
            marginBottom: '12px',
          }}>
            Professional Summary
          </h2>
          <p style={{ margin: 0, textAlign: 'justify', color: '#333' }}>
            {basics.summary}
          </p>
        </section>
      )}

      {work && work.length > 0 && (
        <section style={{ marginBottom: '24px' }}>
          <h2 style={{
            fontSize: '16px',
            fontWeight: '700',
            color: '#2c3e50',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            borderBottom: '2px solid #3498db',
            paddingBottom: '8px',
            marginBottom: '16px',
          }}>
            Work Experience
          </h2>
          {work.map((w, idx) => (
            <div key={idx} style={{
              marginBottom: '20px',
              paddingLeft: '16px',
              borderLeft: '3px solid #3498db',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '4px' }}>
                <strong style={{ fontSize: '16px', color: '#2c3e50' }}>{w.position || 'Position'}</strong>
                <span style={{ fontSize: '13px', color: '#777', fontStyle: 'italic' }}>
                  {formatDate(w.startDate, w.endDate)}
                </span>
              </div>
              <div style={{ fontSize: '15px', color: '#555', fontStyle: 'italic', marginBottom: '8px' }}>
                {w.company || 'Company'}
              </div>
              {w.description && (
                <p style={{ margin: 0, fontSize: '14px', color: '#444', lineHeight: '1.5' }}>
                  {w.description}
                </p>
              )}
            </div>
          ))}
        </section>
      )}

      {education && education.length > 0 && (
        <section style={{ marginBottom: '24px' }}>
          <h2 style={{
            fontSize: '16px',
            fontWeight: '700',
            color: '#2c3e50',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            borderBottom: '2px solid #3498db',
            paddingBottom: '8px',
            marginBottom: '16px',
          }}>
            Education
          </h2>
          {education.map((e, idx) => (
            <div key={idx} style={{
              marginBottom: '16px',
              paddingLeft: '16px',
              borderLeft: '3px solid #27ae60',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '4px' }}>
                <strong style={{ fontSize: '15px', color: '#2c3e50' }}>{e.school || 'School'}</strong>
                <span style={{ fontSize: '13px', color: '#777', fontStyle: 'italic' }}>
                  {formatDate(e.startDate, e.endDate)}
                </span>
              </div>
              <div style={{ fontSize: '14px', color: '#555' }}>
                {e.degree && <span>{e.degree}</span>}
                {e.degree && e.area && <span> in </span>}
                {e.area && <span style={{ fontStyle: 'italic' }}>{e.area}</span>}
              </div>
            </div>
          ))}
        </section>
      )}

      {skills && skills.length > 0 && (
        <section style={{ marginBottom: '24px' }}>
          <h2 style={{
            fontSize: '16px',
            fontWeight: '700',
            color: '#2c3e50',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            borderBottom: '2px solid #3498db',
            paddingBottom: '8px',
            marginBottom: '12px',
          }}>
            Skills
          </h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {skills.map((s, i) => (
              <span key={i} style={{
                padding: '6px 14px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: '#fff',
                borderRadius: '20px',
                fontSize: '13px',
                fontWeight: '500',
              }}>
                {s.name}
              </span>
            ))}
          </div>
        </section>
      )}

      {projects && projects.length > 0 && (
        <section style={{ marginBottom: '24px' }}>
          <h2 style={{
            fontSize: '16px',
            fontWeight: '700',
            color: '#2c3e50',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            borderBottom: '2px solid #3498db',
            paddingBottom: '8px',
            marginBottom: '16px',
          }}>
            Projects
          </h2>
          {projects.map((p, idx) => (
            <div key={idx} style={{
              marginBottom: '16px',
              padding: '12px',
              background: '#f8f9fa',
              borderRadius: '8px',
              borderLeft: '3px solid #e74c3c',
            }}>
              <div style={{ fontWeight: '600', fontSize: '15px', color: '#2c3e50', marginBottom: '4px' }}>
                {p.name || 'Project Name'}
              </div>
              {p.description && (
                <p style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#555' }}>
                  {p.description}
                </p>
              )}
              {p.url && (
                <a href={p.url} style={{ fontSize: '13px', color: '#3498db', textDecoration: 'none' }}>
                  🔗 {p.url}
                </a>
              )}
            </div>
          ))}
        </section>
      )}
    </article>
  )
}

export const ModernMinimalTemplate: React.FC<TemplateProps> = ({ resume }) => {
  const { basics, work, education, skills, projects } = resume
  return (
    <article style={{
      fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif",
      color: '#1a1a1a',
      background: '#fff',
      padding: '40px',
      maxWidth: '800px',
      lineHeight: '1.6',
    }}>
      <header style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: '#fff',
        padding: '32px',
        borderRadius: '16px',
        marginBottom: '32px',
        boxShadow: '0 10px 40px rgba(102, 126, 234, 0.3)',
      }}>
        <h1 style={{
          fontSize: '36px',
          fontWeight: '800',
          margin: '0 0 16px 0',
          letterSpacing: '-0.5px',
        }}>
          {basics?.name || 'Your Name'}
        </h1>
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '20px',
          fontSize: '14px',
          opacity: '0.95',
        }}>
          {basics?.email && <span>📧 {basics.email}</span>}
          {basics?.phone && <span>📱 {basics.phone}</span>}
          {basics?.location && <span>📍 {basics.location}</span>}
        </div>
        {basics?.summary && (
          <p style={{
            margin: '20px 0 0 0',
            fontSize: '15px',
            opacity: '0.9',
            lineHeight: '1.6',
          }}>
            {basics.summary}
          </p>
        )}
      </header>

      {work && work.length > 0 && (
        <section style={{ marginBottom: '32px' }}>
          <h2 style={{
            fontSize: '20px',
            fontWeight: '700',
            color: '#667eea',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
          }}>
            <span style={{
              width: '40px',
              height: '40px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '18px',
            }}>💼</span>
            Experience
          </h2>
          {work.map((w, idx) => (
            <div key={idx} style={{
              marginBottom: '24px',
              padding: '20px',
              background: '#f8f9fa',
              borderRadius: '12px',
              border: '1px solid #e9ecef',
              transition: 'all 0.3s ease',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                <div>
                  <div style={{ fontSize: '18px', fontWeight: '700', color: '#2c3e50' }}>
                    {w.position || 'Position'}
                  </div>
                  <div style={{ fontSize: '15px', color: '#667eea', fontWeight: '600' }}>
                    {w.company || 'Company'}
                  </div>
                </div>
                <span style={{
                  fontSize: '13px',
                  color: '#fff',
                  background: '#667eea',
                  padding: '4px 12px',
                  borderRadius: '20px',
                  fontWeight: '500',
                }}>
                  {formatDate(w.startDate, w.endDate)}
                </span>
              </div>
              {w.description && (
                <p style={{ margin: 0, fontSize: '14px', color: '#555', lineHeight: '1.6' }}>
                  {w.description}
                </p>
              )}
            </div>
          ))}
        </section>
      )}

      {education && education.length > 0 && (
        <section style={{ marginBottom: '32px' }}>
          <h2 style={{
            fontSize: '20px',
            fontWeight: '700',
            color: '#27ae60',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
          }}>
            <span style={{
              width: '40px',
              height: '40px',
              background: 'linear-gradient(135deg, #27ae60 0%, #2ecc71 100%)',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '18px',
            }}>🎓</span>
            Education
          </h2>
          {education.map((e, idx) => (
            <div key={idx} style={{
              marginBottom: '20px',
              padding: '20px',
              background: '#f0fff4',
              borderRadius: '12px',
              border: '1px solid #c3e6cb',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <div style={{ fontSize: '16px', fontWeight: '700', color: '#2c3e50' }}>
                    {e.school || 'School'}
                  </div>
                  <div style={{ fontSize: '14px', color: '#555' }}>
                    {e.degree && <span>{e.degree}</span>}
                    {e.degree && e.area && <span> • </span>}
                    {e.area && <span style={{ color: '#27ae60', fontWeight: '500' }}>{e.area}</span>}
                  </div>
                </div>
                <span style={{
                  fontSize: '13px',
                  color: '#27ae60',
                  fontWeight: '600',
                }}>
                  {formatDate(e.startDate, e.endDate)}
                </span>
              </div>
            </div>
          ))}
        </section>
      )}

      {skills && skills.length > 0 && (
        <section style={{ marginBottom: '32px' }}>
          <h2 style={{
            fontSize: '20px',
            fontWeight: '700',
            color: '#e67e22',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
          }}>
            <span style={{
              width: '40px',
              height: '40px',
              background: 'linear-gradient(135deg, #f39c12 0%, #e74c3c 100%)',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '18px',
            }}>⚡</span>
            Skills
          </h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
            {skills.map((s, i) => (
              <span key={i} style={{
                padding: '10px 18px',
                background: '#fff',
                border: '2px solid #e67e22',
                borderRadius: '25px',
                fontSize: '14px',
                fontWeight: '600',
                color: '#e67e22',
                transition: 'all 0.3s ease',
              }}>
                {s.name}
                {s.level && (
                  <span style={{
                    marginLeft: '8px',
                    fontSize: '11px',
                    opacity: '0.7',
                  }}>
                    • {s.level}
                  </span>
                )}
              </span>
            ))}
          </div>
        </section>
      )}

      {projects && projects.length > 0 && (
        <section style={{ marginBottom: '32px' }}>
          <h2 style={{
            fontSize: '20px',
            fontWeight: '700',
            color: '#9b59b6',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
          }}>
            <span style={{
              width: '40px',
              height: '40px',
              background: 'linear-gradient(135deg, #9b59b6 0%, #8e44ad 100%)',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '18px',
            }}>🚀</span>
            Projects
          </h2>
          {projects.map((p, idx) => (
            <div key={idx} style={{
              marginBottom: '20px',
              padding: '20px',
              background: '#f5f0ff',
              borderRadius: '12px',
              border: '1px solid #d5b8e8',
            }}>
              <div style={{ fontSize: '16px', fontWeight: '700', color: '#2c3e50', marginBottom: '8px' }}>
                {p.name || 'Project Name'}
              </div>
              {p.description && (
                <p style={{ margin: '0 0 12px 0', fontSize: '14px', color: '#555', lineHeight: '1.6' }}>
                  {p.description}
                </p>
              )}
              {p.url && (
                <a href={p.url} style={{
                  fontSize: '13px',
                  color: '#9b59b6',
                  textDecoration: 'none',
                  fontWeight: '500',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                }}>
                  🔗 View Project →
                </a>
              )}
            </div>
          ))}
        </section>
      )}
    </article>
  )
}

export const CreativeSimpleTemplate: React.FC<TemplateProps> = ({ resume }) => {
  const { basics, work, education, skills, projects } = resume
  return (
    <article style={{
      fontFamily: "'Poppins', 'Segoe UI', Arial, sans-serif",
      color: '#1a1a1a',
      background: '#fff',
      padding: '40px',
      maxWidth: '800px',
      lineHeight: '1.6',
    }}>
      <div style={{ display: 'flex', gap: '32px' }}>
        <div style={{
          width: '200px',
          flexShrink: 0,
          background: 'linear-gradient(180deg, #1a1a2e 0%, #16213e 100%)',
          borderRadius: '20px',
          padding: '24px',
          color: '#fff',
        }}>
          <div style={{
            width: '100px',
            height: '100px',
            background: 'linear-gradient(135deg, #e94560 0%, #f39c12 100%)',
            borderRadius: '50%',
            margin: '0 auto 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '36px',
            fontWeight: '700',
          }}>
            {(basics?.name || 'U')[0].toUpperCase()}
          </div>

          <h1 style={{
            fontSize: '18px',
            fontWeight: '700',
            textAlign: 'center',
            marginBottom: '16px',
          }}>
            {basics?.name || 'Your Name'}
          </h1>

          <div style={{ fontSize: '12px', marginBottom: '20px' }}>
            {basics?.email && <div style={{ marginBottom: '8px' }}>✉️ {basics.email}</div>}
            {basics?.phone && <div style={{ marginBottom: '8px' }}>📱 {basics.phone}</div>}
            {basics?.location && <div>📍 {basics.location}</div>}
          </div>

          {skills && skills.length > 0 && (
            <div style={{ marginTop: '24px' }}>
              <h3 style={{
                fontSize: '14px',
                fontWeight: '600',
                marginBottom: '12px',
                textTransform: 'uppercase',
                letterSpacing: '1px',
              }}>
                Skills
              </h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {skills.map((s, i) => (
                  <span key={i} style={{
                    padding: '4px 10px',
                    background: 'rgba(233, 69, 96, 0.2)',
                    borderRadius: '12px',
                    fontSize: '11px',
                    fontWeight: '500',
                  }}>
                    {s.name}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        <div style={{ flex: 1 }}>
          {basics?.summary && (
            <section style={{
              marginBottom: '24px',
              padding: '20px',
              background: '#f8f9fa',
              borderRadius: '12px',
              borderLeft: '4px solid #e94560',
            }}>
              <p style={{ margin: 0, fontSize: '14px', color: '#555', lineHeight: '1.6' }}>
                {basics.summary}
              </p>
            </section>
          )}

          {work && work.length > 0 && (
            <section style={{ marginBottom: '24px' }}>
              <h2 style={{
                fontSize: '16px',
                fontWeight: '700',
                color: '#e94560',
                marginBottom: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}>
                💼 Experience
              </h2>
              {work.map((w, idx) => (
                <div key={idx} style={{
                  marginBottom: '16px',
                  padding: '16px',
                  background: '#fff',
                  borderRadius: '8px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                  border: '1px solid #eee',
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <strong style={{ fontSize: '15px', color: '#1a1a2e' }}>{w.position || 'Position'}</strong>
                    <span style={{ fontSize: '12px', color: '#e94560', fontWeight: '500' }}>
                      {formatDate(w.startDate, w.endDate)}
                    </span>
                  </div>
                  <div style={{ fontSize: '13px', color: '#666', marginBottom: '8px' }}>{w.company || 'Company'}</div>
                  {w.description && <p style={{ margin: 0, fontSize: '13px', color: '#555' }}>{w.description}</p>}
                </div>
              ))}
            </section>
          )}

          {education && education.length > 0 && (
            <section style={{ marginBottom: '24px' }}>
              <h2 style={{
                fontSize: '16px',
                fontWeight: '700',
                color: '#f39c12',
                marginBottom: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}>
                🎓 Education
              </h2>
              {education.map((e, idx) => (
                <div key={idx} style={{
                  marginBottom: '12px',
                  padding: '12px',
                  background: '#fffbeb',
                  borderRadius: '8px',
                  border: '1px solid #fde68a',
                }}>
                  <div style={{ fontWeight: '600', fontSize: '14px', color: '#1a1a2e' }}>{e.school || 'School'}</div>
                  <div style={{ fontSize: '13px', color: '#666' }}>
                    {e.degree}{e.degree && e.area && ' • '}{e.area}
                  </div>
                  <div style={{ fontSize: '12px', color: '#f39c12', fontWeight: '500' }}>
                    {formatDate(e.startDate, e.endDate)}
                  </div>
                </div>
              ))}
            </section>
          )}

          {projects && projects.length > 0 && (
            <section>
              <h2 style={{
                fontSize: '16px',
                fontWeight: '700',
                color: '#9b59b6',
                marginBottom: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}>
                🚀 Projects
              </h2>
              {projects.map((p, idx) => (
                <div key={idx} style={{
                  marginBottom: '12px',
                  padding: '12px',
                  background: '#f5f3ff',
                  borderRadius: '8px',
                  border: '1px solid #ddd6fe',
                }}>
                  <div style={{ fontWeight: '600', fontSize: '14px', color: '#1a1a2e' }}>{p.name || 'Project'}</div>
                  {p.description && <p style={{ margin: '4px 0', fontSize: '13px', color: '#555' }}>{p.description}</p>}
                  {p.url && <a href={p.url} style={{ fontSize: '12px', color: '#9b59b6' }}>🔗 View</a>}
                </div>
              ))}
            </section>
          )}
        </div>
      </div>
    </article>
  )
}

export const ChineseFreshGradTemplate: React.FC<TemplateProps> = ({ resume }) => {
  const { basics, work, education, skills, projects } = resume
  return (
    <article style={{
      fontFamily: "'Microsoft YaHei', 'PingFang SC', sans-serif",
      color: '#333',
      background: '#fff',
      padding: '30px',
      maxWidth: '800px',
      lineHeight: '1.8',
    }}>
      <header style={{
        textAlign: 'center',
        marginBottom: '24px',
        padding: '20px',
        background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
        borderRadius: '12px',
        color: '#fff',
      }}>
        <h1 style={{
          fontSize: '28px',
          fontWeight: '700',
          margin: '0 0 12px 0',
        }}>
          {basics?.name || '姓名'}
        </h1>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: '16px',
          fontSize: '13px',
          opacity: '0.95',
        }}>
          {basics?.phone && <span>📞 {basics.phone}</span>}
          {basics?.email && <span>📧 {basics.email}</span>}
          {basics?.location && <span>📍 {basics.location}</span>}
        </div>
      </header>

      {basics?.summary && (
        <section style={{
          marginBottom: '20px',
          padding: '16px',
          background: '#f0f9ff',
          borderRadius: '8px',
          borderLeft: '4px solid #4facfe',
        }}>
          <h2 style={{ fontSize: '15px', fontWeight: '700', color: '#4facfe', marginBottom: '8px' }}>
            🎯 求职意向
          </h2>
          <p style={{ margin: 0, fontSize: '14px', color: '#555' }}>
            {basics.summary}
          </p>
        </section>
      )}

      {education && education.length > 0 && (
        <section style={{ marginBottom: '20px' }}>
          <h2 style={{
            fontSize: '16px',
            fontWeight: '700',
            color: '#4facfe',
            marginBottom: '12px',
            paddingBottom: '8px',
            borderBottom: '2px solid #4facfe',
          }}>
            🎓 教育背景
          </h2>
          {education.map((e, idx) => (
            <div key={idx} style={{
              marginBottom: '12px',
              padding: '12px',
              background: '#f8f9fa',
              borderRadius: '8px',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                <strong style={{ fontSize: '15px', color: '#333' }}>{e.school || '学校'}</strong>
                <span style={{ fontSize: '13px', color: '#999' }}>
                  {formatDate(e.startDate, e.endDate)}
                </span>
              </div>
              <div style={{ fontSize: '14px', color: '#555' }}>
                {e.degree}{e.degree && e.area && ' | '}{e.area}
              </div>
            </div>
          ))}
        </section>
      )}

      {work && work.length > 0 && (
        <section style={{ marginBottom: '20px' }}>
          <h2 style={{
            fontSize: '16px',
            fontWeight: '700',
            color: '#4facfe',
            marginBottom: '12px',
            paddingBottom: '8px',
            borderBottom: '2px solid #4facfe',
          }}>
            💼 实习经历
          </h2>
          {work.map((w, idx) => (
            <div key={idx} style={{
              marginBottom: '16px',
              padding: '12px',
              background: '#f8f9fa',
              borderRadius: '8px',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                <strong style={{ fontSize: '15px', color: '#333' }}>{w.company || '公司'}</strong>
                <span style={{ fontSize: '13px', color: '#999' }}>
                  {formatDate(w.startDate, w.endDate)}
                </span>
              </div>
              <div style={{ fontSize: '14px', color: '#555', marginBottom: '8px' }}>
                {w.position || '职位'}
              </div>
              {w.description && (
                <p style={{ margin: 0, fontSize: '13px', color: '#666', lineHeight: '1.6' }}>
                  {w.description}
                </p>
              )}
            </div>
          ))}
        </section>
      )}

      {projects && projects.length > 0 && (
        <section style={{ marginBottom: '20px' }}>
          <h2 style={{
            fontSize: '16px',
            fontWeight: '700',
            color: '#4facfe',
            marginBottom: '12px',
            paddingBottom: '8px',
            borderBottom: '2px solid #4facfe',
          }}>
            🚀 项目经历
          </h2>
          {projects.map((p, idx) => (
            <div key={idx} style={{
              marginBottom: '12px',
              padding: '12px',
              background: '#f8f9fa',
              borderRadius: '8px',
            }}>
              <div style={{ fontWeight: '600', fontSize: '15px', color: '#333', marginBottom: '4px' }}>
                {p.name || '项目名称'}
              </div>
              {p.description && (
                <p style={{ margin: 0, fontSize: '13px', color: '#666', lineHeight: '1.6' }}>
                  {p.description}
                </p>
              )}
            </div>
          ))}
        </section>
      )}

      {skills && skills.length > 0 && (
        <section style={{ marginBottom: '20px' }}>
          <h2 style={{
            fontSize: '16px',
            fontWeight: '700',
            color: '#4facfe',
            marginBottom: '12px',
            paddingBottom: '8px',
            borderBottom: '2px solid #4facfe',
          }}>
            ⚡ 技能特长
          </h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {skills.map((s, i) => (
              <span key={i} style={{
                padding: '6px 14px',
                background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                color: '#fff',
                borderRadius: '16px',
                fontSize: '13px',
                fontWeight: '500',
              }}>
                {s.name}
              </span>
            ))}
          </div>
        </section>
      )}
    </article>
  )
}

export const ChineseSocialTemplate: React.FC<TemplateProps> = ({ resume }) => {
  const { basics, work, education, skills, projects } = resume
  return (
    <article style={{
      fontFamily: "'Microsoft YaHei', 'PingFang SC', sans-serif",
      color: '#333',
      background: '#fff',
      padding: '30px',
      maxWidth: '800px',
      lineHeight: '1.8',
    }}>
      <header style={{
        marginBottom: '24px',
        paddingBottom: '16px',
        borderBottom: '3px solid #1890ff',
      }}>
        <h1 style={{
          fontSize: '26px',
          fontWeight: '700',
          margin: '0 0 12px 0',
          color: '#1890ff',
        }}>
          {basics?.name || '姓名'}
        </h1>
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '20px',
          fontSize: '14px',
          color: '#666',
        }}>
          {basics?.phone && <span>📱 {basics.phone}</span>}
          {basics?.email && <span>✉️ {basics.email}</span>}
          {basics?.location && <span>🏠 {basics.location}</span>}
        </div>
      </header>

      {work && work.length > 0 && (
        <section style={{ marginBottom: '24px' }}>
          <h2 style={{
            fontSize: '18px',
            fontWeight: '700',
            color: '#1890ff',
            marginBottom: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}>
            💼 工作经历
          </h2>
          {work.map((w, idx) => (
            <div key={idx} style={{
              marginBottom: '20px',
              padding: '16px',
              background: '#f8f9fa',
              borderRadius: '8px',
              borderLeft: '4px solid #1890ff',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                <div>
                  <div style={{ fontSize: '16px', fontWeight: '700', color: '#333' }}>
                    {w.company || '公司名称'}
                  </div>
                  <div style={{ fontSize: '14px', color: '#1890ff', fontWeight: '500' }}>
                    {w.position || '职位'}
                  </div>
                </div>
                <span style={{
                  fontSize: '13px',
                  color: '#fff',
                  background: '#1890ff',
                  padding: '4px 12px',
                  borderRadius: '16px',
                  fontWeight: '500',
                }}>
                  {formatDate(w.startDate, w.endDate)}
                </span>
              </div>
              {w.description && (
                <p style={{ margin: 0, fontSize: '14px', color: '#555', lineHeight: '1.6' }}>
                  {w.description}
                </p>
              )}
            </div>
          ))}
        </section>
      )}

      {projects && projects.length > 0 && (
        <section style={{ marginBottom: '24px' }}>
          <h2 style={{
            fontSize: '18px',
            fontWeight: '700',
            color: '#52c41a',
            marginBottom: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}>
            🚀 项目经验
          </h2>
          {projects.map((p, idx) => (
            <div key={idx} style={{
              marginBottom: '16px',
              padding: '16px',
              background: '#f6ffed',
              borderRadius: '8px',
              borderLeft: '4px solid #52c41a',
            }}>
              <div style={{ fontWeight: '700', fontSize: '15px', color: '#333', marginBottom: '8px' }}>
                {p.name || '项目名称'}
              </div>
              {p.description && (
                <p style={{ margin: 0, fontSize: '14px', color: '#555', lineHeight: '1.6' }}>
                  {p.description}
                </p>
              )}
              {p.url && (
                <div style={{ marginTop: '8px' }}>
                  <a href={p.url} style={{ fontSize: '13px', color: '#1890ff', textDecoration: 'none' }}>
                    🔗 项目链接
                  </a>
                </div>
              )}
            </div>
          ))}
        </section>
      )}

      {education && education.length > 0 && (
        <section style={{ marginBottom: '24px' }}>
          <h2 style={{
            fontSize: '18px',
            fontWeight: '700',
            color: '#faad14',
            marginBottom: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}>
            🎓 教育背景
          </h2>
          {education.map((e, idx) => (
            <div key={idx} style={{
              marginBottom: '12px',
              padding: '12px',
              background: '#fffbe6',
              borderRadius: '8px',
              borderLeft: '4px solid #faad14',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                <strong style={{ fontSize: '15px', color: '#333' }}>{e.school || '学校'}</strong>
                <span style={{ fontSize: '13px', color: '#999' }}>
                  {formatDate(e.startDate, e.endDate)}
                </span>
              </div>
              <div style={{ fontSize: '14px', color: '#555' }}>
                {e.degree}{e.degree && e.area && ' | '}{e.area}
              </div>
            </div>
          ))}
        </section>
      )}

      {skills && skills.length > 0 && (
        <section style={{ marginBottom: '24px' }}>
          <h2 style={{
            fontSize: '18px',
            fontWeight: '700',
            color: '#722ed1',
            marginBottom: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}>
            ⚡ 专业技能
          </h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {skills.map((s, i) => (
              <span key={i} style={{
                padding: '8px 16px',
                background: '#f9f0ff',
                border: '1px solid #d3adf7',
                borderRadius: '20px',
                fontSize: '14px',
                fontWeight: '500',
                color: '#722ed1',
              }}>
                {s.name}
              </span>
            ))}
          </div>
        </section>
      )}
    </article>
  )
}

export const ChineseCreativeTemplate: React.FC<TemplateProps> = ({ resume }) => {
  const { basics, work, education, skills, projects } = resume
  return (
    <article style={{
      fontFamily: "'Microsoft YaHei', 'PingFang SC', sans-serif",
      color: '#333',
      background: '#fff',
      padding: '0',
      maxWidth: '800px',
      lineHeight: '1.8',
    }}>
      <div style={{ display: 'flex', minHeight: '600px' }}>
        <div style={{
          width: '240px',
          flexShrink: 0,
          background: 'linear-gradient(180deg, #667eea 0%, #764ba2 100%)',
          padding: '30px 20px',
          color: '#fff',
        }}>
          <div style={{
            width: '120px',
            height: '120px',
            background: 'rgba(255,255,255,0.2)',
            borderRadius: '50%',
            margin: '0 auto 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '48px',
            fontWeight: '700',
            border: '4px solid rgba(255,255,255,0.3)',
          }}>
            {(basics?.name || '姓')[0]}
          </div>

          <h1 style={{
            fontSize: '22px',
            fontWeight: '700',
            textAlign: 'center',
            marginBottom: '20px',
          }}>
            {basics?.name || '姓名'}
          </h1>

          <div style={{ fontSize: '13px', marginBottom: '24px', opacity: '0.9' }}>
            {basics?.phone && <div style={{ marginBottom: '10px' }}>📱 {basics.phone}</div>}
            {basics?.email && <div style={{ marginBottom: '10px' }}>📧 {basics.email}</div>}
            {basics?.location && <div>📍 {basics.location}</div>}
          </div>

          {skills && skills.length > 0 && (
            <div style={{ marginTop: '24px' }}>
              <h3 style={{
                fontSize: '14px',
                fontWeight: '600',
                marginBottom: '12px',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                borderBottom: '2px solid rgba(255,255,255,0.3)',
                paddingBottom: '8px',
              }}>
                ⚡ 技能
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {skills.map((s, i) => (
                  <div key={i} style={{
                    padding: '8px 12px',
                    background: 'rgba(255,255,255,0.15)',
                    borderRadius: '8px',
                    fontSize: '12px',
                    fontWeight: '500',
                  }}>
                    {s.name}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div style={{ flex: 1, padding: '30px' }}>
          {basics?.summary && (
            <section style={{
              marginBottom: '24px',
              padding: '16px',
              background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
              borderRadius: '12px',
            }}>
              <h2 style={{ fontSize: '14px', fontWeight: '700', color: '#667eea', marginBottom: '8px' }}>
                🎯 个人简介
              </h2>
              <p style={{ margin: 0, fontSize: '14px', color: '#555' }}>
                {basics.summary}
              </p>
            </section>
          )}

          {work && work.length > 0 && (
            <section style={{ marginBottom: '24px' }}>
              <h2 style={{
                fontSize: '16px',
                fontWeight: '700',
                color: '#667eea',
                marginBottom: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}>
                💼 工作经历
              </h2>
              {work.map((w, idx) => (
                <div key={idx} style={{
                  marginBottom: '16px',
                  padding: '16px',
                  background: '#fff',
                  borderRadius: '12px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                  border: '1px solid #eee',
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <div style={{ fontSize: '15px', fontWeight: '700', color: '#333' }}>
                      {w.company || '公司'}
                    </div>
                    <span style={{
                      fontSize: '12px',
                      color: '#fff',
                      background: '#667eea',
                      padding: '2px 10px',
                      borderRadius: '10px',
                    }}>
                      {formatDate(w.startDate, w.endDate)}
                    </span>
                  </div>
                  <div style={{ fontSize: '14px', color: '#667eea', fontWeight: '500', marginBottom: '8px' }}>
                    {w.position || '职位'}
                  </div>
                  {w.description && (
                    <p style={{ margin: 0, fontSize: '13px', color: '#666', lineHeight: '1.6' }}>
                      {w.description}
                    </p>
                  )}
                </div>
              ))}
            </section>
          )}

          {education && education.length > 0 && (
            <section style={{ marginBottom: '24px' }}>
              <h2 style={{
                fontSize: '16px',
                fontWeight: '700',
                color: '#52c41a',
                marginBottom: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}>
                🎓 教育背景
              </h2>
              {education.map((e, idx) => (
                <div key={idx} style={{
                  marginBottom: '12px',
                  padding: '12px',
                  background: '#f6ffed',
                  borderRadius: '10px',
                  borderLeft: '4px solid #52c41a',
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <strong style={{ fontSize: '14px', color: '#333' }}>{e.school || '学校'}</strong>
                    <span style={{ fontSize: '12px', color: '#999' }}>
                      {formatDate(e.startDate, e.endDate)}
                    </span>
                  </div>
                  <div style={{ fontSize: '13px', color: '#666' }}>
                    {e.degree}{e.degree && e.area && ' | '}{e.area}
                  </div>
                </div>
              ))}
            </section>
          )}

          {projects && projects.length > 0 && (
            <section>
              <h2 style={{
                fontSize: '16px',
                fontWeight: '700',
                color: '#faad14',
                marginBottom: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}>
                🚀 项目经验
              </h2>
              {projects.map((p, idx) => (
                <div key={idx} style={{
                  marginBottom: '12px',
                  padding: '12px',
                  background: '#fffbe6',
                  borderRadius: '10px',
                  borderLeft: '4px solid #faad14',
                }}>
                  <div style={{ fontWeight: '600', fontSize: '14px', color: '#333', marginBottom: '4px' }}>
                    {p.name || '项目'}
                  </div>
                  {p.description && (
                    <p style={{ margin: 0, fontSize: '13px', color: '#666' }}>
                      {p.description}
                    </p>
                  )}
                </div>
              ))}
            </section>
          )}
        </div>
      </div>
    </article>
  )
}

export const TemplateRegistry = {
  ClassicProfessional: ClassicProfessionalTemplate,
  ChineseSocial: ChineseSocialTemplate,
  TopjianliMinimalist: TopjianliMinimalistTemplate,
  TopjianliShanghai: ShanghaiTemplate,
  TopjianliCreative: TopjianliCreativeTemplate,
  GreenSimple: GreenSimpleTemplate,
  BorderedClean: BorderedCleanTemplate,
  RedModern: RedModernTemplate,
  ChineseProfessional: ChineseProfessionalTemplate,
  TealEnergetic: TealEnergeticTemplate,
  RedClassic: RedClassicTemplate,
} as const
