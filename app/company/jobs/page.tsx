'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuthStore } from '@/lib/authStore';
import { db } from '@/lib/db';
import { Job } from '@/lib/types';
import SpecialtyBadge from '@/components/SpecialtyBadge';

export default function CompanyJobsPage() {
  const { user } = useAuthStore();
  const [jobs, setJobs] = useState<Job[]>([]);

  const load = () => {
    if (!user) return;
    setJobs(db.jobs.findByCompanyId(user.id));
  };

  useEffect(() => { load(); }, [user]);

  const toggleActive = (job: Job) => {
    db.jobs.update(job.id, { isActive: !job.isActive });
    load();
  };

  const deleteJob = (jobId: string) => {
    if (!confirm('この案件を削除しますか？')) return;
    db.jobs.delete(jobId);
    load();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">自社案件管理</h1>
          <p className="text-gray-500 mt-1">掲載中の案件を管理します</p>
        </div>
        <Link
          href="/company/jobs/new"
          className="bg-indigo-600 text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-indigo-700 transition-colors"
        >
          + 新規案件掲載
        </Link>
      </div>

      {jobs.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
          <div className="text-4xl mb-3">💼</div>
          <p className="text-gray-500 mb-4">掲載中の案件はありません</p>
          <Link href="/company/jobs/new" className="bg-indigo-600 text-white px-6 py-3 rounded-xl text-sm font-medium hover:bg-indigo-700 transition-colors">
            最初の案件を掲載する
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {jobs.map(job => {
            const appCount = db.applications.findByJobId(job.id).length;
            return (
              <div key={job.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap mb-2">
                      <h3 className="font-semibold text-gray-900">{job.title}</h3>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${job.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                        {job.isActive ? '公開中' : '非公開'}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {job.specialties.map(s => <SpecialtyBadge key={s} specialty={s} />)}
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                      <div>
                        <span className="text-gray-500">期間: </span>
                        <span className="text-gray-900">{job.period}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">開始: </span>
                        <span className="text-gray-900">{job.startDate}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">募集: </span>
                        <span className="text-gray-900">{job.headcount}名</span>
                      </div>
                      <div>
                        <span className="text-gray-500">単価: </span>
                        <span className="text-gray-900 font-medium">{job.salary.toLocaleString()}円/月</span>
                      </div>
                    </div>
                    <div className="mt-2 text-sm text-indigo-600 font-medium">
                      立候補者: {appCount}名
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 shrink-0">
                    <Link
                      href={`/company/jobs/${job.id}/edit`}
                      className="text-xs px-3 py-1.5 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors text-center"
                    >
                      編集
                    </Link>
                    <button
                      onClick={() => toggleActive(job)}
                      className={`text-xs px-3 py-1.5 rounded-lg transition-colors ${
                        job.isActive
                          ? 'border border-yellow-300 text-yellow-700 hover:bg-yellow-50'
                          : 'border border-green-300 text-green-700 hover:bg-green-50'
                      }`}
                    >
                      {job.isActive ? '非公開にする' : '公開する'}
                    </button>
                    <button
                      onClick={() => deleteJob(job.id)}
                      className="text-xs px-3 py-1.5 border border-red-200 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
                    >
                      削除
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
