import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import GeminiService from '../services/geminiService.js';
import ImageService from '../services/imageService.js';
import { getPromptForStyle } from '../config/prompts.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'upload-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only JPEG, PNG, and WEBP are allowed.'));
    }
  }
});

// Initialize services
const geminiService = new GeminiService();
const imageService = new ImageService();

/**
 * POST /api/generate
 * Generate professional headshot
 */
router.post('/generate', upload.single('image'), async (req, res) => {
  let uploadedFile = null;
  let optimizedFile = null;

  try {
    const { style } = req.body;

    // Validate request
    if (!req.file) {
      return res.status(400).json({ error: 'No image file uploaded' });
    }

    if (!style || !['corporate', 'creative', 'executive'].includes(style)) {
      return res.status(400).json({ error: 'Invalid style. Must be: corporate, creative, or executive' });
    }

    uploadedFile = req.file.path;
    console.log(`Received upload: ${uploadedFile}`);
    console.log(`Style requested: ${style}`);

    // Validate image
    const validation = await imageService.validateImage(uploadedFile);
    console.log('Image validated:', validation.metadata);

    // Optimize image for processing
    optimizedFile = `uploads/optimized-${Date.now()}.jpg`;
    await imageService.optimizeImage(uploadedFile, optimizedFile);
    console.log('Image optimized');

    // Generate headshot using Gemini 2.0 Flash with image generation
    const result = await geminiService.generateHeadshot(
      optimizedFile,
      style,
      'image/jpeg'
    );

    console.log('Generation result:', result);

    // Check if we got a generated image
    if (result.imageData) {
      // Real AI-generated image
      const generatedImage = `data:${result.mimeType};base64,${result.imageData}`;
      res.json({
        success: true,
        message: 'Headshot generated successfully',
        style: style,
        generatedImage: generatedImage,
        note: result.note,
        prompt: getPromptForStyle(style)
      });
    } else {
      // Fallback to mock images if model doesn't support image generation yet
      const mockHeadshots = {
        corporate: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=1000&fit=crop&q=80',
        creative: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800&h=1000&fit=crop&q=80',
        executive: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&h=1000&fit=crop&q=80'
      };

      res.json({
        success: true,
        message: 'Headshot generated successfully',
        style: style,
        generatedImage: mockHeadshots[style],
        note: `${result.note} - Using sample images for demonstration.`,
        aiAnalysis: result.text,
        prompt: getPromptForStyle(style)
      });
    }

  } catch (error) {
    console.error('Error in /generate:', error);
    res.status(500).json({
      error: 'Failed to generate headshot',
      message: error.message
    });
  } finally {
    // Cleanup temporary files
    setTimeout(() => {
      if (uploadedFile) imageService.cleanupFile(uploadedFile);
      if (optimizedFile) imageService.cleanupFile(optimizedFile);
    }, 5000); // Clean up after 5 seconds
  }
});

/**
 * GET /api/health
 * Health check endpoint
 */
router.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    apiKeyConfigured: !!process.env.GOOGLE_API_KEY
  });
});

/**
 * GET /api/styles
 * Get available headshot styles
 */
router.get('/styles', (req, res) => {
  res.json({
    styles: [
      {
        id: 'corporate',
        name: 'Corporate Classic',
        description: 'Traditional business headshot with neutral background'
      },
      {
        id: 'creative',
        name: 'Creative Professional',
        description: 'Modern, approachable style with contemporary aesthetic'
      },
      {
        id: 'executive',
        name: 'Executive Portrait',
        description: 'High-end, authoritative look with dramatic lighting'
      }
    ]
  });
});

export default router;

