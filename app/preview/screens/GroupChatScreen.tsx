'use client';

import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Cell } from 'recharts';

type ChatTab = 'chat' | 'members' | 'goals' | 'compare';

const MESSAGES = [
  { id: '1', user: '田中 太郎', me: false, type: 'text', content: 'おはようございます！今日もがんばりましょう💪', time: '08:12' },
  { id: '2', user: '鈴木 花子', me: false, type: 'workout_share', content: '', exercises: ['ベンチプレス', 'ラットプルダウン', 'ダンベルカール'], time: '09:30' },
  { id: '3', user: 'Me', me: true, type: 'text', content: '今日は脚トレ行ってきます！', time: '10:05' },
  {
    id: '4', user: 'System', me: false, type: 'achievement',
    content: '🎉 山田 次郎が目標達成！「今月20セッション達成」を達成しました！',
    time: '11:00',
  },
  { id: '5', user: '山田 次郎', me: false, type: 'text', content: '達成できました！みなさんのおかげです！ありがとう🏆', time: '11:02' },
  { id: '6', user: 'Me', me: true, type: 'workout_share', content: '', exercises: ['スクワット', 'レッグプレス', 'レッグカール'], time: '14:22' },
  { id: '7', user: '田中 太郎', me: false, type: 'text', content: 'お疲れ様！私も行ってきます！', time: '15:00' },
];

const MEMBERS = [
  { name: '田中 太郎', initial: '田', role: 'admin', streak: 5 },
  { name: '鈴木 花子', initial: '鈴', role: 'member', streak: 12 },
  { name: '山田 次郎', initial: '山', role: 'member', streak: 20 },
  { name: 'Me（自分）', initial: '自', role: 'member', streak: 7 },
];

const GOALS = [
  { title: '今月20セッション達成', period: '月間', days: 11, achieved: true },
  { title: 'グループ全員で週3回以上', period: '週間', days: 2, achieved: false },
  { title: '年間ベストを更新', period: '年間', days: 195, achieved: false },
];

const COMPARE_DATA = [
  { name: '鈴木 花子', sessions: 5 },
  { name: '山田 次郎', sessions: 4 },
  { name: 'Me（自分）', sessions: 4 },
  { name: '田中 太郎', sessions: 3 },
];

