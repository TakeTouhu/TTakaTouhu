'use client';
import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useAuthStore } from '@/lib/authStore';
import { db } from '@/lib/db';
import { EngineerProfile, Achievement } from '@/lib/types';

function AchievementForm({
  achievement,
  onChange,
  onRemove,
}: {
  achievement: Achievement;
  onChange: (a: Achievement) => void;
  onRemove: () => void;
}) {
  return (
    <div className="bg-gray-50 rounded-xl p-4 space-y-3">
      <div>
        <label className="block text-xs font-medium text-gray-600 mb-1">プロジェクト名</label>
        <input
          type="text"
          value={achievement.projectName}
          onChange={e => onChange({ ...achievement, projectName: e.target.value })}
          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="プロジェクト名"
        />
      </div>
      <div>
        <label className="block text-xs font-medium text-gray-600 mb-1">説明</label>
        <textarea
          value={achievement.description}
          onChange={e => onChange({ ...achievement, description: e.target.value })}
          rows={2}
          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          placeholder="プロジェクトの概要・担当業務"
        />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">開始年月</label>
          <input
            type="month"
            value={achievement.startDate}
            onChange={e => onChange({ ...achievement, startDate: e.target.value })}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">終了年月</label>
          <input
            type="month"
            value={achievement.endDate}
            onChange={e => onChange({ ...achievement, endDate: e.target.value })}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
      <button
        type="button"
        onClick={onRemove}
        className="text-xs text-red-600 hover:text-red-800"
      >
        削除
      </button>
    </div>
  );
}

function EngineerProfileForm() {
  const { user } = useAuthStore();
  const searchParams = useSearchParams();
  const isSetup = searchParams.get('setup') === '1';

  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) return;
    const p = db.engineerProfiles.findByUserId(user.id);
    if (p) {
      setName(p.name);
      setBio(p.bio);
      setAchievements(p.achievements);
    }
  }, [user]);

  const addAchievement = () => {
    setAchievements(prev => [
      ...prev,
      { id: crypto.randomUUID(), projectName: '', description: '', startDate: '', endDate: '' },
    ]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setLoading(true);

    const existing = db.engineerProfiles.findByUserId(user.id);
    const profile: EngineerProfile = {
      userId: user.id,
      name,
      bio,
      photoUrl: existing?.photoUrl,
      skills: existing?.skills ?? [],
      specialties: existing?.specialties ?? [],
      achievements,
    };
    db.engineerProfiles.upsert(profile);
    setSaved(true);
    setLoading(false);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="max-w-2xl">
      {isSetup && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
          <p className="text-blue-800 font-medium">ようこそ！まずプロフィールを登録しましょう</p>
          <p className="text-blue-700 text-sm mt-1">プロフィールを登録することで企業があなたを見つけやすくなります。</p>
        </div>
      )}

      <h1 className="text-2xl font-bold text-gray-900 mb-6">プロフィール編集</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-4">
          <h2 className="font-semibold text-gray-900">基本情報</h2>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">氏名 <span className="text-red-500">*</span></label>
            <input
              type="text"
              required
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="山田 太郎"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">自己紹介</label>
            <textarea
              value={bio}
              onChange={e => setBio(e.target.value)}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              placeholder="得意分野・経験年数・アピールポイントなど"
            />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-gray-900">実績・プロジェクト</h2>
            <button
              type="button"
              onClick={addAchievement}
              className="text-sm text-blue-600 font-medium hover:text-blue-800"
            >
              + 追加
            </button>
          </div>
          {achievements.length === 0 ? (
            <div className="text-center py-6 text-gray-400">
              <p className="text-sm">実績をまだ登録していません</p>
              <button
                type="button"
                onClick={addAchievement}
                className="mt-2 text-sm text-blue-600 hover:underline"
              >
                最初の実績を追加する
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {achievements.map((a, i) => (
                <AchievementForm
                  key={a.id}
                  achievement={a}
                  onChange={updated =>
                    setAchievements(prev => prev.map((x, j) => (j === i ? updated : x)))
                  }
                  onRemove={() => setAchievements(prev => prev.filter((_, j) => j !== i))}
                />
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center gap-4">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-8 py-3 rounded-xl font-medium hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            {loading ? '保存中...' : '保存する'}
          </button>
          {saved && <span className="text-green-600 text-sm font-medium">保存しました ✓</span>}
        </div>
      </form>
    </div>
  );
}

export default function EngineerProfilePage() {
  return (
    <Suspense fallback={<div className="text-gray-400 py-8 text-center">読み込み中...</div>}>
      <EngineerProfileForm />
    </Suspense>
  );
}
