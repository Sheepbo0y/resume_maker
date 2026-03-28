import React from 'react'
import { WorkItem } from './types'
import Field from './components/InputField'

type Props = {
  value: WorkItem[]
  onChange: (items: WorkItem[]) => void
}

const WorkForm: React.FC<Props> = ({ value, onChange }) => {
  const updateItem = (idx: number, key: keyof WorkItem, v: string) => {
    const next = value.map((it, i) => (i === idx ? { ...it, [key]: v } : it))
    onChange(next)
  }
  const addItem = () => onChange([...value, ({ company: '' } as WorkItem)])
  const removeItem = (idx: number) => onChange(value.filter((_, i) => i !== idx))

  const addHighlight = (idx: number) => {
    const next = value.map((it, i) => (i === idx ? { ...it, highlights: [...(it.highlights ?? []), ''] } : it))
    onChange(next)
  }
  const updateHighlight = (idx: number, hIdx: number, v: string) => {
    const updated = value.map((it, i) => {
      if (i !== idx) return it
      const highs = it.highlights ?? []
      const nextHighs = highs.map((hl, hi) => (hi === hIdx ? v : hl))
      return { ...it, highlights: nextHighs }
    })
    onChange(updated)
  }
  const removeHighlight = (idx: number, hIdx: number) => {
    const updated = value.map((it, i) => {
      if (i !== idx) return it
      const highs = (it.highlights ?? []).filter((_, hi) => hi !== hIdx)
      return { ...it, highlights: highs }
    })
    onChange(updated)
  }

  return (
    <section aria-labelledby="work-form-title" className="form-section">
      <h3 id="work-form-title">工作经历</h3>
      {value.map((item, idx) => (
        <section key={idx} aria-label={`工作经历 ${idx + 1}`} style={{ border: '1px solid #e5e7eb', padding: 12, borderRadius: 6, marginBottom: 12 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <Field id={`work-${idx}-company`} label="公司" value={item.company ?? ''} onChange={(v) => updateItem(idx, 'company', v)} required />
            <Field id={`work-${idx}-position`} label="职位" value={item.position ?? ''} onChange={(v) => updateItem(idx, 'position', v)} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 8 }}>
            <Field id={`work-${idx}-location`} label="地点" value={item.location ?? ''} onChange={(v) => updateItem(idx, 'location', v)} />
            <Field id={`work-${idx}-startDate`} label="开始日期" value={item.startDate ?? ''} onChange={(v) => updateItem(idx, 'startDate', v)} placeholder="YYYY-MM" />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 8 }}>
            <Field id={`work-${idx}-endDate`} label="结束日期" value={item.endDate ?? ''} onChange={(v) => updateItem(idx, 'endDate', v)} placeholder="YYYY-MM" />
            <button type="button" onClick={() => removeItem(idx)}>删除</button>
          </div>
          <Field id={`work-${idx}-description`} label="工作描述" value={item.description ?? ''} onChange={(v) => updateItem(idx, 'description', v)} multiline rows={3} />
          <div style={{ marginTop: 8 }}>
            <div>成就要点</div>
            {(item.highlights ?? []).map((hl, hIdx) => (
              <div key={hIdx} style={{ display: 'flex', gap: 6, alignItems: 'center', marginTop: 6 }}>
                <input value={hl} onChange={(e) => updateHighlight(idx, hIdx, e.target.value)} style={{ flex: 1, padding: 6, borderRadius: 4, border: '1px solid #d1d5db' }} />
                <button type="button" onClick={() => removeHighlight(idx, hIdx)}>删除</button>
              </div>
            ))}
            <button type="button" onClick={() => addHighlight(idx)} style={{ marginTop: 6 }}>添加要点</button>
          </div>
        </section>
      ))}
      <button type="button" onClick={addItem}>添加工作经历</button>
    </section>
  )
}

export default WorkForm
