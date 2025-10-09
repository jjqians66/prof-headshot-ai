const API_BASE_URL = 'http://localhost:3001/api';

export interface GenerateHeadshotRequest {
  image: File;
  style: 'corporate' | 'creative' | 'executive';
}

export interface GenerateHeadshotResponse {
  success: boolean;
  message: string;
  style: string;
  generatedImage: string;
  note?: string;
  aiAnalysis?: string;
}

export interface ApiError {
  error: string;
  message: string;
}

/**
 * Generate professional headshot
 */
export const generateHeadshot = async (
  request: GenerateHeadshotRequest
): Promise<GenerateHeadshotResponse> => {
  try {
    const formData = new FormData();
    formData.append('image', request.image);
    formData.append('style', request.style);

    const response = await fetch(`${API_BASE_URL}/generate`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorData: ApiError = await response.json();
      throw new Error(errorData.message || 'Failed to generate headshot');
    }

    const data: GenerateHeadshotResponse = await response.json();
    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

/**
 * Check API health
 */
export const checkHealth = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/health`);
    if (!response.ok) {
      throw new Error('API health check failed');
    }
    return await response.json();
  } catch (error) {
    console.error('Health check error:', error);
    throw error;
  }
};

/**
 * Get available styles
 */
export const getStyles = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/styles`);
    if (!response.ok) {
      throw new Error('Failed to fetch styles');
    }
    return await response.json();
  } catch (error) {
    console.error('Get styles error:', error);
    throw error;
  }
};

