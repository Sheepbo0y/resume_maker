import React from 'react'
import type { ResumeData } from '../forms/types'
import type { TemplateKey } from './types'
import { ClassicProfessionalTemplate, ModernMinimalTemplate, CreativeSimpleTemplate, TemplateRegistry } from './templates'

type Props = {
  resume: ResumeData
  template: TemplateKey
  scale: number
}

const renderTemplate = (template: TemplateKey, resume: ResumeData) => {
  // Prefer internal registry to render template variants
  // Fallback to ClassicProfessional if template not found
  const key = template
  switch (key) {
    case 'ModernMinimal':
      return <ModernMinimalTemplate resume={resume} />
    case 'CreativeSimple':
      return <CreativeSimpleTemplate resume={resume} />
    case 'ClassicProfessional':
    default:
      return <ClassicProfessionalTemplate resume={resume} />
  }
}

export const PreviewContainer: React.FC<Props> = ({ resume, template, scale }) => {
  return (
    <div
      aria-label="Preview Container"
      style={{ border: '1px solid #e5e7eb', padding: 16, borderRadius: 8, background: '#fff', width: 'fit-content' }}
    >
      <div style={{ transform: `scale(${scale})`, transformOrigin: 'top left', display: 'inline-block' }}>
        {renderTemplate(template, resume)}
      </div>
    </div>
  )
}

export default PreviewContainer
