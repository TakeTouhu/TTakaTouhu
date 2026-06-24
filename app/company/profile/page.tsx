'use client';
import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/authStore';
import { db } from '@/lib/db';

const INDUSTRIES = ['IT・ソフトウェア', 'Webサービス', 'ゲーム', '金融・フィンテック', '医療・ヘルスケア', '製造業', 'コンサルティング', '教育', 'その他'];

function CompanyProfileForm() {
  const { user, logout } = useAuthStore();
  const router = useRouter();
  const searchParams = useSearchParams();
  const isSetup = searchParams.get('setup') === '1';

  const [companyName, setCompanyName] = useState('');
  const [representativeName, setRepresentativeName] = useState('');
  const [industry, setIndustry] = useState('');
  const [description, setDescription] = useState('');
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState('');
  const [deleting, setDeleting] = useState(false);

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

  const handleDeleteAccount = () => {
    if (!user || deleteConfirmText !== 'DELETE') return;
    setDeleting(true);
    db.deleteAccount(user.id, 'company');
    logout();
    router.push('/');
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

      <div className="mt-12 border-t border-red-100 pt-8">
        <h2 className="text-lg font-semibold text-red-700 mb-2">危険な操作</h2>
        <p className="text-sm text-gray-500 mb-4">
          アカウントを削除すると、企業情報・掲載案件・すべての依頼履歴が完全に削除されます。この操作は取り消せません。
        </p>
        {!showDeleteConfirm ? (
          <button
            type="button"
            onClick={() => setShowDeleteConfirm(true)}
            className="border border-red-300 text-red-600 px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-red-50 transition-colors"
          >
            アカウントを削除する
          </button>
        ) : (
          <div className="bg-red-50 border border-red-200 rounded-xl p-5 space-y-4 max-w-md">
            <p className="text-sm font-medium text-red-800">
              本当にアカウントを削除しますか？
            </p>
            <p className="text-sm text-red-700">
              確認のため、下のフィールドに <strong>DELETE</strong> と入力してください。
            </p>
            <input
              type="text"
              value={deleteConfirmText}
              onChange={e => setDeleteConfirmText(e.target.value)}
              placeholder="DELETE"
              className="w-full px-3 py-2 border border-red-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 text-sm"
            />
            <div className="flex gap-3">
              <button
                type="button"
                onClick={handleDeleteAccount}
                disabled={deleteConfirmText !== 'DELETE' || deleting}
                className="bg-red-600 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-red-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {deleting ? '削除中...' : '完全に削除する'}
              </button>
              <button
                type="button"
                onClick={() => { setShowDeleteConfirm(false); setDeleteConfirmText(''); }}
                className="border border-gray-300 text-gray-600 px-5 py-2 rounded-lg text-sm hover:bg-gray-50 transition-colors"
              >
                キャンセル
              </button>
            </div>
          </div>
        )}
      </div>
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
