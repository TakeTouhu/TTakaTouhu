'use client';
import { useEffect, useState } from 'react';
import { useAuthStore } from '@/lib/authStore';
import { db } from '@/lib/db';
import { Job, Specialty, SPECIALTY_LABELS, SPECIALTIES } from '@/lib/types';
import SpecialtyBadge from '@/components/SpecialtyBadge';

export default function EngineerJobsPage() {
  const { user } = useAuthStore();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filtered, setFiltered] = useState<Job[]>([]);
  const [search, setSearch] = useState('');
  const [specialtyFilter, setSpecialtyFilter] = useState<Specialty | ''>('');
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [appliedJobs, setAppliedJobs] = useState<Set<string>>(new Set());
  const [applyMsg, setApplyMsg] = useState('');
  const [applySuccess, setApplySuccess] = useState(false);
  const [showApplyForm, setShowApplyForm] = useState(false);

  useEffect(() => {
    const allJobs = db.jobs.findActive();
    setJobs(allJobs);
    setFiltered(allJobs);
    if (user) {
      const apps = db.applications.findByEngineerId(user.id);
      setAppliedJobs(new Set(apps.map(a => a.jobId)));
    }
  }, [user]);

  useEffect(() => {
    let result = jobs;
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(j =>
        j.title.toLowerCase().includes(q) ||
        j.description.toLowerCase().includes(q) ||
        j.requiredSkills.some(s => s.toLowerCase().includes(q)),
      );
    }
    if (specialtyFilter) {
      result = result.filter(j => j.specialties.includes(specialtyFilter));
    }
    setFiltered(result);
  }, [search, specialtyFilter, jobs]);

  const handleApply = () => {
    if (!user || !selectedJob) return;
    db.applications.create({
      engineerId: user.id,
      jobId: selectedJob.id,
      message: applyMsg,
    });
    setAppliedJobs(prev => { const s = new Set(Array.from(prev)); s.add(selectedJob.id); return s; });
    setApplySuccess(true);
    setShowApplyForm(false);
    setApplyMsg('');
    setTimeout(() => setApplySuccess(false), 3000);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">案件一覧</h1>

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="案件名・スキルで検索"
          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
        />
        <select
          value={specialtyFilter}
          onChange={e => setSpecialtyFilter(e.target.value as Specialty | '')}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
        >
          <option value="">すべての分野</option>
          {SPECIALTIES.map(s => (
            <option key={s} value={s}>{SPECIALTY_LABELS[s]}</option>
          ))}
        </select>
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        <div className="space-y-3">
          {filtered.length === 0 ? (
            <div className="bg-white rounded-xl p-8 text-center text-gray-500 border border-gray-100">
              条件に合う案件が見つかりませんでした
            </div>
          ) : (
            filtered.map(job => (
              <button
                key={job.id}
                onClick={() => { setSelectedJob(job); setShowApplyForm(false); setApplySuccess(false); }}
                className={`w-full text-left bg-white rounded-xl p-5 shadow-sm border transition-colors ${
                  selectedJob?.id === job.id ? 'border-blue-500 bg-blue-50' : 'border-gray-100 hover:border-blue-200'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <div className="font-medium text-gray-900 truncate">{job.title}</div>
                    <div className="text-sm text-gray-500 mt-1">
                      期間: {job.period} · {job.headcount}名募集
                    </div>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {job.requiredSkills.slice(0, 3).map(s => (
                        <span key={s} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">{s}</span>
                      ))}
                    </div>
                  </div>
                  {appliedJobs.has(job.id) && (
                    <span className="shrink-0 text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">立候補済</span>
                  )}
                </div>
              </button>
            ))
          )}
        </div>

        <div className="lg:sticky lg:top-24 h-fit">
          {selectedJob ? (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-start justify-between gap-2 mb-4">
                <h2 className="text-lg font-bold text-gray-900">{selectedJob.title}</h2>
                <button
                  onClick={() => setSelectedJob(null)}
                  className="text-gray-400 hover:text-gray-600 text-xl leading-none"
                >
                  ×
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="text-gray-500">期間</div>
                  <div className="font-medium text-gray-900">{selectedJob.period}</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="text-gray-500">開始予定</div>
                  <div className="font-medium text-gray-900">{selectedJob.startDate}</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="text-gray-500">募集人数</div>
                  <div className="font-medium text-gray-900">{selectedJob.headcount}名</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="text-gray-500">分野</div>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {selectedJob.specialties.map(s => <SpecialtyBadge key={s} specialty={s} />)}
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <h3 className="text-sm font-medium text-gray-700 mb-2">必須スキル</h3>
                <div className="flex flex-wrap gap-1">
                  {selectedJob.requiredSkills.map(s => (
                    <span key={s} className="text-xs bg-blue-100 text-blue-700 px-2.5 py-1 rounded-full">{s}</span>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-700 mb-2">案件詳細</h3>
                <p className="text-sm text-gray-600 whitespace-pre-line leading-relaxed">{selectedJob.description}</p>
              </div>

              {applySuccess && (
                <div className="bg-green-50 text-green-700 px-4 py-3 rounded-lg text-sm mb-4">
                  立候補しました！VTaBridgeの担当者がご連絡いたします。
                </div>
              )}

              {appliedJobs.has(selectedJob.id) ? (
                <div className="bg-green-50 text-green-700 px-4 py-3 rounded-lg text-sm text-center font-medium">
                  この案件には立候補済みです
                </div>
              ) : showApplyForm ? (
                <div className="space-y-3">
                  <textarea
                    value={applyMsg}
                    onChange={e => setApplyMsg(e.target.value)}
                    rows={4}
                    placeholder="志望動機・アピールポイントなど（任意）"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm resize-none"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={handleApply}
                      className="flex-1 bg-blue-600 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                    >
                      立候補する
                    </button>
                    <button
                      onClick={() => setShowApplyForm(false)}
                      className="px-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-600 hover:bg-gray-50"
                    >
                      キャンセル
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setShowApplyForm(true)}
                  className="w-full bg-blue-600 text-white py-3 rounded-xl font-medium hover:bg-blue-700 transition-colors"
                >
                  この案件に立候補する
                </button>
              )}
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center text-gray-400">
              <div className="text-4xl mb-3">💼</div>
              <p className="text-sm">案件を選択すると詳細が表示されます</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
