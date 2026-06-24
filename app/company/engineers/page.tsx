'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { db } from '@/lib/db';
import { EngineerProfile, User, Specialty, SPECIALTIES } from '@/lib/types';
import SkillBadge from '@/components/SkillBadge';
import SpecialtyBadge from '@/components/SpecialtyBadge';
import { useT } from '@/hooks/useT';

interface EngineerWithUser extends EngineerProfile {
  user: User | null;
}

export default function CompanyEngineersPage() {
  const { t } = useT();
  const e = t.company.engineers;
  const [engineers, setEngineers] = useState<EngineerWithUser[]>([]);
  const [filtered, setFiltered] = useState<EngineerWithUser[]>([]);
  const [search, setSearch] = useState('');
  const [specialtyFilter, setSpecialtyFilter] = useState<Specialty | ''>('');

  useEffect(() => {
    const profiles = db.engineerProfiles.findAll();
    const withUsers = profiles
      .filter(p => p.name)
      .map(p => ({ ...p, user: db.users.findById(p.userId) }));
    setEngineers(withUsers);
    setFiltered(withUsers);
  }, []);

  useEffect(() => {
    let result = engineers;
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(eng =>
        eng.name.toLowerCase().includes(q) ||
        eng.bio.toLowerCase().includes(q) ||
        eng.skills.some(s => s.language.toLowerCase().includes(q)),
      );
    }
    if (specialtyFilter) {
      result = result.filter(eng => eng.specialties.includes(specialtyFilter));
    }
    setFiltered(result);
  }, [search, specialtyFilter, engineers]);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">{e.title}</h1>
        <p className="text-gray-500 mt-1">{e.subtitle}</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <input
          type="text"
          value={search}
          onChange={ev => setSearch(ev.target.value)}
          placeholder={e.searchPlaceholder}
          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
        />
        <select
          value={specialtyFilter}
          onChange={ev => setSpecialtyFilter(ev.target.value as Specialty | '')}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
        >
          <option value="">{e.allFields}</option>
          {SPECIALTIES.map(s => <option key={s} value={s}>{t.specialty[s]}</option>)}
        </select>
      </div>

      {filtered.length === 0 ? (
        <div className="bg-white rounded-xl p-12 text-center text-gray-500 border border-gray-100">
          {e.noResults}
        </div>
      ) : (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map(eng => (
            <Link
              key={eng.userId}
              href={`/company/engineers/${eng.userId}`}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:border-indigo-300 hover:shadow-md transition-all block"
            >
              <div className="flex items-start gap-3 mb-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-400 to-blue-500 flex items-center justify-center text-white font-bold text-lg shrink-0">
                  {eng.name.charAt(0)}
                </div>
                <div className="min-w-0">
                  <h3 className="font-semibold text-gray-900 truncate">{eng.name}</h3>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {eng.specialties.slice(0, 2).map(s => <SpecialtyBadge key={s} specialty={s} />)}
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-600 line-clamp-2 mb-3">{eng.bio}</p>
              <div className="flex flex-wrap gap-1">
                {eng.skills.slice(0, 4).map(s => <SkillBadge key={s.id} language={s.language} level={s.level} />)}
                {eng.skills.length > 4 && (
                  <span className="text-xs text-gray-400">+{eng.skills.length - 4}</span>
                )}
              </div>
              <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                <span>{eng.achievements.length}{e.achievements}</span>
                <span className="text-indigo-600 font-medium">{e.viewDetail}</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
