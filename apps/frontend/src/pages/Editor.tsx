import React, { useEffect, useMemo, useState } from 'react'
import PreviewPanel from '../preview/PreviewPanel'
import type { ResumeData } from '../forms/types'
import { useAutoSave } from '../hooks/useAutoSave'

  // Simple in-page Editor UI to demonstrate auto-save behavior.
// This component is intentionally lightweight and focuses on the
// auto-save flow described in the task.
const Editor: React.FC = () => {
  // Basic in-memory resume model (could be populated from API in a real app)
  const [resume, setResume] = useState<ResumeData>({
    basics: { name: 'Your Name' },
    work: [],
    education: [],
    skills: [],
    projects: [],
  } as ResumeData)

  // Inline content to edit: a JSON representation of the resume
  const [jsonDraft, setJsonDraft] = useState<string>(JSON.stringify(resume, null, 2))

  // Whenever JSON draft changes and parses, update the resume model
  useEffect(() => {
    try {
      const parsed = JSON.parse(jsonDraft)
      setResume(parsed)
    } catch {
      // ignore parse errors while typing
    }
  }, [jsonDraft])

  // Auto-save hook: saves the latest resume every 500ms after change
  const saveEndpoint = useMemo(() => '/api/resumes/1', [])
  const { status } = useAutoSave<any>(resume, async (payload) => {
    // Persist draft to backend
    const resp = await fetch(saveEndpoint, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ resumeJson: payload }),
    })
    if (!resp.ok) {
      const err = await resp.text()
      throw new Error(err || 'Failed to save draft')
    }
  }, [resume])

  // UI helper: pretty-printed JSON that users can edit directly
  const pretty = useMemo(() => JSON.stringify(resume, null, 2), [resume])

  // Reflect any changes made in the textarea back into the jsonDraft
  useEffect(() => {
    setJsonDraft(pretty)
  }, [pretty])

  return (
    <section className="page editor">
      <h2>Editor</h2>
      <div className="editor-container" style={{ display: 'flex', gap: '16px' }}>
        <textarea
          aria-label="resume-json-editor"
          value={jsonDraft}
          onChange={(e) => setJsonDraft(e.target.value)}
          rows={20}
          style={{ width: '60%', height: '420px', fontFamily: 'Monaco, monospace' }}
        />
        <div style={{ width: '40%', display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div>
            <strong>Auto-Save Status:</strong> {status === 'saving' ? 'Saving...' : status === 'saved' ? 'Saved' : status === 'error' ? 'Error' : 'Idle'}
          </div>
          <div aria-label="Resume JSON Preview" style={{ borderTop: '1px solid #e5e7eb', paddingTop: 8 }}>
            <PreviewPanel resume={resume as unknown as ResumeData} initialTemplate="ClassicProfessional" />
          </div>
          <hr />
          <p>JSON Resume structure is stored in resumeJson on the backend.</p>
          <p>Tip: edits in the editor will be automatically debounced by 500ms.</p>
        </div>
      </div>
    </section>
  )
}

export default Editor
