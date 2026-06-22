'use client';
import Link from 'next/link';
import { useLanguage } from '@/components/LanguageProvider';

const services = {
  ja: [
    {
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      title: 'エンジニアマッチング',
      desc: '案件要件をヒアリングし、最適な海外エンジニアを週単位でアサイン。スピーディなマッチングを実現します。',
    },
    {
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: '契約・稼働管理',
      desc: '業務委託契約の締結サポートから稼働時間・成果物の確認・管理まで、ワンストップで対応します。',
    },
    {
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      title: '技術選定アドバイス',
      desc: 'アプリ開発・Web構築等のスタックや開発手法に関するアドバイスを提供します。',
    },
    {
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: 'オンボーディング支援',
      desc: '日本企業とエンジニアの関係構築・コミュニケーション設計を支援し、スムーズなプロジェクト開始を実現。',
    },
  ],
  en: [
    {
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      title: 'Engineer Matching',
      desc: 'We listen to your project requirements and assign the best overseas engineers — often within a week.',
    },
    {
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: 'Contract & Operations',
      desc: 'End-to-end support from contract signing to deliverable review and hours tracking. Fully managed.',
    },
    {
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      title: 'Technical Advisory',
      desc: 'Guidance on tech stack selection and development methodology for app and web projects.',
    },
    {
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: 'Onboarding Support',
      desc: 'We facilitate team integration and communication design between your company and engineers for a smooth launch.',
    },
  ],
};

