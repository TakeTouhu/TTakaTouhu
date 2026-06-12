'use client';

import { createContext, useContext, useState, useEffect, ReactNode, createElement } from 'react';
import { WizardState, BusinessPurpose } from './types';

const STORAGE_KEY = 'kaisha_setsuritsu_wizard';

const defaultState: WizardState = {
  currentStep: 1,
  basicInfo: {},
  officerInfo: { directors: [] },
  shareInfo: {},
  businessPurposes: [],
  addressInfo: {},
};

interface WizardContextType {
  state: WizardState;
  updateBasicInfo: (data: Partial<WizardState['basicInfo']>) => void;
  updateOfficerInfo: (data: Partial<WizardState['officerInfo']>) => void;
  updateShareInfo: (data: Partial<WizardState['shareInfo']>) => void;
  updateBusinessPurposes: (purposes: BusinessPurpose[]) => void;
  updateAddressInfo: (data: Partial<WizardState['addressInfo']>) => void;
  setStep: (step: number) => void;
  resetState: () => void;
}

export const WizardContext = createContext<WizardContextType | null>(null);

export function WizardProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<WizardState>(defaultState);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setState(JSON.parse(saved));
      }
    } catch {
      // ignore
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    }
  }, [state, loaded]);

  const updateBasicInfo = (data: Partial<WizardState['basicInfo']>) =>
    setState(s => ({ ...s, basicInfo: { ...s.basicInfo, ...data } }));

  const updateOfficerInfo = (data: Partial<WizardState['officerInfo']>) =>
    setState(s => ({ ...s, officerInfo: { ...s.officerInfo, ...data } }));

  const updateShareInfo = (data: Partial<WizardState['shareInfo']>) =>
    setState(s => ({ ...s, shareInfo: { ...s.shareInfo, ...data } }));

  const updateBusinessPurposes = (purposes: BusinessPurpose[]) =>
    setState(s => ({ ...s, businessPurposes: purposes }));

  const updateAddressInfo = (data: Partial<WizardState['addressInfo']>) =>
    setState(s => ({ ...s, addressInfo: { ...s.addressInfo, ...data } }));

  const setStep = (step: number) =>
    setState(s => ({ ...s, currentStep: step }));

  const resetState = () => {
    setState(defaultState);
    localStorage.removeItem(STORAGE_KEY);
  };

  return createElement(WizardContext.Provider, {
    value: {
      state,
      updateBasicInfo,
      updateOfficerInfo,
      updateShareInfo,
      updateBusinessPurposes,
      updateAddressInfo,
      setStep,
      resetState,
    }
  }, loaded ? children : null);
}

export function useWizard() {
  const ctx = useContext(WizardContext);
  if (!ctx) throw new Error('useWizard must be used within WizardProvider');
  return ctx;
}
