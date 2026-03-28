import { exportPDF } from '../../src/controllers/pdfController'

// Mock dependencies
jest.mock('../../src/services/templateRenderer', () => ({ renderTemplate: jest.fn(() => '<html/>') }))
jest.mock('../../src/services/pdfService', () => ({ default: { generatePDF: jest.fn().mockResolvedValue(Buffer.from('PDF')) } }))

describe('pdfController', () => {
  test('returns 400 when resume is missing', async () => {
    const req: any = { body: {} }
    const res: any = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      setHeader: jest.fn(),
      send: jest.fn(),
    }
    // @ts-ignore
    await exportPDF(req, res)
    expect(res.status).toHaveBeenCalledWith(400)
  })
  test('exports pdf when resume is provided', async () => {
    const req: any = { body: { resume: { basics: { name: 'Test' } } } }
    const res: any = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      setHeader: jest.fn(),
      send: jest.fn(),
    }
    await exportPDF(req, res)
    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.setHeader).toHaveBeenCalled()
    expect(res.send).toHaveBeenCalled()
  })
})
