import React from 'react';
import { AppStep } from '../types';

interface ProgressStepsProps {
  currentStep: AppStep;
}

const steps = [
  { id: 'upload' as AppStep, label: 'Upload', number: 1 },
  { id: 'style' as AppStep, label: 'Style', number: 2 },
  { id: 'comparison' as AppStep, label: 'Result', number: 3 },
];

const ProgressSteps: React.FC<ProgressStepsProps> = ({ currentStep }) => {
  const getCurrentStepIndex = () => {
    if (currentStep === 'upload') return 0;
    if (currentStep === 'style') return 1;
    if (currentStep === 'processing' || currentStep === 'comparison') return 2;
    return 0;
  };

  const currentIndex = getCurrentStepIndex();

  return (
    <div className="flex items-center justify-center space-x-4 mb-12">
      {steps.map((step, index) => {
        const isCompleted = index < currentIndex;
        const isCurrent = index === currentIndex;
        const isUpcoming = index > currentIndex;

        return (
          <React.Fragment key={step.id}>
            {/* Step Circle */}
            <div className="flex flex-col items-center">
              <div
                className={`
                  w-12 h-12 rounded-full flex items-center justify-center font-semibold text-base
                  transition-all duration-300
                  ${
                    isCompleted
                      ? 'bg-indigo-600 text-white shadow-lg scale-100'
                      : isCurrent
                      ? 'bg-indigo-600 text-white shadow-xl scale-110 ring-4 ring-indigo-300'
                      : 'bg-white/30 backdrop-blur-sm text-white'
                  }
                `}
              >
                {isCompleted ? (
                  <svg
                    className="w-6 h-6"
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
                ) : (
                  step.number
                )}
              </div>
              <span
                className={`
                  mt-2 text-sm font-medium transition-all duration-300
                  ${isCurrent || isCompleted ? 'text-white' : 'text-indigo-200'}
                `}
              >
                {step.label}
              </span>
            </div>

            {/* Connector Line */}
            {index < steps.length - 1 && (
              <div
                className={`
                  h-1 w-16 rounded-full transition-all duration-500
                  ${isCompleted ? 'bg-indigo-600' : 'bg-white/30'}
                `}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default ProgressSteps;

