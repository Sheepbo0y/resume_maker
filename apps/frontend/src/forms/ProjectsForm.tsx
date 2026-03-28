import React from 'react'
import { Project } from './types'
import Field from './components/InputField'

type Props = {
  value: Project[]
  onChange: (items: Project[]) => void
}

const ProjectsForm: React.FC<Props> = ({ value, onChange }) => {
  const updateItem = (idx: number, key: keyof Project, v: string) => {
    const next = value.map((it, i) => (i === idx ? { ...it, [key]: v } : it))
    onChange(next)
  }
  const addItem = () => onChange([...value, { name: '' } as Project])
  const removeItem = (idx: number) => onChange(value.filter((_, i) => i !== idx))

  return (
    <section aria-labelledby="projects-form-title" className="form-section" style={{ marginTop: 8 }}>
      <h3 id="projects-form-title">项目经历</h3>
      {value.map((item, idx) => (
        <section key={idx} aria-label={`项目 ${idx + 1}`} style={{ border: '1px solid #e5e7eb', padding: 12, borderRadius: 6, marginBottom: 12 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <Field id={`project-${idx}-name`} label="项目名称" value={item.name ?? ''} onChange={(v) => updateItem(idx, 'name', v)} required />
            <Field id={`project-${idx}-url`} label="URL" value={item.url ?? ''} onChange={(v) => updateItem(idx, 'url', v)} placeholder="https://..." />
          </div>
          <Field id={`project-${idx}-description`} label="描述" value={item.description ?? ''} onChange={(v) => updateItem(idx, 'description', v)} multiline rows={3} />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 8 }}>
            <Field id={`project-${idx}-startDate`} label="开始日期" value={item.startDate ?? ''} onChange={(v) => updateItem(idx, 'startDate', v)} placeholder="YYYY-MM" />
            <Field id={`project-${idx}-endDate`} label="结束日期" value={item.endDate ?? ''} onChange={(v) => updateItem(idx, 'endDate', v)} placeholder="YYYY-MM" />
          </div>
          <div style={{ marginTop: 8 }}>
            <Field id={`project-${idx}-technologies`} label="技术栈" value={(item.technologies ?? []).join(', ')} onChange={(v) => {
              const arr = v.split(',').map(s => s.trim()).filter(s => s.length > 0)
              onChange(value.map((p, i) => i === idx ? { ...p, technologies: arr } : p))
            }} placeholder="如: React, TS, Node.js" />
          </div>
          <button type="button" onClick={() => removeItem(idx)} aria-label={`Remove project ${idx + 1}`} >删除</button>
        </section>
      ))}
      <button type="button" onClick={addItem}>添加项</button>
    </section>
  )
}

export default ProjectsForm
