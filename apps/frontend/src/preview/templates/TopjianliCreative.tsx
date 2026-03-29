import React from 'react'
import type { ResumeData } from '../forms/types'

type TemplateProps = { resume: ResumeData }

function formatDate(startDate?: string, endDate?: string) {
  if (startDate && endDate) return `${startDate} - ${endDate}`
  if (startDate) return `${startDate} - Present`
  if (endDate) return `${endDate}`
  return ''
}

function getSkillLevel(level?: string): number {
  if (!level) return 70
  const levelLower = level.toLowerCase()
  if (levelLower.includes('expert') || levelLower.includes('master')) return 95
  if (levelLower.includes('advanced') || levelLower.includes('proficient')) return 80
  if (levelLower.includes('intermediate')) return 60
  if (levelLower.includes('beginner') || levelLower.includes('novice')) return 40
  return 70
}

export const TopjianliCreativeTemplate: React.FC<TemplateProps> = ({ resume }) => {
  const { basics, work, education, skills, projects } = resume

  const ACCENT_COLOR = '#0891b2'
  const ACCENT_LIGHT = '#e0f2f7'
  const ACCENT_DARK = '#0e7490'
  const TEXT_DARK = '#1e293b'
  const TEXT_MUTED = '#64748b'
  const BG_LIGHT = '#f8fafc'
  const WHITE = '#ffffff'

  return (
    <article
      style={{
        fontFamily: "'Segoe UI', 'Helvetica Neue', Arial, sans-serif",
        color: TEXT_DARK,
        background: WHITE,
        maxWidth: '850px',
        lineHeight: '1.6',
        boxShadow: '0 4px 24px rgba(0, 0, 0, 0.08)',
        borderRadius: '0',
        overflow: 'hidden',
      }}
    >
      <header
        style={{
          display: 'flex',
          background: ACCENT_COLOR,
          color: WHITE,
          minHeight: '160px',
        }}
      >
        <div
          style={{
            width: '180px',
            background: ACCENT_DARK,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
            position: 'relative',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              opacity: 0.1,
              background: `repeating-linear-gradient(
                45deg,
                transparent,
                transparent 10px,
                rgba(255,255,255,0.1) 10px,
                rgba(255,255,255,0.1) 20px
              )`,
            }}
          />
          <div
            style={{
              width: '80px',
              height: '80px',
              background: WHITE,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '36px',
              fontWeight: '700',
              color: ACCENT_COLOR,
              boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
              zIndex: 1,
            }}
          >
            {(basics?.name || 'U')[0].toUpperCase()}
          </div>
        </div>

        <div
          style={{
            flex: 1,
            padding: '32px 40px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            position: 'relative',
          }}
        >
          <h1
            style={{
              fontSize: '36px',
              fontWeight: '700',
              margin: '0 0 8px 0',
              letterSpacing: '-0.5px',
            }}
          >
            {basics?.name || 'Your Name'}
          </h1>
          {basics?.label && (
            <div
              style={{
                fontSize: '16px',
                fontWeight: '500',
                opacity: 0.9,
                letterSpacing: '1px',
                textTransform: 'uppercase',
              }}
            >
              {basics.label}
            </div>
          )}

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '20px',
              marginTop: '16px',
              fontSize: '14px',
              opacity: 0.9,
            }}
          >
            {basics?.email && (
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ fontSize: '12px' }}>✉</span> {basics.email}
              </span>
            )}
            {basics?.phone && (
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ fontSize: '12px' }}>☎</span> {basics.phone}
              </span>
            )}
            {basics?.location && (
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ fontSize: '12px' }}>📍</span> {basics.location}
              </span>
            )}
            {basics?.url && (
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ fontSize: '12px' }}>🔗</span> {basics.url}
              </span>
            )}
          </div>
        </div>
      </header>

      <div style={{ display: 'flex' }}>
        <div
          style={{
            width: '180px',
            background: BG_LIGHT,
            padding: '24px',
            borderRight: `1px solid ${ACCENT_LIGHT}`,
          }}
        >
          {skills && skills.length > 0 && (
            <div style={{ marginBottom: '28px' }}>
              <h3
                style={{
                  fontSize: '13px',
                  fontWeight: '700',
                  color: ACCENT_COLOR,
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  marginBottom: '16px',
                  paddingBottom: '8px',
                  borderBottom: `2px solid ${ACCENT_COLOR}`,
                }}
              >
                Skills
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {skills.map((s, i) => {
                  const levelPercent = getSkillLevel(s.level)
                  return (
                    <div key={i}>
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          marginBottom: '4px',
                        }}
                      >
                        <span
                          style={{
                            fontSize: '12px',
                            fontWeight: '500',
                            color: TEXT_DARK,
                          }}
                        >
                          {s.name}
                        </span>
                        {s.level && (
                          <span
                            style={{
                              fontSize: '10px',
                              color: TEXT_MUTED,
                              textTransform: 'capitalize',
                            }}
                          >
                            {s.level}
                          </span>
                        )}
                      </div>
                      <div
                        style={{
                          height: '6px',
                          background: '#e2e8f0',
                          borderRadius: '3px',
                          overflow: 'hidden',
                        }}
                      >
                        <div
                          style={{
                            height: '100%',
                            width: `${levelPercent}%`,
                            background: `linear-gradient(90deg, ${ACCENT_COLOR}, ${ACCENT_DARK})`,
                            borderRadius: '3px',
                            transition: 'width 0.3s ease',
                          }}
                        />
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {basics?.profiles && basics.profiles.length > 0 && (
            <div style={{ marginBottom: '28px' }}>
              <h3
                style={{
                  fontSize: '13px',
                  fontWeight: '700',
                  color: ACCENT_COLOR,
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  marginBottom: '16px',
                  paddingBottom: '8px',
                  borderBottom: `2px solid ${ACCENT_COLOR}`,
                }}
              >
                Profiles
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {basics.profiles.map((profile, i) => (
                  <a
                    key={i}
                    href={profile.url}
                    style={{
                      fontSize: '12px',
                      color: TEXT_DARK,
                      textDecoration: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                    }}
                  >
                    <span style={{ color: ACCENT_COLOR }}>→</span>
                    {profile.network}
                  </a>
                ))}
              </div>
            </div>
          )}

          {basics?.languages && basics.languages.length > 0 && (
            <div style={{ marginBottom: '28px' }}>
              <h3
                style={{
                  fontSize: '13px',
                  fontWeight: '700',
                  color: ACCENT_COLOR,
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  marginBottom: '16px',
                  paddingBottom: '8px',
                  borderBottom: `2px solid ${ACCENT_COLOR}`,
                }}
              >
                Languages
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {basics.languages.map((lang, i) => (
                  <div key={i}>
                    <div
                      style={{
                        fontSize: '12px',
                        fontWeight: '500',
                        color: TEXT_DARK,
                        marginBottom: '4px',
                      }}
                    >
                      {lang.language}
                    </div>
                    <div
                      style={{
                        height: '4px',
                        background: '#e2e8f0',
                        borderRadius: '2px',
                        overflow: 'hidden',
                      }}
                    >
                      <div
                        style={{
                          height: '100%',
                          width: `${lang.fluency === 'Native' || lang.fluency === 'native' ? 100 : lang.fluency === 'Fluent' || lang.fluency === 'fluent' ? 80 : 60}%`,
                          background: ACCENT_COLOR,
                          borderRadius: '2px',
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div style={{ flex: 1, padding: '32px' }}>
          {basics?.summary && (
            <section style={{ marginBottom: '28px' }}>
              <h2
                style={{
                  fontSize: '18px',
                  fontWeight: '700',
                  color: ACCENT_COLOR,
                  marginBottom: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                }}
              >
                <span
                  style={{
                    width: '8px',
                    height: '8px',
                    background: ACCENT_COLOR,
                    borderRadius: '50%',
                  }}
                />
                About Me
              </h2>
              <p
                style={{
                  margin: 0,
                  fontSize: '14px',
                  color: TEXT_MUTED,
                  lineHeight: '1.7',
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
                  fontSize: '18px',
                  fontWeight: '700',
                  color: ACCENT_COLOR,
                  marginBottom: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                }}
              >
                <span
                  style={{
                    width: '8px',
                    height: '8px',
                    background: ACCENT_COLOR,
                    borderRadius: '50%',
                  }}
                />
                Experience
              </h2>
              {work.map((w, idx) => (
                <div
                  key={idx}
                  style={{
                    marginBottom: '20px',
                    padding: '0 0 20px 0',
                    borderBottom:
                      idx < work.length - 1 ? '1px dashed #e2e8f0' : 'none',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      marginBottom: '6px',
                    }}
                  >
                    <div>
                      <div
                        style={{
                          fontSize: '16px',
                          fontWeight: '700',
                          color: TEXT_DARK,
                        }}
                      >
                        {w.position || 'Position'}
                      </div>
                      <div
                        style={{
                          fontSize: '14px',
                          color: ACCENT_COLOR,
                          fontWeight: '600',
                        }}
                      >
                        {w.company || 'Company'}
                      </div>
                    </div>
                    <span
                      style={{
                        fontSize: '12px',
                        color: TEXT_MUTED,
                        background: ACCENT_LIGHT,
                        padding: '4px 12px',
                        borderRadius: '12px',
                        fontWeight: '500',
                      }}
                    >
                      {formatDate(w.startDate, w.endDate)}
                    </span>
                  </div>
                  {w.description && (
                    <p
                      style={{
                        margin: '8px 0 0 0',
                        fontSize: '13px',
                        color: TEXT_MUTED,
                        lineHeight: '1.6',
                      }}
                    >
                      {w.description}
                    </p>
                  )}
                  {w.highlights && w.highlights.length > 0 && (
                    <ul
                      style={{
                        margin: '8px 0 0 0',
                        paddingLeft: '16px',
                        fontSize: '13px',
                        color: TEXT_MUTED,
                        lineHeight: '1.6',
                      }}
                    >
                      {w.highlights.map((h, hi) => (
                        <li key={hi} style={{ marginBottom: '4px' }}>
                          {h}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </section>
          )}

          {education && education.length > 0 && (
            <section style={{ marginBottom: '28px' }}>
              <h2
                style={{
                  fontSize: '18px',
                  fontWeight: '700',
                  color: ACCENT_COLOR,
                  marginBottom: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                }}
              >
                <span
                  style={{
                    width: '8px',
                    height: '8px',
                    background: ACCENT_COLOR,
                    borderRadius: '50%',
                  }}
                />
                Education
              </h2>
              {education.map((e, idx) => (
                <div
                  key={idx}
                  style={{
                    marginBottom: '16px',
                    padding: '0 0 16px 0',
                    borderBottom:
                      idx < education.length - 1 ? '1px dashed #e2e8f0' : 'none',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      marginBottom: '4px',
                    }}
                  >
                    <div>
                      <div
                        style={{
                          fontSize: '15px',
                          fontWeight: '700',
                          color: TEXT_DARK,
                        }}
                      >
                        {e.school || 'School'}
                      </div>
                      <div style={{ fontSize: '14px', color: TEXT_MUTED }}>
                        {e.degree && <span>{e.degree}</span>}
                        {e.degree && e.area && <span> • </span>}
                        {e.area && <span style={{ color: ACCENT_COLOR }}>{e.area}</span>}
                      </div>
                    </div>
                    <span
                      style={{
                        fontSize: '12px',
                        color: TEXT_MUTED,
                        background: ACCENT_LIGHT,
                        padding: '4px 12px',
                        borderRadius: '12px',
                        fontWeight: '500',
                      }}
                    >
                      {formatDate(e.startDate, e.endDate)}
                    </span>
                  </div>
                </div>
              ))}
            </section>
          )}

          {projects && projects.length > 0 && (
            <section style={{ marginBottom: '28px' }}>
              <h2
                style={{
                  fontSize: '18px',
                  fontWeight: '700',
                  color: ACCENT_COLOR,
                  marginBottom: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                }}
              >
                <span
                  style={{
                    width: '8px',
                    height: '8px',
                    background: ACCENT_COLOR,
                    borderRadius: '50%',
                  }}
                />
                Projects
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {projects.map((p, idx) => (
                  <div
                    key={idx}
                    style={{
                      padding: '16px',
                      background: BG_LIGHT,
                      borderRadius: '8px',
                      borderLeft: `4px solid ${ACCENT_COLOR}`,
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '8px',
                      }}
                    >
                      <div
                        style={{
                          fontSize: '15px',
                          fontWeight: '700',
                          color: TEXT_DARK,
                        }}
                      >
                        {p.name || 'Project Name'}
                      </div>
                      {p.startDate && (
                        <span
                          style={{
                            fontSize: '11px',
                            color: TEXT_MUTED,
                            fontWeight: '500',
                          }}
                        >
                          {formatDate(p.startDate, p.endDate)}
                        </span>
                      )}
                    </div>
                    {p.description && (
                      <p
                        style={{
                          margin: '0 0 8px 0',
                          fontSize: '13px',
                          color: TEXT_MUTED,
                          lineHeight: '1.5',
                        }}
                      >
                        {p.description}
                      </p>
                    )}
                    {p.url && (
                      <a
                        href={p.url}
                        style={{
                          fontSize: '12px',
                          color: ACCENT_COLOR,
                          textDecoration: 'none',
                          fontWeight: '500',
                        }}
                      >
                        View Project →
                      </a>
                    )}
                    {p.highlights && p.highlights.length > 0 && (
                      <div
                        style={{
                          display: 'flex',
                          flexWrap: 'wrap',
                          gap: '6px',
                          marginTop: '8px',
                        }}
                      >
                        {p.highlights.map((h, hi) => (
                          <span
                            key={hi}
                            style={{
                              padding: '2px 8px',
                              background: WHITE,
                              borderRadius: '4px',
                              fontSize: '11px',
                              color: ACCENT_COLOR,
                              border: `1px solid ${ACCENT_LIGHT}`,
                            }}
                          >
                            {h}
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

export default TopjianliCreativeTemplate
