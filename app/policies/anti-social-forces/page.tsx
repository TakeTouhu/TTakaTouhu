'use client';
import { useLanguage } from '@/components/LanguageProvider';
import Link from 'next/link';

export default function AntiSocialForces() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gradient-to-br from-slate-900 to-blue-950 text-white py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-blue-400 font-semibold text-sm uppercase tracking-widest mb-3">POLICY</div>
          <h1 className="text-3xl md:text-4xl font-bold">
            {t('反社会的勢力排除方針', 'Anti-Social Forces Exclusion Policy')}
          </h1>
        </div>
      </section>

      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto prose prose-slate">
          <p className="text-sm text-gray-500 mb-10">
            {t('制定日：2026年1月1日', 'Established: January 1, 2026')}
          </p>

          <div className="space-y-10 text-gray-700 leading-relaxed">
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-3">
                {t('基本方針', 'Basic Policy')}
              </h2>
              <p>
                {t(
                  'VTaBridge（以下「当社」）は、社会の秩序や安全に脅威を与える反社会的勢力（暴力団、暴力団員、暴力団準構成員、暴力団関係企業、総会屋、社会運動等標榜ゴロ、特殊知能暴力集団等、これらに準ずる者および関係者、以下同じ）との関係を一切遮断し、反社会的勢力を業務から排除することを基本方針とします。',
                  'VTaBridge ("the Company") adopts a fundamental policy of completely severing any relationships with anti-social forces (including organized crime groups, their members, quasi-members, affiliated enterprises, racketeers, criminal groups disguised as social movements, and similar entities) and excluding them from all business operations.'
                )}
              </p>
            </div>

            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-3">
                {t('取り組み事項', 'Commitments')}
              </h2>
              <ol className="list-decimal pl-5 space-y-3">
                {(t('ja', 'en') === 'ja' ? [
                  '当社は、反社会的勢力との取引関係（委託・受託、資金提供その他一切の関係を含む）を持ちません。',
                  '当社は、契約締結に際し、反社会的勢力でないことを確認するための条項を設けます。',
                  '当社は、取引先が反社会的勢力であることが判明した場合、直ちに契約を解除します。',
                  '当社は、反社会的勢力から不当要求や脅迫を受けた場合、警察・弁護士等の外部専門機関と連携して毅然と対応します。',
                  '当社は、反社会的勢力への資金提供は、いかなる名目があっても行いません。',
                  '当社の役員・従業員は、反社会的勢力との私的な交流・関係を一切持ちません。',
                ] : [
                  'The Company will not engage in any business relationships with anti-social forces, including outsourcing, funding, or any other form of association.',
                  'The Company will include provisions in contracts to confirm that counterparties are not anti-social forces.',
                  'If a counterparty is found to be an anti-social force, the Company will immediately terminate the contract.',
                  'If subjected to unjust demands or threats from anti-social forces, the Company will respond firmly in cooperation with police, attorneys, and other external agencies.',
                  'The Company will not provide funds to anti-social forces under any pretext.',
                  'Officers and employees of the Company will have no private association or relationship with anti-social forces.',
                ]).map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ol>
            </div>

            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-3">
                {t('相談・通報窓口', 'Contact')}
              </h2>
              <p>
                {t(
                  '反社会的勢力に関する相談・通報は、下記窓口までご連絡ください。',
                  'For inquiries or reports regarding anti-social forces, please contact us at the address below.'
                )}
              </p>
              <div className="mt-3 bg-gray-50 rounded-xl p-5 border border-gray-100">
                <p className="text-sm font-medium text-gray-900">VTaBridge</p>
                <p className="text-sm text-gray-600 mt-1">vtabridge.t.ryuto@gmail.com</p>
              </div>
            </div>
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
