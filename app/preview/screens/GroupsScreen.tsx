'use client';

const GROUPS = [
  { id: '1', name: '筋トレ部', description: '毎週3回以上トレーニングしよう！', members: 8, initial: '筋' },
  { id: '2', name: 'チームA', description: null, members: 4, initial: 'チ' },
  { id: '3', name: 'ムキムキ同好会', description: 'お互いの進捗を共有しよう', members: 12, initial: 'ム' },
];

export default function GroupsScreen({ onOpenChat }: { onOpenChat: () => void }) {
  return (
    <div className="p-5 pb-6 text-white" style={{ fontFamily: 'system-ui, sans-serif' }}>
      <div className="flex justify-between items-center mb-6">
        <p className="text-2xl font-extrabold">グループ</p>
        <div className="flex gap-2">
          <button className="bg-[#1E293B] p-2.5 rounded-xl border border-[#334155]">
            <span className="text-indigo-400">🔍</span>
          </button>
          <button className="bg-[#1E293B] p-2.5 rounded-xl border border-[#334155]">
            <span className="text-indigo-400 text-lg font-bold">＋</span>
          </button>
        </div>
      </div>

      {GROUPS.map(g => (
        <button
          key={g.id}
          onClick={onOpenChat}
          className="flex items-center w-full bg-[#1E293B] rounded-2xl p-4 mb-3 border border-[#334155] text-left"
        >
          <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center flex-shrink-0 mr-3">
            <span className="text-white text-xl font-extrabold">{g.initial}</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white font-bold text-base">{g.name}</p>
            {g.description && <p className="text-[#94A3B8] text-xs truncate mt-0.5">{g.description}</p>}
            <p className="text-[#94A3B8] text-xs mt-1">👥 {g.members}人のメンバー</p>
          </div>
          <span className="text-[#94A3B8] text-lg ml-2">›</span>
        </button>
      ))}

      {/* Invite section */}
      <div className="bg-indigo-600/10 rounded-2xl p-4 border border-indigo-500/30 mt-4">
        <p className="text-indigo-300 font-bold text-sm mb-1">友達を招待しよう</p>
        <p className="text-[#94A3B8] text-xs">グループを作成して、フレンドを招待できます</p>
        <button className="mt-3 bg-indigo-600 rounded-xl px-4 py-2.5 text-white text-sm font-bold">
          ＋ グループを作成
        </button>
      </div>
    </div>
  );
}
