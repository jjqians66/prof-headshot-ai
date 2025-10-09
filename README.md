# Professional Headshot AI

Transform any photo into a professional headshot in seconds using AI.

## 🚀 Quick Start

### Prerequisites
- Node.js installed (v18 or higher)
- Google API Key from [Google AI Studio](https://aistudio.google.com/app/apikey)

### Installation & Setup

1. **Clone or navigate to the project:**
```bash
cd /Users/jj/projects/prof_headshot
```

2. **Add your Google API Key:**
   - Open the `.env` file in the project root
   - Add your API key:
   ```
   GOOGLE_API_KEY=your_api_key_here
   ```

3. **Install frontend dependencies:**
```bash
npm install
```

4. **Install backend dependencies:**
```bash
cd server
npm install
cd ..
```

### Running the Application

You need **TWO terminal windows**:

**Terminal 1 - Frontend (React + Vite):**
```bash
cd /Users/jj/projects/prof_headshot
npm run dev
```
Open **http://localhost:5173**

**Terminal 2 - Backend (Express + Gemini API):**
```bash
cd /Users/jj/projects/prof_headshot/server
npm run dev
```
Running at **http://localhost:3001**

## ✨ Features

### Milestone 1 ✅
- ✅ Drag-and-drop file upload
- ✅ Image validation (JPEG, PNG, WEBP up to 10MB)
- ✅ Three professional headshot styles
- ✅ Progress indicator with step tracking
- ✅ Side-by-side comparison view
- ✅ Download generated headshot
- ✅ Fully responsive design
- ✅ Beautiful Tailwind CSS v3 styling

### Milestone 2 ✅
- ✅ Express backend server
- ✅ Google Gemini API integration
- ✅ Real image upload and processing
- ✅ Custom prompts for each style
- ✅ Image optimization with Sharp
- ✅ Error handling and validation
- ✅ Professional prompt engineering

## 🎨 Headshot Styles

### 1. Corporate Classic
Traditional business headshot with neutral background, professional attire, and conservative lighting. Perfect for LinkedIn profiles and corporate websites.

### 2. Creative Professional
Modern, approachable style with contemporary aesthetic. Ideal for designers, marketers, and tech professionals.

### 3. Executive Portrait
High-end, authoritative look with dramatic lighting. Designed for C-suite executives and senior leadership profiles.

## 🛠 Tech Stack

### Frontend
- React 18 with TypeScript
- Vite for fast development
- Tailwind CSS v3 for styling
- Responsive design

### Backend
- Node.js + Express
- Google Gemini AI SDK
- Multer for file uploads
- Sharp for image processing
- CORS and security middleware

## 📁 Project Structure

```
prof_headshot/
├── src/                    # Frontend React app
│   ├── components/         # UI components
│   ├── services/          # API client
│   └── types.ts           # TypeScript types
├── server/                # Backend Express server
│   ├── config/           # Prompts configuration
│   ├── routes/           # API endpoints
│   ├── services/         # Gemini & Image services
│   └── uploads/          # Temporary file storage
├── prompt.md             # AI prompt documentation
├── spec.md               # Project specification
└── README.md             # This file
```

## 🔧 API Endpoints

- `GET  /api/health` - Health check
- `GET  /api/styles` - Get available styles
- `POST /api/generate` - Generate headshot (multipart/form-data)

## 📝 Documentation

- **[SETUP_BACKEND.md](SETUP_BACKEND.md)** - Detailed backend setup guide
- **[prompt.md](prompt.md)** - AI prompts and prompt engineering guide
- **[spec.md](spec.md)** - Complete project specification

## 🎯 Usage

1. Open http://localhost:5173 in your browser
2. Upload a photo (drag-and-drop or click to browse)
3. Select your preferred style
4. Click "Generate Headshot"
5. View the side-by-side comparison
6. Download your professional headshot!

## ⚠️ Important Notes

### About Image Generation

The current implementation uses Google's Gemini Vision model. For full image-to-image transformation with Imagen API:
- Requires Google Cloud Project with billing enabled
- Need Imagen API access
- See [Google's Imagen Documentation](https://ai.google.dev/gemini-api/docs/image-generation)

The app currently demonstrates the complete workflow with real API integration, image processing, and prompt engineering.

## 🐛 Troubleshooting

### Backend won't start
- Ensure `GOOGLE_API_KEY` is set in `.env`
- Run `npm install` in the `/server` directory
- Check that port 3001 is available

### Frontend can't connect to backend
- Ensure both frontend and backend servers are running
- Check console for CORS errors
- Verify backend is running on port 3001

### File upload errors
- Check file size (max 10MB)
- Verify format (JPEG, PNG, WEBP only)
- Ensure uploads directory has write permissions

## 📄 License

See LICENSE file for details.

## 🙏 Acknowledgments

Built with Google Gemini AI, React, and Express.

