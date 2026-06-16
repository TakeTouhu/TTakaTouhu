'use client';
import Link from 'next/link';
import { useLanguage } from '@/components/LanguageProvider';

export default function About() {
  const { lang, t } = useLanguage();

  const strengths = lang === 'en'
    ? [
        {
          num: '01',
          title: 'Zero Hiring Risk',
          desc: 'Freelance-based contracts mean no employment liability, no social insurance costs, and no long-term commitment. Engage engineers for exactly the duration you need.',
        },
        {
          num: '02',
          title: 'Speed from Day One',
          desc: 'Thanks to our established engineer network, we can propose candidates within days and deploy within weeks — even for urgent, short-notice projects.',
        },
        {
          num: '03',
          title: 'Pre-vetted Quality',
          desc: 'Every engineer goes through coding tests, interviews, and portfolio reviews before assignment. You get proven talent, not a roll of the dice.',
        },
        {
          num: '04',
          title: 'IT-Savvy Coordination',
          desc: 'Our coordinator has hands-on IT solution sales experience, enabling accurate requirement gathering and seamless technical project management.',
        },
      ]
    : [
        {
          num: '01',
          title: '採用リスクゼロのフリーランス型',
          desc: '業務委託契約のため、人件費・社会保険の負担なし。必要な期間だけ即戦力エンジニアを柔軟に活用できます。',
        },
        {
          num: '02',
          title: '既存ネットワークによるスピード',
          desc: '海外エンジニアとの既存コネクションにより、週単位でのマッチングが可能。急ぎの案件にも柔軟に対応します。',
        },
        {
          num: '03',
          title: '厳選された高品質なエンジニア',
          desc: 'アサイン前にコーディングテスト・面談・ポートフォリオレビューを実施。厳選されたエンジニアのみをご紹介します。',
        },
        {
          num: '04',
          title: 'IT知見のある担当者による一気通貫サポート',
          desc: 'IT商流・開発知識を持つ担当者が要件定義から進捗管理まで対応。技術的な会話も安心して任せられます。',
        },
      ];

  const values = lang === 'en'
    ? [
        { title: 'Transparency', desc: 'Clear pricing, honest timelines, and open communication throughout every engagement.' },
        { title: 'Quality First', desc: 'We never compromise on engineer quality. Every candidate is rigorously evaluated before introduction.' },
        { title: 'Long-term Partnership', desc: 'We aim to be your trusted, ongoing partner for global engineering talent — not just a one-time vendor.' },
        { title: 'Speed & Agility', desc: 'We move at the pace of your business. Fast matching, flexible contracts, rapid onboarding.' },
      ]
    : [
        { title: '透明性', desc: '明確な料金体系、正直なスケジュール、オープンなコミュニケーションを徹底します。' },
        { title: '品質第一', desc: 'エンジニアの品質に妥協しません。すべての候補者は紹介前に厳格な評価を実施します。' },
        { title: '長期パートナーシップ', desc: '一度限りの取引ではなく、信頼できる継続的なパートナーとして貴社の成長を支援します。' },
        { title: 'スピードと柔軟性', desc: 'ビジネスのスピードに合わせて動きます。迅速なマッチング・柔軟な契約・素早いオンボーディング。' },
      ];

  return (
    <div className="min-h-screen bg-white">
      {/* Page Header */}
      <section className="bg-gradient-to-br from-slate-900 to-blue-950 text-white py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-blue-400 font-semibold text-sm uppercase tracking-widest mb-3">ABOUT VTBRIDGE</div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            {t('VTaBridgeについて', 'About VTaBridge')}
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl leading-relaxed">
            {t(
              '日本企業のエンジニア不足を解消するために生まれた、グローバルエンジニア・リソースプロバイダーです。',
              'Born to solve Japan\'s engineer shortage — a global resource provider bridging Japanese companies with skilled overseas talent.'
            )}
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-14 items-center">
          <div>
            <div className="text-blue-700 font-semibold text-sm uppercase tracking-widest mb-3">MISSION</div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              {t(
                '「つなぐ」ことで、\nビジネスの可能性を広げる',
                'Expanding business potential\nthrough connection'
              )}
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              {t(
                'VTaBridgeは、優秀な海外エンジニアと日本企業の間にある壁を取り除くことを使命としています。言語の壁、採用の手間、コスト、品質への不安——これらすべてをまとめて解決し、日本企業が世界のエンジニアリング力を活用できる環境を整えます。',
                'VTaBridge\'s mission is to remove the barriers between skilled overseas engineers and Japanese companies. Language gaps, hiring complexity, cost concerns, quality uncertainty — we address all of these so that Japanese businesses can confidently tap into global engineering talent.'
              )}
            </p>
            <p className="text-gray-600 leading-relaxed">
              {t(
                '小規模・高品質なブティック型サービスとして、一社一社に丁寧に向き合いながら、ビジネスの成長を支援します。',
                'As a boutique, high-quality service, we give each client the personal attention they deserve while helping their businesses grow.'
              )}
            </p>
          </div>
          <div className="bg-gradient-to-br from-blue-700 to-indigo-800 rounded-2xl p-8 text-white">
            <div className="text-blue-300 text-sm font-semibold mb-6 uppercase tracking-widest">Vision</div>
            <p className="text-2xl font-bold leading-snug mb-6">
              {t(
                '海外エンジニア活用を、\n日本企業の標準にする',
                'Making global engineering\nresources standard practice\nfor Japanese companies'
              )}
            </p>
            <div className="border-t border-blue-600 pt-6 space-y-3 text-sm text-blue-200">
              <div className="flex items-center gap-2">
                <span className="text-blue-400">▸</span>
                {t('DX推進をエンジニア不足で止めない', 'DX initiatives that don\'t stall due to talent gaps')}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-blue-400">▸</span>
                {t('採用コストを最小化しながら即戦力を確保', 'Immediate productivity at minimal hiring cost')}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-blue-400">▸</span>
                {t('国境を越えた開発チームの当たり前化', 'Cross-border development teams as the norm')}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Strengths */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="text-blue-700 font-semibold text-sm uppercase tracking-widest mb-3">STRENGTHS</div>
            <h2 className="text-3xl font-bold text-gray-900">
              {t('VTaBridgeの強み', 'Our Strengths')}
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            {strengths.map((s) => (
              <div key={s.num} className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-blue-200 hover:shadow-md transition-all">
                <div className="text-blue-600 font-bold text-3xl font-mono mb-3">{s.num}</div>
                <h3 className="font-bold text-xl text-gray-900 mb-2">{s.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Founder */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="text-blue-700 font-semibold text-sm uppercase tracking-widest mb-3">FOUNDER</div>
            <h2 className="text-3xl font-bold text-gray-900">
              {t('創業者について', 'About the Founder')}
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-10 items-start">
            <div className="bg-gradient-to-br from-slate-900 to-blue-950 rounded-2xl p-8 text-white">
              <div className="text-blue-400 text-sm font-semibold mb-2">{t('代表', 'Founder & CEO')}</div>
              <div className="text-3xl font-bold mb-1">髙橋 龍飛</div>
              <div className="text-slate-400 mb-6">Ryuto Takahashi</div>
              <div className="space-y-3 text-sm text-slate-300">
                {(lang === 'en' ? [
                  'IT solution sales professional with hands-on project experience',
                  'Bilingual English-Japanese business communication',
                  'Established overseas engineer network',
                  'Knowledge of cloud, security, and software development',
                  'Proven track record in B2B client acquisition',
                ] : [
                  'ITソリューション営業の実務経験',
                  '英日バイリンガルビジネスコミュニケーション',
                  '海外エンジニアとの既存ネットワーク',
                  'クラウド・セキュリティ・開発知識',
                  '新規顧客開拓・営業の実績',
                ]).map((item) => (
                  <div key={item} className="flex items-start gap-2">
                    <span className="text-blue-400 mt-0.5">▸</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {t('創業者の強みが、そのままサービスの強みに', "The founder's strengths are the service's strengths")}
              </h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                {t(
                  'VTaBridgeは、ITソリューション営業の実務経験、英日バイリンガルコミュニケーション能力、そして海外エンジニアとの既存ネットワークを活かして立ち上げたサービスです。',
                  'VTaBridge was built on a foundation of IT solution sales experience, bilingual English-Japanese communication, and an established overseas engineer network.'
                )}
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                {t(
                  '顧客企業が何に困っているかを即座に理解し、最適なエンジニアを素早く調達する——このサイクルを高速で回せることが、VTaBridgeの最大の競争優位です。',
                  'The ability to quickly understand what clients need and rapidly source the right engineer is VTaBridge\'s core competitive advantage — and it comes directly from the founder\'s background.'
                )}
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-800 transition-colors"
              >
                {t('相談してみる', 'Get in touch')}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CEO Message */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="text-blue-700 font-semibold text-sm uppercase tracking-widest mb-3">MESSAGE</div>
            <h2 className="text-3xl font-bold text-gray-900">
              {t('代表者メッセージ', "A Message from Our Founder")}
            </h2>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="bg-gradient-to-br from-slate-900 to-blue-950 px-8 py-6 flex items-center gap-4">
              <div className="w-14 h-14 bg-blue-700 rounded-full flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                髙
              </div>
              <div className="text-white">
                <div className="font-bold text-lg">髙橋 龍飛</div>
                <div className="text-blue-300 text-sm">Ryuto Takahashi — {t('代表', 'Founder & CEO')}, VTaBridge</div>
              </div>
            </div>
            <div className="px-8 py-8">
              {lang === 'en' ? (
                <div className="space-y-5 text-gray-700 leading-relaxed">
                  <p>
                    Japan faces a serious and growing shortage of IT talent, driven by an aging population and the rapid acceleration of digital transformation. At the same time, around the world, there are countless engineers with outstanding technical skills and deep experience — but not always the right opportunity to put those skills to work.
                  </p>
                  <p>
                    I founded VTaBridge with one clear conviction: <span className="font-semibold text-gray-900">I want to be the bridge that connects these two worlds.</span>
                  </p>
                  <p>
                    Differences in nationality or language do not diminish the quality of engineering skill, or the passion to create something valuable. By connecting the IT talent that Japanese companies need with engineers making their mark on the global stage, we aim to help businesses grow and overcome their resource challenges.
                  </p>
                  <p>
                    Our goal is not simply to match people — it is to build meaningful, lasting relationships for both clients and engineers alike, growing together as long-term partners.
                  </p>
                  <p>
                    We will continue to contribute to the success of Japanese companies through the power of global talent.
                  </p>
                </div>
              ) : (
                <div className="space-y-5 text-gray-700 leading-relaxed">
                  <p>
                    日本では少子高齢化やDX推進の加速により、IT人材不足が大きな課題となっています。一方で、海外には高い技術力と豊富な経験を持ちながら、その能力を十分に発揮する機会に恵まれていない優秀なエンジニアが数多く存在します。
                  </p>
                  <p>
                    私は、この両者をつなぐ架け橋になりたいという想いから当社を設立しました。
                  </p>
                  <p>
                    国籍や言語の違いはあっても、優れた技術力や価値を生み出したいという情熱に違いはありません。私たちは、日本企業が必要とする優秀なIT人材と、世界で活躍するエンジニアを結び付けることで、人材不足の解消と企業の成長を支援してまいります。
                  </p>
                  <p>
                    単なる人材紹介ではなく、お客様とエンジニア双方にとって価値のある関係を築き、長期的なパートナーとして共に成長していくことを目指しています。
                  </p>
                  <p>
                    これからも、グローバルな人材活用を通じて、日本企業のさらなる発展に貢献してまいります。
                  </p>
                </div>
              )}
              <div className="mt-8 pt-6 border-t border-gray-100 flex items-center gap-3">
                <div className="text-sm text-gray-500">{t('代表', 'Founder & CEO')}</div>
                <div className="font-bold text-gray-900">髙橋 龍飛 <span className="font-normal text-gray-500 text-sm">/ Ryuto Takahashi</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="text-blue-700 font-semibold text-sm uppercase tracking-widest mb-3">VALUES</div>
            <h2 className="text-3xl font-bold text-gray-900">
              {t('大切にしている価値観', 'Our Values')}
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map((v) => (
              <div key={v.title} className="bg-white rounded-2xl p-5 border border-gray-100 text-center hover:border-blue-200 transition-colors">
                <h3 className="font-bold text-lg text-gray-900 mb-2">{v.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
