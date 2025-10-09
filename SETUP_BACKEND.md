# Backend Setup Guide - Milestone 2

This guide will help you set up the backend server with Google Gemini API integration.

## Prerequisites

- Node.js installed (you already have this!)
- Google API Key from Google AI Studio

## Step 1: Get Your Google API Key

1. Visit **https://aistudio.google.com/app/apikey**
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy your API key

## Step 2: Configure Environment Variables

1. Open the `.env` file in the project root (`/Users/jj/projects/prof_headshot/.env`)
2. Add your Google API key:

```env
GOOGLE_API_KEY=your_api_key_here
```

**Important:** Replace `your_api_key_here` with your actual API key from Step 1.

## Step 3: Install Backend Dependencies

Open a new terminal and run:

```bash
cd /Users/jj/projects/prof_headshot/server
npm install
```

This will install:
- `express` - Web server framework
- `@google/generative-ai` - Google Gemini AI SDK
- `multer` - File upload handling
- `sharp` - Image processing
- `cors` - Cross-origin requests
- `dotenv` - Environment variable management

## Step 4: Start the Backend Server

```bash
npm run dev
```

The server will start on **http://localhost:3001**

You should see:
```
🚀 Professional Headshot AI Backend Server
📡 Server running on http://localhost:3001
🔑 Google API Key configured: true
```

## Step 5: Test the API

Open a new terminal and test the health endpoint:

```bash
curl http://localhost:3001/api/health
```

You should get a response like:
```json
{
  "status": "healthy",
  "timestamp": "2025-10-09T...",
  "apiKeyConfigured": true
}
```

## Running Both Frontend and Backend

You need **two terminal windows**:

**Terminal 1 - Frontend:**
```bash
cd /Users/jj/projects/prof_headshot
npm run dev
```
Access at: **http://localhost:5173**

**Terminal 2 - Backend:**
```bash
cd /Users/jj/projects/prof_headshot/server
npm run dev
```
Running at: **http://localhost:3001**

## API Endpoints

### Health Check
```
GET http://localhost:3001/api/health
```

### Get Available Styles
```
GET http://localhost:3001/api/styles
```

### Generate Headshot
```
POST http://localhost:3001/api/generate
Content-Type: multipart/form-data

Body:
- image: (file)
- style: corporate | creative | executive
```

## Troubleshooting

### "GOOGLE_API_KEY is not set"
- Make sure you created the `.env` file in the project root
- Ensure the key is named exactly `GOOGLE_API_KEY`
- Restart the backend server after adding the key

### "Error: Cannot find module"
- Run `npm install` in the `/server` directory
- Make sure you're in the correct directory

### CORS errors
- The backend is configured to accept requests from localhost:5173
- Make sure both servers are running

### File upload errors
- Max file size is 10MB
- Supported formats: JPEG, PNG, WEBP
- Check the uploads directory has write permissions

## Important Notes

### About Image Generation

The current implementation uses Google's Gemini vision model to analyze images. For full image-to-image transformation, you would need:

1. **Google Cloud Project** with billing enabled
2. **Imagen API** access (requires Google Cloud setup)
3. Update the `geminiService.js` to use Imagen endpoints

For now, the app demonstrates the full workflow with:
- Real file uploads
- Image validation and processing
- API integration structure
- Professional prompt engineering

The generated image is currently a processed version of the original. To get real AI transformations, follow Google's Imagen API documentation:
https://ai.google.dev/gemini-api/docs/image-generation

## Project Structure

```
server/
├── config/
│   └── prompts.js          # Style-specific prompts
├── routes/
│   └── api.js              # API endpoints
├── services/
│   ├── geminiService.js    # Google AI integration
│   └── imageService.js     # Image processing
├── uploads/                # Temporary file storage
├── package.json
└── server.js              # Main server file
```

## Next Steps

Once everything is running:
1. Open http://localhost:5173 in your browser
2. Upload a photo
3. Select a style
4. Click "Generate Headshot"
5. See the result with side-by-side comparison!

Enjoy your Professional Headshot AI app! 🚀

