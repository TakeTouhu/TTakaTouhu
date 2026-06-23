import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">V</div>
            <span className="font-bold text-xl text-gray-900">VTa Platform</span>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/auth/login" className="text-sm text-gray-600 hover:text-gray-900 font-medium">
              ログイン
            </Link>
            <Link href="/auth/register" className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
              無料登録
            </Link>
          </div>
        </div>
      </header>

      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-4 py-1.5 text-sm mb-6">
            <span className="w-2 h-2 bg-green-400 rounded-full inline-block"></span>
            VTaBridge公式エンジニアマッチングプラットフォーム
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            フリーランスエンジニアと<br />企業をつなぐプラットフォーム
          </h1>
          <p className="text-xl text-blue-100 mb-10 leading-relaxed">
            エンジニアはスキル・実績を登録して案件を探せます。<br />
            企業は直接エンジニアを検索・依頼できます。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/auth/register?type=engineer"
              className="bg-white text-blue-700 px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-50 transition-colors shadow-lg"
            >
              エンジニアとして登録 →
            </Link>
            <Link
              href="/auth/register?type=company"
              className="bg-blue-500 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-400 transition-colors shadow-lg border border-blue-400"
            >
              企業として登録 →
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-2 text-gray-900">プラットフォームの特徴</h2>
          <p className="text-gray-500 text-center mb-10">エンジニアと企業の双方にメリットを提供します</p>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-blue-50 rounded-2xl p-8">
              <div className="text-3xl mb-4">👨‍💻</div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">エンジニア向け</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-0.5">✓</span>
                  プロフィール・スキル・実績を登録してアピール
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-0.5">✓</span>
                  希望する言語・分野で案件を検索
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-0.5">✓</span>
                  気になる案件に立候補
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-0.5">✓</span>
                  立候補履歴を管理
                </li>
              </ul>
              <Link
                href="/auth/register?type=engineer"
                className="mt-6 inline-block bg-blue-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-700 transition-colors"
              >
                エンジニア登録
              </Link>
            </div>
            <div className="bg-indigo-50 rounded-2xl p-8">
              <div className="text-3xl mb-4">🏢</div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">企業向け</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-indigo-500 mt-0.5">✓</span>
                  案件を掲載してエンジニアを募集
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-500 mt-0.5">✓</span>
                  エンジニアのスキル・実績を詳しく確認
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-500 mt-0.5">✓</span>
                  気になるエンジニアに直接依頼
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-500 mt-0.5">✓</span>
                  自社案件のみ管理（金額は非表示）
                </li>
              </ul>
              <Link
                href="/auth/register?type=company"
                className="mt-6 inline-block bg-indigo-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-indigo-700 transition-colors"
              >
                企業登録
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-10 text-gray-900">セキュリティ・安全への取り組み</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: '🔒', title: '金額情報の保護', desc: '案件の報酬金額はDBに保存されますが、エンジニア側には表示されません。' },
              { icon: '🛡️', title: 'アカウント分離', desc: '企業は自社案件のみ管理可能。他社の案件への不正アクセスを防止。' },
              { icon: '✉️', title: 'VTaBridge経由', desc: '企業からエンジニアへの依頼はVTaBridge営業担当を通じて行われます。' },
            ].map(item => (
              <div key={item.title} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="text-3xl mb-3">{item.icon}</div>
                <h3 className="font-bold text-lg mb-2 text-gray-900">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-blue-600 text-white text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">今すぐ始めましょう</h2>
          <p className="text-blue-100 mb-8">エンジニア・企業どちらも無料で登録できます。</p>
          <Link
            href="/auth/register"
            className="inline-block bg-white text-blue-700 px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-50 transition-colors"
          >
            無料で登録する →
          </Link>
        </div>
      </section>

      <footer className="bg-gray-900 text-gray-400 py-8 px-4 text-center text-sm">
        <p>VTa Platform © 2025 VTaBridge | フリーランスエンジニアマッチングプラットフォーム</p>
      </footer>
    </div>
  );
}
