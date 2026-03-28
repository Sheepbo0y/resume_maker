import React from 'react'
import { Skill } from './types'
import Field from './components/InputField'

type Props = {
  value: Skill[]
  onChange: (items: Skill[]) => void
}

const SkillsForm: React.FC<Props> = ({ value, onChange }) => {
  const updateItem = (idx: number, key: keyof Skill, v: string) => {
    const next = value.map((it, i) => (i === idx ? { ...it, [key]: v } : it))
    onChange(next)
  }
  const addItem = () => onChange([...value, { name: '' } as Skill])
  const removeItem = (idx: number) => onChange(value.filter((_, i) => i !== idx))
  const updateKeywords = (idx: number, v: string) => {
    const arr = v.split(',').map(s => s.trim()).filter(s => s.length > 0)
    onChange(value.map((it, i) => (i === idx ? { ...it, keywords: arr } : it)))
  }

  return (
    <section aria-labelledby="skills-form-title" className="form-section" style={{ marginTop: 8 }}>
      <h3 id="skills-form-title">技能</h3>
      {value.map((item, idx) => (
        <section key={idx} aria-label={`技能 ${idx + 1}`} style={{ border: '1px solid #e5e7eb', padding: 12, borderRadius: 6, marginBottom: 12 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <Field id={`skill-${idx}-name`} label="技能名称" value={item.name ?? ''} onChange={(v) => updateItem(idx, 'name', v)} required />
            <Field id={`skill-${idx}-level`} label="熟练程度" value={item.level ?? ''} onChange={(v) => updateItem(idx, 'level', v)} placeholder="如：初级、中级、高级" />
          </div>
          <Field id={`skill-${idx}-keywords`} label="关键词标签" value={(item.keywords ?? []).join(', ')} onChange={(v) => updateKeywords(idx, v)} placeholder="逗号分隔关键词" />
          <button type="button" onClick={() => removeItem(idx)} aria-label={`Remove skill ${idx + 1}`}>删除</button>
        </section>
      ))}
      <button type="button" onClick={addItem}>添加技能</button>
    </section>
  )
}

export default SkillsForm
