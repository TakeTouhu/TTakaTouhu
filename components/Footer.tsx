'use client';
import Link from 'next/link';
import { useLanguage } from './LanguageProvider';
import { BridgeIcon } from './Logo';

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
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8">
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-9 h-9 bg-blue-700 rounded-xl flex items-center justify-center flex-shrink-0">
                <BridgeIcon className="w-6 h-6" color="white" />
              </div>
              <span className="font-bold text-lg text-white">VTa<span className="text-blue-400">Bridge</span></span>
            </div>
            <p className="text-sm text-slate-500 max-w-xs whitespace-pre-line">
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
          <p>© 2026 VTaBridge. All rights reserved.</p>
          <p>
            {t(
              '本サービスは業務委託リソース提供であり、労働者派遣・有料職業紹介には該当しません。',
              'VTaBridge provides outsourced resource coordination, not staffing or employment referral services.'
            )}
          </p>
        </div>
      </div>
    </footer>
  );
}
