'use client';
import { useLanguage } from '@/components/LanguageProvider';
import Link from 'next/link';

export default function InformationSecurity() {
  const { t } = useLanguage();

  const items = {
    ja: [
      {
        title: '情報資産の保護',
        body: '当社が取り扱うお客様情報・個人情報・業務上の機密情報をはじめとするすべての情報資産を適切に保護し、情報の漏洩・滅失・毀損を防止します。',
      },
      {
        title: '法令・規範の遵守',
        body: '情報セキュリティに関する法令、規制、契約上の要求事項、および社内規程を遵守します。',
      },
      {
        title: 'リスク管理',
        body: '情報セキュリティリスクを継続的に識別・評価し、リスクに応じた適切な管理策を実施します。',
      },
      {
        title: '教育・啓発',
        body: '役員・従業員に対して情報セキュリティに関する教育・訓練を定期的に実施し、セキュリティ意識の向上に努めます。',
      },
      {
        title: 'インシデント対応',
        body: '情報セキュリティインシデントが発生した場合は、速やかに対応し、被害の拡大防止および再発防止策を講じます。',
      },
      {
        title: '継続的改善',
        body: '情報セキュリティマネジメントの有効性を定期的に見直し、継続的な改善を図ります。',
      },
    ],
    en: [
      {
        title: 'Protection of Information Assets',
        body: 'We appropriately protect all information assets handled by the Company, including customer information, personal data, and business confidential information, to prevent leakage, loss, or damage.',
      },
      {
        title: 'Compliance with Laws and Regulations',
        body: 'We comply with laws, regulations, contractual requirements, and internal policies related to information security.',
      },
      {
        title: 'Risk Management',
        body: 'We continuously identify and assess information security risks and implement appropriate controls proportionate to those risks.',
      },
      {
        title: 'Education and Awareness',
        body: 'We regularly conduct information security education and training for officers and employees to enhance security awareness.',
      },
      {
        title: 'Incident Response',
        body: 'In the event of an information security incident, we respond promptly to prevent further damage and implement measures to prevent recurrence.',
      },
      {
        title: 'Continuous Improvement',
        body: 'We regularly review the effectiveness of our information security management and strive for continuous improvement.',
      },
    ],
  };

  const { lang } = useLanguage();

  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gradient-to-br from-slate-900 to-blue-950 text-white py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-blue-400 font-semibold text-sm uppercase tracking-widest mb-3">POLICY</div>
          <h1 className="text-3xl md:text-4xl font-bold">
            {t('情報セキュリティ基本方針', 'Information Security Policy')}
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
              'VTaBridge（以下「当社」）は、情報セキュリティを経営上の重要課題と位置づけ、お客様・取引先・従業員等のすべてのステークホルダーの情報資産を適切に保護するため、以下の基本方針を定め、これを遵守します。',
              'VTaBridge ("the Company") positions information security as a critical management issue and establishes the following basic policy to appropriately protect the information assets of all stakeholders, including customers, business partners, and employees.'
            )}
          </p>

          <div className="space-y-6">
            {items[lang].map((item, i) => (
              <div key={i} className="flex gap-5 bg-gray-50 rounded-2xl p-6 border border-gray-100">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-700 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                  {i + 1}
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">{item.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.body}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 bg-slate-900 text-white rounded-2xl p-6">
            <p className="text-slate-300 text-sm leading-relaxed">
              {t(
                '本方針は、当社の全役員・従業員・業務委託先に適用されます。当社代表者は本方針の実施と維持に責任を持ち、定期的に見直しを行います。',
                'This policy applies to all officers, employees, and contractors of the Company. The Company representative is responsible for implementing and maintaining this policy and will review it periodically.'
              )}
            </p>
            <p className="text-slate-400 text-sm mt-3 font-medium">VTaBridge 代表取締役</p>
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
