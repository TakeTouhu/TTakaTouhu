'use client';

import { useState } from 'react';

const GOALS = [
  { id: '1', title: '今月20セッション達成', period: 'month', days: 11, target: 20, current: 14, unit: 'sessions', achieved: false, group: null },
  { id: '2', title: '今週5回トレーニング', period: 'week', days: 2, target: 5, current: 4, unit: 'sessions', achieved: false, group: null },
  { id: '3', title: 'ベンチプレス100kg達成', period: 'year', days: 195, target: 100, current: 87.5, unit: 'weight', achieved: false, group: null },
  { id: '4', title: '筋トレ部：全員で月20回', period: 'month', days: 11, target: 20, current: 17, unit: 'sessions', achieved: false, group: '筋トレ部' },
  { id: '5', title: '月間15セッション達成', period: 'month', days: 0, target: 15, current: 15, unit: 'sessions', achieved: true, group: null },
];

const PERIOD_LABELS: Record<string, string> = { week: '週間', month: '月間', year: '年間' };

export default function GoalsScreen() {
  const [filter, setFilter] = useState<'active' | 'achieved'>('active');
  const [showForm, setShowForm] = useState(false);

  const filtered = GOALS.filter(g => filter === 'active' ? !g.achieved : g.achieved);
  const activeCount = GOALS.filter(g => !g.achieved).length;
  const achievedCount = GOALS.filter(g => g.achieved).length;

  return (
    <div className="p-5 pb-6 text-white" style={{ fontFamily: 'system-ui, sans-serif' }}>
      <div className="flex items-center gap-3 mb-5">
        <button className="text-white text-xl">←</button>
        <p className="text-2xl font-extrabold flex-1">目標管理</p>
        <button onClick={() => setShowForm(true)} className="bg-indigo-600 p-2 rounded-xl">
          <span className="text-white font-bold text-lg">＋</span>
        </button>
      </div>

      {/* Stats */}
      <div className="flex gap-3 mb-5">
        <div className="flex-1 bg-[#1E293B] rounded-2xl p-4 text-center border border-[#334155]">
          <p className="text-3xl font-extrabold text-indigo-400">{activeCount}</p>
          <p className="text-[#94A3B8] text-xs mt-1">進行中</p>
        </div>
        <div className="flex-1 bg-[#1E293B] rounded-2xl p-4 text-center border border-[#334155]">
          <p className="text-3xl font-extrabold text-emerald-400">{achievedCount}</p>
          <p className="text-[#94A3B8] text-xs mt-1">達成済み</p>
        </div>
      </div>

      {/* Filter */}
      <div className="flex bg-[#1E293B] rounded-xl p-1 mb-5">
        {(['active', 'achieved'] as const).map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className="flex-1 py-2 rounded-lg text-sm font-bold transition-all"
            style={{ backgroundColor: filter === f ? '#6366F1' : 'transparent', color: filter === f ? '#fff' : '#94A3B8' }}
          >
            {f === 'active' ? '進行中' : '達成済み'}
          </button>
        ))}
      </div>

      {/* Goal cards */}
      {filtered.map(g => {
        const progress = g.target ? Math.min(100, (g.current / g.target) * 100) : 0;
        const daysLeft = g.days;
        const urgent = daysLeft <= 3 && !g.achieved;

        return (
          <div
            key={g.id}
            className="bg-[#1E293B] rounded-2xl p-4 mb-3 border"
            style={{ borderColor: g.achieved ? '#10B98150' : urgent ? '#EF444450' : '#334155' }}
          >
            <div className="flex items-start gap-3">
              <span className="text-xl mt-0.5">{g.achieved ? '✅' : urgent ? '⚠️' : '🎯'}</span>
              <div className="flex-1">
                <p className="text-white font-bold text-sm">{g.title}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[#94A3B8] text-xs">
                    {PERIOD_LABELS[g.period]}目標
                    {g.group && ` · ${g.group}`}
                  </span>
                  {g.achieved ? (
                    <span className="bg-emerald-500/20 text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded">達成！</span>
                  ) : (
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${urgent ? 'bg-red-400/20 text-red-400' : 'text-[#94A3B8]'}`}>
                      残り{daysLeft}日
                    </span>
                  )}
                </div>

                {/* Progress bar */}
                {g.target && (
                  <div className="mt-3">
                    <div className="flex justify-between text-[10px] text-[#94A3B8] mb-1">
                      <span>進捗</span>
                      <span>{g.current} / {g.target}{g.unit === 'sessions' ? '回' : 'kg'}</span>
                    </div>
                    <div className="h-2 bg-[#0F172A] rounded-full">
                      <div
                        className="h-2 rounded-full transition-all"
                        style={{
                          width: `${progress}%`,
                          backgroundColor: g.achieved ? '#10B981' : progress >= 80 ? '#F59E0B' : '#6366F1',
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}

      {/* Form modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/60 flex items-end z-50">
          <div className="bg-[#0F172A] rounded-t-3xl w-full p-5 max-h-[85%] overflow-y-auto">
            <div className="flex justify-between items-center mb-5">
              <p className="text-white font-bold text-lg">個人目標を設定</p>
              <button onClick={() => setShowForm(false)} className="text-[#94A3B8] text-2xl">×</button>
            </div>

            <p className="text-[#94A3B8] text-xs mb-1">タイトル *</p>
            <div className="bg-[#1E293B] rounded-xl p-3.5 border border-[#334155] mb-4">
              <p className="text-[#94A3B8] text-sm">例：ベンチプレス100kg達成</p>
            </div>

            <p className="text-[#94A3B8] text-xs mb-1">期間</p>
            <div className="flex gap-2 mb-4">
              {['週間', '月間', '年間'].map((p, i) => (
                <button
                  key={p}
                  className="flex-1 py-2.5 rounded-xl border text-sm font-semibold"
                  style={{ backgroundColor: i === 1 ? '#6366F1' : '#1E293B', borderColor: i === 1 ? '#6366F1' : '#334155', color: i === 1 ? '#fff' : '#94A3B8' }}
                >
                  {p}
                </button>
              ))}
            </div>

            <p className="text-[#94A3B8] text-xs mb-1">目標値</p>
            <div className="bg-[#1E293B] rounded-xl p-3.5 border border-[#334155] mb-6">
              <p className="text-[#94A3B8] text-sm">例：10（セッション数）</p>
            </div>

            <button className="w-full bg-indigo-600 rounded-xl py-4 text-white font-bold">
              目標を設定する
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
