'use client';
import Link from 'next/link';
import { useLanguage } from './LanguageProvider';
import { LogoFooter } from './Logo';

export default function Footer() {
  const { t } = useLanguage();

  const links = [
    { href: '/', label: t('ホーム', 'Home') },
    { href: '/about', label: t('VTaBridgeについて', 'About') },
    { href: '/company', label: t('会社概要', 'Company') },
    { href: '/services', label: t('事業内容', 'Services') },
    { href: '/contact', label: t('お問い合わせ', 'Contact') },
  ];

  return (
    <footer className="bg-slate-950 text-slate-400 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-start justify-between gap-8 mb-8">
          <div className="max-w-xs">
            <div className="mb-3">
              <LogoFooter />
            </div>
            <p className="text-sm text-slate-500 leading-relaxed mb-4">
              {t(
                '世界の優秀なエンジニアと日本企業をつなぐ架け橋に。',
                'The bridge connecting world-class engineers with Japanese companies.'
              )}
            </p>
            {/* LinkedIn link (Priority A: link building) */}
            <a
              href="https://www.linkedin.com/company/vtabridge"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-blue-400 transition-colors"
              aria-label="VTaBridge LinkedIn"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              LinkedIn
            </a>
          </div>
          <nav className="flex flex-wrap gap-6 text-sm md:pt-1">
            {links.map((link) => (
              <Link key={link.href} href={link.href} className="hover:text-white transition-colors">
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="border-t border-slate-800 pt-8 space-y-4">
          <div className="flex flex-wrap gap-x-5 gap-y-2 text-xs text-slate-500">
            <Link href="/policies/privacy" className="hover:text-slate-300 transition-colors">
              {t('プライバシーポリシー', 'Privacy Policy')}
            </Link>
            <Link href="/policies/information-security" className="hover:text-slate-300 transition-colors">
              {t('情報セキュリティ基本方針', 'Information Security Policy')}
            </Link>
            <Link href="/policies/anti-social-forces" className="hover:text-slate-300 transition-colors">
              {t('反社会的勢力排除方針', 'Anti-Social Forces Policy')}
            </Link>
          </div>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-2 text-xs text-slate-600">
            <p>© 2026 VTaBridge. All rights reserved.</p>
            <p>
              {t(
                '本サービスは業務委託リソース提供であり、労働者派遣・有料職業紹介には該当しません。',
                'VTaBridge provides outsourced resource coordination, not staffing or employment referral services.'
              )}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