export default function Home() {
  const { lang, t } = useLanguage();
  const serviceList = services[lang];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white overflow-hidden relative">
        {/* Globe — Earth with arcs converging to Japan */}
        <div
          className="absolute right-0 top-0 bottom-0 hidden lg:flex items-center pointer-events-none"
          style={{ perspective: '1600px', marginRight: '-180px' }}
        >
          <div style={{ animation: 'globeYSpin 40s linear infinite', flexShrink: 0 }}>
            <svg width="1100" height="1100" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <radialGradient id="globeGrad" cx="38%" cy="34%" r="65%">
                  <stop offset="0%" stopColor="#1e40af" stopOpacity="0.90" />
                  <stop offset="50%" stopColor="#0f2a5e" stopOpacity="0.96" />
                  <stop offset="100%" stopColor="#020b1f" stopOpacity="1" />
                </radialGradient>
                <radialGradient id="glowGrad" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.40" />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                </radialGradient>
                <filter id="glow3d">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
                <filter id="arcglow">
                  <feGaussianBlur stdDeviation="2.5" result="blur" />
                  <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
                <clipPath id="globeClip">
                  <circle cx="200" cy="200" r="170" />
                </clipPath>
                <style>{`
                  @keyframes globeYSpin {
                    from { transform: rotateY(0deg); }
                    to   { transform: rotateY(360deg); }
                  }
                `}</style>
              </defs>

              {/* Atmospheric glow */}
              <circle cx="200" cy="200" r="200" fill="url(#glowGrad)" />
              {/* Ocean */}
              <circle cx="200" cy="200" r="170" fill="url(#globeGrad)" />

              {/* Lat/Lon grid */}
              <g clipPath="url(#globeClip)" stroke="#29b5e8" strokeOpacity="0.12" strokeWidth="0.6" fill="none">
                <ellipse cx="200" cy="200" rx="170" ry="28" />
                <ellipse cx="200" cy="200" rx="170" ry="70" />
                <ellipse cx="200" cy="200" rx="170" ry="120" />
                <ellipse cx="200" cy="200" rx="170" ry="155" />
                <line x1="30" y1="200" x2="370" y2="200" />
                <ellipse cx="200" cy="200" rx="30" ry="170" />
                <ellipse cx="200" cy="200" rx="82" ry="170" />
                <ellipse cx="200" cy="200" rx="140" ry="170" />
                <line x1="200" y1="30" x2="200" y2="370" />
              </g>

              {/* Continents — simplified Earth shapes */}
              <g clipPath="url(#globeClip)" fill="#2563eb" fillOpacity="0.52" stroke="#3b82f6" strokeOpacity="0.25" strokeWidth="0.5">
                {/* North America */}
                <path d="M 65,118 C 72,88 108,80 130,95 L 150,115 L 162,145 L 165,175 L 150,210 L 130,226 L 102,220 L 76,200 L 58,168 L 55,140 Z" />
                {/* Greenland */}
                <ellipse cx="148" cy="85" rx="19" ry="15" transform="rotate(-12 148 85)" />
                {/* South America */}
                <path d="M 115,230 C 130,220 155,222 160,240 L 162,265 L 155,295 L 140,318 L 118,308 L 107,282 L 105,255 Z" />
                {/* Europe */}
                <path d="M 174,105 L 198,97 L 216,105 L 218,120 L 208,130 L 196,135 L 182,128 L 174,116 Z" />
                {/* Scandinavia */}
                <ellipse cx="198" cy="88" rx="10" ry="14" transform="rotate(-8 198 88)" />
                {/* Africa */}
                <path d="M 182,148 C 200,138 222,142 230,155 L 235,182 L 230,220 L 220,252 L 205,268 L 190,258 L 182,225 L 176,190 Z" />
                {/* Asia mainland */}
                <path d="M 216,108 L 258,94 L 302,97 L 338,114 L 346,140 L 342,164 L 320,174 L 294,170 L 270,180 L 248,186 L 228,180 L 218,160 L 212,135 Z" />
                {/* India */}
                <path d="M 246,174 L 260,170 L 268,180 L 264,205 L 252,218 L 240,207 L 238,188 Z" />
                {/* Southeast Asia */}
                <ellipse cx="286" cy="194" rx="20" ry="13" transform="rotate(-5 286 194)" />
                {/* Japan — Honshu */}
                <ellipse cx="323" cy="152" rx="9" ry="16" transform="rotate(18 323 152)" />
                {/* Japan — Kyushu */}
                <ellipse cx="316" cy="172" rx="5" ry="8" transform="rotate(22 316 172)" />
                {/* Australia */}
                <path d="M 290,245 C 315,235 350,240 360,260 L 360,286 L 346,300 L 318,304 L 292,292 L 283,268 Z" />
                {/* New Zealand */}
                <ellipse cx="372" cy="298" rx="7" ry="13" transform="rotate(-18 372 298)" />
              </g>

              {/* Arc lines — world cities → Japan (Tokyo ~320,158) */}
              <g clipPath="url(#globeClip)" filter="url(#arcglow)">
                {/* New York */}
                <path d="M 108,170 Q 215,62 320,158" fill="none" stroke="#38bdf8" strokeWidth="1.3" strokeOpacity="0.7" strokeDasharray="8 290">
                  <animate attributeName="stroke-dashoffset" from="290" to="-10" dur="3.8s" repeatCount="indefinite" />
                </path>
                {/* London */}
                <path d="M 192,116 Q 262,60 320,158" fill="none" stroke="#60a5fa" strokeWidth="1.2" strokeOpacity="0.65" strokeDasharray="7 195">
                  <animate attributeName="stroke-dashoffset" from="195" to="-10" dur="2.9s" repeatCount="indefinite" begin="0.7s" />
                </path>
                {/* Dubai */}
                <path d="M 230,158 Q 282,112 320,158" fill="none" stroke="#7dd3fc" strokeWidth="1.1" strokeOpacity="0.68" strokeDasharray="6 130">
                  <animate attributeName="stroke-dashoffset" from="130" to="-10" dur="2.1s" repeatCount="indefinite" begin="1.4s" />
                </path>
                {/* Mumbai */}
                <path d="M 252,190 Q 295,132 320,158" fill="none" stroke="#38bdf8" strokeWidth="1.1" strokeOpacity="0.65" strokeDasharray="6 135">
                  <animate attributeName="stroke-dashoffset" from="135" to="-10" dur="2.3s" repeatCount="indefinite" begin="0.3s" />
                </path>
                {/* Vietnam / SE Asia */}
                <path d="M 282,197 Q 304,168 320,158" fill="none" stroke="#93c5fd" strokeWidth="1.0" strokeOpacity="0.72" strokeDasharray="5 95">
                  <animate attributeName="stroke-dashoffset" from="95" to="-8" dur="1.6s" repeatCount="indefinite" begin="0.5s" />
                </path>
                {/* Sydney */}
                <path d="M 322,268 Q 332,195 320,158" fill="none" stroke="#38bdf8" strokeWidth="1.2" strokeOpacity="0.65" strokeDasharray="6 125">
                  <animate attributeName="stroke-dashoffset" from="125" to="-10" dur="2.2s" repeatCount="indefinite" begin="1.8s" />
                </path>
                {/* São Paulo */}
                <path d="M 130,282 Q 228,78 320,158" fill="none" stroke="#60a5fa" strokeWidth="1.0" strokeOpacity="0.55" strokeDasharray="6 340">
                  <animate attributeName="stroke-dashoffset" from="340" to="-10" dur="4.5s" repeatCount="indefinite" begin="2.2s" />
                </path>
                {/* Seoul */}
                <path d="M 305,150 Q 313,140 320,158" fill="none" stroke="#bae6fd" strokeWidth="1.0" strokeOpacity="0.75" strokeDasharray="4 65">
                  <animate attributeName="stroke-dashoffset" from="65" to="-8" dur="1.1s" repeatCount="indefinite" begin="0.2s" />
                </path>
              </g>

              {/* Source city dots */}
              <g filter="url(#glow3d)" clipPath="url(#globeClip)">
                <circle cx="108" cy="170" r="3.5" fill="#7dd3fc" />
                <circle cx="192" cy="116" r="3" fill="#7dd3fc" />
                <circle cx="230" cy="158" r="3" fill="#7dd3fc" />
                <circle cx="252" cy="190" r="3" fill="#7dd3fc" />
                <circle cx="282" cy="197" r="2.5" fill="#93c5fd" />
                <circle cx="322" cy="268" r="3" fill="#7dd3fc" />
                <circle cx="130" cy="282" r="2.5" fill="#7dd3fc" />
                <circle cx="305" cy="150" r="2.5" fill="#93c5fd" />
              </g>

              {/* Japan hub glow area */}
              <circle cx="320" cy="158" r="24" fill="#3b82f6" fillOpacity="0.14" clipPath="url(#globeClip)" />

              {/* Japan (Tokyo) — hub dot */}
              <circle cx="320" cy="158" r="6.5" fill="#60a5fa" filter="url(#glow3d)" clipPath="url(#globeClip)">
                <animate attributeName="opacity" values="1;0.55;1" dur="2s" repeatCount="indefinite" />
              </circle>
              {/* Japan pulse ring 1 */}
              <circle cx="320" cy="158" r="9" fill="none" stroke="#60a5fa" strokeWidth="1.5" clipPath="url(#globeClip)">
                <animate attributeName="r" values="9;25;9" dur="2.8s" repeatCount="indefinite" />
                <animate attributeName="stroke-opacity" values="0.8;0;0.8" dur="2.8s" repeatCount="indefinite" />
              </circle>
              {/* Japan pulse ring 2 */}
              <circle cx="320" cy="158" r="9" fill="none" stroke="#60a5fa" strokeWidth="0.8" clipPath="url(#globeClip)">
                <animate attributeName="r" values="9;18;9" dur="2.8s" repeatCount="indefinite" begin="1.4s" />
                <animate attributeName="stroke-opacity" values="0.6;0;0.6" dur="2.8s" repeatCount="indefinite" begin="1.4s" />
              </circle>

              {/* Globe rim */}
              <circle cx="200" cy="200" r="170" fill="none" stroke="#29b5e8" strokeOpacity="0.40" strokeWidth="1.2" />
              {/* Light highlight */}
              <ellipse cx="148" cy="136" rx="64" ry="44" fill="white" fillOpacity="0.055" transform="rotate(-22 148 136)" />
            </svg>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-6 pt-10 pb-12 relative">
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute top-10 right-10 w-96 h-96 bg-blue-500 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-20 w-64 h-64 bg-indigo-400 rounded-full blur-3xl" />
          </div>
          <div className="relative">
            {/* Left: text — restored to original max-w-3xl */}
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 bg-blue-600/30 border border-blue-500/40 rounded-full px-4 py-1.5 text-sm text-blue-300 mb-8">
                <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
                {t('グローバルエンジニア・リソースプロバイダー', 'Global Engineer Resource Provider')}
              </div>
              <h1 className="text-5xl md:text-6xl font-black leading-tight mb-4">
                {lang === 'en' ? (
                  <><span className="text-blue-400">Global Engineers,</span><br />Ready to Deliver.</>
                ) : (
                  <>海外エンジニア採用を、<br /><span className="text-blue-400">もっとシンプルに。</span></>
                )}
              </h1>
              <p className="text-blue-300 text-lg mb-6 font-medium">
                {t(
                  '世界の優秀なエンジニアと日本企業をつなぐ架け橋に。',
                  'The bridge connecting world-class engineers with Japanese companies.'
                )}
              </p>
              <p className="text-xl text-slate-300 leading-relaxed mb-10">
                {t(
                  'IT人材不足・DX推進でお悩みの企業へ。海外の高スキルエンジニアをフリーランス契約で週単位からご提供。採用コスト・手間なしで即戦力エンジニアを活用できます。',
                  'VTaBridge connects Japanese companies with highly skilled overseas engineers through B2B coordination. No hiring costs, no employment risk — just the talent you need, when you need it.'
                )}
              </p>
              <div className="flex flex-wrap gap-4 mb-12">
                <Link
                  href="/contact"
                  className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-xl font-bold text-lg transition-colors shadow-lg shadow-blue-900/50"
                >
                  {t('無料相談を申し込む', 'Get a Free Consultation')}
                </Link>
                <Link
                  href="/services"
                  className="border border-slate-500 hover:border-slate-300 text-slate-300 hover:text-white px-8 py-4 rounded-xl font-semibold text-lg transition-colors"
                >
                  {t('事業内容を見る', 'View Services')}
                </Link>
              </div>
              <div className="grid grid-cols-3 gap-8 max-w-sm">
                {[
                  { value: t('週単位', 'Within weeks'), label: t('マッチングスピード', 'Matching Speed') },
                  { value: '¥0', label: t('採用コスト', 'Hiring Cost') },
                  { value: '3', label: t('対応サービス', 'Core Services') },
                ].map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className="text-3xl font-bold text-blue-400 mb-1">{stat.value}</div>
                    <div className="text-xs text-slate-400">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="h-16 bg-white [clip-path:ellipse(120%_100%_at_50%_100%)]" />
      </section>

      {/* Problem */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="text-blue-700 font-semibold text-sm uppercase tracking-widest mb-3">PROBLEM</div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('日本企業が直面するエンジニア不足', "Japan's Growing Engineer Shortage")}
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto leading-relaxed">
              {lang === 'en' ? (
                <>According to METI projections, Japan faces a shortage of up to <strong className="text-gray-900">790,000 IT professionals</strong> by 2030. Companies are struggling to build internal development teams despite growing demand for digitalization.</>
              ) : (
                <>経済産業省の試算では、2030年までにIT人材が最大<strong className="text-gray-900">79万人不足</strong>する見通し。DXを推進したいのに、エンジニアが確保できない企業が急増しています。</>
              )}
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: '💸',
                ja: { title: '採用コストの高騰', desc: '国内エンジニア採用競争が激化し、採用単価・期間の両面でコストが急上昇。' },
                en: { title: 'Soaring Hiring Costs', desc: 'Fierce domestic competition has driven up the cost and time required to recruit engineers.' },
              },
              {
                icon: '⏳',
                ja: { title: 'DX推進の遅延', desc: '内製化を目指すも即戦力エンジニアが確保できず、DX・新規開発が停滞。' },
                en: { title: 'Stalled Digital Projects', desc: 'Without the engineers they need, companies cannot execute their DX and development roadmaps.' },
              },
              {
                icon: '🌐',
                ja: { title: '海外活用のハードル', desc: '言語障壁・法務・管理コストが大きく、自社での海外エンジニア活用が困難。' },
                en: { title: 'Barriers to Global Talent', desc: 'Language gaps, legal complexity, and management overhead make direct overseas hiring impractical.' },
              },
            ].map((p) => (
              <div key={p.en.title} className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                <div className="text-4xl mb-4">{p.icon}</div>
                <h3 className="font-bold text-lg text-gray-900 mb-2">{lang === 'en' ? p.en.title : p.ja.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{lang === 'en' ? p.en.desc : p.ja.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 bg-blue-50 border border-blue-100 rounded-2xl p-6 text-center">
            <p className="text-blue-900 font-semibold text-lg">
              {t(
                'VTaBridgeは、この課題をコスト・品質・スピードの三拍子で解決します。',
                'VTaBridge solves this with a combination of cost efficiency, quality assurance, and speed.'
              )}
            </p>
          </div>
        </div>
      </section>

      {/* Services overview */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="text-blue-700 font-semibold text-sm uppercase tracking-widest mb-3">SERVICES</div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('提供サービス', 'What We Offer')}
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              {t(
                'エンジニア調達から稼働管理まで、ワンストップでサポートします。',
                'From engineer sourcing to ongoing operations management — all under one roof.'
              )}
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {serviceList.map((s) => (
              <div key={s.title} className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-blue-200 hover:shadow-md transition-all group">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-700 mb-4 group-hover:bg-blue-700 group-hover:text-white transition-colors">
                  {s.icon}
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{s.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-blue-700 font-semibold hover:gap-3 transition-all"
            >
              {t('詳しく見る', 'View all services')}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Strengths teaser */}
      <section className="py-20 px-6 bg-slate-900 text-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="text-blue-400 font-semibold text-sm uppercase tracking-widest mb-3">WHY VTBRIDGE</div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t('VTaBridgeが選ばれる理由', 'Why Companies Choose VTaBridge')}
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            {[
              {
                ja: { title: '採用リスクゼロ', desc: '業務委託契約のため、人件費・社会保険の負担なし。必要な期間だけ柔軟に活用できます。' },
                en: { title: 'Zero Hiring Risk', desc: 'Freelance contracts mean no employment costs or social insurance obligations. Use engineers only when you need them.' },
              },
              {
                ja: { title: '既存ネットワークによるスピード', desc: '海外エンジニアとの既存コネクションにより、週単位でのマッチングが可能です。' },
                en: { title: 'Speed from Day One', desc: 'Our existing network of overseas engineers enables matching within weeks — even days for urgent projects.' },
              },
              {
                ja: { title: '厳選されたエンジニア', desc: 'コーディングテスト・面談・ポートフォリオレビューを通過したエンジニアのみをご紹介します。' },
                en: { title: 'Pre-vetted Engineers', desc: 'Every engineer passes coding tests, interviews, and portfolio reviews before being assigned to your project.' },
              },
              {
                ja: { title: 'IT知見のある担当者', desc: 'IT商流・開発の実務経験を持つ担当者が、要件定義から進捗管理まで一気通貫でサポートします。' },
                en: { title: 'IT-Savvy Coordination', desc: 'Our coordinator brings hands-on IT solution experience, ensuring accurate requirement gathering and technical oversight.' },
              },
            ].map((item, i) => (
              <div key={i} className="bg-slate-800 rounded-2xl p-6 border border-slate-700 hover:border-blue-600/50 transition-colors">
                <div className="text-blue-400 font-bold text-3xl mb-3 font-mono">0{i + 1}</div>
                <h3 className="font-bold text-xl text-white mb-2">
                  {lang === 'en' ? item.en.title : item.ja.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {lang === 'en' ? item.en.desc : item.ja.desc}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-blue-400 font-semibold hover:text-blue-300 transition-colors"
            >
              {t('VTaBridgeについて詳しく', 'Learn more about VTaBridge')}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 bg-gradient-to-br from-blue-700 to-indigo-800 text-white text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {t('まずは無料でご相談ください', 'Start with a Free Consultation')}
          </h2>
          <p className="text-blue-100 text-lg mb-8 leading-relaxed">
            {t(
              'エンジニアリソースの課題や海外エンジニア活用についてのご質問など、お気軽にお問い合わせください。',
              'Tell us about your project needs. We respond within 2 business days.'
            )}
          </p>
          <Link
            href="/contact"
            className="inline-block bg-white text-blue-700 font-bold px-10 py-4 rounded-xl text-lg hover:bg-blue-50 transition-colors shadow-lg"
          >
            {t('お問い合わせはこちら', 'Contact Us')}
          </Link>
        </div>
      </section>
    </div>
  );
}
