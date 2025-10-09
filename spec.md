# Professional Headshot AI - Specification Document

## Overview

A web application that transforms casual photos into professional headshots using Google's Gemini image-to-image API. Users can upload a photo, select from three professional styles, and receive AI-generated headshots with side-by-side comparison capabilities.

---

## Requirements

### Functional Requirements

#### 1. Image Upload
- Support common image formats (JPEG, PNG, WEBP)
- Maximum file size: 10MB
- Image validation and error handling
- Preview of uploaded image before processing

#### 2. Style Selection
Users can choose from three professional headshot styles:
- **Corporate Classic**: Traditional business headshot with neutral background, professional attire, and conservative lighting
- **Creative Professional**: Modern, approachable style with softer lighting and contemporary aesthetic
- **Executive Portrait**: High-end, authoritative look with dramatic lighting and formal presentation

#### 3. Image Generation
- Integration with Google Gemini API for image-to-image transformation
- Clear loading states during generation process
- Error handling for API failures
- Generation time estimation (where possible)

#### 4. Comparison View
- Side-by-side display of original vs. generated headshot
- Synchronized zoom/pan controls (optional enhancement)
- Toggle between original and generated view
- Download generated headshot functionality

### Non-Functional Requirements

#### Performance
- Image upload response time: < 2 seconds
- Total generation time: < 30 seconds (API dependent)
- Smooth UI interactions and transitions

#### Usability
- Clean, intuitive interface
- Mobile-responsive design
- Clear feedback for all user actions
- Accessible design (WCAG 2.1 AA compliance)

#### Security
- Secure API key management (server-side only)
- Input validation and sanitization
- No storage of user images after session ends
- HTTPS for all communications

---

## Tech Stack

### Frontend
- **Framework**: React 18+ with TypeScript
- **Styling**: Tailwind CSS v3 (instead of v4 )
- **State Management**: React Context API or Zustand
- **HTTP Client**: Axios or Fetch API
- **UI Components**: Headless UI or Radix UI for accessible components

### Backend
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript
- **Image Processing**: Sharp (for validation and optimization)
- **File Upload**: Multer middleware
- **Environment Management**: dotenv

### API Integration
- **Google Gemini API**: Image-to-image generation
  - Documentation: https://ai.google.dev/gemini-api/docs/image-generation
  - Model: Imagen 3 or latest available image generation model

### Development Tools
- **Build Tool**: Vite or Create React App
- **Package Manager**: npm or pnpm
- **Code Quality**: ESLint + Prettier
- **Version Control**: Git

### Deployment (Optional for MVP)
- **Frontend Hosting**: Vercel or Netlify
- **Backend Hosting**: Railway, Render, or Google Cloud Run
- **Storage**: Temporary file system or cloud storage (GCS) for image caching

---

## Milestones

### Milestone 1: UI Setup and Frontend Development

**Goal**: Create a fully functional frontend with mock data/API responses

**Tasks**:
1. **Project Initialization**
   - Set up React + TypeScript project
   - Configure Tailwind CSS v3
   - Set up project structure and routing

2. **Upload Component**
   - Implement drag-and-drop file upload
   - Add file validation (type, size)
   - Create image preview functionality
   - Design upload UI with clear call-to-action

3. **Style Selection Interface**
   - Create three style option cards with:
     - Style name and description
     - Representative thumbnail/icon
     - Selection state indication
   - Implement single-selection logic
   - Design hover and selected states

4. **Comparison View**
   - Build side-by-side image comparison layout
   - Implement responsive design (stacked on mobile)
   - Add download button for generated image
   - Create "Generate Another" reset functionality

5. **UI Polish**
   - Add loading states and skeleton screens
   - Implement error message displays
   - Create smooth transitions between states
   - Ensure mobile responsiveness

**Deliverables**:
- Fully functional frontend with mock workflow
- Responsive design across devices
- Component library with reusable UI elements
- Basic error handling UI

