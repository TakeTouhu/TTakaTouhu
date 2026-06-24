'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuthStore } from '@/lib/authStore';
import { db } from '@/lib/db';
import { EngineerProfile, Job } from '@/lib/types';
import SpecialtyBadge from '@/components/SpecialtyBadge';
import { useT } from '@/hooks/useT';

export default function EngineerDashboard() {
  const { user } = useAuthStore();
  const { t } = useT();
  const d = t.engineer.dashboard;
  const [profile, setProfile] = useState<EngineerProfile | null>(null);
  const [recentJobs, setRecentJobs] = useState<Job[]>([]);
  const [appCount, setAppCount] = useState(0);

  useEffect(() => {
    if (!user) return;
    const p = db.engineerProfiles.findByUserId(user.id);
    setProfile(p);
    const jobs = db.jobs.findActive().slice(0, 3);
    setRecentJobs(jobs);
    const apps = db.applications.findByEngineerId(user.id);
    setAppCount(apps.length);
  }, [user]);

  if (!user) return null;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {profile?.name ? `${profile.name}${d.greeting}` : d.title}
          </h1>
          <p className="text-gray-500 mt-1">{d.subtitle}</p>
        </div>
      </div>

      {!profile?.name && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 flex items-start gap-3">
          <span className="text-2xl">⚠️</span>
          <div>
            <p className="font-medium text-amber-800">{d.setupAlert}</p>
            <p className="text-amber-700 text-sm mt-1">{d.setupAlertDesc}</p>
            <Link href="/engineer/profile" className="mt-2 inline-block text-sm font-medium text-amber-800 underline">
              {d.setupLink}
            </Link>
          </div>
        </div>
      )}

      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="text-3xl mb-2">🎯</div>
          <div className="text-2xl font-bold text-gray-900">{profile?.skills.length ?? 0}</div>
          <div className="text-gray-500 text-sm">{d.skills}</div>
          <Link href="/engineer/skills" className="mt-3 inline-block text-xs text-blue-600 hover:underline">
            {d.manageSkills}
          </Link>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="text-3xl mb-2">📋</div>
          <div className="text-2xl font-bold text-gray-900">{appCount}</div>
          <div className="text-gray-500 text-sm">{d.applications}</div>
          <Link href="/engineer/applications" className="mt-3 inline-block text-xs text-blue-600 hover:underline">
            {d.viewHistory}
          </Link>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="text-3xl mb-2">💼</div>
          <div className="text-2xl font-bold text-gray-900">{db.jobs.findActive().length}</div>
          <div className="text-gray-500 text-sm">{d.activeJobs}</div>
          <Link href="/engineer/jobs" className="mt-3 inline-block text-xs text-blue-600 hover:underline">
            {d.findJobs}
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-gray-900">{d.recentJobs}</h2>
          <Link href="/engineer/jobs" className="text-sm text-blue-600 hover:underline">
            {d.viewAll}
          </Link>
        </div>
        <div className="space-y-3">
          {recentJobs.length === 0 ? (
            <p className="text-gray-500 text-sm">{d.noJobs}</p>
          ) : (
            recentJobs.map(job => (
              <Link
                key={job.id}
                href={`/engineer/jobs?id=${job.id}`}
                className="block p-4 rounded-lg border border-gray-100 hover:border-blue-200 hover:bg-blue-50 transition-colors"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="font-medium text-gray-900">{job.title}</div>
                    <div className="text-sm text-gray-500 mt-1">
                      {d.period}: {job.period} | {d.start}: {job.startDate} | {job.headcount}{t.engineer.jobs.headcountUnit}
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1 shrink-0">
                    {job.specialties.slice(0, 2).map(s => (
                      <SpecialtyBadge key={s} specialty={s} />
                    ))}
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="font-bold text-gray-900 mb-4">{d.quickActions}</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { href: '/engineer/profile', icon: '👤', label: d.editProfile },
            { href: '/engineer/skills', icon: '⚡', label: d.manageSkillsAction },
            { href: '/engineer/jobs', icon: '🔍', label: d.findJobsAction },
            { href: '/engineer/applications', icon: '📝', label: d.applicationHistory },
          ].map(item => (
            <Link
              key={item.href}
              href={item.href}
              className="flex flex-col items-center gap-2 p-4 rounded-xl border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors text-center"
            >
              <span className="text-2xl">{item.icon}</span>
              <span className="text-xs font-medium text-gray-700">{item.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
