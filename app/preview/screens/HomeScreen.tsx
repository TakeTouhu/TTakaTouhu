'use client';

export default function HomeScreen() {
  return (
    <div className="p-5 pb-6 text-white" style={{ fontFamily: 'system-ui, sans-serif' }}>
      {/* Header */}
      <div className="flex justify-between items-start mb-5">
        <div>
          <p className="text-[#94A3B8] text-sm">こんにちは 👋</p>
          <p className="text-2xl font-extrabold mt-0.5">田中 太郎</p>
          <p className="text-[#94A3B8] text-xs mt-0.5">2026年6月19日（金）</p>
        </div>
        <div className="flex gap-2">
          <button className="bg-[#1E293B] p-2.5 rounded-xl border border-[#334155]">
            <span className="text-indigo-400 text-base">🤝</span>
          </button>
          <button className="bg-[#1E293B] p-2.5 rounded-xl border border-[#334155]">
            <span className="text-indigo-400 text-base">🎯</span>
          </button>
        </div>
      </div>

      {/* Today card */}
      <div className="bg-[#1E293B] rounded-2xl p-4 mb-5 border-2 border-[#10B981]">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-[#10B981] flex items-center justify-center flex-shrink-0">
            <span className="text-white font-bold text-lg">✓</span>
          </div>
          <div className="flex-1">
            <p className="font-bold text-sm">今日のトレーニング完了！</p>
            <p className="text-[#94A3B8] text-xs mt-0.5">12セット · ベンチプレス、スクワット</p>
          </div>
          <span className="text-[#94A3B8]">›</span>
        </div>
      </div>

      {/* Weekly stats */}
      <div className="mb-5">
        <div className="flex justify-between items-center mb-3">
          <p className="font-bold text-[17px]">今週の記録</p>
          <div className="flex items-center gap-1">
            <span className="text-[#10B981] text-xs">↑</span>
            <span className="text-[#10B981] text-xs font-semibold">+2 vs 先週</span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2.5">
          {[
            { icon: '🏋️', label: 'セッション', value: '5', unit: '回', color: '#6366F1' },
            { icon: '📋', label: '総セット数', value: '42', unit: 'セット', color: '#8B5CF6' },
            { icon: '💪', label: '総ボリューム', value: '3.2', unit: 't', color: '#EC4899' },
            { icon: '🔥', label: '連続日数', value: '7', unit: '日', color: '#F59E0B' },
          ].map(s => (
            <div key={s.label} className="bg-[#1E293B] rounded-2xl p-3.5 border border-[#334155]" style={{ borderColor: `${s.color}30` }}>
              <div className="w-8 h-8 rounded-xl flex items-center justify-center mb-2" style={{ backgroundColor: `${s.color}20` }}>
                <span className="text-base">{s.icon}</span>
              </div>
              <p className="text-xl font-extrabold" style={{ color: '#F1F5F9' }}>
                {s.value}<span className="text-sm font-medium text-[#94A3B8] ml-0.5">{s.unit}</span>
              </p>
              <p className="text-[#94A3B8] text-xs mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Active goals */}
      <div className="mb-5">
        <div className="flex justify-between items-center mb-3">
          <p className="font-bold text-[17px]">進行中の目標</p>
          <span className="text-indigo-400 text-sm font-semibold">すべて見る</span>
        </div>
        {[
          { title: '月間20セッション達成', period: '月間', days: 11, urgent: false },
          { title: 'ベンチプレス100kg達成', period: '年間', days: 195, urgent: false },
          { title: '今週5回トレーニング', period: '週間', days: 2, urgent: true },
        ].map(g => (
          <div key={g.title} className="flex items-center bg-[#1E293B] rounded-xl p-3.5 mb-2 border border-[#334155] gap-3">
            <div className={`w-2 h-2 rounded-full flex-shrink-0 ${g.urgent ? 'bg-red-400' : 'bg-indigo-400'}`} />
            <div className="flex-1">
              <p className="text-sm font-semibold truncate">{g.title}</p>
              <p className="text-[#94A3B8] text-xs mt-0.5">{g.period}目標 · 残り{g.days}日</p>
            </div>
            {g.urgent && (
              <span className="text-xs font-bold text-red-400 bg-red-400/10 px-2 py-1 rounded-lg">まもなく</span>
            )}
          </div>
        ))}
      </div>

      {/* Recent sessions */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <p className="font-bold text-[17px]">最近のトレーニング</p>
          <span className="text-indigo-400 text-sm font-semibold">すべて見る</span>
        </div>
        {[
          { month: '6月', day: 19, weekday: '金', exercises: 'ベンチプレス · スクワット', sets: 12, volume: 2840 },
          { month: '6月', day: 18, weekday: '木', exercises: 'デッドリフト · ラットプルダウン', sets: 10, volume: 3200 },
          { month: '6月', day: 17, weekday: '水', exercises: 'オーバーヘッドプレス · ダンベルカール', sets: 9, volume: 1120 },
        ].map(s => (
          <div key={s.day} className="flex items-center bg-[#1E293B] rounded-2xl p-3.5 mb-2.5 border border-[#334155] gap-3">
            <div className="text-center w-10 flex-shrink-0">
              <p className="text-[#94A3B8] text-[10px]">{s.month}</p>
              <p className="text-indigo-400 text-2xl font-extrabold leading-none">{s.day}</p>
              <p className="text-[#94A3B8] text-[10px]">{s.weekday}</p>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold truncate">{s.exercises}</p>
              <p className="text-[#94A3B8] text-xs mt-0.5">{s.sets}セット · {s.volume}kg ボリューム</p>
            </div>
            <span className="text-[#94A3B8]">›</span>
          </div>
        ))}
      </div>
    </div>
  );
}
