import React from 'react'
import type { ResumeData } from '../forms/types'

type TemplateProps = { resume: ResumeData }

function formatDate(startDate?: string, endDate?: string) {
  if (startDate && endDate) return `${startDate} - ${endDate}`
  if (startDate) return `${startDate} - 至今`
  if (endDate) return `至 ${endDate}`
  return ''
}

export const ShanghaiTemplate: React.FC<TemplateProps> = ({ resume }) => {
  const { basics, work, education, skills, projects } = resume

  const colors = {
    navy: '#1e3a5f',
    navyLight: '#2a4a70',
    navyDark: '#152a45',
    accent: '#1e3a5f',
    text: '#333333',
    textLight: '#666666',
    textMuted: '#999999',
    border: '#e0e0e0',
    background: '#ffffff',
    sidebarBg: '#f8f9fa',
  }

  return (
    <article
      style={{
        fontFamily: "'Noto Sans SC', 'PingFang SC', 'Microsoft YaHei', 'Helvetica Neue', Arial, sans-serif",
        color: colors.text,
        background: colors.background,
        maxWidth: '210mm',
        minHeight: '297mm',
        lineHeight: '1.6',
        boxSizing: 'border-box',
      }}
    >
      <div style={{ display: 'flex', minHeight: '297mm' }}>
        <div
          style={{
            width: '72mm',
            flexShrink: 0,
            background: colors.sidebarBg,
            padding: '24px 20px',
            borderRight: `1px solid ${colors.border}`,
            boxSizing: 'border-box',
          }}
        >
          <div
            style={{
              width: '100%',
              aspectRatio: '3/4',
              background: 'linear-gradient(135deg, #e8ecef 0%, #d1d9e0 100%)',
              border: `3px solid ${colors.navy}`,
              borderRadius: '4px',
              marginBottom: '24px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
              position: 'relative',
            }}
          >
            <div
              style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                background: colors.navy,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '28px',
                color: '#fff',
                marginBottom: '12px',
              }}
            >
              {(basics?.name || 'U')[0].toUpperCase()}
            </div>
            <span
              style={{
                fontSize: '12px',
                color: colors.textMuted,
                textAlign: 'center',
              }}
            >
              Photo
            </span>
          </div>

          <div style={{ marginBottom: '28px' }}>
            <h3
              style={{
                fontSize: '13px',
                fontWeight: '700',
                color: colors.navy,
                textTransform: 'uppercase',
                letterSpacing: '1.5px',
                marginBottom: '16px',
                paddingBottom: '8px',
                borderBottom: `2px solid ${colors.navy}`,
              }}
            >
              联系方式 / Contact
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {basics?.phone && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span
                    style={{
                      width: '24px',
                      height: '24px',
                      background: colors.navy,
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '11px',
                      color: '#fff',
                      flexShrink: 0,
                    }}
                  >
                    📞
                  </span>
                  <span style={{ fontSize: '12px', color: colors.text, wordBreak: 'break-all' }}>
                    {basics.phone}
                  </span>
                </div>
              )}
              {basics?.email && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span
                    style={{
                      width: '24px',
                      height: '24px',
                      background: colors.navy,
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '11px',
                      color: '#fff',
                      flexShrink: 0,
                    }}
                  >
                    ✉
                  </span>
                  <span style={{ fontSize: '12px', color: colors.text, wordBreak: 'break-all' }}>
                    {basics.email}
                  </span>
                </div>
              )}
              {basics?.location && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span
                    style={{
                      width: '24px',
                      height: '24px',
                      background: colors.navy,
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '11px',
                      color: '#fff',
                      flexShrink: 0,
                    }}
                  >
                    📍
                  </span>
                  <span style={{ fontSize: '12px', color: colors.text }}>{basics.location}</span>
                </div>
              )}
              {basics?.website && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span
                    style={{
                      width: '24px',
                      height: '24px',
                      background: colors.navy,
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '11px',
                      color: '#fff',
                      flexShrink: 0,
                    }}
                  >
                    🌐
                  </span>
                  <span style={{ fontSize: '12px', color: colors.text, wordBreak: 'break-all' }}>
                    {basics.website}
                  </span>
                </div>
              )}
            </div>
          </div>

          {skills && skills.length > 0 && (
            <div style={{ marginBottom: '28px' }}>
              <h3
                style={{
                  fontSize: '13px',
                  fontWeight: '700',
                  color: colors.navy,
                  textTransform: 'uppercase',
                  letterSpacing: '1.5px',
                  marginBottom: '16px',
                  paddingBottom: '8px',
                  borderBottom: `2px solid ${colors.navy}`,
                }}
              >
                专业技能 / Skills
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {skills.map((s, i) => (
                  <div
                    key={i}
                    style={{
                      padding: '8px 12px',
                      background: '#fff',
                      borderLeft: `3px solid ${colors.navy}`,
                      fontSize: '12px',
                      color: colors.text,
                      fontWeight: '500',
                    }}
                  >
                    {s.name}
                    {s.level && (
                      <span style={{ fontSize: '11px', color: colors.textMuted, marginLeft: '6px' }}>
                        ({s.level})
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {education && education.length > 0 && (
            <div style={{ marginBottom: '28px' }}>
              <h3
                style={{
                  fontSize: '13px',
                  fontWeight: '700',
                  color: colors.navy,
                  textTransform: 'uppercase',
                  letterSpacing: '1.5px',
                  marginBottom: '16px',
                  paddingBottom: '8px',
                  borderBottom: `2px solid ${colors.navy}`,
                }}
              >
                教育背景 / Education
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {education.slice(0, 2).map((e, idx) => (
                  <div key={idx}>
                    <div
                      style={{
                        fontSize: '13px',
                        fontWeight: '600',
                        color: colors.text,
                        marginBottom: '4px',
                      }}
                    >
                      {e.school}
                    </div>
                    <div style={{ fontSize: '11px', color: colors.textLight, marginBottom: '2px' }}>
                      {e.degree} {e.area && `· ${e.area}`}
                    </div>
                    <div style={{ fontSize: '11px', color: colors.textMuted }}>
                      {formatDate(e.startDate, e.endDate)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div
          style={{
            flex: 1,
            padding: '32px 28px',
            boxSizing: 'border-box',
          }}
        >
          <header
            style={{
              marginBottom: '28px',
              paddingBottom: '20px',
              borderBottom: `2px solid ${colors.navy}`,
            }}
          >
            <h1
              style={{
                fontSize: '32px',
                fontWeight: '700',
                color: colors.navy,
                margin: '0 0 8px 0',
                letterSpacing: '2px',
              }}
            >
              {basics?.name || '姓名 / Name'}
            </h1>
            {basics?.label && (
              <div
                style={{
                  fontSize: '16px',
                  color: colors.textLight,
                  fontWeight: '500',
                  letterSpacing: '1px',
                }}
              >
                {basics.label}
              </div>
            )}
          </header>

          {basics?.summary && (
            <section style={{ marginBottom: '28px' }}>
              <h2
                style={{
                  fontSize: '14px',
                  fontWeight: '700',
                  color: colors.navy,
                  textTransform: 'uppercase',
                  letterSpacing: '1.5px',
                  marginBottom: '14px',
                  paddingBottom: '8px',
                  borderBottom: `1px solid ${colors.border}`,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                }}
              >
                <span
                  style={{
                    width: '28px',
                    height: '28px',
                    background: colors.navy,
                    borderRadius: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '14px',
                    color: '#fff',
                  }}
                >
                  👤
                </span>
                个人简介 / Profile
              </h2>
              <p
                style={{
                  margin: 0,
                  fontSize: '13px',
                  color: colors.text,
                  lineHeight: '1.8',
                  textAlign: 'justify',
                }}
              >
                {basics.summary}
              </p>
            </section>
          )}

          {work && work.length > 0 && (
            <section style={{ marginBottom: '28px' }}>
              <h2
                style={{
                  fontSize: '14px',
                  fontWeight: '700',
                  color: colors.navy,
                  textTransform: 'uppercase',
                  letterSpacing: '1.5px',
                  marginBottom: '18px',
                  paddingBottom: '8px',
                  borderBottom: `1px solid ${colors.border}`,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                }}
              >
                <span
                  style={{
                    width: '28px',
                    height: '28px',
                    background: colors.navy,
                    borderRadius: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '14px',
                    color: '#fff',
                  }}
                >
                  💼
                </span>
                工作经历 / Experience
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {work.map((w, idx) => (
                  <div
                    key={idx}
                    style={{
                      padding: '16px 0',
                      borderBottom:
                        idx < work.length - 1 ? `1px dashed ${colors.border}` : 'none',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        marginBottom: '8px',
                      }}
                    >
                      <div>
                        <div
                          style={{
                            fontSize: '15px',
                            fontWeight: '700',
                            color: colors.navy,
                            marginBottom: '4px',
                          }}
                        >
                          {w.position || '职位 / Position'}
                        </div>
                        <div
                          style={{
                            fontSize: '13px',
                            color: colors.textLight,
                            fontWeight: '500',
                          }}
                        >
                          {w.company || '公司 / Company'}
                          {w.location && (
                            <span style={{ color: colors.textMuted, marginLeft: '8px' }}>
                              · {w.location}
                            </span>
                          )}
                        </div>
                      </div>
                      <span
                        style={{
                          fontSize: '12px',
                          color: colors.navy,
                          background: colors.sidebarBg,
                          padding: '4px 10px',
                          borderRadius: '4px',
                          fontWeight: '500',
                          whiteSpace: 'nowrap',
                          border: `1px solid ${colors.border}`,
                        }}
                      >
                        {formatDate(w.startDate, w.endDate)}
                      </span>
                    </div>
                    {w.description && (
                      <p
                        style={{
                          margin: '10px 0 0 0',
                          fontSize: '13px',
                          color: colors.text,
                          lineHeight: '1.7',
                        }}
                      >
                        {w.description}
                      </p>
                    )}
                    {w.highlights && w.highlights.length > 0 && (
                      <ul
                        style={{
                          margin: '10px 0 0 0',
                          paddingLeft: '18px',
                          fontSize: '13px',
                          color: colors.text,
                          lineHeight: '1.7',
                        }}
                      >
                        {w.highlights.map((highlight, hIdx) => (
                          <li key={hIdx} style={{ marginBottom: '4px' }}>
                            {highlight}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {projects && projects.length > 0 && (
            <section style={{ marginBottom: '28px' }}>
              <h2
                style={{
                  fontSize: '14px',
                  fontWeight: '700',
                  color: colors.navy,
                  textTransform: 'uppercase',
                  letterSpacing: '1.5px',
                  marginBottom: '18px',
                  paddingBottom: '8px',
                  borderBottom: `1px solid ${colors.border}`,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                }}
              >
                <span
                  style={{
                    width: '28px',
                    height: '28px',
                    background: colors.navy,
                    borderRadius: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '14px',
                    color: '#fff',
                  }}
                >
                  🚀
                </span>
                项目经验 / Projects
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                {projects.map((p, idx) => (
                  <div
                    key={idx}
                    style={{
                      padding: '16px',
                      background: colors.sidebarBg,
                      borderRadius: '6px',
                      borderLeft: `3px solid ${colors.navy}`,
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        marginBottom: '8px',
                      }}
                    >
                      <div
                        style={{
                          fontSize: '14px',
                          fontWeight: '700',
                          color: colors.navy,
                        }}
                      >
                        {p.name || '项目名称 / Project Name'}
                      </div>
                      {(p.startDate || p.endDate) && (
                        <span
                          style={{
                            fontSize: '11px',
                            color: colors.textMuted,
                            fontWeight: '500',
                          }}
                        >
                          {formatDate(p.startDate, p.endDate)}
                        </span>
                      )}
                    </div>
                    {p.technologies && p.technologies.length > 0 && (
                      <div
                        style={{
                          display: 'flex',
                          flexWrap: 'wrap',
                          gap: '6px',
                          marginBottom: '8px',
                        }}
                      >
                        {p.technologies.map((tech, tIdx) => (
                          <span
                            key={tIdx}
                            style={{
                              fontSize: '10px',
                              color: colors.navy,
                              background: '#fff',
                              padding: '2px 8px',
                              borderRadius: '10px',
                              border: `1px solid ${colors.border}`,
                            }}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                    {p.description && (
                      <p
                        style={{
                          margin: 0,
                          fontSize: '12px',
                          color: colors.text,
                          lineHeight: '1.6',
                        }}
                      >
                        {p.description}
                      </p>
                    )}
                    {p.url && (
                      <a
                        href={p.url}
                        style={{
                          display: 'inline-block',
                          marginTop: '8px',
                          fontSize: '11px',
                          color: colors.navy,
                          textDecoration: 'none',
                          fontWeight: '500',
                        }}
                      >
                        🔗 查看项目 / View Project →
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {education && education.length > 2 && (
            <section style={{ marginBottom: '28px' }}>
              <h2
                style={{
                  fontSize: '14px',
                  fontWeight: '700',
                  color: colors.navy,
                  textTransform: 'uppercase',
                  letterSpacing: '1.5px',
                  marginBottom: '18px',
                  paddingBottom: '8px',
                  borderBottom: `1px solid ${colors.border}`,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                }}
              >
                <span
                  style={{
                    width: '28px',
                    height: '28px',
                    background: colors.navy,
                    borderRadius: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '14px',
                    color: '#fff',
                  }}
                >
                  🎓
                </span>
                完整教育背景 / Full Education
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {education.slice(2).map((e, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      padding: '12px 0',
                      borderBottom: `1px dashed ${colors.border}`,
                    }}
                  >
                    <div>
                      <div
                        style={{
                          fontSize: '14px',
                          fontWeight: '600',
                          color: colors.text,
                          marginBottom: '4px',
                        }}
                      >
                        {e.school}
                      </div>
                      <div style={{ fontSize: '12px', color: colors.textLight }}>
                        {e.degree} {e.area && `· ${e.area}`}
                      </div>
                      {e.gpa && (
                        <div style={{ fontSize: '11px', color: colors.textMuted, marginTop: '2px' }}>
                          GPA: {e.gpa}
                        </div>
                      )}
                    </div>
                    <span
                      style={{
                        fontSize: '11px',
                        color: colors.textMuted,
                        fontWeight: '500',
                      }}
                    >
                      {formatDate(e.startDate, e.endDate)}
                    </span>
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
