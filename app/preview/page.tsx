'use client';

import { useState } from 'react';
import HomeScreen from './screens/HomeScreen';
import WorkoutScreen from './screens/WorkoutScreen';
import HistoryScreen from './screens/HistoryScreen';
import GroupsScreen from './screens/GroupsScreen';
import GroupChatScreen from './screens/GroupChatScreen';
import GoalsScreen from './screens/GoalsScreen';
import FriendsScreen from './screens/FriendsScreen';

type Screen =
  | 'home'
  | 'workout'
  | 'history'
  | 'groups'
  | 'group-chat'
  | 'goals'
  | 'friends';

const NAV_ITEMS = [
  { id: 'home', icon: '🏠', label: 'ホーム' },
  { id: 'workout', icon: '💪', label: '記録' },
  { id: 'history', icon: '📊', label: '履歴' },
  { id: 'groups', icon: '👥', label: 'グループ' },
  { id: 'friends', icon: '🤝', label: 'フレンド' },
  { id: 'goals', icon: '🎯', label: '目標' },
] as const;

export default function PreviewPage() {
  const [screen, setScreen] = useState<Screen>('home');
  const [groupChatOpen, setGroupChatOpen] = useState(false);

  function renderScreen() {
    if (groupChatOpen) return <GroupChatScreen onBack={() => setGroupChatOpen(false)} />;
    switch (screen) {
      case 'home': return <HomeScreen />;
      case 'workout': return <WorkoutScreen />;
      case 'history': return <HistoryScreen />;
      case 'groups': return <GroupsScreen onOpenChat={() => setGroupChatOpen(true)} />;
      case 'goals': return <GoalsScreen />;
      case 'friends': return <FriendsScreen />;
      default: return <HomeScreen />;
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="flex gap-8 items-start">
        {/* Screen selector */}
        <div className="bg-white rounded-2xl p-4 shadow-sm w-44 flex-shrink-0">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">画面選択</p>
          <div className="flex flex-col gap-1">
            {NAV_ITEMS.map(item => (
              <button
                key={item.id}
                onClick={() => { setScreen(item.id as Screen); setGroupChatOpen(false); }}
                className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  screen === item.id && !groupChatOpen
                    ? 'bg-indigo-600 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}
            <button
              onClick={() => setGroupChatOpen(true)}
              className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                groupChatOpen ? 'bg-indigo-600 text-white' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <span>💬</span>
              <span>グループチャット</span>
            </button>
          </div>

          <div className="mt-6 p-3 bg-gray-50 rounded-xl">
            <p className="text-xs text-gray-500 leading-relaxed">
              ※ これはUIプレビューです。実際のデータはSupabase接続後に動作します。
            </p>
          </div>
        </div>

        {/* Phone frame */}
        <div className="flex flex-col items-center gap-3">
          <div className="text-sm font-semibold text-gray-500">FitShare — モバイルアプリ</div>
          <div
            className="relative bg-[#0F172A] overflow-hidden flex flex-col"
            style={{
              width: 390,
              height: 844,
              borderRadius: 44,
              boxShadow: '0 0 0 10px #1a1a1a, 0 0 0 12px #333, 0 30px 80px rgba(0,0,0,0.4)',
            }}
          >
            {/* Status bar */}
            <div className="flex-shrink-0 flex items-center justify-between px-6 pt-3 pb-1 bg-[#0F172A]">
              <span className="text-white text-xs font-bold">9:41</span>
              <div className="w-24 h-5 bg-black rounded-full" />
              <div className="flex gap-1 items-center">
                <span className="text-white text-xs">●●●</span>
                <span className="text-white text-xs">WiFi</span>
                <span className="text-white text-xs">🔋</span>
              </div>
            </div>

            {/* Screen content */}
            <div className="flex-1 overflow-y-auto overflow-x-hidden" style={{ scrollbarWidth: 'none' }}>
              {renderScreen()}
            </div>

            {/* Bottom nav (hide for group chat) */}
            {!groupChatOpen && (
              <div
                className="flex-shrink-0 flex bg-[#1E293B] border-t border-[#334155]"
                style={{ paddingBottom: 20 }}
              >
                {[
                  { id: 'home', icon: '⊞', label: 'ホーム' },
                  { id: 'workout', icon: '＋', label: '記録' },
                  { id: 'history', icon: '📈', label: '履歴' },
                  { id: 'groups', icon: '👥', label: 'グループ' },
                  { id: 'friends', icon: '👤', label: 'プロフィール' },
                ].map(item => (
                  <button
                    key={item.id}
                    onClick={() => setScreen(item.id as Screen)}
                    className="flex-1 flex flex-col items-center pt-2 gap-0.5"
                  >
                    <span className={`text-xl ${screen === item.id ? 'opacity-100' : 'opacity-40'}`}>{item.icon}</span>
                    <span className={`text-[10px] font-semibold ${screen === item.id ? 'text-indigo-400' : 'text-gray-500'}`}>
                      {item.label}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
