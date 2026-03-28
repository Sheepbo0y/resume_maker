import { authMiddleware } from '../../src/middleware/auth'
import { Request, Response, NextFunction } from 'express'

describe('authMiddleware', () => {
  test('calls next when no secret configured (development mode)', () => {
    const req: any = { headers: {} }
    const res: any = {}
    const next = jest.fn()
    process.env.JWT_SECRET = ''
    // @ts-ignore
    authMiddleware(req as Request, res as Response, next as NextFunction)
    expect(next).toHaveBeenCalled()
  })
})
