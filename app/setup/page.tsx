'use client';

import { WizardProvider } from '@/lib/store';
import WizardContainer from '@/components/wizard/WizardContainer';

export default function SetupPage() {
  return (
    <WizardProvider>
      <WizardContainer />
    </WizardProvider>
  );
}
