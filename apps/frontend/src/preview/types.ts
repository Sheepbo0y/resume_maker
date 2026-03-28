import type { ResumeData } from '../forms/types'

export type TemplateKey =
  | 'ClassicProfessional'
  | 'ModernMinimal'
  | 'CreativeSimple'
  | 'ChineseFreshGrad'
  | 'ChineseSocial'
  | 'ChineseCreative'

export interface PreviewPanelProps {
  resume: ResumeData
  initialTemplate?: TemplateKey
}
