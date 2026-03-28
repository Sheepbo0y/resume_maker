import React, { useEffect, useState, useCallback } from 'react'
import PreviewPanel from '../preview/PreviewPanel'
import type { ResumeData } from '../forms/types'

interface WorkExperience {
  company: string
  position: string
  startDate: string
  endDate: string
  description: string
}

interface Education {
  school: string
  degree: string
  area: string
  startDate: string
  endDate: string
}

interface Skill {
  name: string
  level: string
}

interface Project {
  name: string
  description: string
  url: string
}

const Editor: React.FC = () => {
  const [resumeId, setResumeId] = useState<number | null>(null)
  const [resume, setResume] = useState<ResumeData>({
    basics: {
      name: '',
      email: '',
      phone: '',
      location: '',
      summary: '',
    },
    work: [],
    education: [],
    skills: [],
    projects: [],
  } as ResumeData)

  const [activeTab, setActiveTab] = useState('basics')
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const id = params.get('id')

    if (id) {
      loadResume(parseInt(id))
    } else {
      createNewResume()
    }
  }, [])

  const loadResume = async (id: number) => {
    try {
      const token = localStorage.getItem('token')
      if (!token) {
        window.location.href = '/login'
        return
      }

      const response = await fetch(`http://localhost:3001/api/resumes`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        throw new Error('Failed to load resume')
      }

      const data = await response.json()
      const resumeData = data.data.find((r: any) => r.id === id)

      if (resumeData) {
        setResumeId(id)
        const parsed = typeof resumeData.resumeJson === 'string'
          ? JSON.parse(resumeData.resumeJson)
          : resumeData.resumeJson
        setResume(parsed as ResumeData)
      }
    } catch (err) {
      console.error('Error loading resume:', err)
    } finally {
      setLoading(false)
    }
  }

  const createNewResume = async () => {
    try {
      const token = localStorage.getItem('token')
      if (!token) {
        window.location.href = '/login'
        return
      }

      const response = await fetch('http://localhost:3001/api/resumes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: 'Untitled Resume',
          resumeJson: resume,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to create resume')
      }

      const data = await response.json()
      setResumeId(data.data.id)
      window.history.replaceState({}, '', `/editor?id=${data.data.id}`)
    } catch (err) {
      console.error('Error creating resume:', err)
    } finally {
      setLoading(false)
    }
  }

  const saveResume = useCallback(async (updatedResume: ResumeData) => {
    if (!resumeId) return

    setSaveStatus('saving')
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`http://localhost:3001/api/resumes/${resumeId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: updatedResume.basics?.name || 'Untitled Resume',
          resumeJson: updatedResume,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to save')
      }

      setSaveStatus('saved')
      setTimeout(() => setSaveStatus('idle'), 2000)
    } catch (err) {
      console.error('Error saving:', err)
      setSaveStatus('error')
    }
  }, [resumeId])

  useEffect(() => {
    if (loading) return

    const timer = setTimeout(() => {
      saveResume(resume)
    }, 1000)

    return () => clearTimeout(timer)
  }, [resume, loading, saveResume])

  const updateBasics = (field: string, value: string) => {
    setResume(prev => ({
      ...prev,
      basics: {
        ...prev.basics,
        [field]: value,
      },
    }))
  }

  const updateWork = (index: number, field: string, value: string) => {
    setResume(prev => {
      const work = [...(prev.work || [])]
      work[index] = { ...work[index], [field]: value }
      return { ...prev, work }
    })
  }

  const addWork = () => {
    setResume(prev => ({
      ...prev,
      work: [...(prev.work || []), { company: '', position: '', startDate: '', endDate: '', description: '' }],
    }))
  }

  const removeWork = (index: number) => {
    setResume(prev => ({
      ...prev,
      work: (prev.work || []).filter((_, i) => i !== index),
    }))
  }

  const updateEducation = (index: number, field: string, value: string) => {
    setResume(prev => {
      const education = [...(prev.education || [])]
      education[index] = { ...education[index], [field]: value }
      return { ...prev, education }
    })
  }

  const addEducation = () => {
    setResume(prev => ({
      ...prev,
      education: [...(prev.education || []), { school: '', degree: '', area: '', startDate: '', endDate: '' }],
    }))
  }

  const removeEducation = (index: number) => {
    setResume(prev => ({
      ...prev,
      education: (prev.education || []).filter((_, i) => i !== index),
    }))
  }

  const updateSkill = (index: number, field: string, value: string) => {
    setResume(prev => {
      const skills = [...(prev.skills || [])]
      skills[index] = { ...skills[index], [field]: value }
      return { ...prev, skills }
    })
  }

  const addSkill = () => {
    setResume(prev => ({
      ...prev,
      skills: [...(prev.skills || []), { name: '', level: 'Intermediate' }],
    }))
  }

  const removeSkill = (index: number) => {
    setResume(prev => ({
      ...prev,
      skills: (prev.skills || []).filter((_, i) => i !== index),
    }))
  }

  const updateProject = (index: number, field: string, value: string) => {
    setResume(prev => {
      const projects = [...(prev.projects || [])]
      projects[index] = { ...projects[index], [field]: value }
      return { ...prev, projects }
    })
  }

  const addProject = () => {
    setResume(prev => ({
      ...prev,
      projects: [...(prev.projects || []), { name: '', description: '', url: '' }],
    }))
  }

  const removeProject = (index: number) => {
    setResume(prev => ({
      ...prev,
      projects: (prev.projects || []).filter((_, i) => i !== index),
    }))
  }

  const tabs = [
    { id: 'basics', label: '👤 Basic Info', icon: '👤' },
    { id: 'work', label: '💼 Work Experience', icon: '💼' },
    { id: 'education', label: '🎓 Education', icon: '🎓' },
    { id: 'skills', label: '⚡ Skills', icon: '⚡' },
    { id: 'projects', label: '🚀 Projects', icon: '🚀' },
  ]

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
        <div className="spinner" style={{ width: '40px', height: '40px', border: '3px solid var(--border)', borderTopColor: 'var(--primary)' }} />
      </div>
    )
  }

  return (
    <div style={{ display: 'flex', gap: '24px', padding: '24px', minHeight: '100vh', background: 'var(--background)' }}>

      <div style={{ flex: '1', maxWidth: '600px' }}>
        <div className="card" style={{ marginBottom: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '700' }}>Edit Resume</h2>
            <div style={{
              padding: '6px 12px',
              borderRadius: '20px',
              fontSize: '0.875rem',
              fontWeight: '500',
              background: saveStatus === 'saved' ? '#dcfce7' : saveStatus === 'saving' ? '#fef3c7' : saveStatus === 'error' ? '#fee2e2' : '#f3f4f6',
              color: saveStatus === 'saved' ? '#16a34a' : saveStatus === 'saving' ? '#d97706' : saveStatus === 'error' ? '#dc2626' : '#6b7280',
            }}>
              {saveStatus === 'saving' ? '💾 Saving...' : saveStatus === 'saved' ? '✅ Saved' : saveStatus === 'error' ? '❌ Error' : '💾 Auto-save enabled'}
            </div>
          </div>


          <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', flexWrap: 'wrap' }}>
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  padding: '10px 16px',
                  background: activeTab === tab.id ? 'var(--primary)' : 'var(--surface)',
                  color: activeTab === tab.id ? 'white' : 'var(--text)',
                  border: '1px solid',
                  borderColor: activeTab === tab.id ? 'var(--primary)' : 'var(--border)',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: '500',
                  transition: 'all 0.2s',
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>


          <div style={{ minHeight: '400px' }}>

            {activeTab === 'basics' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: 'var(--text)' }}>
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={resume.basics?.name || ''}
                    onChange={(e) => updateBasics('name', e.target.value)}
                    placeholder="John Doe"
                    style={{ width: '100%' }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: 'var(--text)' }}>
                      Email *
                    </label>
                    <input
                      type="email"
                      value={resume.basics?.email || ''}
                      onChange={(e) => updateBasics('email', e.target.value)}
                      placeholder="john@example.com"
                      style={{ width: '100%' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: 'var(--text)' }}>
                      Phone
                    </label>
                    <input
                      type="tel"
                      value={resume.basics?.phone || ''}
                      onChange={(e) => updateBasics('phone', e.target.value)}
                      placeholder="+1 (555) 123-4567"
                      style={{ width: '100%' }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: 'var(--text)' }}>
                    Location
                  </label>
                  <input
                    type="text"
                    value={resume.basics?.location || ''}
                    onChange={(e) => updateBasics('location', e.target.value)}
                    placeholder="San Francisco, CA"
                    style={{ width: '100%' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: 'var(--text)' }}>
                    Professional Summary
                  </label>
                  <textarea
                    value={resume.basics?.summary || ''}
                    onChange={(e) => updateBasics('summary', e.target.value)}
                    placeholder="A brief summary of your professional background and career goals..."
                    rows={4}
                    style={{ width: '100%', resize: 'vertical' }}
                  />
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                    Tip: Keep it concise (2-3 sentences) and highlight your key strengths.
                  </p>
                </div>
              </div>
            )}


            {activeTab === 'work' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                {(resume.work || []).map((work, index) => (
                  <div key={index} className="card" style={{ padding: '20px', background: '#f9fafb' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                      <h4 style={{ fontWeight: '600', color: 'var(--text)' }}>Position #{index + 1}</h4>
                      <button
                        onClick={() => removeWork(index)}
                        style={{
                          background: '#fee2e2',
                          color: '#dc2626',
                          border: 'none',
                          padding: '6px 12px',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          fontSize: '0.875rem',
                        }}
                      >
                        🗑️ Remove
                      </button>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                        <div>
                          <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500', color: 'var(--text)' }}>Company</label>
                          <input
                            type="text"
                            value={work.company || ''}
                            onChange={(e) => updateWork(index, 'company', e.target.value)}
                            placeholder="Company Name"
                            style={{ width: '100%' }}
                          />
                        </div>
                        <div>
                          <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500', color: 'var(--text)' }}>Position</label>
                          <input
                            type="text"
                            value={work.position || ''}
                            onChange={(e) => updateWork(index, 'position', e.target.value)}
                            placeholder="Job Title"
                            style={{ width: '100%' }}
                          />
                        </div>
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                        <div>
                          <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500', color: 'var(--text)' }}>Start Date</label>
                          <input
                            type="text"
                            value={work.startDate || ''}
                            onChange={(e) => updateWork(index, 'startDate', e.target.value)}
                            placeholder="Jan 2020"
                            style={{ width: '100%' }}
                          />
                        </div>
                        <div>
                          <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500', color: 'var(--text)' }}>End Date</label>
                          <input
                            type="text"
                            value={work.endDate || ''}
                            onChange={(e) => updateWork(index, 'endDate', e.target.value)}
                            placeholder="Present"
                            style={{ width: '100%' }}
                          />
                        </div>
                      </div>

                      <div>
                        <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500', color: 'var(--text)' }}>Description</label>
                        <textarea
                          value={work.description || ''}
                          onChange={(e) => updateWork(index, 'description', e.target.value)}
                          placeholder="Describe your responsibilities and achievements..."
                          rows={3}
                          style={{ width: '100%', resize: 'vertical' }}
                        />
                      </div>
                    </div>
                  </div>
                ))}

                <button
                  onClick={addWork}
                  style={{
                    width: '100%',
                    padding: '16px',
                    background: 'var(--surface)',
                    border: '2px dashed var(--border)',
                    borderRadius: '12px',
                    cursor: 'pointer',
                    fontWeight: '500',
                    color: 'var(--primary)',
                    fontSize: '1rem',
                    transition: 'all 0.2s',
                  }}
                >
                  + Add Work Experience
                </button>
              </div>
            )}


            {activeTab === 'education' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                {(resume.education || []).map((edu, index) => (
                  <div key={index} className="card" style={{ padding: '20px', background: '#f9fafb' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                      <h4 style={{ fontWeight: '600', color: 'var(--text)' }}>Education #{index + 1}</h4>
                      <button
                        onClick={() => removeEducation(index)}
                        style={{
                          background: '#fee2e2',
                          color: '#dc2626',
                          border: 'none',
                          padding: '6px 12px',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          fontSize: '0.875rem',
                        }}
                      >
                        🗑️ Remove
                      </button>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                      <div>
                        <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500', color: 'var(--text)' }}>School</label>
                        <input
                          type="text"
                          value={edu.school || ''}
                          onChange={(e) => updateEducation(index, 'school', e.target.value)}
                          placeholder="University Name"
                          style={{ width: '100%' }}
                        />
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                        <div>
                          <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500', color: 'var(--text)' }}>Degree</label>
                          <input
                            type="text"
                            value={edu.degree || ''}
                            onChange={(e) => updateEducation(index, 'degree', e.target.value)}
                            placeholder="Bachelor's"
                            style={{ width: '100%' }}
                          />
                        </div>
                        <div>
                          <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500', color: 'var(--text)' }}>Field of Study</label>
                          <input
                            type="text"
                            value={edu.area || ''}
                            onChange={(e) => updateEducation(index, 'area', e.target.value)}
                            placeholder="Computer Science"
                            style={{ width: '100%' }}
                          />
                        </div>
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                        <div>
                          <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500', color: 'var(--text)' }}>Start Date</label>
                          <input
                            type="text"
                            value={edu.startDate || ''}
                            onChange={(e) => updateEducation(index, 'startDate', e.target.value)}
                            placeholder="2016"
                            style={{ width: '100%' }}
                          />
                        </div>
                        <div>
                          <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500', color: 'var(--text)' }}>End Date</label>
                          <input
                            type="text"
                            value={edu.endDate || ''}
                            onChange={(e) => updateEducation(index, 'endDate', e.target.value)}
                            placeholder="2020"
                            style={{ width: '100%' }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                <button
                  onClick={addEducation}
                  style={{
                    width: '100%',
                    padding: '16px',
                    background: 'var(--surface)',
                    border: '2px dashed var(--border)',
                    borderRadius: '12px',
                    cursor: 'pointer',
                    fontWeight: '500',
                    color: 'var(--primary)',
                    fontSize: '1rem',
                    transition: 'all 0.2s',
                  }}
                >
                  + Add Education
                </button>
              </div>
            )}


            {activeTab === 'skills' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <div className="card" style={{ padding: '20px', background: '#f9fafb' }}>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                    {(resume.skills || []).map((skill, index) => (
                      <div key={index} style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        background: 'white',
                        padding: '8px 12px',
                        borderRadius: '8px',
                        border: '1px solid var(--border)',
                      }}>
                        <input
                          type="text"
                          value={skill.name || ''}
                          onChange={(e) => updateSkill(index, 'name', e.target.value)}
                          placeholder="Skill name"
                          style={{
                            border: 'none',
                            background: 'transparent',
                            width: '120px',
                            fontWeight: '500',
                          }}
                        />
                        <select
                          value={skill.level || 'Intermediate'}
                          onChange={(e) => updateSkill(index, 'level', e.target.value)}
                          style={{
                            border: 'none',
                            background: 'transparent',
                            fontSize: '0.875rem',
                            color: 'var(--text-muted)',
                          }}
                        >
                          <option value="Beginner">Beginner</option>
                          <option value="Intermediate">Intermediate</option>
                          <option value="Advanced">Advanced</option>
                          <option value="Expert">Expert</option>
                        </select>
                        <button
                          onClick={() => removeSkill(index)}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: '#dc2626',
                            cursor: 'pointer',
                            padding: '4px',
                          }}
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={addSkill}
                  style={{
                    width: '100%',
                    padding: '16px',
                    background: 'var(--surface)',
                    border: '2px dashed var(--border)',
                    borderRadius: '12px',
                    cursor: 'pointer',
                    fontWeight: '500',
                    color: 'var(--primary)',
                    fontSize: '1rem',
                    transition: 'all 0.2s',
                  }}
                >
                  + Add Skill
                </button>
              </div>
            )}


            {activeTab === 'projects' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                {(resume.projects || []).map((project, index) => (
                  <div key={index} className="card" style={{ padding: '20px', background: '#f9fafb' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                      <h4 style={{ fontWeight: '600', color: 'var(--text)' }}>Project #{index + 1}</h4>
                      <button
                        onClick={() => removeProject(index)}
                        style={{
                          background: '#fee2e2',
                          color: '#dc2626',
                          border: 'none',
                          padding: '6px 12px',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          fontSize: '0.875rem',
                        }}
                      >
                        🗑️ Remove
                      </button>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                      <div>
                        <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500', color: 'var(--text)' }}>Project Name</label>
                        <input
                          type="text"
                          value={project.name || ''}
                          onChange={(e) => updateProject(index, 'name', e.target.value)}
                          placeholder="Project Name"
                          style={{ width: '100%' }}
                        />
                      </div>

                      <div>
                        <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500', color: 'var(--text)' }}>URL</label>
                        <input
                          type="url"
                          value={project.url || ''}
                          onChange={(e) => updateProject(index, 'url', e.target.value)}
                          placeholder="https://github.com/username/project"
                          style={{ width: '100%' }}
                        />
                      </div>

                      <div>
                        <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500', color: 'var(--text)' }}>Description</label>
                        <textarea
                          value={project.description || ''}
                          onChange={(e) => updateProject(index, 'description', e.target.value)}
                          placeholder="Describe the project, technologies used, and your role..."
                          rows={3}
                          style={{ width: '100%', resize: 'vertical' }}
                        />
                      </div>
                    </div>
                  </div>
                ))}

                <button
                  onClick={addProject}
                  style={{
                    width: '100%',
                    padding: '16px',
                    background: 'var(--surface)',
                    border: '2px dashed var(--border)',
                    borderRadius: '12px',
                    cursor: 'pointer',
                    fontWeight: '500',
                    color: 'var(--primary)',
                    fontSize: '1rem',
                    transition: 'all 0.2s',
                  }}
                >
                  + Add Project
                </button>
              </div>
            )}
          </div>
        </div>
      </div>


      <div style={{ flex: '1', position: 'sticky', top: '24px', height: 'fit-content' }}>
        <div className="card">
          <h3 style={{ marginBottom: '16px', fontWeight: '600' }}>Live Preview</h3>
          <PreviewPanel resume={resume as unknown as ResumeData} initialTemplate="ClassicProfessional" />
        </div>
      </div>
    </div>
  )
}

export default Editor
