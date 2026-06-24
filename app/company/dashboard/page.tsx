'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuthStore } from '@/lib/authStore';
import { db } from '@/lib/db';
import { CompanyProfile, Job } from '@/lib/types';
import { useT } from '@/hooks/useT';

export default function CompanyDashboard() {
  const { user } = useAuthStore();
  const { t } = useT();
  const d = t.company.dashboard;
  const [profile, setProfile] = useState<CompanyProfile | null>(null);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [engineerCount, setEngineerCount] = useState(0);

  useEffect(() => {
    if (!user) return;
    const p = db.companyProfiles.findByUserId(user.id);
    setProfile(p);
    const myJobs = db.jobs.findByCompanyId(user.id);
    setJobs(myJobs);
    setEngineerCount(db.engineerProfiles.findAll().length);
  }, [user]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          {profile?.companyName ?? d.postedJobs}
        </h1>
        <p className="text-gray-500 mt-1">{d.portalTitle}</p>
      </div>

      {!profile?.companyName && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 flex items-start gap-3">
          <span className="text-2xl">⚠️</span>
          <div>
            <p className="font-medium text-amber-800">{d.setupAlert}</p>
            <p className="text-amber-700 text-sm mt-1">{d.setupAlertDesc}</p>
            <Link href="/company/profile" className="mt-2 inline-block text-sm font-medium text-amber-800 underline">
              {d.setupLink}
            </Link>
          </div>
        </div>
      )}

      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="text-3xl mb-2">💼</div>
          <div className="text-2xl font-bold text-gray-900">{jobs.length}</div>
          <div className="text-gray-500 text-sm">{d.postedJobs}</div>
          <Link href="/company/jobs" className="mt-3 inline-block text-xs text-indigo-600 hover:underline">
            {d.manageJobs}
          </Link>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="text-3xl mb-2">✅</div>
          <div className="text-2xl font-bold text-gray-900">
            {jobs.reduce((acc, j) => acc + db.applications.findByJobId(j.id).length, 0)}
          </div>
          <div className="text-gray-500 text-sm">{d.receivedApps}</div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="text-3xl mb-2">👨‍💻</div>
          <div className="text-2xl font-bold text-gray-900">{engineerCount}</div>
          <div className="text-gray-500 text-sm">{d.registeredEngineers}</div>
          <Link href="/company/engineers" className="mt-3 inline-block text-xs text-indigo-600 hover:underline">
            {d.findEngineers}
          </Link>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-gray-900">{d.myJobs}</h2>
            <Link href="/company/jobs/new" className="text-sm text-indigo-600 hover:underline">
              {d.newJob}
            </Link>
          </div>
          {jobs.length === 0 ? (
            <div className="text-center py-6">
              <p className="text-gray-400 text-sm">{d.noJobs}</p>
              <Link href="/company/jobs/new" className="mt-2 inline-block text-sm text-indigo-600 hover:underline">
                {d.firstJob}
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {jobs.slice(0, 3).map(job => (
                <div key={job.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                  <div>
                    <div className="text-sm font-medium text-gray-900">{job.title}</div>
                    <div className="text-xs text-gray-500">
                      {db.applications.findByJobId(job.id).length}{d.applicants}
                    </div>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${job.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                    {job.isActive ? d.active : d.inactive}
                  </span>
                </div>
              ))}
              {jobs.length > 3 && (
                <Link href="/company/jobs" className="block text-center text-xs text-indigo-600 hover:underline pt-1">
                  {`${d.manageJobs} (${jobs.length})`}
                </Link>
              )}
            </div>
          )}
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="font-bold text-gray-900 mb-4">{d.quickActions}</h2>
          <div className="grid grid-cols-2 gap-3">
            {[
              { href: '/company/jobs/new', icon: '➕', label: d.postJob },
              { href: '/company/engineers', icon: '🔍', label: d.findEngineersAction },
              { href: '/company/jobs', icon: '📋', label: d.manageJobsAction },
              { href: '/company/profile', icon: '🏢', label: d.editCompanyInfo },
            ].map(item => (
              <Link
                key={item.href}
                href={item.href}
                className="flex flex-col items-center gap-2 p-4 rounded-xl border border-gray-200 hover:border-indigo-300 hover:bg-indigo-50 transition-colors text-center"
              >
                <span className="text-2xl">{item.icon}</span>
                <span className="text-xs font-medium text-gray-700">{item.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
