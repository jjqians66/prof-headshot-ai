import React from 'react';
import { HeadshotStyle, StyleOption } from '../types';

interface StyleSelectionProps {
  selectedStyle: HeadshotStyle | null;
  onStyleSelect: (style: HeadshotStyle) => void;
  onGenerate: () => void;
}

const styleOptions: StyleOption[] = [
  {
    id: 'corporate',
    name: 'Corporate Classic',
    description: 'Traditional business headshot with neutral background',
    features: ['Neutral background', 'Professional attire', 'Conservative lighting'],
  },
  {
    id: 'creative',
    name: 'Creative Professional',
    description: 'Modern, approachable style with contemporary aesthetic',
    features: ['Soft lighting', 'Business casual', 'Approachable feel'],
  },
  {
    id: 'executive',
    name: 'Executive Portrait',
    description: 'High-end, authoritative look with dramatic lighting',
    features: ['Dramatic lighting', 'Formal presentation', 'Authoritative pose'],
  },
];

const StyleSelection: React.FC<StyleSelectionProps> = ({
  selectedStyle,
  onStyleSelect,
  onGenerate,
}) => {
  return (
    <div className="w-full max-w-5xl mx-auto px-4">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">
          Choose Your Headshot Style
        </h2>
        <p className="text-indigo-100">
          Select the professional style that best suits your needs
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {styleOptions.map((style) => (
          <div
            key={style.id}
            onClick={() => onStyleSelect(style.id)}
            className={`
              relative bg-white rounded-2xl p-6 cursor-pointer transition-all duration-300
              border-3 ${
                selectedStyle === style.id
                  ? 'border-indigo-600 shadow-2xl scale-105 ring-4 ring-indigo-300'
                  : 'border-transparent shadow-lg hover:shadow-xl hover:scale-102'
              }
            `}
          >
            {selectedStyle === style.id && (
              <div className="absolute -top-3 -right-3 w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center shadow-lg">
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            )}

            <div className="flex flex-col h-full">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-indigo-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>

              <h3 className="text-xl font-bold text-gray-800 mb-2">
                {style.name}
              </h3>
              <p className="text-gray-600 text-sm mb-4 flex-grow">
                {style.description}
              </p>

              <ul className="space-y-2">
                {style.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-sm text-gray-700">
                    <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full mr-2"></span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center">
        <button
          onClick={onGenerate}
          disabled={!selectedStyle}
          className={`
            px-10 py-4 rounded-full font-semibold text-lg transition-all duration-300
            ${
              selectedStyle
                ? 'bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow-2xl hover:scale-105'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }
          `}
        >
          Generate Headshot
        </button>
      </div>
    </div>
  );
};

export default StyleSelection;

