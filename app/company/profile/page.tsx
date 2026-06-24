'use client';
import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/authStore';
import { db } from '@/lib/db';
import { useT } from '@/hooks/useT';

function CompanyProfileForm() {
  const { user, logout } = useAuthStore();
  const router = useRouter();
  const searchParams = useSearchParams();
  const isSetup = searchParams.get('setup') === '1';
  const { t } = useT();
  const p = t.company.profile;
  const c = t.common;

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
    const prof = db.companyProfiles.findByUserId(user.id);
    if (prof) {
      setCompanyName(prof.companyName);
      setRepresentativeName(prof.representativeName);
      setIndustry(prof.industry);
      setDescription(prof.description);
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
          <p className="text-indigo-800 font-medium">{p.setupBanner}</p>
          <p className="text-indigo-700 text-sm mt-1">{p.setupBannerDesc}</p>
        </div>
      )}

      <h1 className="text-2xl font-bold text-gray-900 mb-6">{p.title}</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{p.companyName} <span className="text-red-500">*</span></label>
            <input
              type="text"
              required
              value={companyName}
              onChange={e => setCompanyName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder={p.companyNamePlaceholder}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{p.representative} <span className="text-red-500">*</span></label>
            <input
              type="text"
              required
              value={representativeName}
              onChange={e => setRepresentativeName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder={p.representativePlaceholder}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{p.industry} <span className="text-red-500">*</span></label>
            <select
              required
              value={industry}
              onChange={e => setIndustry(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">{p.industryPlaceholder}</option>
              {t.industries.map(ind => <option key={ind} value={ind}>{ind}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{p.description}</label>
            <textarea
              value={description}
              onChange={e => setDescription(e.target.value)}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
              placeholder={p.descriptionPlaceholder}
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button
            type="submit"
            disabled={loading}
            className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-medium hover:bg-indigo-700 transition-colors disabled:opacity-50"
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

export default function CompanyProfilePage() {
  return (
    <Suspense fallback={<div className="text-gray-400 py-8 text-center">Loading...</div>}>
      <CompanyProfileForm />
    </Suspense>
  );
}
