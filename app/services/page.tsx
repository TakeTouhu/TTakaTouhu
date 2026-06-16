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
          title: 'Engineer Matching',
          desc: 'We conduct a thorough requirements interview to understand your project needs, then identify and propose the most suitable overseas engineers from our network. Casual introductory meetings can be arranged, and matching typically completes within a week.',
          points: ['Requirements hearing via web meeting', 'Candidate proposal with profile & portfolio', 'Introductory meeting coordination', 'Matching within weeks'],
        },
        {
          num: '02',
          icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          ),
          title: 'Contract & Operations Management',
          desc: 'We handle all contracting paperwork — business consignment agreements, NDA, IP clauses — between your company and the engineer. Post-launch, we manage working hours, deliverable reviews, and weekly check-ins.',
          points: ['Business consignment contract support', 'NDA & IP clause preparation', 'Working hours tracking (Toggl / Notion)', 'Weekly progress reporting'],
        },
        {
          num: '03',
          icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          ),
          title: 'Technical Advisory',
          desc: 'Our coordinator brings hands-on IT knowledge to help you make informed decisions on technology stack, development methodology, and tooling. Whether you\'re building a mobile app, web platform, or internal tool, we\'ll recommend approaches that fit your team and budget.',
          points: ['Tech stack recommendations', 'Development methodology guidance', 'Vendor & tool selection', 'Architecture consulting'],
        },
        {
          num: '04',
          icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          ),
          title: 'Onboarding Support',
          desc: 'Getting a new remote engineer up to speed quickly requires thoughtful communication setup. We help design your collaboration workflow, establish communication norms, and ensure the engineer integrates smoothly into your team from day one.',
          points: ['Communication workflow design', 'Tool setup & access coordination', 'Team integration support', 'Early-stage progress monitoring'],
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
          title: 'エンジニアマッチング',
          desc: '案件要件をヒアリングし、ネットワーク内の最適な海外エンジニアを選定・ご提案します。カジュアルな顔合わせ面談を設定し、週単位でのマッチング完了を目指します。',
          points: ['Web会議での要件ヒアリング', 'プロフィール・ポートフォリオ付きの候補者提案', '顔合わせ面談のコーディネート', '週単位でのスピードマッチング'],
        },
        {
          num: '02',
          icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          ),
          title: '契約・稼働管理',
          desc: '業務委託契約・NDA・知財条項の締結サポートから、稼働後の稼働時間管理・成果物レビュー・週次進捗確認まで、一括対応します。',
          points: ['業務委託契約の締結サポート', 'NDA・知財帰属条項の整備', '稼働時間管理（Toggl / Notion）', '週次進捗レポート'],
        },
        {
          num: '03',
          icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          ),
          title: '技術選定アドバイス',
          desc: 'IT知見を持つ担当者が、技術スタック・開発手法・ツール選定についてアドバイスを提供します。モバイルアプリ、Webプラットフォーム、社内ツールなど、目的に合った最適な開発アプローチをご提案します。',
          points: ['技術スタックの選定サポート', '開発手法・フレームワークの提案', 'ツール・ベンダー選定支援', 'アーキテクチャに関する相談対応'],
        },
        {
          num: '04',
          icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          ),
          title: 'オンボーディング支援',
          desc: 'リモートエンジニアをチームに素早く馴染ませるための、コミュニケーション設計と関係構築を支援します。稼働初日からエンジニアがスムーズに動ける環境を整えます。',
          points: ['コミュニケーションフロー設計', 'ツールセットアップ・アクセス調整', 'チームへの統合サポート', '初期フェーズの進捗モニタリング'],
        },
      ];

  const skills = [
    { category: lang === 'en' ? 'Mobile App' : 'モバイルアプリ', tags: ['iOS', 'Android', 'Flutter', 'React Native'] },
    { category: lang === 'en' ? 'Web Frontend' : 'Webフロントエンド', tags: ['React', 'Vue.js', 'Next.js', 'TypeScript'] },
    { category: lang === 'en' ? 'Web Backend' : 'Webバックエンド', tags: ['Node.js', 'Python', 'Laravel', 'Go'] },
    { category: 'UI/UX Design', tags: ['Figma', 'Prototyping', 'Design System'] },
    { category: lang === 'en' ? 'Cloud Infrastructure' : 'クラウドインフラ', tags: ['AWS', 'GCP', 'Azure', 'Docker'] },
  ];

  const steps = lang === 'en'
    ? [
        { num: 1, title: 'Inquiry', desc: 'Contact us via form or email' },
        { num: 2, title: 'Requirements', desc: 'Web meeting to define scope & budget' },
        { num: 3, title: 'Matching', desc: 'Candidate proposal & intro meeting' },
        { num: 4, title: 'Contract', desc: 'Sign agreements & prepare for launch' },
        { num: 5, title: 'Operations', desc: 'Weekly check-ins & deliverable reviews' },
        { num: 6, title: 'Continue', desc: 'Feedback loop & next engagement' },
      ]
    : [
        { num: 1, title: 'お問い合わせ', desc: 'フォーム・メールでご連絡ください' },
        { num: 2, title: '要件ヒアリング', desc: 'Web会議でスキル・期間・予算を確認' },
        { num: 3, title: 'マッチング・提案', desc: '最適候補のご提案・顔合わせ面談' },
        { num: 4, title: '契約締結', desc: '業務委託契約・NDA締結、稼働準備' },
        { num: 5, title: '稼働・管理', desc: '週次MTGと定期レポートで進捗確認' },
        { num: 6, title: '継続・拡大', desc: '満足度確認後、次案件・追加提案' },
      ];

  const comparisons = lang === 'en'
    ? [
        { item: 'Initial / Hiring Cost', vtbridge: '◎ None required', domestic: '× High', offshore: '△ Moderate' },
        { item: 'Procurement Speed', vtbridge: '◎ Within weeks', domestic: '△ Weeks to months', offshore: '△ Months' },
        { item: 'Skill Quality', vtbridge: '◎ Pre-vetted', domestic: '◎ High', offshore: '△ Inconsistent' },
        { item: 'Flexible Duration', vtbridge: '◎ Short to long term', domestic: '△ Contract constraints', offshore: '△ Fixed projects' },
        { item: 'Employment Risk', vtbridge: '◎ Zero', domestic: '△ Employment liability', offshore: '× Management risk' },
        { item: 'IT-knowledgeable Coordinator', vtbridge: '◎ Included', domestic: '△ Varies', offshore: '× Typically absent' },
      ]
    : [
        { item: '初期費用・採用コスト', vtbridge: '◎ 不要', domestic: '× 高額', offshore: '△ 中程度' },
        { item: '調達スピード', vtbridge: '◎ 週単位', domestic: '△ 数週間〜', offshore: '△ 数ヶ月〜' },
        { item: 'スキル品質', vtbridge: '◎ 事前評価済み', domestic: '◎ 高い', offshore: '△ ばらつきあり' },
        { item: '柔軟な期間設定', vtbridge: '◎ 短期〜長期', domestic: '△ 契約制約', offshore: '△ 固定案件' },
        { item: '法的・雇用リスク', vtbridge: '◎ ゼロ', domestic: '△ 雇用リスクあり', offshore: '× 管理困難' },
        { item: 'IT知見のある担当者', vtbridge: '◎ 内包', domestic: '△ 担当者次第', offshore: '× 通常なし' },
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
              'エンジニア調達から稼働管理まで、ワンストップでサポートします。',
              'End-to-end support from engineer sourcing through ongoing operations management.'
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
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-blue-600 font-mono font-bold text-sm">{s.num}</span>
                    <h3 className="text-xl font-bold text-gray-900">{s.title}</h3>
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

      {/* Skills */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="text-blue-700 font-semibold text-sm uppercase tracking-widest mb-3">SKILLS</div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {t('対応スキルセット', 'Engineer Skills')}
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              {t(
                '高スキルな海外エンジニアプールが、モバイルからクラウドインフラまで幅広く対応します。',
                'Our overseas engineer pool covers a wide range of specializations — from mobile to cloud infrastructure.'
              )}
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {skills.map((s) => (
              <div key={s.category} className="bg-white border border-gray-200 rounded-xl p-5 hover:border-blue-200 transition-colors">
                <div className="font-semibold text-gray-900 mb-3">{s.category}</div>
                <div className="flex flex-wrap gap-2">
                  {s.tags.map((tag) => (
                    <span key={tag} className="bg-blue-50 text-blue-700 text-xs font-medium px-3 py-1 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 bg-slate-900 text-white rounded-xl p-5 flex items-start gap-4">
            <div className="text-2xl">🌏</div>
            <div>
              <div className="font-semibold mb-1">
                {t('エンジニアプール：海外エンジニア', 'Engineer Pool: Skilled Overseas Engineers')}
              </div>
              <p className="text-sm text-slate-400">
                {t(
                  '高い技術水準・英語コミュニケーション能力を持つ海外エンジニアを厳選。アサイン前にコーディングテスト・面談・ポートフォリオレビューを実施し、品質を保証します。',
                  'We source highly skilled engineers with strong technical capabilities and English communication skills. All candidates pass coding tests, interviews, and portfolio reviews before assignment.'
                )}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="text-blue-700 font-semibold text-sm uppercase tracking-widest mb-3">PROCESS</div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {t('ご利用の流れ', 'How It Works')}
            </h2>
            <p className="text-gray-500">
              {t('お問い合わせから稼働開始まで、最短1〜2週間で対応します。', 'From inquiry to deployment in as little as 1–2 weeks.')}
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-5">
            {steps.map((step) => (
              <div key={step.num} className="flex flex-col items-center text-center">
                <div className="w-14 h-14 bg-blue-700 rounded-full flex items-center justify-center text-white font-bold text-lg mb-3 shadow-lg shadow-blue-100">
                  {step.num}
                </div>
                <div className="font-bold text-gray-900 text-sm mb-1">{step.title}</div>
                <div className="text-xs text-gray-500 leading-relaxed">{step.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="text-blue-700 font-semibold text-sm uppercase tracking-widest mb-3">COMPARISON</div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {t('他の手段との比較', 'VTaBridge vs Alternatives')}
            </h2>
          </div>
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
            <div className="grid grid-cols-4 bg-gray-900 text-white text-sm font-semibold">
              <div className="p-4">{t('比較項目', 'Criteria')}</div>
              <div className="p-4 text-center text-blue-400">VTaBridge</div>
              <div className="p-4 text-center">{t('国内SES・派遣', 'Domestic SES')}</div>
              <div className="p-4 text-center">{t('大手オフショア', 'Offshore Dev')}</div>
            </div>
            {comparisons.map((row, i) => (
              <div key={row.item} className={`grid grid-cols-4 text-sm border-t border-gray-100 ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                <div className="p-4 font-medium text-gray-700">{row.item}</div>
                <div className="p-4 text-center font-semibold text-blue-700 bg-blue-50/50">{row.vtbridge}</div>
                <div className="p-4 text-center text-gray-600">{row.domestic}</div>
                <div className="p-4 text-center text-gray-600">{row.offshore}</div>
              </div>
            ))}
          </div>
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
              'Tell us what skills you need and when. We\'ll take it from there.'
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
