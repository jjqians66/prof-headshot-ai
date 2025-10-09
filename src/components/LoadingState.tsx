import React from 'react';

const LoadingState: React.FC = () => {
  return (
    <div className="w-full max-w-2xl mx-auto px-4">
      <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-12">
        <div className="flex flex-col items-center space-y-6">
          {/* Spinner */}
          <div className="relative">
            <div className="w-20 h-20 border-4 border-indigo-200 rounded-full"></div>
            <div className="absolute top-0 left-0 w-20 h-20 border-4 border-indigo-600 rounded-full border-t-transparent animate-spin"></div>
          </div>

          {/* Text */}
          <div className="text-center space-y-2">
            <h3 className="text-2xl font-bold text-gray-800">
              Creating Your Professional Headshot
            </h3>
            <p className="text-gray-600">
              This may take a few moments. Please wait...
            </p>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 h-full rounded-full animate-pulse"></div>
          </div>

          {/* Tips */}
          <div className="mt-6 p-4 bg-indigo-50 rounded-lg">
            <p className="text-sm text-indigo-700 text-center">
              💡 <strong>Tip:</strong> Your headshot will maintain your facial features while
              applying professional styling and lighting
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingState;

