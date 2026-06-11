import Link from 'next/link';

const steps = [
  { num: 1, title: '基本情報', desc: '会社名・資本金など' },
  { num: 2, title: '役員情報', desc: '取締役・監査役' },
  { num: 3, title: '株式情報', desc: '発行可能株式数など' },
  { num: 4, title: '事業目的', desc: '事業内容の設定' },
  { num: 5, title: '本店所在地', desc: '会社の住所' },
  { num: 6, title: '内容確認', desc: '入力内容の確認' },
  { num: 7, title: '定款出力', desc: 'PDFダウンロード' },
];

const features = [
  {
    icon: '📋',
    title: 'ステップ形式で簡単入力',
    desc: '7つのステップに沿って情報を入力するだけ。難しい法律用語の知識不要で定款が作成できます。',
  },
  {
    icon: '⚡',
    title: '最短15分で完成',
    desc: 'ガイドに従って入力するだけで、法的に正確な定款が自動生成されます。',
  },
  {
    icon: '💾',
    title: '途中保存対応',
    desc: '入力内容は自動的に保存されます。途中でブラウザを閉じても続きから再開可能。',
  },
  {
    icon: '📄',
    title: 'PDF・テキスト出力',
    desc: '完成した定款はPDF形式またはテキスト形式でダウンロードできます。',
  },
];

const companyTypes = [
  { type: '株式会社', desc: '最もポピュラーな法人形態。信頼性が高く、資金調達に有利。' },
  { type: '合同会社', desc: 'LLC。設立費用が安く、柔軟な運営が可能。スタートアップに人気。' },
  { type: '合名会社', desc: '全社員が無限責任。小規模な共同事業向け。' },
  { type: '合資会社', desc: '無限責任社員と有限責任社員で構成。' },
];

export default function Home() {
  return (
    <div className="min-h-screen">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">定</div>
            <span className="font-bold text-xl text-gray-900">定款作成くん</span>
          </div>
          <Link href="/setup" className="bg-blue-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors text-sm">
            無料で作成開始
          </Link>
        </div>
      </header>

      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-4 py-1.5 text-sm mb-6">
            <span className="w-2 h-2 bg-green-400 rounded-full inline-block"></span>
            完全無料・会員登録不要
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            電子定款をかんたん作成
          </h1>
          <p className="text-xl text-blue-100 mb-8 leading-relaxed">
            会社設立に必要な定款を、ステップ形式の入力で最短15分で自動生成。<br />
            株式会社・合同会社など全会社形態に対応。
          </p>
          <Link href="/setup" className="inline-block bg-white text-blue-700 px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-50 transition-colors shadow-lg">
            今すぐ無料で作成する →
          </Link>
          <p className="mt-4 text-blue-200 text-sm">会員登録不要・クレジットカード不要</p>
        </div>
      </section>

      <section className="py-16 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-2">作成の流れ</h2>
          <p className="text-gray-500 text-center mb-10">7つのステップで定款が完成します</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {steps.map((s) => (
              <div key={s.num} className="flex flex-col items-center text-center p-4">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg mb-3">
                  {s.num}
                </div>
                <div className="font-semibold text-gray-900">{s.title}</div>
                <div className="text-sm text-gray-500 mt-1">{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-10">選ばれる理由</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {features.map((f) => (
              <div key={f.title} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="text-3xl mb-3">{f.icon}</div>
                <h3 className="font-bold text-lg mb-2">{f.title}</h3>
                <p className="text-gray-600 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-2">対応会社形態</h2>
          <p className="text-gray-500 text-center mb-10">4つの会社形態に対応しています</p>
          <div className="grid md:grid-cols-2 gap-4">
            {companyTypes.map((c) => (
              <div key={c.type} className="border border-gray-200 rounded-xl p-5 hover:border-blue-300 transition-colors">
                <div className="font-bold text-lg text-blue-700 mb-1">{c.type}</div>
                <div className="text-gray-600 text-sm">{c.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-blue-600 text-white text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">会社設立の第一歩を踏み出しましょう</h2>
          <p className="text-blue-100 mb-8">定款作成くんなら、法律の知識がなくても正確な定款が作れます。</p>
          <Link href="/setup" className="inline-block bg-white text-blue-700 px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-50 transition-colors">
            無料で定款を作成する →
          </Link>
        </div>
      </section>

      <footer className="bg-gray-900 text-gray-400 py-8 px-4 text-center text-sm">
        <p>定款作成くん © 2024 | 本サービスは情報提供を目的としています。法律の専門家への相談をお勧めします。</p>
      </footer>
    </div>
  );
}
