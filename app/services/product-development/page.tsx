'use client';
import { useLanguage } from '@/components/LanguageProvider';
import Link from 'next/link';

const steps = {
  ja: [
    { num: '01', title: '要件定義・技術設計', desc: 'お客様のビジネス課題をヒアリングし、機能要件・非機能要件を整理。最適な技術スタックとアーキテクチャを設計します。' },
    { num: '02', title: 'プロジェクト計画', desc: '開発スコープ・マイルストーン・体制・コミュニケーション方針を定め、プロジェクト計画書を作成します。' },
    { num: '03', title: 'フルスタック実装', desc: 'フロントエンド・バックエンド・インフラを含むフルスタック開発を実施。アジャイル手法で短サイクルの進捗共有を行います。' },
    { num: '04', title: 'QA・テスト', desc: '単体テスト・結合テスト・受入テストを実施し、品質を担保した状態で納品します。' },
    { num: '05', title: '納品・リリース後サポート', desc: '本番環境へのデプロイを支援。リリース後の不具合対応・改善対応も柔軟に承ります。' },
  ],
  en: [
    { num: '01', title: 'Requirements & Architecture', desc: 'We listen to your business challenges, organize functional and non-functional requirements, and design the optimal tech stack and architecture.' },
    { num: '02', title: 'Project Planning', desc: 'We define scope, milestones, team structure, and communication protocols in a project plan document.' },
    { num: '03', title: 'Full-Stack Implementation', desc: 'We develop frontend, backend, and infrastructure in full. Agile methodology with short-cycle progress sharing.' },
    { num: '04', title: 'QA & Testing', desc: 'Unit tests, integration tests, and acceptance tests are conducted to ensure quality before delivery.' },
    { num: '05', title: 'Delivery & Post-Launch Support', desc: 'We support deployment to production and provide flexible post-launch bug fixes and improvements.' },
  ],
};

const techStack = [
  { category: 'Frontend', items: ['React / Next.js', 'TypeScript', 'Vue.js', 'Tailwind CSS'] },
  { category: 'Backend', items: ['Node.js', 'Python / FastAPI', 'Go', 'Ruby on Rails'] },
  { category: 'Infrastructure', items: ['AWS', 'GCP', 'Docker / Kubernetes', 'Vercel / Netlify'] },
  { category: 'Database', items: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis'] },
];

const results = {
  ja: [
    { value: '要件定義から', label: '一括受託', note: 'スコープ定義から納品まで一気通貫' },
    { value: 'アジャイル', label: '開発手法', note: '短サイクルで進捗を可視化' },
    { value: 'フルスタック', label: '対応領域', note: 'FE / BE / インフラすべて対応' },
    { value: '納品後も', label: 'サポート継続', note: 'リリース後の改善・保守に対応' },
  ],
  en: [
    { value: 'End-to-end', label: 'Full ownership', note: 'From scope definition to delivery' },
    { value: 'Agile', label: 'Development method', note: 'Short cycles with visible progress' },
    { value: 'Full-stack', label: 'Coverage', note: 'Frontend, backend & infrastructure' },
    { value: 'Post-launch', label: 'Ongoing support', note: 'Bug fixes & improvements after release' },
  ],
};

export default function ProductDevelopment() {
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
          <div className="text-blue-400 font-semibold text-sm uppercase tracking-widest mb-3">SERVICE 02</div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            {t('受託プロダクト開発', 'Contract Product Development')}
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl leading-relaxed">
            {t(
              '要件定義・設計から実装・納品まで、プロダクト開発を一括で受託します。',
              'We take on full-cycle product development — from requirements definition and architecture through implementation and delivery.'
            )}
          </p>
        </div>
      </section>

      {/* Overview */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('サービス概要', 'Service Overview')}</h2>
          <p className="text-gray-600 leading-relaxed text-lg mb-6">
            {t(
              'お客様のプロダクト開発を一括で請け負うサービスです。社内にエンジニアリソースがない企業や、新規プロダクトを迅速に立ち上げたい企業に向けて、要件定義から設計・実装・納品までをワンストップで提供します。',
              'This service takes on your product development in its entirety. Ideal for companies without in-house engineering resources or those looking to launch a new product quickly — we provide end-to-end coverage from requirements through delivery.'
            )}
          </p>
          <p className="text-gray-600 leading-relaxed text-lg">
            {t(
              '海外の優秀なエンジニアチームが仕様に沿って開発を進めるため、コスト効率の高い開発が実現します。プロジェクトの規模・期間・技術スタックに応じて柔軟に対応します。',
              'Our overseas engineering team builds to spec, delivering cost-efficient development. We adapt flexibly to your project scope, timeline, and tech stack requirements.'
            )}
          </p>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-10">{t('開発の流れ', 'Development Process')}</h2>
          <div className="space-y-6">
            {steps[lang].map((step) => (
              <div key={step.num} className="flex gap-6 items-start">
                <div className="flex-shrink-0 w-14 h-14 bg-blue-700 rounded-2xl flex items-center justify-center text-white font-mono font-bold text-sm">
                  {step.num}
                </div>
                <div className="flex-1 pt-1">
                  <h3 className="font-bold text-gray-900 text-lg mb-1">{step.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">{t('対応技術スタック', 'Technology Stack')}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {techStack.map((group) => (
              <div key={group.category} className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
                <div className="text-blue-700 font-bold text-sm uppercase tracking-widest mb-3">{group.category}</div>
                <ul className="space-y-2">
                  {group.items.map((item) => (
                    <li key={item} className="text-gray-700 text-sm flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-blue-500 rounded-full flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="text-gray-500 text-sm mt-4">{t('※ 上記以外の技術スタックにも柔軟に対応します。ご相談ください。', '* We can accommodate other tech stacks. Please inquire.')}</p>
        </div>
      </section>

      {/* Results */}
      <section className="py-16 px-6 bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-2">{t('サービスの特長', 'Service Highlights')}</h2>
          <p className="text-slate-400 mb-10 text-sm">{t('コスト効率と品質を両立した受託開発を提供します。', 'We deliver contract development that balances cost efficiency and quality.')}</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {results[lang].map((r) => (
              <div key={r.label} className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
                <div className="text-2xl font-black text-blue-400 mb-1">{r.value}</div>
                <div className="text-white font-semibold text-sm mb-0.5">{r.label}</div>
                <div className="text-slate-500 text-xs">{r.note}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6 bg-blue-700 text-white text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">{t('まずは無料相談から', 'Start with a Free Consultation')}</h2>
          <p className="text-blue-100 mb-8">
            {t('開発したいプロダクトの概要をお聞かせください。最適な体制とお見積もりをご提案します。', 'Share an overview of the product you want to build. We\'ll propose the best team structure and estimate.')}
          </p>
          <Link href="/contact" className="inline-block bg-white text-blue-700 font-bold px-8 py-4 rounded-xl text-lg hover:bg-blue-50 transition-colors">
            {t('お問い合わせはこちら', 'Contact Us')}
          </Link>
        </div>
      </section>
    </div>
  );
}
