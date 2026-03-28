import React from 'react'
import type { TemplateKey } from './types'

type Props = {
  template: TemplateKey
  onTemplateChange: (t: TemplateKey) => void
  scale: number
  onScaleChange: (s: number) => void
  onPrintPreview: () => void
  onToggleFullscreen: () => void
  isFullscreen?: boolean
}

const scaleOptions: { label: string; value: number }[] = [
  { label: '50%', value: 0.5 },
  { label: '75%', value: 0.75 },
  { label: '100%', value: 1 },
  { label: '125%', value: 1.25 },
  { label: '150%', value: 1.5 },
]

const PreviewControls: React.FC<Props> = ({ template, onTemplateChange, scale, onScaleChange, onPrintPreview, onToggleFullscreen, isFullscreen }) => {
  return (
    <div aria-label="Preview Controls" style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center', padding: 8, border: '1px solid #e5e7eb', borderRadius: 8, background: '#f9fafb' }}>
      <label htmlFor="template-select" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        Template:
        <select id="template-select" value={template} onChange={(e) => onTemplateChange(e.target.value as TemplateKey)} aria-label="Template selector" style={{ padding: '6px 10px', borderRadius: 4, border: '1px solid #d1d5db' }}>
          <option value="ClassicProfessional">ClassicProfessional</option>
          <option value="ModernMinimal">ModernMinimal</option>
          <option value="CreativeSimple">CreativeSimple</option>
        </select>
      </label>

      <div role="group" aria-label="Zoom" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        {scaleOptions.map((opt) => (
          <button
            key={opt.label}
            type="button"
            onClick={() => onScaleChange(opt.value)}
            aria-pressed={Math.abs(scale - opt.value) < 0.001}
            style={{ padding: '6px 10px', borderRadius: 4, border: '1px solid #d1d5db', background: Math.abs(scale - opt.value) < 0.001 ? '#e0f2fe' : '#fff', cursor: 'pointer' }}
          >
            {opt.label}
          </button>
        ))}
      </div>

      <button type="button" onClick={onPrintPreview} style={{ padding: '6px 12px', borderRadius: 4, border: '1px solid #d1d5db', background: '#fff' }}>
        Print Preview
      </button>
      <button type="button" onClick={onToggleFullscreen} aria-pressed={!!isFullscreen} style={{ padding: '6px 12px', borderRadius: 4, border: '1px solid #d1d5db', background: isFullscreen ? '#e5ffe8' : '#fff' }}>
        {isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
      </button>
    </div>
  )
}

export default PreviewControls
