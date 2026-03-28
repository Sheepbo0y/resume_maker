import React, { useMemo, useState, useEffect } from 'react'
import type { ResumeData } from './types'
import { PreviewContainer } from './PreviewContainer'
import PreviewControls from './PreviewControls'
import { TemplateKey } from './types'

import { ClassicProfessionalTemplate, ModernMinimalTemplate, CreativeSimpleTemplate, TemplateRegistry } from './templates'

type Props = {
  resume: ResumeData
  initialTemplate?: TemplateKey
}

// Debounce helper inside the panel to ensure 500ms update latency
function useDebouncedValue<T>(value: T, delay: number) {
  const [debounced, setDebounced] = useState<T>(value)
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(t)
  }, [value, delay])
  return debounced
}

const PreviewPanel: React.FC<Props> = ({ resume, initialTemplate = 'ClassicProfessional' }) => {
  const [template, setTemplate] = useState<TemplateKey>(initialTemplate)
  const [scale, setScale] = useState<number>(1)
  const [fullscreen, setFullscreen] = useState<boolean>(false)
  const [showToast, setShowToast] = useState<string>('')

  // Debounced resume to drive the live preview with 500ms debounce
  const debouncedResume = useDebouncedValue<ResumeData>(resume, 500)

  // Handlers
  const handleTemplateChange = (t: TemplateKey) => {
    setTemplate(t)
  }
  const handleScaleChange = (s: number) => {
    setScale(s)
  }
  const handlePrintPreview = () => {
    // Placeholder: do not trigger actual print
    const msg = 'Print Preview is a placeholder in this implementation.'
    setShowToast(msg)
    window.setTimeout(() => setShowToast(''), 1500)
  }
  const handleToggleFullscreen = () => {
    setFullscreen((f) => !f)
  }

  // Inline wrapper styles for fullscreen mode
  const wrapperStyle: React.CSSProperties = fullscreen
    ? {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        padding: 16,
        background: '#fff',
        zIndex: 9999,
        overflow: 'auto',
      }
    : { display: 'inline-block' as const, padding: 8 }

  // Compute the current template element to render via internal registry
  const content = useMemo(() => {
    switch (template) {
      case 'ModernMinimal':
        return <ModernMinimalTemplate resume={debouncedResume} />
      case 'CreativeSimple':
        return <CreativeSimpleTemplate resume={debouncedResume} />
      case 'ClassicProfessional':
      default:
        return <ClassicProfessionalTemplate resume={debouncedResume} />
    }
  }, [template, debouncedResume])

  // Build the actual container with scaling and content
  return (
    <section aria-label="Live Preview" style={{ padding: 8 }}>
      <h3 style={{ margin: '8px 0' }}>实时预览</h3>
      <PreviewControls
        template={template}
        onTemplateChange={handleTemplateChange}
        scale={scale}
        onScaleChange={handleScaleChange}
        onPrintPreview={handlePrintPreview}
        onToggleFullscreen={handleToggleFullscreen}
        isFullscreen={fullscreen}
      />
      <div style={{ marginTop: 12, ...wrapperStyle }}>
        <div style={{ width: fullscreen ? 'min(1000px, 90vw)' : '100%', border: '1px solid #e5e7eb', borderRadius: 8, padding: 12, background: '#fff' }}>
          <div style={{ display: 'inline-block' }}>{content}</div>
        </div>
      </div>
      {showToast && (
        <div role="status" aria-live="polite" style={{ position: 'fixed', bottom: 20, left: 20, background: '#111827', color: '#fff', padding: '8px 12px', borderRadius: 6 }}>
          {showToast}
        </div>
      )}
    </section>
  )
}

export default PreviewPanel
