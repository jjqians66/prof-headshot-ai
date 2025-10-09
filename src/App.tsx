import { useState } from 'react';
import { AppState, HeadshotStyle } from './types';
import ProgressSteps from './components/ProgressSteps';
import UploadComponent from './components/UploadComponent';
import StyleSelection from './components/StyleSelection';
import LoadingState from './components/LoadingState';
import ComparisonView from './components/ComparisonView';
import { generateHeadshot } from './services/api';

function App() {
  const [state, setState] = useState<AppState>({
    step: 'upload',
    uploadedImage: null,
    uploadedFileName: null,
    selectedStyle: null,
    generatedImage: null,
    isProcessing: false,
    error: null,
  });
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const handleImageUpload = (imageUrl: string, fileName: string, file: File) => {
    setState((prev) => ({
      ...prev,
      uploadedImage: imageUrl,
      uploadedFileName: fileName,
      step: 'style',
      error: null,
    }));
    setUploadedFile(file);
  };

  const handleStyleSelect = (style: HeadshotStyle) => {
    setState((prev) => ({
      ...prev,
      selectedStyle: style,
      error: null,
    }));
  };

  const handleGenerate = async () => {
    if (!state.selectedStyle || !uploadedFile) return;

    setState((prev) => ({
      ...prev,
      step: 'processing',
      isProcessing: true,
      error: null,
    }));

    try {
      // Call real API
      const result = await generateHeadshot({
        image: uploadedFile,
        style: state.selectedStyle,
      });

      setState((prev) => ({
        ...prev,
        step: 'comparison',
        isProcessing: false,
        generatedImage: result.generatedImage,
      }));
    } catch (error) {
      setState((prev) => ({
        ...prev,
        step: 'style',
        isProcessing: false,
        error: error instanceof Error ? error.message : 'Failed to generate headshot',
      }));
    }
  };

  const handleReset = () => {
    setState({
      step: 'upload',
      uploadedImage: null,
      uploadedFileName: null,
      selectedStyle: null,
      generatedImage: null,
      isProcessing: false,
      error: null,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 py-12">
      <div className="container mx-auto">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-3 tracking-tight">
            HeadshotPro AI
          </h1>
          <p className="text-indigo-100 text-lg">
            Transform any photo into a professional headshot in seconds
          </p>
        </header>

        {/* Progress Steps */}
        <ProgressSteps currentStep={state.step} />

        {/* Main Content */}
        <main className="mt-12">
          {state.step === 'upload' && (
            <UploadComponent onImageUpload={handleImageUpload} />
          )}

          {state.step === 'style' && (
            <StyleSelection
              selectedStyle={state.selectedStyle}
              onStyleSelect={handleStyleSelect}
              onGenerate={handleGenerate}
            />
          )}

          {state.step === 'processing' && <LoadingState />}

          {state.step === 'comparison' && state.generatedImage && state.uploadedImage && (
            <ComparisonView
              originalImage={state.uploadedImage}
              generatedImage={state.generatedImage}
              originalFileName={state.uploadedFileName || 'photo'}
              onReset={handleReset}
            />
          )}
        </main>

        {/* Error Display */}
        {state.error && (
          <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50">
            <div className="bg-red-500 text-white px-6 py-4 rounded-full shadow-2xl flex items-center space-x-3">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>{state.error}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

