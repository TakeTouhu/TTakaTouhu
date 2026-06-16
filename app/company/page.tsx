'use client';
import { useLanguage } from '@/components/LanguageProvider';

export default function Company() {
  const { lang, t } = useLanguage();

  const companyInfo = lang === 'en'
    ? [
        { label: 'Company Name', value: 'VTaBridge' },
        { label: 'Established', value: 'June 2026' },
        { label: 'Representative', value: 'Ryuto Takahashi' },
        { label: 'Business Type', value: 'Global Engineer Resource Provider (B2B Coordination)' },
        { label: 'Service Area', value: 'Japan (clients) / Overseas (engineers)' },
        { label: 'Contract Type', value: 'Business consignment (quasi-mandate / fixed-scope)' },
      ]
    : [
        { label: '会社名', value: 'VTaBridge' },
        { label: '設立', value: '2026年6月' },
        { label: '代表者', value: '髙橋 龍飛（Ryuto Takahashi）' },
        { label: '事業内容', value: 'グローバルエンジニア・リソースプロバイダー事業（B2Bコーディネーション）' },
        { label: 'サービス提供地域', value: '日本国内（顧客企業）／海外（エンジニア）' },
        { label: '契約形態', value: '業務委託契約（準委任・請負）' },
      ];

  const targets = lang === 'en'
    ? [
        {
          segment: 'DX-driven mid-sized companies',
          desc: '100–500 employees. Want to build in-house development capabilities but cannot secure engineers through domestic hiring.',
        },
        {
          segment: 'High-growth startups (Series A–B)',
          desc: 'Need engineering capacity that keeps pace with rapid business growth. Development speed is the top priority.',
        },
        {
          segment: 'IT trading companies & SIers',
          desc: 'Looking for reliable subcontractor engineers to serve their own clients or supplement their team.',
        },
      ]
    : [
        {
          segment: 'DX推進中の中堅企業',
          desc: '従業員100〜500名規模。自社開発体制を構築したいが、国内採用ではエンジニアが確保できない企業。',
        },
        {
          segment: 'スタートアップ（Series A〜B）',
          desc: '急成長に開発リソースが追いつかず、開発スピードを最優先したい企業。',
        },
        {
          segment: 'IT商社・SIer',
          desc: '協力会社として連携し、顧客企業へ再提供したいIT企業・システムインテグレーター。',
        },
      ];

  const compliance = lang === 'en'
    ? [
        {
          title: 'Not Staffing or Temp Agency',
          desc: 'VTaBridge provides outsourced resource coordination under business consignment contracts. This is distinct from worker dispatch (staffing agency) and employment referral services under Japanese law.',
        },
        {
          title: 'Statement of Work (SOW)',
          desc: 'Every engagement is governed by a clearly defined SOW. Deliverables, scope, and timelines are documented to ensure proper business consignment structure.',
        },
        {
          title: 'IP & Confidentiality',
          desc: 'All deliverables and intellectual property are assigned to the client company by default. NDA and IP clauses are included in every contract.',
        },
      ]
    : [
        {
          title: '労働者派遣・有料職業紹介との区別',
          desc: 'VTaBridgeは業務委託（準委任・請負）契約に基づくリソース提供サービスです。労働者派遣法・有料職業紹介には該当しません。',
        },
        {
          title: 'SOW（業務範囲書）の整備',
          desc: '全案件でSOWを作成し、業務範囲・成果物・期間を明確化。適正な業務委託スキームを維持します。',
        },
        {
          title: '知的財産・秘密保持',
          desc: '成果物の著作権・知財は原則として発注者（日本企業）に帰属。NDA・知財帰属条項を全契約に盛り込みます。',
        },
      ];

  return (
    <div className="min-h-screen bg-white">
      {/* Page Header */}
      <section className="bg-gradient-to-br from-slate-900 to-blue-950 text-white py-20 px-6">
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
                <div className="sm:w-48 px-6 py-4 font-semibold text-gray-700 text-sm bg-gray-50 sm:bg-transparent border-b sm:border-b-0 sm:border-r border-gray-100">
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

      {/* Target Clients */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="text-blue-700 font-semibold text-sm uppercase tracking-widest mb-3">TARGET</div>
            <h2 className="text-3xl font-bold text-gray-900">
              {t('ターゲット顧客', 'Target Clients')}
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {targets.map((item, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-blue-200 transition-colors">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center text-blue-700 font-bold mb-4">
                  {i + 1}
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{item.segment}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Legal Compliance */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="text-blue-700 font-semibold text-sm uppercase tracking-widest mb-3">COMPLIANCE</div>
            <h2 className="text-3xl font-bold text-gray-900">
              {t('法務・コンプライアンス', 'Legal & Compliance')}
            </h2>
            <p className="text-gray-500 mt-4 max-w-xl mx-auto">
              {t(
                '適切な法務体制のもと、安心してご利用いただけるサービスを提供します。',
                'We operate with a clear legal framework to give clients and engineers peace of mind.'
              )}
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {compliance.map((item) => (
              <div key={item.title} className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
