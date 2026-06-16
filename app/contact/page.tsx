'use client';
import { useState } from 'react';
import { useLanguage } from '@/components/LanguageProvider';

export default function Contact() {
  const { lang, t } = useLanguage();
  const [submitted, setSubmitted] = useState(false);

  const serviceOptions = lang === 'en'
    ? ['Engineer Matching', 'Contract & Operations Management', 'Technical Advisory', 'Onboarding Support', 'General inquiry']
    : ['エンジニアマッチング', '契約・稼働管理', '技術選定アドバイス', 'オンボーディング支援', 'その他・一般的なお問い合わせ'];

  const infos = lang === 'en'
    ? [
        { icon: '📧', title: 'Email', value: 'contact@vtbridge.jp' },
        { icon: '⏱', title: 'Response Time', value: 'Within 2 business days' },
        { icon: '💬', title: 'Languages', value: 'Japanese / English' },
      ]
    : [
        { icon: '📧', title: 'メールアドレス', value: 'contact@vtbridge.jp' },
        { icon: '⏱', title: '返信目安', value: '2営業日以内' },
        { icon: '💬', title: '対応言語', value: '日本語 / English' },
      ];

  return (
    <div className="min-h-screen bg-white">
      {/* Page Header */}
      <section className="bg-gradient-to-br from-slate-900 to-blue-950 text-white py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-blue-400 font-semibold text-sm uppercase tracking-widest mb-3">CONTACT</div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            {t('お問い合わせ', 'Contact Us')}
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl leading-relaxed">
            {t(
              'エンジニアリソースの課題や海外エンジニア活用についてのご質問など、お気軽にご連絡ください。',
              'Have questions about engineer resources or overseas talent? We\'d love to hear from you.'
            )}
          </p>
        </div>
      </section>

      <section className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto grid md:grid-cols-5 gap-12">
          {/* Contact Info */}
          <div className="md:col-span-2 space-y-8">
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                {t('お気軽にどうぞ', 'Get in Touch')}
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed">
                {t(
                  '初回相談は無料です。まずはどんなエンジニアが必要か、どのくらいの期間・予算感かを教えていただければ、最適なプランをご提案します。',
                  'Initial consultations are free. Just share what kind of engineer you need, your timeline, and rough budget — and we\'ll put together the best solution for you.'
                )}
              </p>
            </div>
            <div className="space-y-4">
              {infos.map((info) => (
                <div key={info.title} className="flex items-start gap-3">
                  <div className="text-2xl">{info.icon}</div>
                  <div>
                    <div className="text-xs text-gray-500 font-medium mb-0.5">{info.title}</div>
                    <div className="text-gray-900 font-semibold text-sm">{info.value}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-blue-50 rounded-2xl p-5 border border-blue-100">
              <h3 className="font-bold text-gray-900 mb-2 text-sm">
                {t('こんなお悩みがある方はぜひ', 'Common reasons to reach out')}
              </h3>
              <ul className="space-y-2 text-sm text-gray-600">
                {(lang === 'en' ? [
                  'Need engineers fast but can\'t hire locally',
                  'DX project is stalled due to lack of developers',
                  'Curious about overseas engineer costs & quality',
                  'Looking for a reliable subcontractor',
                ] : [
                  'エンジニアが急ぎで必要だが採用が難しい',
                  'DXプロジェクトがエンジニア不足で停滞している',
                  '海外エンジニアのコスト・品質を知りたい',
                  '信頼できる協力会社を探している',
                ]).map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="text-blue-600 mt-0.5">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Form */}
          <div className="md:col-span-3">
            {submitted ? (
              <div className="flex flex-col items-center justify-center h-full py-16 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {t('送信完了しました！', 'Message Sent!')}
                </h3>
                <p className="text-gray-500">
                  {t('2営業日以内にご返答いたします。', 'We\'ll get back to you within 2 business days.')}
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-6 text-blue-700 font-semibold hover:underline text-sm"
                >
                  {t('別のお問い合わせをする', 'Send another message')}
                </button>
              </div>
            ) : (
              <form
                className="space-y-5"
                onSubmit={(e) => {
                  e.preventDefault();
                  setSubmitted(true);
                }}
              >
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t('お名前', 'Full Name')} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder={t('山田 太郎', 'Jane Smith')}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t('会社名', 'Company Name')} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder={t('株式会社〇〇', 'Acme Corp')}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t('メールアドレス', 'Email Address')} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="example@company.com"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t('ご用件', 'Topic')}
                  </label>
                  <select className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow bg-white">
                    <option value="">{t('選択してください', 'Select a topic')}</option>
                    {serviceOptions.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t('お問い合わせ内容', 'Message')} <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    required
                    rows={5}
                    placeholder={t(
                      '必要なエンジニアのスキル、期間、ご予算感など、お気軽にご記入ください。',
                      'Please describe the engineer skills you need, the project duration, and your rough budget.'
                    )}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-700 hover:bg-blue-800 text-white font-bold py-4 rounded-xl transition-colors text-base"
                >
                  {t('送信する', 'Send Message')}
                </button>
                <p className="text-xs text-gray-400 text-center">
                  {t(
                    '入力情報はお問い合わせ対応のみに使用します。',
                    'Your information will only be used to respond to your inquiry.'
                  )}
                </p>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
