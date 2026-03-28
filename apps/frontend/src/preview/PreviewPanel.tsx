import React, { useMemo, useState, useEffect } from 'react'
import type { ResumeData } from './types'
import { TemplateKey } from './types'
import { TemplateRegistry } from './templates'

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
  { key: 'ModernMinimal', label: '现代简约', category: '国际', emoji: '✨' },
  { key: 'CreativeSimple', label: '创意简洁', category: '国际', emoji: '🎨' },
  { key: 'ChineseFreshGrad', label: '应届生', category: '中国', emoji: '🎓' },
  { key: 'ChineseSocial', label: '社招', category: '中国', emoji: '💼' },
  { key: 'ChineseCreative', label: '创意设计', category: '中国', emoji: '🚀' },
]

const PreviewPanel: React.FC<Props> = ({ resume, initialTemplate = 'ChineseFreshGrad' }) => {
  const [template, setTemplate] = useState<TemplateKey>(initialTemplate)
  const [scale, setScale] = useState<number>(0.6)
  const [fullscreen, setFullscreen] = useState<boolean>(false)

  const debouncedResume = useDebouncedValue<ResumeData>(resume, 300)

  const TemplateComponent = TemplateRegistry[template]

  return (
    <div style={{
      background: fullscreen ? '#1a1a2e' : 'transparent',
      position: fullscreen ? 'fixed' : 'relative',
      top: fullscreen ? 0 : 'auto',
      left: fullscreen ? 0 : 'auto',
      right: fullscreen ? 0 : 'auto',
      bottom: fullscreen ? 0 : 'auto',
      zIndex: fullscreen ? 9999 : 1,
      padding: fullscreen ? '20px' : 0,
      overflow: 'auto',
    }}>
      <div style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        borderRadius: '16px',
        padding: '20px',
        marginBottom: '16px',
        boxShadow: '0 10px 40px rgba(102, 126, 234, 0.3)',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h3 style={{
            margin: 0,
            color: '#fff',
            fontSize: '18px',
            fontWeight: '700',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}>
            👁️ 实时预览
          </h3>
          <button
            onClick={() => setFullscreen(!fullscreen)}
            style={{
              background: 'rgba(255,255,255,0.2)',
              border: 'none',
              color: '#fff',
              padding: '8px 16px',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: '500',
              fontSize: '13px',
              transition: 'all 0.2s',
            }}
          >
            {fullscreen ? '✕ 退出全屏' : '⛶ 全屏预览'}
          </button>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '16px' }}>
          <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: '13px', fontWeight: '500', padding: '6px 0' }}>国际模板:</span>
          {templateOptions.filter(t => t.category === '国际').map((t) => (
            <button
              key={t.key}
              onClick={() => setTemplate(t.key)}
              style={{
                background: template === t.key ? '#fff' : 'rgba(255,255,255,0.15)',
                color: template === t.key ? '#667eea' : '#fff',
                border: 'none',
                padding: '8px 14px',
                borderRadius: '20px',
                cursor: 'pointer',
                fontWeight: '500',
                fontSize: '13px',
                transition: 'all 0.2s',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              {t.emoji} {t.label}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '16px' }}>
          <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: '13px', fontWeight: '500', padding: '6px 0' }}>中国模板:</span>
          {templateOptions.filter(t => t.category === '中国').map((t) => (
            <button
              key={t.key}
              onClick={() => setTemplate(t.key)}
              style={{
                background: template === t.key ? '#fff' : 'rgba(255,255,255,0.15)',
                color: template === t.key ? '#667eea' : '#fff',
                border: 'none',
                padding: '8px 14px',
                borderRadius: '20px',
                cursor: 'pointer',
                fontWeight: '500',
                fontSize: '13px',
                transition: 'all 0.2s',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              {t.emoji} {t.label}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: '13px', fontWeight: '500' }}>缩放:</span>
          {[0.4, 0.5, 0.6, 0.75, 1].map((s) => (
            <button
              key={s}
              onClick={() => setScale(s)}
              style={{
                background: scale === s ? '#fff' : 'rgba(255,255,255,0.15)',
                color: scale === s ? '#667eea' : '#fff',
                border: 'none',
                padding: '6px 12px',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: '500',
                fontSize: '12px',
                transition: 'all 0.2s',
              }}
            >
              {Math.round(s * 100)}%
            </button>
          ))}
        </div>
      </div>

      <div style={{
        background: '#f0f0f0',
        borderRadius: '16px',
        padding: fullscreen ? '40px' : '20px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: fullscreen ? 'center' : 'flex-start',
        minHeight: fullscreen ? 'calc(100vh - 200px)' : '500px',
        overflow: 'auto',
      }}>
        <div style={{
          transform: `scale(${scale})`,
          transformOrigin: 'top center',
          boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
          borderRadius: '8px',
          overflow: 'hidden',
          background: '#fff',
          maxWidth: '800px',
        }}>
          <TemplateComponent resume={debouncedResume} />
        </div>
      </div>
    </div>
  )
}

export default PreviewPanel
