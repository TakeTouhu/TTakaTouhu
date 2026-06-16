import Link from 'next/link';

const services = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: 'エンジニアマッチング',
    desc: '案件要件をヒアリングし、最適な海外エンジニアを迅速にアサイン。週単位でのスピードマッチングを実現。',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
      </svg>
    ),
    title: '英日翻訳・通訳コーディネーション',
    desc: 'Web会議・仕様書・要件定義・進捗報告など、英日コミュニケーションを一括サポート。別途翻訳コスト不要。',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: '契約・稼働管理',
    desc: '業務委託契約の締結サポートから稼働時間・成果物の確認・管理まで、ワンストップで対応。',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    title: '技術選定アドバイス',
    desc: 'アプリ開発・Web構築のスタックや開発手法に関するアドバイスを提供。IT知見のある担当者が要件定義から支援。',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: 'オンボーディング支援',
    desc: '日本企業とエンジニアの関係構築・コミュニケーション設計を支援。スムーズなプロジェクト立ち上げを実現。',
  },
];

const strengths = [
  {
    num: '01',
    title: '英日バイリンガル対応が内包',
    desc: '翻訳・通訳コストが別途不要。IT商流・開発知識のある担当者が英日コミュニケーションを一気通貫でサポートします。',
  },
  {
    num: '02',
    title: '採用リスクゼロのフリーランス型',
    desc: '業務委託契約のため、人件費・社会保険の負担なし。必要な期間だけ即戦力エンジニアを活用できます。',
  },
  {
    num: '03',
    title: '既存ネットワークによるスピード',
    desc: '東欧エンジニアとの既存コネクションにより、週単位でのマッチングが可能。急ぎの案件にも対応できます。',
  },
  {
    num: '04',
    title: '高い技術水準と品質管理',
    desc: 'アサイン前にコーディングテスト・英語面談・ポートフォリオレビューを実施。厳選されたエンジニアのみを紹介。',
  },
];

const steps = [
  { num: 1, title: 'お問い合わせ', desc: 'フォームまたはメールでお気軽にご連絡ください' },
  { num: 2, title: '要件ヒアリング', desc: 'Web会議でスキル要件・期間・予算を確認します' },
  { num: 3, title: 'マッチング・提案', desc: '最適な候補エンジニアをご紹介・カジュアル面談を設定' },
  { num: 4, title: '契約締結', desc: '業務委託契約・NDA締結、稼働開始の準備' },
  { num: 5, title: '稼働・管理', desc: '週次MTGと定期レポートで進捗を可視化' },
  { num: 6, title: '継続・拡大', desc: '顧客満足度確認後、次案件や追加エンジニアを提案' },
];

const skills = [
  { category: 'モバイルアプリ', tags: ['iOS', 'Android', 'Flutter', 'React Native'] },
  { category: 'Webフロントエンド', tags: ['React', 'Vue.js', 'Next.js', 'TypeScript'] },
  { category: 'Webバックエンド', tags: ['Node.js', 'Python', 'Laravel', 'Go'] },
  { category: 'UI/UXデザイン', tags: ['Figma', 'Prototyping', 'Design System'] },
  { category: 'クラウドインフラ', tags: ['AWS', 'GCP', 'Azure', 'Docker'] },
];

