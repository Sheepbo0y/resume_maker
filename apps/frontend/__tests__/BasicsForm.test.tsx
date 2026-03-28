import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import BasicsForm from '../src/forms/BasicsForm'
import { Basics } from '../src/forms/types'

describe('BasicsForm', () => {
  test('renders fields and notifies onChange when value changes', () => {
    const initial: Basics = { name: '' }
    const onChange = jest.fn()
    render(<BasicsForm value={initial} onChange={onChange} />)

    const nameInput = screen.getByLabelText(/姓名/i) as HTMLInputElement
    expect(nameInput).toBeInTheDocument()

    fireEvent.change(nameInput, { target: { value: 'Alice' } })
    expect(onChange).toHaveBeenCalled()
    // verify the updated object shape
    const updatedArg = onChange.mock.calls[0][0] as Basics
    expect(updatedArg.name).toBe('Alice')
  })
})
