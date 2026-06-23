'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuthStore } from '@/lib/authStore';
import { db } from '@/lib/db';
import { Specialty, SPECIALTY_LABELS, SPECIALTIES } from '@/lib/types';
import SpecialtyBadge from '@/components/SpecialtyBadge';

export default function NewJobPage() {
  const router = useRouter();
  const { user } = useAuthStore();

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
  const [error, setError] = useState('');

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
    if (!user) return;
    if (specialties.length === 0) {
      setError('得意分野を1つ以上選択してください');
      return;
    }
    setLoading(true);
    setError('');
    db.jobs.create({
      companyId: user.id,
      title,
      description,
      period,
      startDate,
      headcount,
      salary: Number(salary),
      requiredSkills,
      specialties,
      isActive: true,
    });
    router.push('/company/jobs');
  };

  return (
    <div className="max-w-2xl">
      <div className="flex items-center gap-3 mb-6">
        <Link href="/company/jobs" className="text-gray-500 hover:text-gray-700 text-sm">
          ← 戻る
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">案件を掲載する</h1>
      </div>

      <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4 mb-6 text-sm text-indigo-800">
        <strong>注意:</strong> 報酬金額はデータベースに保存されますが、エンジニアには表示されません。
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-4">
          <h2 className="font-semibold text-gray-900">案件基本情報</h2>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">案件名 <span className="text-red-500">*</span></label>
            <input
              type="text"
              required
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="例: React/TypeScriptフロントエンドエンジニア"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">案件詳細 <span className="text-red-500">*</span></label>
            <textarea
              required
              value={description}
              onChange={e => setDescription(e.target.value)}
              rows={6}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
              placeholder="業務内容・必須スキル・歓迎スキルなど詳細を記載してください"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">期間 <span className="text-red-500">*</span></label>
              <input
                type="text"
                required
                value={period}
                onChange={e => setPeriod(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="例: 3ヶ月〜（延長可能性あり）"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">開始予定日 <span className="text-red-500">*</span></label>
              <input
                type="date"
                required
                value={startDate}
                onChange={e => setStartDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">募集人数 <span className="text-red-500">*</span></label>
              <input
                type="number"
                required
                min={1}
                value={headcount}
                onChange={e => setHeadcount(Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                月額単価（円）<span className="text-red-500">*</span>
                <span className="ml-1 text-xs text-gray-400 font-normal">※エンジニアには非表示</span>
              </label>
              <input
                type="number"
                required
                min={0}
                value={salary}
                onChange={e => setSalary(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="例: 800000"
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-4">
          <h2 className="font-semibold text-gray-900">スキル・分野</h2>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">必須スキル</label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={requiredSkillInput}
                onChange={e => setRequiredSkillInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                placeholder="例: React, TypeScript, AWS"
              />
              <button
                type="button"
                onClick={addSkill}
                className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm hover:bg-gray-200 transition-colors"
              >
                追加
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {requiredSkills.map(s => (
                <span
                  key={s}
                  className="inline-flex items-center gap-1 bg-indigo-100 text-indigo-700 text-xs px-2.5 py-1 rounded-full"
                >
                  {s}
                  <button
                    type="button"
                    onClick={() => setRequiredSkills(prev => prev.filter(x => x !== s))}
                    className="hover:text-red-600"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">得意分野 <span className="text-red-500">*</span></label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {SPECIALTIES.map(sp => (
                <button
                  key={sp}
                  type="button"
                  onClick={() => toggleSpecialty(sp)}
                  className={`p-2.5 rounded-xl border-2 text-left transition-colors ${
                    specialties.includes(sp)
                      ? 'border-indigo-500 bg-indigo-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <SpecialtyBadge specialty={sp} />
                </button>
              ))}
            </div>
          </div>
        </div>

        {error && <div className="bg-red-50 text-red-700 px-4 py-3 rounded-lg text-sm">{error}</div>}

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={loading}
            className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-medium hover:bg-indigo-700 transition-colors disabled:opacity-50"
          >
            {loading ? '掲載中...' : '案件を掲載する'}
          </button>
          <Link href="/company/jobs" className="px-6 py-3 border border-gray-300 rounded-xl text-gray-600 hover:bg-gray-50 transition-colors">
            キャンセル
          </Link>
        </div>
      </form>
    </div>
  );
}
