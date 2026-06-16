'use client';
import Link from 'next/link';
import { useLanguage } from './LanguageProvider';

export default function Footer() {
  const { t } = useLanguage();

  const links = [
    { href: '/', label: t('ホーム', 'Home') },
    { href: '/about', label: t('VTbridgeについて', 'About') },
    { href: '/company', label: t('会社概要', 'Company') },
    { href: '/services', label: t('事業内容', 'Services') },
    { href: '/contact', label: t('お問い合わせ', 'Contact') },
  ];

  return (
    <footer className="bg-slate-950 text-slate-400 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-7 h-7 bg-blue-700 rounded-md flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
              </div>
              <span className="font-bold text-lg text-white">VT<span className="text-blue-500">bridge</span></span>
            </div>
            <p className="text-sm text-slate-500 max-w-xs">
              {t(
                'グローバルエンジニア・リソースプロバイダー\n日本企業と海外優秀エンジニアをつなぐB2Bコーディネーションサービス',
                'Global Engineer Resource Provider\nB2B coordination service connecting Japanese companies with skilled overseas engineers'
              )}
            </p>
          </div>
          <nav className="flex flex-wrap gap-6 text-sm">
            {links.map((link) => (
              <Link key={link.href} href={link.href} className="hover:text-white transition-colors">
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-600">
          <p>© 2026 VTbridge. All rights reserved.</p>
          <p>
            {t(
              '本サービスは業務委託リソース提供であり、労働者派遣・有料職業紹介には該当しません。',
              'VTbridge provides outsourced resource coordination, not staffing or employment referral services.'
            )}
          </p>
        </div>
      </div>
    </footer>
  );
}
