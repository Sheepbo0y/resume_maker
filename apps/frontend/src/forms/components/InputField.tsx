import React from 'react'

export type FieldProps = {
  id: string
  label: string
  value: string
  onChange: (v: string) => void
  type?: string
  placeholder?: string
  required?: boolean
  error?: string
  multiline?: boolean
  rows?: number
}

const Field: React.FC<FieldProps> = ({ id, label, value, onChange, type = 'text', placeholder, required, error, multiline, rows = 4 }) => {
  const ariaId = `${id}-error`
  return (
    <div className="field" aria-label={label}>
      <label htmlFor={id}>
        {label} {required ? <span aria-hidden="true" style={{ color: 'red' }}>*</span> : null}
      </label>
      {multiline ? (
        <textarea
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={rows}
          aria-invalid={!!error}
          aria-describedby={error ? ariaId : undefined}
        />
      ) : (
        <input
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          aria-invalid={!!error}
          aria-describedby={error ? ariaId : undefined}
        />
      )}
      {error ? (
        <span id={ariaId} className="error" style={{ color: '#e11d48', fontSize: 12 }}>{error}</span>
      ) : null}
    </div>
  )
}

export default Field
