'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { useLanguage } from './LanguageProvider';
import { LogoHeader } from './Logo';

export default function Header() {
  const { lang, setLang, t } = useLanguage();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { href: '/', label: t('ホーム', 'Home') },
    { href: '/about', label: t('VTaBridgeについて', 'About') },
    { href: '/company', label: t('会社概要', 'Company') },
    { href: '/services', label: t('事業内容', 'Services') },
    { href: '/contact', label: t('お問い合わせ', 'Contact') },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur border-b border-gray-100 shadow-sm">
      <div className="max-w-6xl mx-auto px-6 py-2 flex items-center justify-between">
        <Link href="/" aria-label="VTaBridge ホーム">
          <LogoHeader />
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`hover:text-blue-700 transition-colors ${pathname === link.href ? 'text-blue-700 font-semibold' : ''}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setLang(lang === 'ja' ? 'en' : 'ja')}
            className="text-sm font-semibold px-3 py-1.5 rounded-lg border border-gray-200 text-gray-600 hover:border-blue-400 hover:text-blue-700 transition-colors"
            aria-label="言語切替 / Switch language"
          >
            {lang === 'ja' ? 'EN' : 'JA'}
          </button>
          <Link
            href="/contact"
            className="hidden md:block bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-800 transition-colors"
          >
            {t('お問い合わせ', 'Contact Us')}
          </Link>
          <button
            className="md:hidden p-2 text-gray-600"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="メニュー"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-6 py-4 space-y-3">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={`block py-2 text-sm font-medium hover:text-blue-700 transition-colors ${pathname === link.href ? 'text-blue-700' : 'text-gray-700'}`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
