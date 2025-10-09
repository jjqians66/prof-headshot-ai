export type HeadshotStyle = 'corporate' | 'creative' | 'executive';

export interface StyleOption {
  id: HeadshotStyle;
  name: string;
  description: string;
  features: string[];
}

export type AppStep = 'upload' | 'style' | 'processing' | 'comparison';

export interface AppState {
  step: AppStep;
  uploadedImage: string | null;
  uploadedFileName: string | null;
  selectedStyle: HeadshotStyle | null;
  generatedImage: string | null;
  isProcessing: boolean;
  error: string | null;
}

