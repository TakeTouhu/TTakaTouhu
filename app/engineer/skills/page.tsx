'use client';
import { useEffect, useState } from 'react';
import { useAuthStore } from '@/lib/authStore';
import { db } from '@/lib/db';
import { Skill, SkillLevel, Specialty, SKILL_LEVEL_LABELS, SPECIALTY_LABELS, SPECIALTIES, EngineerProfile } from '@/lib/types';
import SkillBadge from '@/components/SkillBadge';
import SpecialtyBadge from '@/components/SpecialtyBadge';

const LEVEL_OPTIONS: SkillLevel[] = ['beginner', 'intermediate', 'advanced', 'expert'];

export default function EngineerSkillsPage() {
  const { user } = useAuthStore();
  const [skills, setSkills] = useState<Skill[]>([]);
  const [specialties, setSpecialties] = useState<Specialty[]>([]);
  const [newLang, setNewLang] = useState('');
  const [newLevel, setNewLevel] = useState<SkillLevel>('intermediate');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!user) return;
    const p = db.engineerProfiles.findByUserId(user.id);
    if (p) {
      setSkills(p.skills);
      setSpecialties(p.specialties);
    }
  }, [user]);

  const save = (updatedSkills: Skill[], updatedSpecialties: Specialty[]) => {
    if (!user) return;
    const existing = db.engineerProfiles.findByUserId(user.id);
    const profile: EngineerProfile = {
      userId: user.id,
      name: existing?.name ?? '',
      bio: existing?.bio ?? '',
      photoUrl: existing?.photoUrl,
      skills: updatedSkills,
      specialties: updatedSpecialties,
      achievements: existing?.achievements ?? [],
    };
    db.engineerProfiles.upsert(profile);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const addSkill = () => {
    if (!newLang.trim()) return;
    const updated = [...skills, { id: crypto.randomUUID(), language: newLang.trim(), level: newLevel }];
    setSkills(updated);
    save(updated, specialties);
    setNewLang('');
  };

  const removeSkill = (id: string) => {
    const updated = skills.filter(s => s.id !== id);
    setSkills(updated);
    save(updated, specialties);
  };

  const toggleSpecialty = (sp: Specialty) => {
    const updated = specialties.includes(sp)
      ? specialties.filter(s => s !== sp)
      : [...specialties, sp];
    setSpecialties(updated);
    save(skills, updated);
  };

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">スキル管理</h1>
        <p className="text-gray-500 mt-1">使用できる言語・技術と得意分野を登録しましょう</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-4">
        <h2 className="font-semibold text-gray-900">スキル（言語・技術）を追加</h2>
        <div className="flex gap-3">
          <input
            type="text"
            value={newLang}
            onChange={e => setNewLang(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addSkill())}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            placeholder="例: React, Python, AWS"
          />
          <select
            value={newLevel}
            onChange={e => setNewLevel(e.target.value as SkillLevel)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          >
            {LEVEL_OPTIONS.map(l => (
              <option key={l} value={l}>{SKILL_LEVEL_LABELS[l]}</option>
            ))}
          </select>
          <button
            type="button"
            onClick={addSkill}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
          >
            追加
          </button>
        </div>

        {skills.length === 0 ? (
          <p className="text-gray-400 text-sm">スキルがまだ登録されていません</p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {skills.map(skill => (
              <div key={skill.id} className="flex items-center gap-1 group">
                <SkillBadge language={skill.language} level={skill.level} />
                <button
                  type="button"
                  onClick={() => removeSkill(skill.id)}
                  className="text-gray-400 hover:text-red-500 text-xs opacity-0 group-hover:opacity-100 transition-opacity -ml-1"
                  aria-label="削除"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-4">
        <h2 className="font-semibold text-gray-900">得意分野</h2>
        <p className="text-sm text-gray-500">当てはまる分野をすべて選択してください</p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {SPECIALTIES.map(sp => (
            <button
              key={sp}
              type="button"
              onClick={() => toggleSpecialty(sp)}
              className={`p-3 rounded-xl border-2 text-left transition-colors ${
                specialties.includes(sp)
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <SpecialtyBadge specialty={sp} />
            </button>
          ))}
        </div>
      </div>

      {saved && (
        <div className="fixed bottom-6 right-6 bg-green-600 text-white px-5 py-3 rounded-xl shadow-lg text-sm font-medium">
          保存しました ✓
        </div>
      )}
    </div>
  );
}
