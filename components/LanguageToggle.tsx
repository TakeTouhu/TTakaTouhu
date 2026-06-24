'use client';
import { useT } from '@/hooks/useT';

export default function LanguageToggle() {
  const { lang, toggleLang } = useT();
  return (
    <button
      onClick={toggleLang}
      className="flex items-center gap-1 px-2.5 py-1 rounded-lg border border-gray-200 text-xs font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-colors"
      aria-label="Switch language"
    >
      <span className={lang === 'ja' ? 'text-gray-900 font-semibold' : 'text-gray-400'}>JP</span>
      <span className="text-gray-300">|</span>
      <span className={lang === 'en' ? 'text-gray-900 font-semibold' : 'text-gray-400'}>EN</span>
    </button>
  );
}
