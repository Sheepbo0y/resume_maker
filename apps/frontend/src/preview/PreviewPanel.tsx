import React, { useMemo, useState, useEffect, useCallback } from 'react'
import type { ResumeData } from '../forms/types'
import { TemplateKey } from './types'
import { TemplateRegistry } from './templates'
import { exportPdf } from '../services/apiClient'

type Props = {
  resume: ResumeData
  initialTemplate?: TemplateKey
}

function useDebouncedValue<T>(value: T, delay: number) {
  const [debounced, setDebounced] = useState<T>(value)
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(t)
  }, [value, delay])
  return debounced
}

const templateOptions: { key: TemplateKey; label: string; category: string; emoji: string }[] = [
  { key: 'ClassicProfessional', label: '经典专业', category: '国际', emoji: '📄' },
  { key: 'TopjianliMinimalist', label: '极简慕尼黑', category: '国际', emoji: '🏛️' },
  { key: 'TopjianliCreative', label: '创意巴塞罗那', category: '国际', emoji: '🌊' },
  { key: 'GreenSimple', label: '墨绿简约', category: '国际', emoji: '🌿' },
  { key: 'BorderedClean', label: '边框简洁', category: '国际', emoji: '📋' },
  { key: 'RedModern', label: '红色现代', category: '国际', emoji: '🔴' },
  { key: 'ChineseSocial', label: '社招', category: '中国', emoji: '💼' },
  { key: 'TopjianliShanghai', label: '上海风格', category: '中国', emoji: '🏙️' },
  { key: 'ChineseProfessional', label: '中文专业', category: '中国', emoji: '👔' },
  { key: 'TealEnergetic', label: '青绿活力', category: '中国', emoji: '💚' },
  { key: 'RedClassic', label: '红色经典', category: '中国', emoji: '❤️' },
]

