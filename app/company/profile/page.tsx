'use client';
import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useAuthStore } from '@/lib/authStore';
import { db } from '@/lib/db';

const INDUSTRIES = ['IT・ソフトウェア', 'Webサービス', 'ゲーム', '金融・フィンテック', '医療・ヘルスケア', '製造業', 'コンサルティング', '教育', 'その他'];

function CompanyProfileForm() {
  const { user } = useAuthStore();
  const searchParams = useSearchParams();
  const isSetup = searchParams.get('setup') === '1';

  const [companyName, setCompanyName] = useState('');
  const [representativeName, setRepresentativeName] = useState('');
  const [industry, setIndustry] = useState('');
  const [description, setDescription] = useState('');
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) return;
    const p = db.companyProfiles.findByUserId(user.id);
    if (p) {
      setCompanyName(p.companyName);
      setRepresentativeName(p.representativeName);
      setIndustry(p.industry);
      setDescription(p.description);
    }
  }, [user]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setLoading(true);
    db.companyProfiles.upsert({
      userId: user.id,
      companyName,
      representativeName,
      industry,
      description,
    });
    setSaved(true);
    setLoading(false);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="max-w-2xl">
      {isSetup && (
        <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-4 mb-6">
          <p className="text-indigo-800 font-medium">ようこそ！まず企業情報を登録しましょう</p>
          <p className="text-indigo-700 text-sm mt-1">企業情報を登録することで案件の掲載とエンジニアへの依頼が可能になります。</p>
        </div>
      )}

      <h1 className="text-2xl font-bold text-gray-900 mb-6">企業情報</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">企業名 <span className="text-red-500">*</span></label>
            <input
              type="text"
              required
              value={companyName}
              onChange={e => setCompanyName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="株式会社〇〇"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">代表者名 <span className="text-red-500">*</span></label>
            <input
              type="text"
              required
              value={representativeName}
              onChange={e => setRepresentativeName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="山田 太郎"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">業種 <span className="text-red-500">*</span></label>
            <select
              required
              value={industry}
              onChange={e => setIndustry(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">業種を選択</option>
              {INDUSTRIES.map(ind => <option key={ind} value={ind}>{ind}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">企業説明</label>
            <textarea
              value={description}
              onChange={e => setDescription(e.target.value)}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
              placeholder="事業内容・会社の特徴など"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button
            type="submit"
            disabled={loading}
            className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-medium hover:bg-indigo-700 transition-colors disabled:opacity-50"
          >
            {loading ? '保存中...' : '保存する'}
          </button>
          {saved && <span className="text-green-600 text-sm font-medium">保存しました ✓</span>}
        </div>
      </form>
    </div>
  );
}

export default function CompanyProfilePage() {
  return (
    <Suspense fallback={<div className="text-gray-400 py-8 text-center">読み込み中...</div>}>
      <CompanyProfileForm />
    </Suspense>
  );
}
