import type { ResumeData } from '../forms/types'

export type TemplateKey =
  | 'ClassicProfessional'
  | 'ChineseSocial'
  | 'TopjianliMinimalist'
  | 'TopjianliShanghai'
  | 'TopjianliCreative'
  | 'GreenSimple'
  | 'BorderedClean'
  | 'RedModern'
  | 'ChineseProfessional'
  | 'TealEnergetic'
  | 'RedClassic'

export interface PreviewPanelProps {
  resume: ResumeData
  initialTemplate?: TemplateKey
}
