import React from 'react'
import { render, screen } from '@testing-library/react'
import PreviewPanel from '../src/preview/PreviewPanel'
import { ResumeData } from '../src/forms/types'

describe('PreviewPanel', () => {
  test('renders with provided resume and shows live preview header', () => {
    const resume: ResumeData = {
      basics: { name: 'Test User', email: 'test@example.com' },
      work: [],
      education: [],
      skills: [],
      projects: [],
    } as any

    render(<PreviewPanel resume={resume} initialTemplate="ClassicProfessional" />)
    expect(screen.getByText(/实时预览/i)).toBeInTheDocument()
  })
})
