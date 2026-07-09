'use client';
import Image from 'next/image';
import { useLanguage } from '@/components/LanguageProvider';

export default function Company() {
  const { lang, t } = useLanguage();

  const companyInfo = lang === 'en'
    ? [
        { label: 'Company Name', value: 'VTaBridge' },
        { label: 'Head Office', value: '（To be announced）' },
        { label: 'Founded', value: 'June 2026' },
        { label: 'Incorporated', value: 'June 2026' },
        { label: 'Capital', value: '（To be announced）' },
        { label: 'President & CEO', value: 'Ryuto Takahashi' },
        { label: 'Director', value: 'Tikhomirova Veronika' },
        { label: 'Employees', value: '（To be announced）' },
        { label: 'Main Banking Institution', value: '（To be announced）' },
      ]
    : [
        { label: '社名', value: 'VTaBridge' },
        { label: '本社所在地', value: '（記載予定）' },
        { label: '創業', value: '2026年6月' },
        { label: '設立', value: '2026年6月' },
        { label: '資本金', value: '（記載予定）' },
        { label: '代表取締役社長', value: '髙橋 龍飛（Ryuto Takahashi）' },
        { label: '取締役', value: 'Tikhomirova Veronika（ティホミロワ・ヴェロニカ）' },
        { label: '従業員数', value: '（記載予定）' },
        { label: '主要取引先金融機関', value: '（記載予定）' },
      ];

  return (
    <div className="min-h-screen bg-white">
      {/* Page Header */}
      <section className="bg-gradient-to-br from-slate-900 to-blue-950 text-white py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-blue-400 font-semibold text-sm uppercase tracking-widest mb-3">COMPANY</div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            {t('会社概要', 'Company Overview')}
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl leading-relaxed">
            {t(
              'VTaBridgeは、日本企業と海外エンジニアをつなぐB2Bコーディネーション事業を展開しています。',
              'VTaBridge operates a B2B coordination service connecting Japanese companies with skilled overseas engineers.'
            )}
          </p>
        </div>
      </section>

      {/* Office Image */}
      <div className="w-full h-64 md:h-96 relative overflow-hidden bg-slate-200">
        <Image
          src="/office.png"
          alt="VTaBridge オフィス"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Company Info Table */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-blue-700 font-semibold text-sm uppercase tracking-widest mb-8">
            {t('基本情報', 'Basic Information')}
          </div>
          <div className="border border-gray-200 rounded-2xl overflow-hidden">
            {companyInfo.map((row, i) => (
              <div
                key={row.label}
                className={`flex flex-col sm:flex-row ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50'} border-b border-gray-100 last:border-b-0`}
              >
                <div className="sm:w-52 px-6 py-4 font-semibold text-gray-700 text-sm bg-gray-50 sm:bg-transparent border-b sm:border-b-0 sm:border-r border-gray-100">
                  {row.label}
                </div>
                <div className="px-6 py-4 text-gray-800 text-sm flex-1">
                  {row.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
