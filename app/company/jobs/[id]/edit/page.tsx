'use client';
import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { useAuthStore } from '@/lib/authStore';
import { db } from '@/lib/db';
import { Job, Specialty, SPECIALTIES } from '@/lib/types';
import SpecialtyBadge from '@/components/SpecialtyBadge';
import { useT } from '@/hooks/useT';

export default function EditJobPage() {
  const router = useRouter();
  const params = useParams();
  const { user } = useAuthStore();
  const { t } = useT();
  const f = t.company.jobForm;
  const c = t.common;
  const jobId = params.id as string;

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [period, setPeriod] = useState('');
  const [startDate, setStartDate] = useState('');
  const [headcount, setHeadcount] = useState(1);
  const [salary, setSalary] = useState('');
  const [requiredSkillInput, setRequiredSkillInput] = useState('');
  const [requiredSkills, setRequiredSkills] = useState<string[]>([]);
  const [specialties, setSpecialties] = useState<Specialty[]>([]);
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const job = db.jobs.findById(jobId);
    if (!job || job.companyId !== user?.id) {
      setNotFound(true);
      return;
    }
    setTitle(job.title);
    setDescription(job.description);
    setPeriod(job.period);
    setStartDate(job.startDate);
    setHeadcount(job.headcount);
    setSalary(String(job.salary));
    setRequiredSkills(job.requiredSkills);
    setSpecialties(job.specialties);
  }, [jobId, user]);

  if (notFound) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-500">{f.notFound}</p>
        <Link href="/company/jobs" className="mt-3 inline-block text-indigo-600 hover:underline text-sm">
          {f.backToJobs}
        </Link>
      </div>
    );
  }

  const addSkill = () => {
    const s = requiredSkillInput.trim();
    if (!s || requiredSkills.includes(s)) return;
    setRequiredSkills(prev => [...prev, s]);
    setRequiredSkillInput('');
  };

  const toggleSpecialty = (sp: Specialty) => {
    setSpecialties(prev =>
      prev.includes(sp) ? prev.filter(s => s !== sp) : [...prev, sp],
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    db.jobs.update(jobId, {
      title,
      description,
      period,
      startDate,
      headcount,
      salary: Number(salary),
      requiredSkills,
      specialties,
    });
    router.push('/company/jobs');
  };

  return (
    <div className="max-w-2xl">
      <div className="flex items-center gap-3 mb-6">
        <Link href="/company/jobs" className="text-gray-500 hover:text-gray-700 text-sm">{c.back}</Link>
        <h1 className="text-2xl font-bold text-gray-900">{f.editTitle}</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{f.jobTitle} <span className="text-red-500">*</span></label>
            <input type="text" required value={title} onChange={e => setTitle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{f.description} <span className="text-red-500">*</span></label>
            <textarea required value={description} onChange={e => setDescription(e.target.value)} rows={6}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none" />
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{f.period} <span className="text-red-500">*</span></label>
              <input type="text" required value={period} onChange={e => setPeriod(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{f.startDate} <span className="text-red-500">*</span></label>
              <input type="date" required value={startDate} onChange={e => setStartDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{f.headcount} <span className="text-red-500">*</span></label>
              <input type="number" required min={1} value={headcount} onChange={e => setHeadcount(Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {f.salary}<span className="text-red-500">*</span>
                <span className="ml-1 text-xs text-gray-400 font-normal">{f.salaryHidden}</span>
              </label>
              <input type="number" required min={0} value={salary} onChange={e => setSalary(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{f.requiredSkills}</label>
            <div className="flex gap-2 mb-2">
              <input type="text" value={requiredSkillInput} onChange={e => setRequiredSkillInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                placeholder={f.skillInputPlaceholder} />
              <button type="button" onClick={addSkill}
                className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm hover:bg-gray-200">{c.add}</button>
            </div>
            <div className="flex flex-wrap gap-2">
              {requiredSkills.map(s => (
                <span key={s} className="inline-flex items-center gap-1 bg-indigo-100 text-indigo-700 text-xs px-2.5 py-1 rounded-full">
                  {s}
                  <button type="button" onClick={() => setRequiredSkills(prev => prev.filter(x => x !== s))}>×</button>
                </span>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{f.specialties}</label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {SPECIALTIES.map(sp => (
                <button key={sp} type="button" onClick={() => toggleSpecialty(sp)}
                  className={`p-2.5 rounded-xl border-2 text-left transition-colors ${specialties.includes(sp) ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200 hover:border-gray-300'}`}>
                  <SpecialtyBadge specialty={sp} />
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <button type="submit" disabled={loading}
            className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-medium hover:bg-indigo-700 transition-colors disabled:opacity-50">
            {loading ? f.updating : f.update}
          </button>
          <Link href="/company/jobs" className="px-6 py-3 border border-gray-300 rounded-xl text-gray-600 hover:bg-gray-50 transition-colors">
            {c.cancel}
          </Link>
        </div>
      </form>
    </div>
  );
}
