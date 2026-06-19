'use client';

import { useState } from 'react';

type FriendTab = 'friends' | 'requests' | 'search';

const FRIENDS = [
  { name: '鈴木 花子', username: 'hanako_s', streak: 12 },
  { name: '山田 次郎', username: 'jiro_y', streak: 20 },
  { name: '佐藤 健', username: 'ken_sato', streak: 3 },
];

const INCOMING = [
  { name: '中村 さゆり', username: 'sayuri_n' },
];

const SEARCH_RESULTS = [
  { name: '高橋 誠', username: 'makoto_t', added: false },
  { name: '伊藤 みき', username: 'miki_ito', added: true },
  { name: '渡辺 浩二', username: 'koji_w', added: false },
];

export default function FriendsScreen() {
  const [tab, setTab] = useState<FriendTab>('friends');
  const [query, setQuery] = useState('');

  return (
    <div className="text-white" style={{ fontFamily: 'system-ui, sans-serif' }}>
      {/* Header */}
      <div className="flex items-center justify-between px-5 pt-5 pb-3">
        <button className="text-white text-xl">←</button>
        <p className="text-xl font-extrabold">フレンド</p>
        <div className="w-6" />
      </div>

      {/* Tabs */}
      <div className="flex border-b border-[#334155]">
        {([
          { id: 'friends', label: 'フレンド', count: FRIENDS.length },
          { id: 'requests', label: 'リクエスト', count: INCOMING.length },
          { id: 'search', label: '検索', count: 0 },
        ] as { id: FriendTab; label: string; count: number }[]).map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className="flex-1 py-3 flex items-center justify-center gap-1.5 border-b-2 transition-all"
            style={{ borderColor: tab === t.id ? '#6366F1' : 'transparent' }}
          >
            <span className="text-xs font-bold" style={{ color: tab === t.id ? '#6366F1' : '#94A3B8' }}>
              {t.label}
            </span>
            {t.count > 0 && (
              <span className="bg-red-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full">
                {t.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Friends list */}
      {tab === 'friends' && (
        <div className="p-5">
          {FRIENDS.map(f => (
            <div key={f.username} className="flex items-center gap-3 py-3 border-b border-[#334155]">
              <div className="w-11 h-11 rounded-2xl bg-indigo-600 flex items-center justify-center">
                <span className="text-white font-bold">{f.name[0]}</span>
              </div>
              <div className="flex-1">
                <p className="text-white font-bold text-sm">{f.name}</p>
                <p className="text-[#94A3B8] text-xs mt-0.5">@{f.username} · 🔥{f.streak}日連続</p>
              </div>
              <button className="p-2 text-red-400">
                <span className="text-sm">👤−</span>
              </button>
            </div>
          ))}
          <button className="flex items-center justify-center gap-2 w-full mt-4 py-3 bg-indigo-600/10 rounded-xl border border-indigo-500/30 text-indigo-400 text-sm font-semibold"
            onClick={() => setTab('search')}
          >
            ＋ フレンドを追加する
          </button>
        </div>
      )}

      {/* Requests tab */}
      {tab === 'requests' && (
        <div className="p-5">
          <p className="text-[#94A3B8] text-xs font-bold uppercase tracking-wider mb-3">届いたリクエスト</p>
          {INCOMING.map(f => (
            <div key={f.username} className="flex items-center gap-3 py-3 border-b border-[#334155]">
              <div className="w-11 h-11 rounded-2xl bg-purple-600 flex items-center justify-center">
                <span className="text-white font-bold">{f.name[0]}</span>
              </div>
              <div className="flex-1">
                <p className="text-white font-bold text-sm">{f.name}</p>
                <p className="text-[#94A3B8] text-xs mt-0.5">@{f.username}</p>
              </div>
              <div className="flex gap-2">
                <button className="w-9 h-9 bg-emerald-600 rounded-xl flex items-center justify-center">
                  <span className="text-white">✓</span>
                </button>
                <button className="w-9 h-9 border border-red-400 rounded-xl flex items-center justify-center">
                  <span className="text-red-400">✕</span>
                </button>
              </div>
            </div>
          ))}

          <p className="text-[#94A3B8] text-xs font-bold uppercase tracking-wider mt-5 mb-3">送ったリクエスト</p>
          <div className="flex items-center gap-3 py-3 border-b border-[#334155]">
            <div className="w-11 h-11 rounded-2xl bg-gray-600 flex items-center justify-center">
              <span className="text-white font-bold">木</span>
            </div>
            <div className="flex-1">
              <p className="text-white font-bold text-sm">木村 雄太</p>
              <p className="text-[#94A3B8] text-xs mt-0.5">@yuta_k</p>
            </div>
            <button className="border border-[#334155] rounded-xl px-3 py-1.5 text-[#94A3B8] text-xs font-semibold">
              取消
            </button>
          </div>
        </div>
      )}

      {/* Search tab */}
      {tab === 'search' && (
        <div className="p-5">
          <div className="flex gap-2 mb-4">
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="ユーザー名・表示名で検索..."
              className="flex-1 bg-[#1E293B] rounded-xl px-4 py-3 text-white text-sm border border-[#334155] outline-none"
              style={{ caretColor: '#6366F1' }}
            />
            <button className="bg-indigo-600 rounded-xl px-4 text-white font-bold">
              🔍
            </button>
          </div>

          {SEARCH_RESULTS.map(r => (
            <div key={r.username} className="flex items-center gap-3 py-3 border-b border-[#334155]">
              <div className="w-11 h-11 rounded-2xl bg-indigo-700 flex items-center justify-center">
                <span className="text-white font-bold">{r.name[0]}</span>
              </div>
              <div className="flex-1">
                <p className="text-white font-bold text-sm">{r.name}</p>
                <p className="text-[#94A3B8] text-xs mt-0.5">@{r.username}</p>
              </div>
              {r.added ? (
                <span className="bg-emerald-500/20 text-emerald-400 text-xs font-bold px-3 py-1.5 rounded-xl">
                  フレンド
                </span>
              ) : (
                <button className="bg-indigo-600 text-white text-xs font-bold px-3 py-1.5 rounded-xl flex items-center gap-1">
                  👤＋ 追加
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
