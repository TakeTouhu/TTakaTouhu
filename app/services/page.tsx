'use client';
import { useLanguage } from '@/components/LanguageProvider';
import Link from 'next/link';

export default function Services() {
  const { lang, t } = useLanguage();

  const services = lang === 'en'
    ? [
        {
          num: '01',
          icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          ),
          title: 'Overseas Engineer Outsourcing & Development',
          badge: null,
          desc: 'We match your project with highly skilled overseas engineers through thorough requirements interviews. From candidate proposal and introductory meetings to contract management and weekly progress reporting, we handle everything end-to-end.',
          points: ['Requirements hearing & candidate proposal', 'Contract & NDA support', 'Working hours tracking & deliverable review', 'Weekly progress reporting'],
        },
        {
          num: '02',
          icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
          ),
          title: 'Contract Product Development',
          badge: null,
          desc: 'We take on full-cycle product development as a contracted partner. From requirements definition and architecture design through implementation and delivery, our overseas engineering team builds your product to specification.',
          points: ['Requirements definition & technical design', 'Full-stack implementation', 'QA & testing', 'Delivery & post-launch support'],
        },
        {
          num: '03',
          icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10" />
            </svg>
          ),
          title: 'Product Offering',
          badge: 'Coming Soon',
          desc: 'We are developing our own SaaS and digital products to solve real business challenges. Details will be announced soon.',
          points: ['SaaS product development in progress', 'Details to be announced'],
        },
      ]
    : [
        {
          num: '01',
          icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          ),
          title: '海外エンジニアの委託派遣・開発',
          badge: null,
          desc: '要件ヒアリングをもとに、最適な海外エンジニアを選定・ご提案します。候補者提案・顔合わせ面談から契約管理・週次進捗報告まで、ワンストップで対応します。',
          points: ['要件ヒアリング・候補者提案', '契約・NDA締結サポート', '稼働時間管理・成果物レビュー', '週次進捗レポート'],
        },
        {
          num: '02',
          icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
          ),
          title: '受託プロダクト開発',
          badge: null,
          desc: 'お客様のプロダクト開発を一括で請け負います。要件定義・設計から実装・納品まで、海外エンジニアチームが仕様に沿って開発を進めます。',
          points: ['要件定義・技術設計', 'フルスタック実装', 'QA・テスト', '納品・リリース後サポート'],
        },
        {
          num: '03',
          icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10" />
            </svg>
          ),
          title: 'プロダクトの提供',
          badge: '準備中',
          desc: '自社開発のSaaSやデジタルプロダクトを順次提供予定です。ビジネス課題を解決するサービスを鋭意開発中です。詳細は近日公開予定。',
          points: ['SaaSプロダクト開発中', '詳細は近日発表予定'],
        },
      ];

  return (
    <div className="min-h-screen bg-white">
      {/* Page Header */}
      <section className="bg-gradient-to-br from-slate-900 to-blue-950 text-white py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-blue-400 font-semibold text-sm uppercase tracking-widest mb-3">SERVICES</div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            {t('事業内容', 'Our Services')}
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl leading-relaxed">
            {t(
              'エンジニア調達から受託開発、自社プロダクトまで幅広くサポートします。',
              'From engineer sourcing to contract development and our own products.'
            )}
          </p>
        </div>
      </section>

      {/* Services Detail */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto space-y-8">
          {services.map((s) => (
            <div key={s.num} className="bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:border-blue-200 transition-colors">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-blue-700 rounded-2xl flex items-center justify-center text-white">
                    {s.icon}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3 flex-wrap">
                    <span className="text-blue-600 font-mono font-bold text-sm">{s.num}</span>
                    <h3 className="text-xl font-bold text-gray-900">{s.title}</h3>
                    {s.badge && (
                      <span className="bg-amber-100 text-amber-700 text-xs font-bold px-2.5 py-1 rounded-full border border-amber-200">
                        {s.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 leading-relaxed mb-4">{s.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {s.points.map((p) => (
                      <span key={p} className="bg-blue-50 text-blue-700 text-xs font-medium px-3 py-1.5 rounded-full border border-blue-100">
                        {p}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-blue-700 text-white text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">
            {t('まずはお気軽にご相談ください', 'Ready to get started?')}
          </h2>
          <p className="text-blue-100 mb-8">
            {t(
              '必要なスキルや期間について、お気軽にご相談ください。',
              "Tell us what skills you need and when. We'll take it from there."
            )}
          </p>
          <Link
            href="/contact"
            className="inline-block bg-white text-blue-700 font-bold px-8 py-4 rounded-xl text-lg hover:bg-blue-50 transition-colors"
          >
            {t('お問い合わせはこちら', 'Contact Us')}
          </Link>
        </div>
      </section>
    </div>
  );
}
