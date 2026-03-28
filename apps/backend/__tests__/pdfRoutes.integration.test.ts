import express from 'express'
import pdfRoutes from '../../src/routes/pdfRoutes'
import request from 'supertest'
import PdfService from '../../src/services/pdfService'
jest.mock('../../src/services/pdfService', () => ({ default: { generatePDF: jest.fn().mockResolvedValue(Buffer.from('PDF')) } }))
jest.mock('../../src/services/templateRenderer', () => ({ renderTemplate: jest.fn(() => '<html/>') }))

describe('PDF routes integration', () => {
  let app: express.Express
  beforeAll(() => {
    app = express()
    app.use(express.json())
    // mount API
    app.use('/api/pdf', pdfRoutes)
  })

  test('POST /api/pdf/export succeeds with valid data', async () => {
    const res = await request(app)
      .post('/api/pdf/export')
      .send({ resume: { basics: { name: 'Test' } }, template: 'ClassicProfessional' })
      .set('Accept', 'application/pdf')
    expect(res.statusCode).toBe(200)
    expect(Buffer.isBuffer(res.body)).toBe(true)
  })
})
