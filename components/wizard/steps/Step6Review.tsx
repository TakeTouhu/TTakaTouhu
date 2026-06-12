'use client';

import { useWizard } from '@/lib/store';

export default function Step6Review() {
  const { state, setStep } = useWizard();
  const { basicInfo, officerInfo, shareInfo, businessPurposes, addressInfo } = state;
  const isKabushiki = basicInfo.companyType === '株式会社';

  const Section = ({ title, step, children }: { title: string; step: number; children: React.ReactNode }) => (
    <div className="border border-gray-200 rounded-lg overflow-hidden mb-4">
      <div className="bg-gray-50 px-4 py-3 flex items-center justify-between">
        <h3 className="font-medium text-gray-900 text-sm">{title}</h3>
        <button onClick={() => setStep(step)} className="text-xs text-blue-600 hover:underline">編集</button>
      </div>
      <div className="px-4 py-3 space-y-2 text-sm">{children}</div>
    </div>
  );

  const Row = ({ label, value }: { label: string; value?: string | number | boolean }) => (
    <div className="flex gap-2">
      <span className="text-gray-500 min-w-[140px] text-xs">{label}</span>
      <span className="text-gray-900 flex-1">{String(value ?? '未入力')}</span>
    </div>
  );

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900">入力内容の確認</h2>
        <p className="text-gray-500 text-sm mt-1">以下の内容で定款を作成します。修正が必要な場合は各セクションの「編集」をクリックしてください。</p>
      </div>

      <Section title="基本情報" step={1}>
        <Row label="会社種別" value={basicInfo.companyType} />
        <Row label="会社名" value={basicInfo.companyType && basicInfo.companyName ? `${basicInfo.companyType}${basicInfo.companyName}` : basicInfo.companyName} />
        <Row label="資本金" value={basicInfo.capital ? `${basicInfo.capital.toLocaleString()}円` : undefined} />
        <Row label="事業年度" value={basicInfo.fiscalYearStartMonth ? `${basicInfo.fiscalYearStartMonth}月始まり` : undefined} />
        <Row label="設立予定日" value={basicInfo.establishmentDate} />
      </Section>

      <Section title="役員情報" step={2}>
        {(officerInfo.directors || []).map((d, i) => (
          <div key={d.id} className="flex gap-2">
            <span className="text-gray-500 min-w-[140px] text-xs">{d.isRepresentative ? '代表取締役' : `取締役${i + 1}`}</span>
            <span className="text-gray-900">{d.name}（{d.address}）</span>
          </div>
        ))}
        {officerInfo.auditor && (
          <Row label="監査役" value={`${officerInfo.auditor}（${officerInfo.auditorAddress}）`} />
        )}
      </Section>

      {isKabushiki && (
        <Section title="株式情報" step={3}>
          <Row label="発行可能株式総数" value={shareInfo.authorizedShares ? `${shareInfo.authorizedShares.toLocaleString()}株` : undefined} />
          <Row label="設立時発行株式数" value={shareInfo.issuedShares ? `${shareInfo.issuedShares.toLocaleString()}株` : undefined} />
          <Row label="1株あたり" value={shareInfo.parValue ? `${shareInfo.parValue.toLocaleString()}円` : undefined} />
          <Row label="株式譲渡制限" value={shareInfo.hasTransferRestriction ? 'あり' : 'なし'} />
        </Section>
      )}

      <Section title="事業目的" step={4}>
        {businessPurposes.map((p, i) => (
          <div key={p.id} className="text-gray-900 text-xs">
            {i + 1}. {p.text}
          </div>
        ))}
      </Section>

      <Section title="本店所在地" step={5}>
        <Row
          label="住所"
          value={[addressInfo.prefecture, addressInfo.city, addressInfo.streetAddress, addressInfo.buildingName].filter(Boolean).join('')}
        />
      </Section>

      <div className="bg-blue-50 rounded-lg p-4 text-sm text-blue-700 mb-6">
        <p className="font-medium mb-1">定款作成後について</p>
        <p>作成された定款は電子署名を行い、公証人の認証が必要です。電子定款の場合は印紙代4万円が不要になります。</p>
      </div>

      <div className="flex justify-between">
        <button onClick={() => setStep(5)} className="text-gray-500 hover:text-gray-700 px-4 py-2 rounded-lg transition-colors">
          ← 戻る
        </button>
        <button
          onClick={() => setStep(7)}
          className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          定款を生成する →
        </button>
      </div>
    </div>
  );
}