const PreviewPanel: React.FC<Props> = ({ resume, initialTemplate = 'ChineseSocial' }) => {
  const [template, setTemplate] = useState<TemplateKey>(initialTemplate)
  const [scale, setScale] = useState<number>(0.6)
  const [fullscreen, setFullscreen] = useState<boolean>(false)
  const [isExporting, setIsExporting] = useState<boolean>(false)

  const debouncedResume = useDebouncedValue<ResumeData>(resume, 300)

  const TemplateComponent = TemplateRegistry[template]

  const handleExportPdf = useCallback(async () => {
    setIsExporting(true)
    try {
      // Convert resume data to JSON Resume format
      const resumeJson = convertToJsonResume(debouncedResume)
      const blob = await exportPdf(resumeJson, template)

      // Create download link
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `resume-${Date.now()}.pdf`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error('PDF export failed:', error)
      alert('PDF导出失败: ' + (error instanceof Error ? error.message : '未知错误'))
    } finally {
      setIsExporting(false)
    }
  }, [debouncedResume, template])

  // Handle exit fullscreen with Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && fullscreen) {
        setFullscreen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [fullscreen])

  return (
    <div style={{
      background: fullscreen ? '#0f0f1a' : 'transparent',
      position: fullscreen ? 'fixed' : 'relative',
      top: fullscreen ? 0 : 'auto',
      left: fullscreen ? 0 : 'auto',
      right: fullscreen ? 0 : 'auto',
      bottom: fullscreen ? 0 : 'auto',
      zIndex: fullscreen ? 9999 : 1,
      padding: 0,
      overflow: fullscreen ? 'hidden' : 'visible',
      display: fullscreen ? 'flex' : 'block',
      flexDirection: fullscreen ? 'column' : undefined,
      height: fullscreen ? '100vh' : 'auto',
    }}>
      {/* Controls Panel - Fixed in fullscreen */}
      <div style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        borderRadius: fullscreen ? '0' : '16px',
        padding: '16px 20px',
        marginBottom: fullscreen ? '0' : '16px',
        boxShadow: '0 4px 20px rgba(102, 126, 234, 0.3)',
        flexShrink: 0,
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <h3 style={{
            margin: 0,
            color: '#fff',
            fontSize: '16px',
            fontWeight: '700',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}>
            👁️ 实时预览 {fullscreen && <span style={{ fontSize: '12px', opacity: 0.8 }}>(按 ESC 退出)</span>}
          </h3>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <button
              onClick={handleExportPdf}
              disabled={isExporting}
              style={{
                background: isExporting ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.9)',
                border: 'none',
                color: isExporting ? 'rgba(255,255,255,0.5)' : '#667eea',
                padding: '8px 14px',
                borderRadius: '8px',
                cursor: isExporting ? 'not-allowed' : 'pointer',
                fontWeight: '600',
                fontSize: '13px',
                transition: 'all 0.2s',
                whiteSpace: 'nowrap',
              }}
            >
              {isExporting ? '⏳ 导出中...' : '📥 导出PDF'}
            </button>
            <button
              onClick={() => setFullscreen(!fullscreen)}
              style={{
                background: 'rgba(255,255,255,0.2)',
                border: 'none',
                color: '#fff',
                padding: '8px 14px',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: '500',
                fontSize: '13px',
                transition: 'all 0.2s',
                whiteSpace: 'nowrap',
              }}
            >
              {fullscreen ? '✕ 退出全屏' : '⛶ 全屏预览'}
            </button>
          </div>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '10px' }}>
          <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: '12px', fontWeight: '500', padding: '4px 0' }}>国际模板:</span>
          {templateOptions.filter(t => t.category === '国际').map((t) => (
            <button
              key={t.key}
              onClick={() => setTemplate(t.key)}
              style={{
                background: template === t.key ? '#fff' : 'rgba(255,255,255,0.15)',
                color: template === t.key ? '#667eea' : '#fff',
                border: 'none',
                padding: '6px 10px',
                borderRadius: '16px',
                cursor: 'pointer',
                fontWeight: '500',
                fontSize: '12px',
                transition: 'all 0.2s',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              {t.emoji} {t.label}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '10px' }}>
          <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: '12px', fontWeight: '500', padding: '4px 0' }}>中国模板:</span>
          {templateOptions.filter(t => t.category === '中国').map((t) => (
            <button
              key={t.key}
              onClick={() => setTemplate(t.key)}
              style={{
                background: template === t.key ? '#fff' : 'rgba(255,255,255,0.15)',
                color: template === t.key ? '#667eea' : '#fff',
                border: 'none',
                padding: '6px 10px',
                borderRadius: '16px',
                cursor: 'pointer',
                fontWeight: '500',
                fontSize: '12px',
                transition: 'all 0.2s',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              {t.emoji} {t.label}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: '12px', fontWeight: '500' }}>缩放:</span>
          {[0.4, 0.5, 0.6, 0.75, 1].map((s) => (
            <button
              key={s}
              onClick={() => setScale(s)}
              style={{
                background: scale === s ? '#fff' : 'rgba(255,255,255,0.15)',
                color: scale === s ? '#667eea' : '#fff',
                border: 'none',
                padding: '4px 10px',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: '500',
                fontSize: '11px',
                transition: 'all 0.2s',
              }}
            >
              {Math.round(s * 100)}%
            </button>
          ))}
        </div>
      </div>

      {/* Preview Area - Scrollable */}
      <div style={{
        background: fullscreen ? '#0f0f1a' : '#f0f0f0',
        borderRadius: fullscreen ? '0' : '16px',
        padding: fullscreen ? '20px' : '20px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        flex: fullscreen ? 1 : undefined,
        overflow: 'auto',
        minHeight: fullscreen ? undefined : '500px',
      }}>
        <div style={{
          transform: `scale(${scale})`,
          transformOrigin: 'top center',
          boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
          borderRadius: '8px',
          overflow: 'hidden',
          background: '#fff',
          maxWidth: '800px',
          margin: fullscreen ? '20px auto' : undefined,
        }}>
          <TemplateComponent resume={debouncedResume} />
        </div>
      </div>
    </div>
  )
}

export default PreviewPanel

// Convert ResumeData to JSON Resume format for PDF export
function convertToJsonResume(data: ResumeData): any {
  return {
    basics: {
      name: data.basics?.name || '',
      label: data.basics?.label || '',
      email: data.basics?.email || '',
      phone: data.basics?.phone || '',
      url: data.basics?.website || '',
      summary: data.basics?.summary || '',
      location: {
        city: data.basics?.location || '',
      },
    },
    work: data.work?.map((w) => ({
      company: w.company || '',
      position: w.position || '',
      location: w.location || '',
      startDate: w.startDate || '',
      endDate: w.endDate || '',
      summary: w.description || '',
      highlights: w.highlights || [],
    })) || [],
    education: data.education?.map((e) => ({
      institution: e.school || '',
      area: e.area || '',
      studyType: e.degree || '',
      location: e.location || '',
      startDate: e.startDate || '',
      endDate: e.endDate || '',
      gpa: e.gpa || '',
    })) || [],
    skills: data.skills?.map((s) => ({
      name: s.name || '',
      level: s.level || '',
      keywords: s.keywords || [],
    })) || [],
    projects: data.projects?.map((p) => ({
      name: p.name || '',
      description: p.description || '',
      url: p.url || '',
      startDate: p.startDate || '',
      endDate: p.endDate || '',
      keywords: p.technologies || [],
    })) || [],
  }
}