const comparisons = [
  { item: '初期費用・採用コスト', vtbridge: '◎ 不要', domestic: '× 高額', offshore: '△ 中程度' },
  { item: '言語コミュニケーション', vtbridge: '◎ 英日内包', domestic: '◎ 問題なし', offshore: '× 言語障壁あり' },
  { item: '品質・スキル水準', vtbridge: '◎ 事前評価済み', domestic: '◎ 高い', offshore: '△ ばらつきあり' },
  { item: '柔軟な期間設定', vtbridge: '◎ 短期〜長期', domestic: '△ 契約制約', offshore: '△ 固定プロジェクト' },
  { item: '調達スピード', vtbridge: '◎ 週単位', domestic: '△ 数週間〜', offshore: '△ 数ヶ月〜' },
  { item: '法的・雇用リスク', vtbridge: '◎ リスクなし', domestic: '△ 雇用リスク', offshore: '× 管理困難' },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur border-b border-gray-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <div className="w-8 h-8 bg-blue-700 rounded-md flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
              </div>
              <span className="font-bold text-xl tracking-tight text-gray-900">VT<span className="text-blue-700">bridge</span></span>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
            <a href="#services" className="hover:text-blue-700 transition-colors">サービス</a>
            <a href="#strengths" className="hover:text-blue-700 transition-colors">選ばれる理由</a>
            <a href="#flow" className="hover:text-blue-700 transition-colors">ご利用の流れ</a>
            <a href="#compare" className="hover:text-blue-700 transition-colors">他社比較</a>
          </nav>
          <a
            href="#contact"
            className="bg-blue-700 text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-blue-800 transition-colors"
          >
            お問い合わせ
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-24 pb-0 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 pt-16 pb-24 relative">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 right-10 w-96 h-96 bg-blue-500 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-20 w-64 h-64 bg-indigo-400 rounded-full blur-3xl" />
          </div>
          <div className="relative max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-blue-600/30 border border-blue-500/40 rounded-full px-4 py-1.5 text-sm text-blue-300 mb-8">
              <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
              グローバルエンジニア・リソースプロバイダー
            </div>
            <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
              優秀な海外エンジニアを、<br />
              <span className="text-blue-400">即戦力として。</span>
            </h1>
            <p className="text-xl text-slate-300 leading-relaxed mb-10 max-w-2xl">
              東欧の高スキルエンジニアと日本企業をつなぐB2Bコーディネーションサービス。
              採用コスト・手間なし、英日コミュニケーションも一括対応。
              エンジニア不足の課題を、スピーディーに解決します。
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="#contact"
                className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-xl font-bold text-lg transition-colors shadow-lg shadow-blue-900/50"
              >
                無料相談を申し込む
              </a>
              <a
                href="#services"
                className="border border-slate-500 hover:border-slate-300 text-slate-300 hover:text-white px-8 py-4 rounded-xl font-semibold text-lg transition-colors"
              >
                サービスを見る
              </a>
            </div>
          </div>
          <div className="mt-16 grid grid-cols-3 gap-8 max-w-lg">
            {[
              { value: '30-40%', label: 'マージン率' },
              { value: '週単位', label: 'マッチングスピード' },
              { value: '0円', label: '採用・雇用コスト' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl font-bold text-blue-400 mb-1">{stat.value}</div>
                <div className="text-sm text-slate-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="h-16 bg-white" style={{ clipPath: 'ellipse(120% 100% at 50% 100%)' }} />
      </section>

      {/* Problem */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <div className="text-blue-700 font-semibold text-sm uppercase tracking-widest mb-3">PROBLEM</div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              日本企業が直面するエンジニア不足
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto leading-relaxed">
              経済産業省の試算では、2030年までにIT人材が最大<strong className="text-gray-900">79万人不足</strong>する見通し。
              DXを推進したいのに、エンジニアが確保できない企業が急増しています。
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: '💸',
                title: '採用コストの高騰',
                desc: '国内エンジニア採用競争が激化。採用単価・期間の両面でコストが急上昇している。',
              },
              {
                icon: '⏳',
                title: 'DX推進の遅延',
                desc: '内製化したいが即戦力エンジニアが採用できず、DX・新規開発が停滞してしまう。',
              },
              {
                icon: '🌐',
                title: '海外活用のハードル',
                desc: '言語障壁・法務・ビザ・管理コストが大きく、自社での海外エンジニア活用が困難。',
              },
            ].map((p) => (
              <div key={p.title} className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                <div className="text-4xl mb-4">{p.icon}</div>
                <h3 className="font-bold text-lg text-gray-900 mb-2">{p.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 bg-blue-50 border border-blue-100 rounded-2xl p-6 text-center">
            <p className="text-blue-900 font-semibold text-lg">
              VTbridgeは、この課題をコスト・品質・スピードの三拍子で解決します。
            </p>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <div className="text-blue-700 font-semibold text-sm uppercase tracking-widest mb-3">SERVICES</div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">提供サービス</h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              エンジニア調達からコミュニケーション支援・稼働管理まで、ワンストップで対応します。
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s) => (
              <div key={s.title} className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-blue-200 hover:shadow-md transition-all group">
                <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center text-blue-700 mb-4 group-hover:bg-blue-700 group-hover:text-white transition-colors">
                  {s.icon}
                </div>
                <h3 className="font-bold text-lg text-gray-900 mb-2">{s.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <div className="text-blue-700 font-semibold text-sm uppercase tracking-widest mb-3">SKILLS</div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">対応スキルセット</h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              東欧を中心とした高スキルエンジニアプール。モバイルからクラウドインフラまで幅広く対応。
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {skills.map((s) => (
              <div key={s.category} className="border border-gray-200 rounded-xl p-5">
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
          <div className="mt-8 bg-slate-50 rounded-xl p-5 flex items-start gap-4 border border-slate-200">
            <div className="text-2xl">🌍</div>
            <div>
              <div className="font-semibold text-gray-900 mb-1">エンジニアプール：東欧中心（ウクライナ・ポーランド等）</div>
              <p className="text-sm text-gray-500">
                高い技術水準・英語コミュニケーション能力・欧州型の時間管理意識が特徴。
                実績に応じて東南アジア・南アジアにも拡大予定。
                全エンジニアはアサイン前にコーディングテスト・英語面談・ポートフォリオレビューを実施。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Strengths */}
      <section id="strengths" className="py-20 px-6 bg-slate-900 text-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <div className="text-blue-400 font-semibold text-sm uppercase tracking-widest mb-3">WHY VTBRIDGE</div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">VTbridgeが選ばれる理由</h2>
            <p className="text-slate-400 max-w-xl mx-auto">
              ブティック型の小規模・高品質サービスだからこそできる、きめ細かいサポート。
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {strengths.map((s) => (
              <div key={s.num} className="bg-slate-800 rounded-2xl p-6 border border-slate-700 hover:border-blue-600/50 transition-colors">
                <div className="text-blue-400 font-bold text-4xl mb-4 font-mono">{s.num}</div>
                <h3 className="font-bold text-xl text-white mb-3">{s.title}</h3>
                <p className="text-slate-400 leading-relaxed text-sm">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section id="flow" className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <div className="text-blue-700 font-semibold text-sm uppercase tracking-widest mb-3">PROCESS</div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">ご利用の流れ</h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              お問い合わせから稼働開始まで、最短1〜2週間で対応します。
            </p>
          </div>
          <div className="relative">
            <div className="hidden md:block absolute top-8 left-[calc(8.33%+1.5rem)] right-[calc(8.33%+1.5rem)] h-0.5 bg-blue-100" />
            <div className="grid grid-cols-2 md:grid-cols-6 gap-6">
              {steps.map((step) => (
                <div key={step.num} className="flex flex-col items-center text-center relative">
                  <div className="w-16 h-16 bg-blue-700 rounded-full flex items-center justify-center text-white font-bold text-xl mb-4 shadow-lg shadow-blue-200 relative z-10">
                    {step.num}
                  </div>
                  <div className="font-bold text-gray-900 text-sm mb-1">{step.title}</div>
                  <div className="text-xs text-gray-500 leading-relaxed">{step.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section id="compare" className="py-20 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <div className="text-blue-700 font-semibold text-sm uppercase tracking-widest mb-3">COMPARISON</div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">他の手段との比較</h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              国内SES・大手オフショアと比較して、VTbridgeは複数の点で優れた選択肢です。
            </p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
            <div className="grid grid-cols-4 bg-gray-900 text-white text-sm font-semibold">
              <div className="p-4">比較項目</div>
              <div className="p-4 text-center text-blue-400">VTbridge</div>
              <div className="p-4 text-center">国内SES・派遣</div>
              <div className="p-4 text-center">大手オフショア</div>
            </div>
            {comparisons.map((row, i) => (
              <div
                key={row.item}
                className={`grid grid-cols-4 text-sm border-t border-gray-100 ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
              >
                <div className="p-4 font-medium text-gray-700">{row.item}</div>
                <div className="p-4 text-center font-semibold text-blue-700 bg-blue-50/50">{row.vtbridge}</div>
                <div className="p-4 text-center text-gray-600">{row.domestic}</div>
                <div className="p-4 text-center text-gray-600">{row.offshore}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About / Founder */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <div className="text-blue-700 font-semibold text-sm uppercase tracking-widest mb-3">ABOUT</div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">VTbridgeについて</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                創業者の強みが、<br />そのままサービスの強みに。
              </h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                VTbridgeは、ITソリューション営業の実務経験、英日バイリンガルコミュニケーション能力、
                そして東欧エンジニアとの既存ネットワークを活かして立ち上げたブティック型サービスです。
              </p>
              <div className="space-y-3">
                {[
                  'IT商流・開発知識による的確な要件ヒアリング',
                  '英日翻訳・通訳の完全内製化',
                  'Day1から稼働可能なエンジニアネットワーク',
                  '営業・新規開拓の実務経験による顧客課題への深い理解',
                ].map((point) => (
                  <div key={point} className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray-700 text-sm">{point}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-br from-slate-900 to-blue-950 rounded-2xl p-8 text-white">
              <div className="text-sm text-blue-400 font-semibold mb-2">FOUNDER</div>
              <div className="text-2xl font-bold mb-1">髙橋 龍飛</div>
              <div className="text-slate-400 text-sm mb-6">Ryuto Takahashi</div>
              <div className="space-y-3 text-sm text-slate-300">
                <div className="flex items-center gap-2">
                  <span className="text-blue-400">▸</span>
                  ITソリューション営業の実務経験
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-blue-400">▸</span>
                  英日バイリンガルビジネスコミュニケーション
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-blue-400">▸</span>
                  東欧エンジニアとの既存ネットワーク
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-blue-400">▸</span>
                  クラウド・セキュリティ等のIT製品・開発知識
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA / Contact */}
      <section id="contact" className="py-24 px-6 bg-gradient-to-br from-blue-700 to-indigo-800 text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            まずは無料でご相談ください
          </h2>
          <p className="text-blue-100 text-lg mb-10 leading-relaxed">
            エンジニアリソースの課題、採用の悩み、オフショア活用のご質問など、
            お気軽にお問い合わせください。<br />
            通常2営業日以内にご返答いたします。
          </p>
          <div className="bg-white/10 backdrop-blur border border-white/20 rounded-2xl p-8">
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                placeholder="お名前"
                className="bg-white/10 border border-white/30 text-white placeholder-blue-200 rounded-xl px-4 py-3 focus:outline-none focus:border-white focus:bg-white/20 transition-colors"
              />
              <input
                type="text"
                placeholder="会社名"
                className="bg-white/10 border border-white/30 text-white placeholder-blue-200 rounded-xl px-4 py-3 focus:outline-none focus:border-white focus:bg-white/20 transition-colors"
              />
            </div>
            <input
              type="email"
              placeholder="メールアドレス"
              className="w-full bg-white/10 border border-white/30 text-white placeholder-blue-200 rounded-xl px-4 py-3 mb-4 focus:outline-none focus:border-white focus:bg-white/20 transition-colors"
            />
            <textarea
              rows={4}
              placeholder="お問い合わせ内容（必要なエンジニアスキル・期間・ご予算など）"
              className="w-full bg-white/10 border border-white/30 text-white placeholder-blue-200 rounded-xl px-4 py-3 mb-4 focus:outline-none focus:border-white focus:bg-white/20 transition-colors resize-none"
            />
            <button
              type="button"
              className="w-full bg-white text-blue-700 font-bold py-4 rounded-xl text-lg hover:bg-blue-50 transition-colors shadow-lg"
            >
              送信する
            </button>
            <p className="text-blue-200 text-xs mt-3">
              ※ 本フォームへの入力情報は、お問い合わせへの対応のみに使用します。
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
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
                グローバルエンジニア・リソースプロバイダー<br />
                日本企業と海外優秀エンジニアをつなぐB2Bコーディネーションサービス
              </p>
            </div>
            <nav className="flex flex-wrap gap-6 text-sm">
              <a href="#services" className="hover:text-white transition-colors">サービス</a>
              <a href="#strengths" className="hover:text-white transition-colors">選ばれる理由</a>
              <a href="#flow" className="hover:text-white transition-colors">ご利用の流れ</a>
              <a href="#compare" className="hover:text-white transition-colors">他社比較</a>
              <a href="#contact" className="hover:text-white transition-colors">お問い合わせ</a>
            </nav>
          </div>
          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-600">
            <p>© 2026 VTbridge. All rights reserved.</p>
            <p>本サービスは業務委託リソース提供であり、労働者派遣・有料職業紹介には該当しません。</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
