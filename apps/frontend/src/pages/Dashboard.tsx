import React, { useState, useEffect } from 'react'

interface Resume {
  id: number
  title: string
  resumeJson: string
  createdAt: string
  updatedAt: string
}

const Dashboard: React.FC = () => {
  const [resumes, setResumes] = useState<Resume[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [newTitle, setNewTitle] = useState('')
  const [creating, setCreating] = useState(false)

  useEffect(() => {
    fetchResumes()
  }, [])

  const fetchResumes = async () => {
    try {
      const token = localStorage.getItem('token')
      if (!token) {
        window.location.href = '/login'
        return
      }

      const response = await fetch('http://localhost:3001/api/resumes', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        throw new Error('Failed to fetch resumes')
      }

      const data = await response.json()
      setResumes(data.data || [])
    } catch (err: any) {
      setError(err.message || 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const createResume = async () => {
    if (!newTitle.trim()) return

    setCreating(true)
    try {
      const token = localStorage.getItem('token')
      const response = await fetch('http://localhost:3001/api/resumes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: newTitle,
          resumeJson: {
            basics: {
              name: 'Your Name',
              email: '',
              phone: '',
            },
            work: [],
            education: [],
            skills: [],
            projects: [],
          },
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to create resume')
      }

      setShowCreateModal(false)
      setNewTitle('')
      fetchResumes()
    } catch (err: any) {
      setError(err.message || 'An error occurred')
    } finally {
      setCreating(false)
    }
  }

  const deleteResume = async (id: number) => {
    if (!confirm('Are you sure you want to delete this resume?')) return

    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`http://localhost:3001/api/resumes/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        throw new Error('Failed to delete resume')
      }

      fetchResumes()
    } catch (err: any) {
      setError(err.message || 'An error occurred')
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  return (
    <section className="page dashboard">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div>
          <h2 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '8px' }}>My Resumes</h2>
          <p style={{ color: 'var(--text-muted)' }}>Create and manage your professional resumes</p>
        </div>
        <button onClick={() => setShowCreateModal(true)}>
          + Create New Resume
        </button>
      </div>

      {error && (
        <div style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626', padding: '12px 16px', borderRadius: '8px', marginBottom: '24px' }}>
          {error}
          <button onClick={() => setError('')} style={{ float: 'right', background: 'none', border: 'none', color: '#dc2626', cursor: 'pointer' }}>×</button>
        </div>
      )}

      {loading ? (
        <div style={{ textAlign: 'center', padding: '48px' }}>
          <div className="spinner" style={{ width: '40px', height: '40px', border: '3px solid var(--border)', borderTopColor: 'var(--primary)', margin: '0 auto 16px' }} />
          <p style={{ color: 'var(--text-muted)' }}>Loading your resumes...</p>
        </div>
      ) : resumes.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '48px' }}>
          <div style={{ fontSize: '4rem', marginBottom: '16px' }}>📄</div>
          <h3 style={{ marginBottom: '8px' }}>No resumes yet</h3>
          <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>Create your first resume to get started</p>
          <button onClick={() => setShowCreateModal(true)}>
            Create Your First Resume
          </button>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
          {resumes.map((resume) => (
            <div key={resume.id} className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                <div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '4px' }}>{resume.title}</h3>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                    Updated {formatDate(resume.updatedAt)}
                  </p>
                </div>
                <button
                  onClick={() => deleteResume(resume.id)}
                  style={{ background: 'none', border: 'none', color: 'var(--danger)', cursor: 'pointer', padding: '4px' }}
                >
                  🗑️
                </button>
              </div>

              <div style={{ display: 'flex', gap: '12px' }}>
                <a
                  href={`/editor?id=${resume.id}`}
                  style={{
                    flex: 1,
                    display: 'block',
                    textAlign: 'center',
                    padding: '12px',
                    background: 'var(--primary)',
                    color: 'white',
                    textDecoration: 'none',
                    borderRadius: '8px',
                    fontWeight: '500',
                    transition: 'var(--transition)',
                  }}
                >
                  Edit Resume
                </a>
              </div>
            </div>
          ))}
        </div>
      )}

      {showCreateModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000,
          animation: 'fadeIn 0.2s ease-out',
        }}>
          <div className="card" style={{ width: '100%', maxWidth: '400px', animation: 'scaleIn 0.2s ease-out' }}>
            <h3 style={{ marginBottom: '24px' }}>Create New Resume</h3>

            <div style={{ marginBottom: '24px' }}>
              <label htmlFor="resume-title" style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Resume Title</label>
              <input
                id="resume-title"
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="e.g., Software Engineer Resume"
                style={{ width: '100%' }}
              />
            </div>

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
              <button
                onClick={() => setShowCreateModal(false)}
                style={{ background: 'var(--secondary)' }}
              >
                Cancel
              </button>
              <button
                onClick={createResume}
                disabled={creating || !newTitle.trim()}
                style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
              >
                {creating && <div className="spinner" />}
                {creating ? 'Creating...' : 'Create Resume'}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default Dashboard
