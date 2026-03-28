import type { ResumeData } from '../forms/types'

export type TemplateKey = 'ClassicProfessional' | 'ModernMinimal' | 'CreativeSimple'

export interface PreviewPanelProps {
  resume: ResumeData
  initialTemplate?: TemplateKey
}
