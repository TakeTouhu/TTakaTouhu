'use client';

interface Step {
  num: number;
  label: string;
}

interface Props {
  steps: Step[];
  currentStep: number;
}

export default function StepIndicator({ steps, currentStep }: Props) {
  const progress = ((currentStep - 1) / (steps.length - 1)) * 100;

  return (
    <div>
      {/* Progress bar */}
      <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
        <div
          className="bg-blue-600 h-2 rounded-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Step labels - show on md+ */}
      <div className="hidden md:flex justify-between">
        {steps.map((step) => {
          const isDone = step.num < currentStep;
          const isCurrent = step.num === currentStep;
          return (
            <div key={step.num} className="flex flex-col items-center gap-1">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                isDone
                  ? 'bg-blue-600 text-white'
                  : isCurrent
                    ? 'bg-blue-600 text-white ring-2 ring-blue-300'
                    : 'bg-gray-200 text-gray-500'
              }`}>
                {isDone ? '✓' : step.num}
              </div>
              <span className={`text-xs ${isCurrent ? 'text-blue-600 font-medium' : 'text-gray-500'}`}>
                {step.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Mobile: show current step info */}
      <div className="md:hidden flex items-center gap-2 text-sm">
        <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
          {currentStep}
        </span>
        <span className="font-medium text-blue-700">{steps[currentStep - 1]?.label}</span>
        <span className="text-gray-400">({currentStep}/{steps.length})</span>
      </div>
    </div>
  );
}
