// Load environment variables FIRST
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import cors from 'cors';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env file
const envPath = path.join(__dirname, '..', '.env');
console.log(`Loading .env from: ${envPath}`);
const result = dotenv.config({ path: envPath });

if (result.error) {
  console.error('❌ Error loading .env file:', result.error);
  console.error('Make sure .env file exists at:', envPath);
  process.exit(1);
}

console.log(`✓ .env file loaded successfully`);
console.log(`GOOGLE_API_KEY: ${process.env.GOOGLE_API_KEY ? 'SET ✓' : 'NOT SET ✗'}`);

if (!process.env.GOOGLE_API_KEY) {
  console.error('❌ GOOGLE_API_KEY is not set in .env file');
  console.error('Please add: GOOGLE_API_KEY=your_api_key_here');
  process.exit(1);
}

const app = express();
const PORT = process.env.PORT || 3001;

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
  console.log('Created uploads directory');
}

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174'],
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Request logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Dynamically import routes AFTER env is loaded
const { default: apiRoutes } = await import('./routes/api.js');
app.use('/api', apiRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Professional Headshot AI - Backend Server',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      generate: 'POST /api/generate',
      styles: '/api/styles'
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    error: err.message || 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// Start server
app.listen(PORT, () => {
  console.log('🚀 Professional Headshot AI Backend Server');
  console.log(`📡 Server running on http://localhost:${PORT}`);
  console.log(`🔑 Google API Key configured: ${!!process.env.GOOGLE_API_KEY}`);
  console.log(`📁 Uploads directory: ${uploadsDir}`);
  console.log('\nAvailable endpoints:');
  console.log(`  - GET  http://localhost:${PORT}/`);
  console.log(`  - GET  http://localhost:${PORT}/api/health`);
  console.log(`  - GET  http://localhost:${PORT}/api/styles`);
  console.log(`  - POST http://localhost:${PORT}/api/generate`);
});

export default app;

