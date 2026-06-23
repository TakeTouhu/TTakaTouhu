'use client';
import { useLanguage } from '@/components/LanguageProvider';
import Link from 'next/link';

const steps = {
  ja: [
    { num: '01', title: 'ヒアリング', desc: '必要なスキルセット・稼働期間・予算感・チーム体制をヒアリングし、最適な人材像を定義します。' },
    { num: '02', title: '候補者選定・提案', desc: 'ネットワークからスクリーニングした候補者を複数名ご提案。スキルシートと実績資料を提供します。' },
    { num: '03', title: '顔合わせ面談', desc: 'オンラインにてエンジニアとの顔合わせを設定。技術的な質問や相性確認の場を設けます。' },
    { num: '04', title: '契約・NDA締結', desc: '業務委託契約・NDA締結をサポート。法務リスクを最小化した契約フォームを提供します。' },
    { num: '05', title: '稼働開始・管理', desc: '稼働時間の記録・成果物レビュー・週次報告を弊社が代行。クライアントの管理負担を大幅削減します。' },
  ],
  en: [
    { num: '01', title: 'Requirements Hearing', desc: 'We define the ideal candidate profile by listening to required skills, duration, budget, and team structure.' },
    { num: '02', title: 'Candidate Proposal', desc: 'We screen our network and present multiple candidates with skill sheets and portfolio materials.' },
    { num: '03', title: 'Introductory Meeting', desc: 'We arrange an online meeting with the engineer for technical Q&A and chemistry check.' },
    { num: '04', title: 'Contract & NDA', desc: 'We support contract and NDA execution with templates designed to minimize legal risk.' },
    { num: '05', title: 'Operations & Reporting', desc: 'We handle hours tracking, deliverable review, and weekly reporting — reducing your management overhead.' },
  ],
};

const included = {
  ja: [
    '要件ヒアリング・候補者提案（無料）',
    '顔合わせ面談のセッティング',
    '業務委託契約・NDA締結サポート',
    '稼働時間の記録・管理',
    '成果物レビューの代行',
    '週次進捗レポートの提供',
    'トラブル発生時のエスカレーション対応',
  ],
  en: [
    'Requirements hearing & candidate proposal (free)',
    'Introductory meeting arrangement',
    'Contract & NDA execution support',
    'Working hours tracking & management',
    'Deliverable review on your behalf',
    'Weekly progress reporting',
    'Escalation support in case of issues',
  ],
};

const results = {
  ja: [
    { value: '最短3日', label: '候補者提案までのスピード', note: '既存ネットワークからの即時マッチング' },
    { value: '複数名', label: '同時提案可能な候補者数', note: 'スクリーニング済みエンジニアをご提案' },
    { value: '週単位', label: '最短稼働開始', note: '合意後すぐに稼働をスタート可能' },
    { value: '0円', label: '採用コスト', label2: '（業務委託のため）', note: '社会保険・採用費は不要' },
  ],
  en: [
    { value: '3 days', label: 'Time to first proposal', note: 'Immediate matching from existing network' },
    { value: 'Multiple', label: 'Candidates per proposal', note: 'Pre-screened engineers presented at once' },
    { value: 'Weekly', label: 'Minimum start time', note: 'Can begin immediately after agreement' },
    { value: '¥0', label: 'Hiring cost', label2: '(freelance contract)', note: 'No social insurance or recruiting fees' },
  ],
};

export default function EngineerOutsourcing() {
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
          <div className="text-blue-400 font-semibold text-sm uppercase tracking-widest mb-3">SERVICE 01</div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            {t('海外エンジニアの委託派遣・開発', 'Overseas Engineer Outsourcing & Development')}
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl leading-relaxed">
            {t(
              '要件ヒアリングから稼働管理・報告まで、海外エンジニア活用をワンストップで支援します。',
              'From requirements hearing to operations management, we support overseas engineer utilization end-to-end.'
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
              'VTaBridgeは、IT人材不足に悩む日本企業と、世界の優秀なエンジニアをつなぐコーディネーション事業を展開しています。単なる人材紹介ではなく、要件定義から稼働後の管理・報告まで、プロジェクトの成功を一気通貫でサポートします。',
              'VTaBridge connects Japanese companies facing IT talent shortages with skilled overseas engineers. We go beyond simple placement — we support your project end-to-end from requirements definition through post-engagement management and reporting.'
            )}
          </p>
          <p className="text-gray-600 leading-relaxed text-lg">
            {t(
              '業務委託契約を活用することで、正社員採用に比べてコスト・リスクを大幅に抑えながら、必要なタイミングで即戦力のエンジニアを確保できます。',
              'By leveraging freelance contracts, you can secure ready-to-deploy engineers exactly when you need them — at significantly lower cost and risk than full-time hiring.'
            )}
          </p>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-10">{t('ご利用の流れ', 'How It Works')}</h2>
          <div className="space-y-6">
            {steps[lang].map((step, i) => (
              <div key={step.num} className="flex gap-6 items-start">
                <div className="flex-shrink-0 w-14 h-14 bg-blue-700 rounded-2xl flex items-center justify-center text-white font-mono font-bold text-sm">
                  {step.num}
                </div>
                <div className="flex-1 pt-1">
                  <h3 className="font-bold text-gray-900 text-lg mb-1">{step.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{step.desc}</p>
                </div>
                {i < steps[lang].length - 1 && (
                  <div className="absolute left-7 mt-14 w-0.5 h-6 bg-blue-200" style={{ display: 'none' }} />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">{t('含まれるサポート', "What's Included")}</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {included[lang].map((item) => (
              <div key={item} className="flex items-start gap-3 bg-blue-50 rounded-xl px-5 py-4 border border-blue-100">
                <span className="text-blue-600 font-bold mt-0.5">✓</span>
                <span className="text-gray-800 text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="py-16 px-6 bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-2">{t('サービスの特長', 'Service Highlights')}</h2>
          <p className="text-slate-400 mb-10 text-sm">{t('既存ネットワークを活用した迅速なマッチングを実現します。', 'Leveraging our existing network for fast, reliable matching.')}</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {results[lang].map((r) => (
              <div key={r.label} className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
                <div className="text-3xl font-black text-blue-400 mb-1">{r.value}</div>
                <div className="text-white font-semibold text-sm mb-0.5">{r.label}</div>
                {r.label2 && <div className="text-slate-400 text-xs mb-1">{r.label2}</div>}
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
            {t('必要なスキルや期間についてお気軽にご相談ください。', 'Tell us what skills you need and when. We\'ll take it from there.')}
          </p>
          <Link href="/contact" className="inline-block bg-white text-blue-700 font-bold px-8 py-4 rounded-xl text-lg hover:bg-blue-50 transition-colors">
            {t('お問い合わせはこちら', 'Contact Us')}
          </Link>
        </div>
      </section>
    </div>
  );
}
