'use client';

import { useState } from 'react';

const EXERCISES = [
  { id: '1', name: 'ベンチプレス', category: 'chest' },
  { id: '2', name: 'スクワット', category: 'legs' },
  { id: '3', name: 'デッドリフト', category: 'back' },
  { id: '4', name: 'オーバーヘッドプレス', category: 'shoulders' },
  { id: '5', name: 'バーベルカール', category: 'arms' },
];

interface SetEntry {
  id: string;
  weight: string;
  reps: string;
  unit: 'kg' | 'lbs';
  hasAssistance: boolean;
}

interface ExGroup {
  exerciseId: string;
  exerciseName: string;
  sets: SetEntry[];
}

export default function WorkoutScreen() {
  const [groups, setGroups] = useState<ExGroup[]>([
    {
      exerciseId: '1',
      exerciseName: 'ベンチプレス',
      sets: [
        { id: 's1', weight: '80', reps: '10', unit: 'kg', hasAssistance: false },
        { id: 's2', weight: '80', reps: '10', unit: 'kg', hasAssistance: false },
        { id: 's3', weight: '85', reps: '8', unit: 'kg', hasAssistance: false },
      ],
    },
    {
      exerciseId: '2',
      exerciseName: 'スクワット',
      sets: [
        { id: 's4', weight: '100', reps: '8', unit: 'kg', hasAssistance: false },
        { id: 's5', weight: '100', reps: '8', unit: 'kg', hasAssistance: false },
      ],
    },
  ]);
  const [showPicker, setShowPicker] = useState(false);

  function addExercise(ex: typeof EXERCISES[0]) {
    setGroups(prev => [...prev, {
      exerciseId: ex.id,
      exerciseName: ex.name,
      sets: [{ id: Math.random().toString(), weight: '', reps: '', unit: 'kg', hasAssistance: false }],
    }]);
    setShowPicker(false);
  }

  function addSet(groupId: string) {
    setGroups(prev => prev.map(g => g.exerciseId === groupId ? {
      ...g,
      sets: [...g.sets, { id: Math.random().toString(), weight: '', reps: '', unit: 'kg', hasAssistance: false }],
    } : g));
  }

  function toggleUnit(groupId: string, setId: string) {
    setGroups(prev => prev.map(g => g.exerciseId === groupId ? {
      ...g,
      sets: g.sets.map(s => s.id === setId ? { ...s, unit: s.unit === 'kg' ? 'lbs' as const : 'kg' as const } : s),
    } : g));
  }

  const totalSets = groups.reduce((sum, g) => sum + g.sets.length, 0);

  return (
    <div className="p-5 pb-6 text-white" style={{ fontFamily: 'system-ui, sans-serif' }}>
      <p className="text-2xl font-extrabold mb-1">トレーニング記録</p>
      <p className="text-[#94A3B8] text-sm mb-6">2026年6月19日（金）</p>

      {/* Exercise groups */}
      {groups.map(group => (
        <div key={group.exerciseId} className="bg-[#1E293B] rounded-2xl p-4 mb-4 border border-[#334155]">
          <p className="font-bold text-[17px] mb-3">{group.exerciseName}</p>

          {/* Header row */}
          <div className="flex gap-2 mb-2 px-1">
            <span className="text-[#94A3B8] text-[10px] font-bold uppercase w-8">SET</span>
            <span className="text-[#94A3B8] text-[10px] font-bold uppercase flex-1">重量</span>
            <span className="text-[#94A3B8] text-[10px] font-bold uppercase w-16">レップ</span>
            <span className="text-[#94A3B8] text-[10px] font-bold uppercase w-12">補助</span>
            <div className="w-5" />
          </div>

          {/* Sets */}
          {group.sets.map((set, i) => (
            <div key={set.id} className="flex items-center gap-2 mb-2">
              <span className="text-[#94A3B8] text-sm font-bold w-8 text-center">{i + 1}</span>
              <div className="flex-1 flex gap-1 items-center">
                <div className="flex-1 bg-[#0F172A] rounded-lg px-2 py-2 border border-[#334155] text-center text-white text-sm font-semibold">
                  {set.weight || '0'}
                </div>
                <button
                  onClick={() => toggleUnit(group.exerciseId, set.id)}
                  className="text-indigo-400 text-xs font-bold bg-indigo-400/10 px-2 py-1 rounded"
                >
                  {set.unit}
                </button>
              </div>
              <div className="w-16 bg-[#0F172A] rounded-lg px-2 py-2 border border-[#334155] text-center text-white text-sm font-semibold">
                {set.reps || '0'}
              </div>
              <div className="w-12 flex justify-center">
                <div className={`w-8 h-5 rounded-full flex items-center ${set.hasAssistance ? 'bg-indigo-500 justify-end' : 'bg-[#334155] justify-start'}`}>
                  <div className="w-4 h-4 rounded-full bg-white mx-0.5 shadow" />
                </div>
              </div>
              <button className="w-5 text-red-400 text-base">🗑</button>
            </div>
          ))}

          <button
            onClick={() => addSet(group.exerciseId)}
            className="flex items-center justify-center gap-1 w-full py-2 mt-1 text-indigo-400 text-sm font-semibold"
          >
            <span>＋</span> セットを追加
          </button>
        </div>
      ))}

      {/* Add exercise */}
      <button
        onClick={() => setShowPicker(true)}
        className="flex items-center justify-center gap-2 w-full bg-[#1E293B] rounded-2xl p-4 border-2 border-dashed border-indigo-500/50 mb-4 text-indigo-400 font-semibold"
      >
        ＋ 種目を追加
      </button>

      {/* Notes */}
      {groups.length > 0 && (
        <div className="bg-[#1E293B] rounded-xl p-3 border border-[#334155] mb-4">
          <p className="text-[#94A3B8] text-sm">メモ（任意）</p>
        </div>
      )}

      {/* Save button */}
      <button className="w-full bg-indigo-600 rounded-2xl py-5 text-white font-bold text-base mb-4">
        今日のトレーニングを保存 ({totalSets}セット)
      </button>

      {/* Exercise picker modal */}
      {showPicker && (
        <div className="fixed inset-0 bg-black/60 flex items-end z-50" onClick={() => setShowPicker(false)}>
          <div className="bg-[#0F172A] rounded-t-3xl w-full p-5 max-h-96" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <p className="text-white font-bold text-lg">種目を選択</p>
              <button onClick={() => setShowPicker(false)} className="text-[#94A3B8] text-2xl">×</button>
            </div>
            <div className="bg-[#1E293B] rounded-xl p-3 mb-3 border border-[#334155]">
              <p className="text-[#94A3B8] text-sm">🔍 種目を検索...</p>
            </div>
            {EXERCISES.map(ex => (
              <button
                key={ex.id}
                onClick={() => addExercise(ex)}
                className="flex justify-between items-center w-full py-4 border-b border-[#334155] text-left"
              >
                <span className="text-white font-semibold">{ex.name}</span>
                <span className="text-[#94A3B8] text-sm">{ex.category}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
