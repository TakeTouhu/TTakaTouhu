'use client';
import { useEffect, useState } from 'react';
import { useAuthStore } from '@/lib/authStore';
import { db } from '@/lib/db';
import { Application, Job } from '@/lib/types';
import SpecialtyBadge from '@/components/SpecialtyBadge';
import { useT } from '@/hooks/useT';

interface ApplicationWithJob extends Application {
  job: Job | null;
}

export default function EngineerApplicationsPage() {
  const { user } = useAuthStore();
  const { t, lang } = useT();
  const a = t.engineer.applications;
  const [applications, setApplications] = useState<ApplicationWithJob[]>([]);

  useEffect(() => {
    if (!user) return;
    const apps = db.applications.findByEngineerId(user.id);
    const withJobs = apps.map(ap => ({
      ...ap,
      job: db.jobs.findById(ap.jobId),
    }));
    setApplications(withJobs.sort((x, y) => y.createdAt.localeCompare(x.createdAt)));
  }, [user]);

  return (
    <div className="max-w-3xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">{a.title}</h1>
        <p className="text-gray-500 mt-1">{a.subtitle}</p>
      </div>

      {applications.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
          <div className="text-4xl mb-3">📋</div>
          <p className="text-gray-500">{a.empty}</p>
          <a href="/engineer/jobs" className="mt-3 inline-block text-sm text-blue-600 hover:underline">
            {a.findJobs}
          </a>
        </div>
      ) : (
        <div className="space-y-4">
          {applications.map(app => (
            <div key={app.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              {app.job ? (
                <>
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <h3 className="font-medium text-gray-900">{app.job.title}</h3>
                    <span className="shrink-0 text-xs bg-blue-100 text-blue-700 px-2.5 py-1 rounded-full">{a.status}</span>
                  </div>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {app.job.specialties.map(s => <SpecialtyBadge key={s} specialty={s} />)}
                  </div>
                  <div className="text-sm text-gray-500 space-y-1">
                    <div>{a.period}: {app.job.period} | {a.start}: {app.job.startDate}</div>
                    <div className="flex flex-wrap gap-1">
                      {app.job.requiredSkills.map(s => (
                        <span key={s} className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded text-xs">{s}</span>
                      ))}
                    </div>
                  </div>
                  {app.message && (
                    <div className="mt-3 pt-3 border-t border-gray-100">
                      <p className="text-xs text-gray-500 mb-1">{a.myMessage}</p>
                      <p className="text-sm text-gray-700 italic">"{app.message}"</p>
                    </div>
                  )}
                </>
              ) : (
                <p className="text-gray-500 text-sm">{a.deleted}</p>
              )}
              <div className="mt-3 text-xs text-gray-400">
                {a.appliedAt}: {new Date(app.createdAt).toLocaleDateString(lang === 'ja' ? 'ja-JP' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
