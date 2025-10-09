import React, { useState } from 'react';

interface ComparisonViewProps {
  originalImage: string;
  generatedImage: string;
  originalFileName: string;
  onReset: () => void;
}

const ComparisonView: React.FC<ComparisonViewProps> = ({
  originalImage,
  generatedImage,
  originalFileName,
  onReset,
}) => {
  const [showComparison, setShowComparison] = useState(true);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = generatedImage;
    link.download = `professional-headshot-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">
          Your Professional Headshot
        </h2>
        <p className="text-indigo-100">
          Here's your transformed image
        </p>
      </div>

      <div className="flex justify-center mb-6">
        <button
          onClick={() => setShowComparison(!showComparison)}
          className="flex items-center space-x-2 px-4 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white rounded-full transition-all duration-300"
        >
          <svg
            className={`w-4 h-4 transition-transform ${showComparison ? '' : 'rotate-180'}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
          <span>{showComparison ? 'Hide' : 'Show'} Comparison</span>
        </button>
      </div>

      <div className={`grid ${showComparison ? 'md:grid-cols-2' : 'md:grid-cols-1'} gap-6 mb-8`}>
        {showComparison && (
          <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden">
            <div className="absolute top-4 left-4 z-10">
              <span className="px-4 py-2 bg-gray-700 text-white text-sm font-semibold rounded-full shadow-lg">
                Before
              </span>
            </div>
            <div className="aspect-[3/4] relative">
              <img
                src={originalImage}
                alt="Original photo"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        )}

        <div className={`relative bg-white rounded-3xl shadow-2xl overflow-hidden ${!showComparison ? 'mx-auto max-w-2xl' : ''}`}>
          <div className="absolute top-4 left-4 z-10">
            <span className="px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-full shadow-lg">
              After
            </span>
          </div>
          <div className="aspect-[3/4] relative">
            <img
              src={generatedImage}
              alt="Professional headshot"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
        <button
          onClick={handleDownload}
          className="flex items-center space-x-2 px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full font-semibold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
        >
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
              d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <span>Download Headshot</span>
        </button>

        <button
          onClick={onReset}
          className="px-8 py-4 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105"
        >
          Generate Another
        </button>
      </div>
    </div>
  );
};

export default ComparisonView;

