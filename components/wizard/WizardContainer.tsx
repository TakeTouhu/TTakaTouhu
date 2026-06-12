'use client';

import { useWizard } from '@/lib/store';
import StepIndicator from './StepIndicator';
import Step1BasicInfo from './steps/Step1BasicInfo';
import Step2Officers from './steps/Step2Officers';
import Step3Shares from './steps/Step3Shares';
import Step4BusinessPurpose from './steps/Step4BusinessPurpose';
import Step5Address from './steps/Step5Address';
import Step6Review from './steps/Step6Review';
import Step7Generate from './steps/Step7Generate';
import Link from 'next/link';

const STEPS = [
  { num: 1, label: '基本情報' },
  { num: 2, label: '役員情報' },
  { num: 3, label: '株式情報' },
  { num: 4, label: '事業目的' },
  { num: 5, label: '本店所在地' },
  { num: 6, label: '内容確認' },
  { num: 7, label: '定款出力' },
];

export default function WizardContainer() {
  const { state, resetState } = useWizard();
  const { currentStep } = state;

  const renderStep = () => {
    switch (currentStep) {
      case 1: return <Step1BasicInfo />;
      case 2: return <Step2Officers />;
      case 3: return <Step3Shares />;
      case 4: return <Step4BusinessPurpose />;
      case 5: return <Step5Address />;
      case 6: return <Step6Review />;
      case 7: return <Step7Generate />;
      default: return <Step1BasicInfo />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">定</div>
            <span className="font-bold text-lg text-gray-900">定款作成くん</span>
          </Link>
          <button
            onClick={() => {
              if (confirm('入力内容をリセットしますか？')) {
                resetState();
              }
            }}
            className="text-sm text-gray-500 hover:text-red-500 transition-colors"
          >
            最初からやり直す
          </button>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-6">
        <StepIndicator steps={STEPS} currentStep={currentStep} />
        <div className="mt-6">
          {renderStep()}
        </div>
      </div>
    </div>
  );
}