**Success Criteria**:
- User can upload an image and see preview
- User can select a style option
- User can navigate through the entire flow with mock data
- UI is responsive on mobile, tablet, and desktop

---

### Milestone 2: Backend Integration with Google Gemini API

**Goal**: Integrate real AI image generation and complete the full application flow

**Tasks**:
1. **Backend Setup**
   - Initialize Express.js server with TypeScript
   - Set up Multer for file upload handling
   - Configure CORS and security middleware
   - Implement environment variable management

2. **Google Gemini API Integration**
   - Set up Google Cloud project and API credentials
   - Implement API client for Gemini image generation
   - Create style-specific prompts for each headshot type:
     - **Corporate Classic**: "Professional corporate headshot with neutral gray background, business formal attire, soft even lighting, frontal pose, confident expression"
     - **Creative Professional**: "Modern professional portrait with soft bokeh background, business casual attire, natural warm lighting, slight angle, approachable expression"
     - **Executive Portrait**: "Executive leadership portrait with dramatic lighting, formal business attire, dark background, authoritative pose, confident and commanding presence"
   - Handle API responses and errors

3. **API Endpoints**
   - `POST /api/upload`: Receive and validate image upload
   - `POST /api/generate`: Process image with selected style
   - `GET /api/status/:id`: Check generation status (if async)
   - Error handling and validation for all endpoints

4. **Image Processing Pipeline**
   - Validate and optimize uploaded images
   - Prepare images for Gemini API (format, size requirements)
   - Process API response and return generated image
   - Implement temporary file cleanup

5. **Frontend-Backend Connection**
   - Replace mock API calls with real endpoints
   - Implement proper error handling from backend
   - Add retry logic for failed requests
   - Display API-specific error messages to users

6. **Testing and Optimization**
   - Test with various image types and sizes
   - Optimize image processing pipeline
   - Test all three style generations
   - Implement rate limiting if needed

**Deliverables**:
- Fully functional backend API
- Working integration with Google Gemini API
- Complete end-to-end image generation flow
- Error handling and edge case management

**Success Criteria**:
- Users can upload real photos and receive generated headshots
- All three styles produce distinct, high-quality results
- Error states are handled gracefully
- Complete application flow works end-to-end
- API keys and sensitive data are secured

---

## Future Enhancements (Post-MVP)

1. **User Accounts**: Save generated headshots and history
2. **Batch Processing**: Upload multiple photos at once
3. **Fine-tuning Controls**: Adjust lighting, background, expression
4. **Custom Styles**: Allow users to describe custom style preferences
5. **Before/After Slider**: Interactive comparison tool
6. **Social Sharing**: Share generated headshots directly
7. **Image History**: View and download previously generated images
8. **Advanced Editing**: Crop, rotate, and adjust images before generation

---

## API Reference

### Google Gemini Image Generation API

**Endpoint**: As per Google AI documentation  
**Documentation**: https://ai.google.dev/gemini-api/docs/image-generation

**Key Parameters**:
- `prompt`: Text description of desired output (includes style-specific details)
- `reference_image`: Input image (user's photo)
- `num_images`: Number of variations to generate (default: 1)
- `aspect_ratio`: Output aspect ratio (portrait for headshots)

**Example Request Structure**:
```javascript
{
  "prompt": "Professional corporate headshot with neutral background...",
  "referenceImage": "<base64_encoded_image>",
  "numberOfImages": 1,
  "aspectRatio": "3:4"
}
```

---

## Success Metrics

1. **User Experience**: > 90% successful completion rate from upload to download
2. **Performance**: < 30 second total processing time
3. **Quality**: User satisfaction with generated headshots (qualitative feedback)
4. **Reliability**: < 5% API error rate

---

## Project Timeline

- **Milestone 1**: 1-2 weeks
- **Milestone 2**: 1-2 weeks
- **Testing & Polish**: 3-5 days

**Total Estimated Time**: 3-4 weeks


