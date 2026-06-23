'use client';
import { useLanguage } from '@/components/LanguageProvider';
import Link from 'next/link';

const plannedProducts = {
  ja: [
    {
      icon: '🔗',
      title: 'エンジニアマッチングプラットフォーム',
      desc: '海外エンジニアと日本企業をダイレクトにつなぐSaaSプラットフォーム。スキル検索・契約管理・稼働管理を一元化。',
      status: '開発中',
    },
    {
      icon: '📊',
      title: 'プロジェクト管理ダッシュボード',
      desc: '海外エンジニアの稼働状況・成果物・進捗をリアルタイムで可視化するダッシュボードツール。',
      status: '企画中',
    },
    {
      icon: '🤖',
      title: 'AI要件定義アシスタント',
      desc: 'ビジネス課題をヒアリングし、AIが最適な要件定義書・技術スタック提案を自動生成するツール。',
      status: '企画中',
    },
  ],
  en: [
    {
      icon: '🔗',
      title: 'Engineer Matching Platform',
      desc: 'A SaaS platform that directly connects overseas engineers with Japanese companies — unifying skill search, contract management, and operations tracking.',
      status: 'In Development',
    },
    {
      icon: '📊',
      title: 'Project Management Dashboard',
      desc: 'A real-time dashboard for visualizing overseas engineer activity, deliverables, and project progress.',
      status: 'Planning',
    },
    {
      icon: '🤖',
      title: 'AI Requirements Assistant',
      desc: 'A tool that listens to your business challenges and uses AI to auto-generate requirements documents and tech stack recommendations.',
      status: 'Planning',
    },
  ],
};

export default function Products() {
  const { lang, t } = useLanguage();

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <section className="bg-gradient-to-br from-slate-900 to-blue-950 text-white py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <Link href="/services" className="text-blue-400 text-sm hover:text-blue-300 transition-colors">
              {t('← 事業内容に戻る', '← Back to Services')}
            </Link>
          </div>
          <div className="flex items-center gap-3 mb-3">
            <div className="text-blue-400 font-semibold text-sm uppercase tracking-widest">SERVICE 03</div>
            <span className="bg-amber-400 text-amber-900 text-xs font-bold px-2.5 py-1 rounded-full">
              {t('準備中', 'Coming Soon')}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            {t('プロダクトの提供', 'Product Offering')}
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl leading-relaxed">
            {t(
              '自社開発のSaaSやデジタルプロダクトを順次提供予定です。ビジネス課題を解決するプロダクトを鋭意開発中です。',
              'We are developing our own SaaS and digital products to solve real business challenges. Stay tuned for announcements.'
            )}
          </p>
        </div>
      </section>

      {/* Coming Soon Banner */}
      <section className="py-12 px-6 bg-amber-50 border-y border-amber-100">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
          <div className="text-4xl">🚀</div>
          <div>
            <h2 className="text-lg font-bold text-amber-900 mb-1">
              {t('現在鋭意開発中です', 'Currently Under Active Development')}
            </h2>
            <p className="text-amber-700 text-sm">
              {t(
                '詳細な情報は近日公開予定です。最新情報はLinkedInまたはお問い合わせよりご確認ください。',
                'Details will be announced soon. Follow us on LinkedIn or contact us for the latest updates.'
              )}
            </p>
          </div>
        </div>
      </section>

      {/* Planned Products */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">{t('開発予定のプロダクト', 'Products in the Pipeline')}</h2>
          <p className="text-gray-500 text-sm mb-10">{t('※ 内容・スケジュールは変更となる場合があります。', '* Contents and timelines are subject to change.')}</p>
          <div className="space-y-5">
            {plannedProducts[lang].map((p) => (
              <div key={p.title} className="flex gap-5 items-start bg-gray-50 rounded-2xl p-6 border border-gray-100">
                <div className="text-3xl flex-shrink-0">{p.icon}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2 flex-wrap">
                    <h3 className="font-bold text-gray-900">{p.title}</h3>
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${
                      p.status === '開発中' || p.status === 'In Development'
                        ? 'bg-blue-50 text-blue-700 border-blue-200'
                        : 'bg-gray-100 text-gray-600 border-gray-200'
                    }`}>
                      {p.status}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision */}
      <section className="py-16 px-6 bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-6">{t('プロダクトのビジョン', 'Our Product Vision')}</h2>
          <p className="text-slate-300 leading-relaxed text-lg max-w-2xl mx-auto mb-8">
            {t(
              'VTaBridgeは、コーディネーション事業で培ったノウハウをプロダクト化し、より多くの日本企業が海外エンジニアを活用できる世界を目指しています。',
              'VTaBridge aims to productize the expertise gained through our coordination business, enabling more Japanese companies to leverage overseas engineering talent.'
            )}
          </p>
          <div className="grid sm:grid-cols-3 gap-6 text-left">
            {(lang === 'ja' ? [
              { title: '課題の自動検出', desc: '企業のDX課題をデータから自動的に特定し、最適なエンジニアリングリソースを提案。' },
              { title: 'グローバルネットワーク', desc: '世界中のエンジニアとのネットワークをプラットフォームとして開放。' },
              { title: 'コスト透明化', desc: '海外エンジニア活用コストをリアルタイムで可視化・比較できる仕組みを提供。' },
            ] : [
              { title: 'Automated Issue Detection', desc: 'Automatically identify DX challenges from company data and suggest optimal engineering resources.' },
              { title: 'Global Network Access', desc: 'Open our worldwide engineer network as a platform for direct access.' },
              { title: 'Cost Transparency', desc: 'Provide real-time visibility and comparison of overseas engineer utilization costs.' },
            ]).map((v) => (
              <div key={v.title} className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
                <h3 className="font-bold text-white mb-2">{v.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Notify CTA */}
      <section className="py-16 px-6 bg-blue-700 text-white text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">{t('リリース情報を受け取る', 'Get Notified at Launch')}</h2>
          <p className="text-blue-100 mb-8">
            {t('プロダクトのリリース情報やアーリーアクセスのご案内をご希望の方は、お問い合わせよりご連絡ください。', 'Contact us if you\'d like to receive launch announcements or early access invitations.')}
          </p>
          <Link href="/contact" className="inline-block bg-white text-blue-700 font-bold px-8 py-4 rounded-xl text-lg hover:bg-blue-50 transition-colors">
            {t('お問い合わせはこちら', 'Contact Us')}
          </Link>
        </div>
      </section>
    </div>
  );
}
