import React from 'react'
import { EducationItem } from './types'
import Field from './components/InputField'

type Props = {
  value: EducationItem[]
  onChange: (items: EducationItem[]) => void
}

const EducationForm: React.FC<Props> = ({ value, onChange }) => {
  const updateItem = (idx: number, key: keyof EducationItem, v: string) => {
    const next = value.map((it, i) => (i === idx ? { ...it, [key]: v } : it))
    onChange(next)
  }
  const addItem = () => onChange([...value, { school: '' } as EducationItem])
  const removeItem = (idx: number) => onChange(value.filter((_, i) => i !== idx))

  const updateCourses = (idx: number, coursesText: string) => {
    const arr = coursesText.split(',').map((s) => s.trim()).filter((s) => s.length > 0)
    const next = value.map((it, i) => (i === idx ? { ...it, courses: arr } : it))
    onChange(next)
  }

  return (
    <section aria-labelledby="education-form-title" className="form-section" style={{ marginTop: 8 }}>
      <h3 id="education-form-title">教育背景</h3>
      {value.map((item, idx) => (
        <section key={idx} aria-label={`教育背景 ${idx + 1}`} style={{ border: '1px solid #e5e7eb', padding: 12, borderRadius: 6, marginBottom: 12 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <Field id={`education-${idx}-school`} label="学校" value={item.school ?? ''} onChange={(v) => updateItem(idx, 'school', v)} required />
            <Field id={`education-${idx}-area`} label="专业" value={item.area ?? ''} onChange={(v) => updateItem(idx, 'area', v)} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 8 }}>
            <Field id={`education-${idx}-degree`} label="学位" value={item.degree ?? ''} onChange={(v) => updateItem(idx, 'degree', v)} />
            <Field id={`education-${idx}-location`} label="地点" value={item.location ?? ''} onChange={(v) => updateItem(idx, 'location', v)} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 8 }}>
            <Field id={`education-${idx}-startDate`} label="开始日期" value={item.startDate ?? ''} onChange={(v) => updateItem(idx, 'startDate', v)} placeholder="YYYY-MM" />
            <Field id={`education-${idx}-endDate`} label="结束日期" value={item.endDate ?? ''} onChange={(v) => updateItem(idx, 'endDate', v)} placeholder="YYYY-MM" />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 8 }}>
            <Field id={`education-${idx}-gpa`} label="GPA" value={item.gpa ?? ''} onChange={(v) => updateItem(idx, 'gpa', v)} />
            <div style={{ display: 'grid' }}>
              <label>课程</label>
              <input
                aria-label="education-courses"
                value={(item.courses ?? []).join(', ')}
                onChange={(e) => updateCourses(idx, e.target.value)}
                placeholder="课程名称, 课程2"
              />
            </div>
          </div>
          <div style={{ marginTop: 8 }}>
            <button type="button" onClick={() => removeItem(idx)} aria-label={`Remove education ${idx + 1}`}>删除</button>
          </div>
        </section>
      ))}
      <button type="button" onClick={addItem}>添加教育经历</button>
    </section>
  )
}

export default EducationForm
