import React, { useMemo, useState, useEffect } from 'react'
import BasicsForm from './BasicsForm'
import WorkForm from './WorkForm'
import EducationForm from './EducationForm'
import SkillsForm from './SkillsForm'
import ProjectsForm from './ProjectsForm'
import { Basics, WorkItem } from './types'
import type { EducationItem, Project, Skill, ResumeData } from './types'
import { validateBasics } from './validation'

type Props = {
  initial?: Partial<ResumeData>
}

const emptyBasics: Basics = { name: '', email: '', location: '', website: '', summary: '' }

const ResumeForm: React.FC<Props> = ({ initial }) => {
  const [active, setActive] = useState<number>(0)
  const [basics, setBasics] = useState<Basics>(initial?.basics ?? emptyBasics)
  const [basicsErrors, setBasicsErrors] = useState<Partial<Basics>>({})
  const [work, setWork] = useState<WorkItem[]>(initial?.work ?? [])
  const [education, setEducation] = useState<EducationItem[]>(initial?.education ?? [])
  const [skills, setSkills] = useState<Skill[]>(initial?.skills ?? [])
  const [projects, setProjects] = useState<Project[]>(initial?.projects ?? [])

  const resume = useMemo(() => ({ basics, work, education, skills, projects }), [basics, work, education, skills, projects])

  useEffect(() => {
    const errs = validateBasics(basics)
    setBasicsErrors(errs ?? {})
  }, [basics])

  const validateAll = (): boolean => {
    let ok = true
    if (!basics.name?.trim()) ok = false
    if (basics.email && !/^([^\s@]+)@([^\s@]+)\.[^\s@]+$/.test(basics.email)) ok = false
    for (const w of work) if (!w.company?.trim()) ok = false
    for (const e of education) if (!e.school?.trim()) ok = false
    return ok
  }

  const handleSave = () => {
    if (!validateAll()) {
      console.warn('Validation failed. Please complete required fields.')
      return
    }
    console.log('Resume data ready to save:', JSON.stringify(resume, null, 2))
  }

  const reset = () => {
    setBasics(emptyBasics)
    setWork([])
    setEducation([])
    setSkills([])
    setProjects([])
  }

  const tabNames = ['Basics', 'Work', 'Education', 'Skills', 'Projects']

  return (
    <section aria-label="Resume Form" className="resume-form" style={{ padding: 16 }}>
      <h2>Resume Form</h2>
      <div role="tablist" aria-label="Form sections" style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
        {tabNames.map((t, i) => (
          <button key={t} role="tab" aria-selected={active === i} onClick={() => setActive(i)} style={{ padding: '8px 12px', border: '1px solid #d1d5db', borderBottom: active === i ? '2px solid #2563eb' : '1px solid #d1d5db', borderRadius: 6, background: active === i ? '#e0f2fe' : '#fff', cursor: 'pointer' }}>
            {t}
          </button>
        ))}
        <div style={{ marginLeft: 'auto' }}>
          <button type="button" onClick={handleSave} style={{ marginRight: 8 }}>保存</button>
          <button type="button" onClick={reset}>重置</button>
        </div>
      </div>
      <div className="form-area" aria-label="Form Area" style={{ borderTop: '1px solid #e5e7eb', paddingTop: 12 }}>
        {active === 0 && <BasicsForm value={basics} onChange={setBasics} />}
        {active === 1 && <WorkForm value={work} onChange={setWork} />}
        {active === 2 && <EducationForm value={education} onChange={setEducation} />}
        {active === 3 && <SkillsForm value={skills} onChange={setSkills} />}
        {active === 4 && <ProjectsForm value={projects} onChange={setProjects} />}
      </div>
      <section aria-label="Resume JSON Preview" className="panel" style={{ marginTop: 16, padding: 12, border: '1px solid #e5e7eb', borderRadius: 6 }}>
        <details>
          <summary>当前数据摘要（JSON）</summary>
          <pre style={{ whiteSpace: 'pre-wrap', maxHeight: 300, overflow: 'auto' }}>{JSON.stringify(resume, null, 2)}</pre>
        </details>
      </section>
    </section>
  )
}

export default ResumeForm
