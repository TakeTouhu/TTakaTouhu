'use client';
import { useLanguage } from '@/components/LanguageProvider';
import Link from 'next/link';

export default function PrivacyPolicy() {
  const { lang, t } = useLanguage();

  const sections = {
    ja: [
      {
        title: '個人情報の取得',
        body: '当社は、以下の場合に個人情報を取得します。\n・お問い合わせフォームへの入力\n・サービスご利用に際してのご登録\n・メール・電話等によるお問い合わせ\n・名刺等の交換',
      },
      {
        title: '個人情報の利用目的',
        body: '当社は、取得した個人情報を以下の目的で利用します。\n・お問い合わせへの回答および連絡\n・サービスの提供・運営\n・サービス改善・新サービス開発のための分析\n・メールマガジン・お知らせ等の配信（ご同意を得た場合）\n・法令上の義務の履行',
      },
      {
        title: '個人情報の第三者提供',
        body: '当社は、以下の場合を除き、お客様の個人情報を第三者に提供しません。\n・ご本人の同意がある場合\n・法令に基づく場合\n・人の生命・身体・財産の保護のために必要な場合',
      },
      {
        title: '個人情報の委託',
        body: '当社は、業務上必要な範囲で個人情報の取り扱いを外部に委託することがあります。この場合、適切な管理が行われるよう監督します。',
      },
      {
        title: '個人情報の安全管理',
        body: '当社は、個人情報の漏洩・滅失・毀損を防止するため、適切なセキュリティ対策を講じます。',
      },
      {
        title: 'Cookie・アクセス解析',
        body: '当社ウェブサイトでは、利便性向上およびアクセス解析のためにCookieを使用することがあります。ブラウザの設定によりCookieを無効にすることができますが、一部機能が利用できなくなる場合があります。',
      },
      {
        title: '個人情報の開示・訂正・削除',
        body: 'ご本人から個人情報の開示・訂正・削除・利用停止を求められた場合、法令に従い合理的な期間内に対応します。お問い合わせは下記の窓口までご連絡ください。',
      },
      {
        title: 'プライバシーポリシーの変更',
        body: '当社は、法令の改正その他の事由により、本プライバシーポリシーを変更することがあります。変更後の内容は当社ウェブサイトに掲載した時点で効力を生じます。',
      },
    ],
    en: [
      {
        title: 'Collection of Personal Information',
        body: 'The Company collects personal information in the following cases:\n· Input into the contact form\n· Registration for services\n· Inquiries via email, phone, or other means\n· Exchange of business cards',
      },
      {
        title: 'Purpose of Use',
        body: 'The Company uses collected personal information for the following purposes:\n· Responding to and communicating about inquiries\n· Providing and operating services\n· Analysis for service improvement and new service development\n· Sending newsletters and announcements (with consent)\n· Fulfilling legal obligations',
      },
      {
        title: 'Provision to Third Parties',
        body: 'The Company will not provide personal information to third parties except in the following cases:\n· With the consent of the individual\n· When required by law\n· When necessary to protect life, body, or property',
      },
      {
        title: 'Outsourcing',
        body: 'The Company may outsource the handling of personal information to the extent necessary for business operations. In such cases, we will supervise to ensure appropriate management.',
      },
      {
        title: 'Security Management',
        body: 'The Company implements appropriate security measures to prevent leakage, loss, or damage of personal information.',
      },
      {
        title: 'Cookies and Access Analytics',
        body: 'Our website may use cookies to improve usability and for access analysis. You may disable cookies through your browser settings, but some features may become unavailable.',
      },
      {
        title: 'Disclosure, Correction, and Deletion',
        body: 'When an individual requests disclosure, correction, deletion, or suspension of use of their personal information, we will respond within a reasonable period in accordance with applicable law. Please contact us at the address below.',
      },
      {
        title: 'Changes to This Policy',
        body: 'The Company may amend this Privacy Policy due to changes in laws or other reasons. Amendments take effect when posted on our website.',
      },
    ],
  };

  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gradient-to-br from-slate-900 to-blue-950 text-white py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-blue-400 font-semibold text-sm uppercase tracking-widest mb-3">POLICY</div>
          <h1 className="text-3xl md:text-4xl font-bold">
            {t('プライバシーポリシー', 'Privacy Policy')}
          </h1>
        </div>
      </section>

      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <p className="text-sm text-gray-500 mb-6">
            {t('制定日：2026年1月1日', 'Established: January 1, 2026')}
          </p>

          <p className="text-gray-700 leading-relaxed mb-10">
            {t(
              'VTaBridge（以下「当社」）は、お客様の個人情報を適切に取り扱うことを重要な責務と認識し、以下のプライバシーポリシーを定めます。',
              'VTaBridge ("the Company") recognizes the appropriate handling of personal information as an important responsibility and establishes the following Privacy Policy.'
            )}
          </p>

          <div className="space-y-8">
            {sections[lang].map((section, i) => (
              <div key={i}>
                <h2 className="text-base font-bold text-gray-900 mb-2">
                  {i + 1}. {section.title}
                </h2>
                <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">
                  {section.body}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10 bg-gray-50 rounded-2xl p-6 border border-gray-100">
            <h3 className="font-bold text-gray-900 mb-3 text-sm">
              {t('個人情報に関するお問い合わせ窓口', 'Personal Information Inquiries')}
            </h3>
            <p className="text-sm text-gray-700 font-medium">VTaBridge</p>
            <p className="text-sm text-gray-600 mt-1">vtabridge.t.ryuto@gmail.com</p>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-100">
            <Link href="/" className="text-blue-600 hover:underline text-sm">
              {t('← トップページに戻る', '← Back to Home')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
