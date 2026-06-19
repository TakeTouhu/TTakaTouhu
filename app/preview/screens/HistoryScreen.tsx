'use client';

import { useState } from 'react';
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid
} from 'recharts';

const CATEGORIES = ['すべて', '胸', '背中', '脚', '肩', '腕', '体幹'];

const EXERCISES = [
  {
    id: '1', name: 'ベンチプレス', category: '胸',
    maxWeight: 90, lastWeight: 87.5, lastUnit: 'kg', sessions: 24,
    history: [
      { date: '4/10', weight: 70 },
      { date: '4/24', weight: 75 },
      { date: '5/8', weight: 77.5 },
      { date: '5/22', weight: 80 },
      { date: '6/5', weight: 82.5 },
      { date: '6/12', weight: 85 },
      { date: '6/19', weight: 87.5 },
    ],
  },
  {
    id: '2', name: 'スクワット', category: '脚',
    maxWeight: 120, lastWeight: 110, lastUnit: 'kg', sessions: 18,
    history: [
      { date: '4/10', weight: 80 },
      { date: '4/24', weight: 90 },
      { date: '5/8', weight: 95 },
      { date: '5/22', weight: 100 },
      { date: '6/5', weight: 105 },
      { date: '6/12', weight: 110 },
      { date: '6/19', weight: 110 },
    ],
  },
  { id: '3', name: 'デッドリフト', category: '背中', maxWeight: 140, lastWeight: 130, lastUnit: 'kg', sessions: 15, history: [] },
  { id: '4', name: 'ラットプルダウン', category: '背中', maxWeight: 70, lastWeight: 65, lastUnit: 'kg', sessions: 20, history: [] },
  { id: '5', name: 'オーバーヘッドプレス', category: '肩', maxWeight: 60, lastWeight: 57.5, lastUnit: 'kg', sessions: 12, history: [] },
  { id: '6', name: 'バーベルカール', category: '腕', maxWeight: 40, lastWeight: 37.5, lastUnit: 'kg', sessions: 22, history: [] },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#1E293B] border border-[#334155] rounded-lg px-3 py-2">
        <p className="text-[#94A3B8] text-xs">{label}</p>
        <p className="text-indigo-400 font-bold">{payload[0].value}kg</p>
      </div>
    );
  }
  return null;
};

export default function HistoryScreen() {
  const [selectedCat, setSelectedCat] = useState('すべて');
  const [selected, setSelected] = useState(EXERCISES[0]);
  const [chartMode, setChartMode] = useState<'weight' | 'reps'>('weight');

  const filtered = selectedCat === 'すべて' ? EXERCISES : EXERCISES.filter(e => e.category === selectedCat);

  return (
    <div className="text-white" style={{ fontFamily: 'system-ui, sans-serif' }}>
      <div className="p-5 pb-0">
        <p className="text-2xl font-extrabold mb-4">種目別履歴</p>

        {/* Category chips */}
        <div className="flex gap-2 overflow-x-auto pb-3" style={{ scrollbarWidth: 'none' }}>
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCat(cat)}
              className="flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-semibold border transition-all"
              style={{
                backgroundColor: selectedCat === cat ? '#6366F1' : '#1E293B',
                borderColor: selectedCat === cat ? '#6366F1' : '#334155',
                color: selectedCat === cat ? '#fff' : '#94A3B8',
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Chart for selected */}
      <div className="mx-5 mb-4 bg-[#1E293B] rounded-2xl p-4 border border-[#334155]">
        <div className="flex justify-between items-center mb-3">
          <p className="font-bold text-[16px]">{selected.name}</p>
        </div>

        {/* Stats */}
        <div className="flex gap-2 mb-3">
          {[
            { label: '最高重量', value: `${selected.maxWeight}kg` },
            { label: '最近の重量', value: `${selected.lastWeight}kg` },
            { label: 'セッション数', value: `${selected.sessions}回` },
          ].map(s => (
            <div key={s.label} className="flex-1 bg-[#0F172A] rounded-xl p-2 text-center">
              <p className="text-white font-bold text-sm">{s.value}</p>
              <p className="text-[#94A3B8] text-[10px] mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Chart toggle */}
        <div className="flex bg-[#0F172A] rounded-lg p-1 gap-1 mb-3">
          {(['weight', 'reps'] as const).map(m => (
            <button
              key={m}
              onClick={() => setChartMode(m)}
              className="flex-1 py-1.5 rounded-md text-xs font-bold transition-all"
              style={{ backgroundColor: chartMode === m ? '#6366F1' : 'transparent', color: chartMode === m ? '#fff' : '#94A3B8' }}
            >
              {m === 'weight' ? '重量' : 'レップ数'}
            </button>
          ))}
        </div>

        {/* Line chart */}
        <ResponsiveContainer width="100%" height={140}>
          <LineChart data={selected.history.length > 0 ? selected.history : [{ date: '-', weight: 0 }]}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
            <XAxis dataKey="date" tick={{ fill: '#94A3B8', fontSize: 10 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: '#94A3B8', fontSize: 10 }} axisLine={false} tickLine={false} domain={['auto', 'auto']} />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="weight"
              stroke="#6366F1"
              strokeWidth={2}
              dot={{ fill: '#6366F1', r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>

        <button className="flex items-center justify-center gap-1 w-full mt-2 text-indigo-400 text-sm font-semibold">
          詳細な履歴を見る ›
        </button>
      </div>

      {/* Exercise list */}
      <div className="px-5 pb-6">
        {filtered.map(ex => (
          <button
            key={ex.id}
            onClick={() => setSelected(ex)}
            className="flex items-center w-full bg-[#1E293B] rounded-xl p-3.5 mb-2 border text-left"
            style={{ borderColor: selected.id === ex.id ? '#6366F1' : '#334155' }}
          >
            <div className="flex-1">
              <p className="text-sm font-bold text-white">{ex.name}</p>
              <p className="text-[#94A3B8] text-xs mt-0.5">{ex.category}</p>
            </div>
            <div className="text-right mr-2">
              <p className="text-indigo-400 font-bold text-sm">{ex.lastWeight}{ex.lastUnit}</p>
              <p className="text-[#94A3B8] text-xs">{ex.sessions}回</p>
            </div>
            <span className="text-[#94A3B8]">›</span>
          </button>
        ))}
      </div>
    </div>
  );
}
