'use client';
import { createContext, useContext, useState, useEffect } from 'react';

type Lang = 'ja' | 'en';

const LanguageContext = createContext<{
  lang: Lang;
  setLang: (l: Lang) => void;
}>({ lang: 'ja', setLang: () => {} });

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>('ja');

  useEffect(() => {
    const saved = localStorage.getItem('vtbridge-lang') as Lang;
    if (saved === 'ja' || saved === 'en') setLangState(saved);
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem('vtbridge-lang', l);
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const { lang, setLang } = useContext(LanguageContext);
  const t = (ja: string, en: string) => lang === 'en' ? en : ja;
  return { lang, setLang, t };
}
