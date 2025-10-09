import { GoogleGenerativeAI } from '@google/generative-ai';
import fs from 'fs';
import { getPromptForStyle } from '../config/prompts.js';

class GeminiService {
  constructor() {
    const apiKey = process.env.GOOGLE_API_KEY;
    if (!apiKey) {
      throw new Error('GOOGLE_API_KEY environment variable is not set. Please add it to your .env file.');
    }
    this.genAI = new GoogleGenerativeAI(apiKey);
    console.log('✓ Gemini Service initialized successfully');
  }

  /**
   * Convert image file to base64 for API
   */
  fileToGenerativePart(path, mimeType) {
    return {
      inlineData: {
        data: Buffer.from(fs.readFileSync(path)).toString('base64'),
        mimeType
      },
    };
  }

  /**
   * Generate professional headshot using Gemini 2.0 Flash with image generation
   */
  async generateHeadshot(imagePath, style, mimeType) {
    try {
      // Use Gemini 2.5 Flash with image generation capability
      const model = this.genAI.getGenerativeModel({ 
        model: 'gemini-2.5-flash-image',
        generationConfig: {
          temperature: 0.4,
          topP: 0.95,
          topK: 40,
          maxOutputTokens: 8192,
        },
      });

      // Get the appropriate prompt for the selected style
      const basePrompt = getPromptForStyle(style);
      
      // Enhanced prompt for image generation
      const prompt = `${basePrompt}

IMPORTANT: Generate a new professional headshot image based on the provided photo. The output should be a transformed professional headshot, not a description. Maintain facial features, ethnicity, and natural appearance while applying the professional styling described above.`;

      // Prepare the image part
      const imagePart = this.fileToGenerativePart(imagePath, mimeType);

      console.log(`Generating ${style} headshot with Gemini 2.5 Flash Image...`);
      console.log(`Using prompt: ${prompt.substring(0, 150)}...`);

      // Generate content with image and prompt
      const result = await model.generateContent([imagePart, prompt]);
      const response = await result.response;
      
      console.log('Gemini API response received');

      // Check if response contains generated image
      const candidates = response.candidates;
      if (candidates && candidates[0] && candidates[0].content && candidates[0].content.parts) {
        for (const part of candidates[0].content.parts) {
          // Check for inline image data
          if (part.inlineData && part.inlineData.mimeType && part.inlineData.mimeType.startsWith('image/')) {
            console.log('✓ Generated image found in response');
            return {
              success: true,
              imageData: part.inlineData.data,
              mimeType: part.inlineData.mimeType,
              note: 'Image generated successfully using Gemini 2.5 Flash Image'
            };
          }
        }
      }

      // If no image, return text response
      const text = response.text();
      console.log('Gemini text response:', text.substring(0, 200));
      
      return {
        success: true,
        text: text,
        note: 'Model returned text analysis instead of image. This may be a limitation of the current model.'
      };

    } catch (error) {
      console.error('Error generating headshot:', error);
      throw new Error(`Failed to generate headshot: ${error.message}`);
    }
  }

  /**
   * Generate headshot using Imagen API (direct REST call)
   * This is the correct approach for image generation
   */
  async generateHeadshotWithImagen(imagePath, style, mimeType) {
    try {
      const prompt = getPromptForStyle(style);
      const imageData = fs.readFileSync(imagePath);
      const base64Image = Buffer.from(imageData).toString('base64');

      // Call Google's Imagen API
      // Note: You'll need to use the REST API endpoint
      const response = await fetch(
        `https://aiplatform.googleapis.com/v1/projects/${process.env.GOOGLE_PROJECT_ID}/locations/us-central1/publishers/google/models/imagegeneration@006:predict`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${process.env.GOOGLE_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            instances: [{
              prompt: prompt,
              image: {
                bytesBase64Encoded: base64Image
              }
            }],
            parameters: {
              sampleCount: 1,
              aspectRatio: '3:4',
              mode: 'upscale'
            }
          })
        }
      );

      if (!response.ok) {
        throw new Error(`Imagen API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      return {
        success: true,
        image: data.predictions[0].bytesBase64Encoded,
        mimeType: 'image/png'
      };

    } catch (error) {
      console.error('Error calling Imagen API:', error);
      throw error;
    }
  }
}

export default GeminiService;

