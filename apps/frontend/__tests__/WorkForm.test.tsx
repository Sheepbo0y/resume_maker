import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import WorkForm from '../src/forms/WorkForm'

describe('WorkForm', () => {
  test('add item button calls onChange with one item', () => {
    const onChange = jest.fn()
    render(<WorkForm value={[]} onChange={onChange} />)

    expect(screen.getByText('添加工作经历')).toBeInTheDocument()
    fireEvent.click(screen.getByText('添加工作经历'))
    expect(onChange).toHaveBeenCalled()
    const arg = onChange.mock.calls[0][0]
    expect(Array.isArray(arg)).toBe(true)
    expect(arg.length).toBe(1)
  })
})
