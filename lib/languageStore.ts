import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Lang } from './i18n';

interface LanguageState {
  lang: Lang;
  toggleLang: () => void;
}

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set, get) => ({
      lang: 'ja' as Lang,
      toggleLang: () => set({ lang: get().lang === 'ja' ? 'en' : 'ja' }),
    }),
    { name: 'vta_lang' },
  ),
);
