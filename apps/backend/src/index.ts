import express from 'express';
import pdfRoutes from './routes/pdfRoutes';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json({ limit: '10mb' }));
app.use('/api/pdf', pdfRoutes);

// Basic health check endpoint
app.get('/health', (req, res) => res.json({ status: 'ok' }));

// Global error handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Backend PDF service listening on port ${PORT}`);
});
