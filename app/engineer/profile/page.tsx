'use client';
import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/authStore';
import { db } from '@/lib/db';
import { EngineerProfile, Achievement } from '@/lib/types';
import { useT } from '@/hooks/useT';

function AchievementForm({
  achievement,
  onChange,
  onRemove,
  labels,
}: {
  achievement: Achievement;
  onChange: (a: Achievement) => void;
  onRemove: () => void;
  labels: { projectName: string; projectNamePlaceholder: string; description: string; descPlaceholder: string; startDate: string; endDate: string; deleteLabel: string };
}) {
  return (
    <div className="bg-gray-50 rounded-xl p-4 space-y-3">
      <div>
        <label className="block text-xs font-medium text-gray-600 mb-1">{labels.projectName}</label>
        <input
          type="text"
          value={achievement.projectName}
          onChange={e => onChange({ ...achievement, projectName: e.target.value })}
          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder={labels.projectNamePlaceholder}
        />
      </div>
      <div>
        <label className="block text-xs font-medium text-gray-600 mb-1">{labels.description}</label>
        <textarea
          value={achievement.description}
          onChange={e => onChange({ ...achievement, description: e.target.value })}
          rows={2}
          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          placeholder={labels.descPlaceholder}
        />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">{labels.startDate}</label>
          <input
            type="month"
            value={achievement.startDate}
            onChange={e => onChange({ ...achievement, startDate: e.target.value })}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">{labels.endDate}</label>
          <input
            type="month"
            value={achievement.endDate}
            onChange={e => onChange({ ...achievement, endDate: e.target.value })}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
      <button type="button" onClick={onRemove} className="text-xs text-red-600 hover:text-red-800">
        {labels.deleteLabel}
      </button>
    </div>
  );
}

function EngineerProfileForm() {
  const { user, logout } = useAuthStore();
  const router = useRouter();
  const searchParams = useSearchParams();
  const isSetup = searchParams.get('setup') === '1';
  const { t } = useT();
  const p = t.engineer.profile;
  const c = t.common;

  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!user) return;
    const prof = db.engineerProfiles.findByUserId(user.id);
    if (prof) {
      setName(prof.name);
      setBio(prof.bio);
      setAchievements(prof.achievements);
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

  const handleDeleteAccount = () => {
    if (!user || deleteConfirmText !== 'DELETE') return;
    setDeleting(true);
    db.deleteAccount(user.id, 'engineer');
    logout();
    router.push('/');
  };

  const achievementLabels = {
    projectName: p.projectName,
    projectNamePlaceholder: p.projectNamePlaceholder,
    description: p.description,
    descPlaceholder: p.descPlaceholder,
    startDate: p.startDate,
    endDate: p.endDate,
    deleteLabel: c.delete,
  };

  return (
    <div className="max-w-2xl">
      {isSetup && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
          <p className="text-blue-800 font-medium">{p.setupBanner}</p>
          <p className="text-blue-700 text-sm mt-1">{p.setupBannerDesc}</p>
        </div>
      )}

      <h1 className="text-2xl font-bold text-gray-900 mb-6">{p.title}</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-4">
          <h2 className="font-semibold text-gray-900">{p.basicInfo}</h2>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{p.name} <span className="text-red-500">*</span></label>
            <input
              type="text"
              required
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder={p.namePlaceholder}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{p.bio}</label>
            <textarea
              value={bio}
              onChange={e => setBio(e.target.value)}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              placeholder={p.bioPlaceholder}
            />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-gray-900">{p.achievements}</h2>
            <button type="button" onClick={addAchievement} className="text-sm text-blue-600 font-medium hover:text-blue-800">
              {p.addAchievement}
            </button>
          </div>
          {achievements.length === 0 ? (
            <div className="text-center py-6 text-gray-400">
              <p className="text-sm">{p.noAchievements}</p>
              <button type="button" onClick={addAchievement} className="mt-2 text-sm text-blue-600 hover:underline">
                {p.addFirst}
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {achievements.map((a, i) => (
                <AchievementForm
                  key={a.id}
                  achievement={a}
                  labels={achievementLabels}
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
            {loading ? c.saving : c.save}
          </button>
          {saved && <span className="text-green-600 text-sm font-medium">{c.saved}</span>}
        </div>
      </form>

      <div className="mt-12 border-t border-red-100 pt-8">
        <h2 className="text-lg font-semibold text-red-700 mb-2">{p.dangerZone}</h2>
        <p className="text-sm text-gray-500 mb-4">{p.dangerDesc}</p>
        {!showDeleteConfirm ? (
          <button
            type="button"
            onClick={() => setShowDeleteConfirm(true)}
            className="border border-red-300 text-red-600 px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-red-50 transition-colors"
          >
            {p.deleteAccount}
          </button>
        ) : (
          <div className="bg-red-50 border border-red-200 rounded-xl p-5 space-y-4 max-w-md">
            <p className="text-sm font-medium text-red-800">{p.confirmDelete}</p>
            <p className="text-sm text-red-700">{p.confirmDeleteDesc}</p>
            <input
              type="text"
              value={deleteConfirmText}
              onChange={e => setDeleteConfirmText(e.target.value)}
              placeholder={p.confirmPlaceholder}
              className="w-full px-3 py-2 border border-red-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 text-sm"
            />
            <div className="flex gap-3">
              <button
                type="button"
                onClick={handleDeleteAccount}
                disabled={deleteConfirmText !== 'DELETE' || deleting}
                className="bg-red-600 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-red-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {deleting ? p.deleting : p.deleteButton}
              </button>
              <button
                type="button"
                onClick={() => { setShowDeleteConfirm(false); setDeleteConfirmText(''); }}
                className="border border-gray-300 text-gray-600 px-5 py-2 rounded-lg text-sm hover:bg-gray-50 transition-colors"
              >
                {c.cancel}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function EngineerProfilePage() {
  return (
    <Suspense fallback={<div className="text-gray-400 py-8 text-center">Loading...</div>}>
      <EngineerProfileForm />
    </Suspense>
  );
}
