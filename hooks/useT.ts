'use client';
import { useLanguageStore } from '@/lib/languageStore';
import { translations } from '@/lib/i18n';

export function useT() {
  const { lang, toggleLang } = useLanguageStore();
  return { t: translations[lang], lang, toggleLang };
}