export default function GroupChatScreen({ onBack }: { onBack: () => void }) {
  const [tab, setTab] = useState<ChatTab>('chat');
  const [message, setMessage] = useState('');
  const [compareMode, setCompareMode] = useState<'sessions' | 'volume' | 'exercise'>('sessions');

  return (
    <div className="flex flex-col h-full text-white" style={{ fontFamily: 'system-ui, sans-serif' }}>
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-[#334155]">
        <button onClick={onBack} className="text-white text-xl">←</button>
        <div className="flex-1">
          <p className="font-bold">筋トレ部</p>
          <p className="text-[#94A3B8] text-xs">4人のメンバー</p>
        </div>
        <button className="text-indigo-400">🎯</button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-[#334155] flex-shrink-0">
        {(['chat', 'members', 'goals', 'compare'] as const).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className="flex-1 py-3 text-xs font-bold border-b-2 transition-all"
            style={{ borderColor: tab === t ? '#6366F1' : 'transparent', color: tab === t ? '#6366F1' : '#94A3B8' }}
          >
            {{ chat: 'チャット', members: 'メンバー', goals: '目標', compare: '比較' }[t]}
          </button>
        ))}
      </div>

      {/* Chat tab */}
      {tab === 'chat' && (
        <>
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {MESSAGES.map(msg => {
              if (msg.type === 'achievement') {
                return (
                  <div key={msg.id} className="flex justify-center">
                    <div className="bg-amber-400/15 border border-amber-400/30 rounded-2xl px-4 py-3 text-center max-w-[85%]">
                      <p className="text-amber-300 font-semibold text-sm">{msg.content}</p>
                      <p className="text-[#94A3B8] text-[10px] mt-1">{msg.time}</p>
                    </div>
                  </div>
                );
              }
              if (msg.type === 'workout_share') {
                return (
                  <div key={msg.id} className={`flex gap-2 ${msg.me ? 'flex-row-reverse' : ''}`}>
                    {!msg.me && (
                      <div className="w-7 h-7 rounded-lg bg-purple-600 flex items-center justify-center flex-shrink-0 self-end">
                        <span className="text-white text-xs font-bold">{msg.user[0]}</span>
                      </div>
                    )}
                    <div className="max-w-[75%] bg-[#1E293B] rounded-2xl p-3 border-2 border-emerald-500/40"
                      style={{ borderBottomLeftRadius: msg.me ? 16 : 4, borderBottomRightRadius: msg.me ? 4 : 16 }}
                    >
                      {!msg.me && <p className="text-indigo-400 text-[11px] font-bold mb-2">{msg.user}</p>}
                      <div className="flex items-center gap-1.5 mb-2">
                        <span className="text-lg">💪</span>
                        <span className="text-emerald-400 font-bold text-sm">トレーニング完了！</span>
                      </div>
                      <div className="flex flex-wrap gap-1 mb-2">
                        {msg.exercises?.map(e => (
                          <span key={e} className="bg-indigo-600/20 text-indigo-300 text-[10px] font-semibold px-2 py-0.5 rounded">
                            {e}
                          </span>
                        ))}
                      </div>
                      <p className="text-[#94A3B8] text-[10px] text-right">{msg.time}</p>
                    </div>
                  </div>
                );
              }
              return (
                <div key={msg.id} className={`flex gap-2 ${msg.me ? 'flex-row-reverse' : ''}`}>
                  {!msg.me && (
                    <div className="w-7 h-7 rounded-lg bg-purple-600 flex items-center justify-center flex-shrink-0 self-end">
                      <span className="text-white text-xs font-bold">{msg.user[0]}</span>
                    </div>
                  )}
                  <div
                    className="max-w-[75%] rounded-2xl px-3 py-2"
                    style={{
                      backgroundColor: msg.me ? '#6366F1' : '#1E293B',
                      borderBottomLeftRadius: msg.me ? 16 : 4,
                      borderBottomRightRadius: msg.me ? 4 : 16,
                    }}
                  >
                    {!msg.me && <p className="text-indigo-400 text-[11px] font-bold mb-1">{msg.user}</p>}
                    <p className={`text-sm ${msg.me ? 'text-white' : 'text-[#F1F5F9]'}`}>{msg.content}</p>
                    <p className={`text-[10px] mt-1 text-right ${msg.me ? 'text-white/60' : 'text-[#94A3B8]'}`}>{msg.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex gap-2 p-3 border-t border-[#334155]">
            <div className="flex-1 bg-[#1E293B] rounded-2xl px-4 py-2.5 border border-[#334155]">
              <input
                value={message}
                onChange={e => setMessage(e.target.value)}
                placeholder="メッセージを入力..."
                className="bg-transparent text-white text-sm w-full outline-none"
                style={{ caretColor: '#6366F1' }}
              />
            </div>
            <button className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white text-sm">→</span>
            </button>
          </div>
        </>
      )}

      {/* Members tab */}
      {tab === 'members' && (
        <div className="flex-1 overflow-y-auto p-4">
          {MEMBERS.map(m => (
            <div key={m.name} className="flex items-center gap-3 py-3 border-b border-[#334155]">
              <div className="w-10 h-10 rounded-2xl bg-indigo-600 flex items-center justify-center">
                <span className="text-white font-bold">{m.initial}</span>
              </div>
              <div className="flex-1">
                <p className="text-white font-semibold text-sm">{m.name}</p>
                <p className="text-[#94A3B8] text-xs mt-0.5">🔥 {m.streak}日連続</p>
              </div>
              {m.role === 'admin' && (
                <span className="bg-indigo-600/20 text-indigo-400 text-[10px] font-bold px-2 py-1 rounded-lg">管理者</span>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Goals tab */}
      {tab === 'goals' && (
        <div className="flex-1 overflow-y-auto p-4">
          <button className="flex items-center justify-center gap-2 w-full bg-[#1E293B] rounded-xl p-3.5 mb-4 border border-dashed border-indigo-500/50 text-indigo-400 font-semibold text-sm">
            ＋ グループ目標を追加
          </button>
          {GOALS.map(g => (
            <div key={g.title} className={`bg-[#1E293B] rounded-xl p-4 mb-3 border ${g.achieved ? 'border-emerald-500/50' : 'border-[#334155]'}`}>
              <div className="flex justify-between items-start">
                <p className="text-white font-bold text-sm flex-1 pr-2">{g.title}</p>
                {g.achieved && <span className="bg-emerald-500/20 text-emerald-400 text-[10px] font-bold px-2 py-1 rounded-lg">達成！</span>}
              </div>
              <p className="text-[#94A3B8] text-xs mt-2">
                {g.period}目標 · {g.achieved ? '✓ 達成済み' : `残り${g.days}日`}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Compare tab */}
      {tab === 'compare' && (
        <div className="flex-1 overflow-y-auto p-4">
          {/* Mode selector */}
          <div className="flex bg-[#1E293B] rounded-xl p-1 gap-1 mb-4">
            {(['sessions', 'volume', 'exercise'] as const).map(m => (
              <button
                key={m}
                onClick={() => setCompareMode(m)}
                className="flex-1 py-2 rounded-lg text-xs font-bold transition-all"
                style={{ backgroundColor: compareMode === m ? '#6366F1' : 'transparent', color: compareMode === m ? '#fff' : '#94A3B8' }}
              >
                {{ sessions: 'セッション数', volume: 'ボリューム', exercise: '種目別' }[m]}
              </button>
            ))}
          </div>

          {compareMode !== 'exercise' && (
            <>
              <p className="text-white font-bold text-sm mb-4">今週のセッション数</p>
              <div className="mb-4">
                <ResponsiveContainer width="100%" height={150}>
                  <BarChart data={COMPARE_DATA} layout="vertical" margin={{ left: 20 }}>
                    <XAxis type="number" tick={{ fill: '#94A3B8', fontSize: 10 }} axisLine={false} tickLine={false} />
                    <YAxis type="category" dataKey="name" tick={{ fill: '#94A3B8', fontSize: 10 }} axisLine={false} tickLine={false} width={70} />
                    <Tooltip
                      content={({ active, payload }) => active && payload?.length ? (
                        <div className="bg-[#1E293B] border border-[#334155] rounded-lg px-3 py-2">
                          <p className="text-indigo-400 font-bold">{payload[0].value}回</p>
                        </div>
                      ) : null}
                    />
                    <Bar dataKey="sessions" radius={[0, 6, 6, 0]}>
                      {COMPARE_DATA.map((_, i) => (
                        <Cell key={i} fill={i === 0 ? '#F59E0B' : i === 1 ? '#94A3B8' : '#6366F1'} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              {COMPARE_DATA.map((d, i) => (
                <div key={d.name} className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center text-base"
                    style={{ backgroundColor: i === 0 ? '#F59E0B20' : i === 1 ? '#94A3B820' : '#6366F120' }}
                  >
                    {i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : `#${i + 1}`}
                  </div>
                  <div className="flex-1">
                    <p className="text-white text-sm font-semibold">{d.name}</p>
                    <div className="h-1.5 bg-[#334155] rounded-full mt-1">
                      <div
                        className="h-1.5 rounded-full bg-indigo-500"
                        style={{ width: `${(d.sessions / 5) * 100}%` }}
                      />
                    </div>
                  </div>
                  <p className="text-indigo-400 font-bold text-sm w-8 text-right">{d.sessions}回</p>
                </div>
              ))}
            </>
          )}

          {compareMode === 'exercise' && (
            <>
              <p className="text-white font-bold text-sm mb-3">種目を選んで最高重量を比較</p>
              <div className="flex gap-2 overflow-x-auto mb-4" style={{ scrollbarWidth: 'none' }}>
                {['ベンチプレス', 'スクワット', 'デッドリフト'].map(e => (
                  <button
                    key={e}
                    className="flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold border"
                    style={{
                      backgroundColor: e === 'ベンチプレス' ? '#6366F1' : '#1E293B',
                      borderColor: e === 'ベンチプレス' ? '#6366F1' : '#334155',
                      color: e === 'ベンチプレス' ? '#fff' : '#94A3B8',
                    }}
                  >
                    {e}
                  </button>
                ))}
              </div>
              {[
                { name: '山田 次郎', weight: 100, unit: 'kg' },
                { name: '田中 太郎', weight: 90, unit: 'kg' },
                { name: 'Me（自分）', weight: 87.5, unit: 'kg' },
                { name: '鈴木 花子', weight: 60, unit: 'kg' },
              ].map((d, i) => (
                <div key={d.name} className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center text-base"
                    style={{ backgroundColor: i === 0 ? '#F59E0B20' : '#6366F120' }}
                  >
                    {i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : `#${i + 1}`}
                  </div>
                  <div className="flex-1">
                    <p className="text-white text-sm font-semibold">{d.name}</p>
                    <div className="h-1.5 bg-[#334155] rounded-full mt-1">
                      <div className="h-1.5 rounded-full bg-indigo-500" style={{ width: `${(d.weight / 100) * 100}%` }} />
                    </div>
                  </div>
                  <p className="text-indigo-400 font-bold text-sm">{d.weight}{d.unit}</p>
                </div>
              ))}
            </>
          )}
        </div>
      )}
    </div>
  );
}
