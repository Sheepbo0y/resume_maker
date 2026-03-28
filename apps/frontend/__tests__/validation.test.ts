import { isEmailValid, isPasswordStrong } from '../src/forms/validation'

describe('validation utilities', () => {
  test('valid email', () => {
    expect(isEmailValid('test@example.com')).toBe(true)
    expect(isEmailValid('not-an-email')).toBe(false)
  })
  test('password strength', () => {
    expect(isPasswordStrong('Abcdef12')).toBe(true)
    expect(isPasswordStrong('weak')).toBe(false)
  })
})
