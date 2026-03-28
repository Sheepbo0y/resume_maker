import React from 'react'
import { Basics } from './types'
import Field from './components/InputField'
import { validateBasics } from './validation'

type Props = {
  value: Basics
  onChange: (v: Basics) => void
  errors?: Partial<Basics>
}

const BasicsForm: React.FC<Props> = ({ value, onChange, errors = {} }) => {
  const set = <K extends keyof Basics>(key: K, v: string) => {
    onChange({ ...value, [key]: v } as Basics)
  }
  const gridStyle: React.CSSProperties = { display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }

  return (
    <section aria-labelledby="basics-form-title" className="form-section">
      <h3 id="basics-form-title">Basics 基本信息</h3>
      <div style={gridStyle}>
        <Field id="basics-name" label="姓名" value={value.name} onChange={(v) => set('name', v)} required error={errors.name} />
        <Field id="basics-label" label="职位" value={value.label ?? ''} onChange={(v) => set('label', v)} error={errors.label} />
        <Field id="basics-email" label="邮箱" value={value.email ?? ''} onChange={(v) => set('email', v)} type="email" error={errors.email} />
        <Field id="basics-phone" label="电话" value={value.phone ?? ''} onChange={(v) => set('phone', v)} type="tel" error={errors.phone} />
        <Field id="basics-website" label="网站" value={value.website ?? ''} onChange={(v) => set('website', v)} placeholder="https://..." />
        <Field id="basics-location" label="地址" value={value.location ?? ''} onChange={(v) => set('location', v)} />
      </div>
      <div style={{ marginTop: 8 }}>
        <Field
          id="basics-summary"
          label="个人简介"
          value={value.summary ?? ''}
          onChange={(v) => set('summary', v)}
          multiline
          rows={4}
          error={errors.summary}
        />
      </div>
    </section>
  )
}

export default BasicsForm
