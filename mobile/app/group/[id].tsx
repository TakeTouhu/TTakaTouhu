import { useState, useEffect, useRef, useCallback } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, TextInput,
  StyleSheet, KeyboardAvoidingView, Platform, Alert,
  ActivityIndicator, FlatList
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/context/AuthContext';
import { Group, GroupMember, Message, Goal } from '@/lib/types';
import { COLORS, formatDate, getPeriodDates } from '@/lib/utils';

type Tab = 'chat' | 'members' | 'goals' | 'compare';

export default function GroupScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { profile } = useAuth();
  const router = useRouter();
  const [group, setGroup] = useState<Group | null>(null);
  const [members, setMembers] = useState<GroupMember[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [goals, setGoals] = useState<Goal[]>([]);
  const [tab, setTab] = useState<Tab>('chat');
  const [messageText, setMessageText] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [showGoalForm, setShowGoalForm] = useState(false);
  const flatListRef = useRef<FlatList>(null);

  const loadGroup = useCallback(async () => {
    const [{ data: g }, { data: m }, { data: msgs }, { data: gl }] = await Promise.all([
      supabase.from('groups').select('*').eq('id', id).single(),
      supabase.from('group_members').select('*, profile:profiles(*)').eq('group_id', id),
      supabase.from('messages').select('*, profile:profiles(*)').eq('group_id', id).order('created_at', { ascending: true }).limit(50),
      supabase.from('goals').select('*, exercise:exercises(name, name_ja)').eq('group_id', id).order('created_at', { ascending: false }),
    ]);
    setGroup(g);
    setMembers(m ?? []);
    setMessages(msgs ?? []);
    setGoals(gl ?? []);
    setLoading(false);
  }, [id]);

  useEffect(() => {
    loadGroup();

    // Realtime subscription for messages
    const sub = supabase
      .channel(`group:${id}`)
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'messages',
        filter: `group_id=eq.${id}`,
      }, async (payload) => {
        const { data: msg } = await supabase
          .from('messages')
          .select('*, profile:profiles(*)')
          .eq('id', payload.new.id)
          .single();
        if (msg) setMessages(prev => [...prev, msg]);
      })
      .subscribe();

    return () => { sub.unsubscribe(); };
  }, [id, loadGroup]);

  async function sendMessage() {
    if (!profile || !messageText.trim()) return;
    setSending(true);
    await supabase.from('messages').insert({
      group_id: id,
      user_id: profile.id,
      content: messageText.trim(),
      message_type: 'text',
    });
    setMessageText('');
    setSending(false);
  }

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator color={COLORS.primary} size="large" />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <View style={styles.headerTitle}>
          <Text style={styles.groupName}>{group?.name}</Text>
          <Text style={styles.memberCount}>{members.length}人のメンバー</Text>
        </View>
        <TouchableOpacity onPress={() => setShowGoalForm(true)}>
          <Ionicons name="flag-outline" size={24} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View style={styles.tabs}>
        {([
          { key: 'chat', label: 'チャット' },
          { key: 'members', label: 'メンバー' },
          { key: 'goals', label: '目標' },
          { key: 'compare', label: '比較' },
        ] as { key: Tab; label: string }[]).map(t => (
          <TouchableOpacity
            key={t.key}
            style={[styles.tab, tab === t.key && styles.tabActive]}
            onPress={() => setTab(t.key)}
          >
            <Text style={[styles.tabText, tab === t.key && styles.tabTextActive]}>{t.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Chat tab */}
      {tab === 'chat' && (
        <>
          <FlatList
            ref={flatListRef}
            data={messages}
            keyExtractor={m => m.id}
            contentContainerStyle={styles.chatList}
            onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: false })}
            renderItem={({ item }) => (
              <ChatBubble message={item} isMe={item.user_id === profile?.id} />
            )}
          />
          <View style={styles.inputRow}>
            <TextInput
              style={styles.chatInput}
              value={messageText}
              onChangeText={setMessageText}
              placeholder="メッセージを入力..."
              placeholderTextColor={COLORS.textSecondary}
              multiline
            />
            <TouchableOpacity
              style={[styles.sendBtn, !messageText.trim() && styles.sendBtnDisabled]}
              onPress={sendMessage}
              disabled={sending || !messageText.trim()}
            >
              <Ionicons name="send" size={18} color="#fff" />
            </TouchableOpacity>
          </View>
        </>
      )}

      {/* Members tab */}
      {tab === 'members' && (
        <ScrollView contentContainerStyle={styles.tabContent}>
          {members.map(member => (
            <View key={member.user_id} style={styles.memberRow}>
              <View style={styles.memberAvatar}>
                <Text style={styles.memberAvatarText}>
                  {(member.profile?.display_name ?? member.profile?.username ?? '?')[0].toUpperCase()}
                </Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.memberName}>{member.profile?.display_name ?? member.profile?.username}</Text>
                <Text style={styles.memberUsername}>@{member.profile?.username}</Text>
              </View>
              {member.role === 'admin' && (
                <View style={styles.adminBadge}>
                  <Text style={styles.adminBadgeText}>管理者</Text>
                </View>
              )}
            </View>
          ))}
        </ScrollView>
      )}

      {/* Goals tab */}
      {tab === 'goals' && (
        <ScrollView contentContainerStyle={styles.tabContent}>
          <TouchableOpacity style={styles.addGoalBtn} onPress={() => setShowGoalForm(true)}>
            <Ionicons name="add-circle" size={20} color={COLORS.primary} />
            <Text style={styles.addGoalText}>グループ目標を追加</Text>
          </TouchableOpacity>
          {goals.map(goal => <GoalCard key={goal.id} goal={goal} />)}
          {goals.length === 0 && (
            <View style={styles.empty}>
              <Ionicons name="flag-outline" size={48} color={COLORS.textSecondary} />
              <Text style={styles.emptyText}>まだグループ目標がありません</Text>
            </View>
          )}
        </ScrollView>
      )}

      {/* Compare tab */}
      {tab === 'compare' && (
        <CompareTab groupId={id} members={members} />
      )}

      {/* Goal form modal */}
      {showGoalForm && (
        <GroupGoalForm
          groupId={id}
          userId={profile?.id ?? ''}
          onClose={() => setShowGoalForm(false)}
          onSaved={() => { setShowGoalForm(false); loadGroup(); }}
        />
      )}
    </KeyboardAvoidingView>
  );
}

function ChatBubble({ message, isMe }: { message: Message; isMe: boolean }) {
  const isAchievement = message.message_type === 'achievement';
  if (isAchievement) {
    return (
      <View style={styles.achievementBubble}>
        <Text style={styles.achievementText}>{message.content}</Text>
        <Text style={styles.achievementTime}>
          {new Date(message.created_at).toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' })}
        </Text>
      </View>
    );
  }

  return (
    <View style={[styles.bubbleWrapper, isMe && styles.bubbleWrapperMe]}>
      {!isMe && (
        <View style={styles.bubbleAvatar}>
          <Text style={styles.bubbleAvatarText}>
            {(message.profile?.display_name ?? message.profile?.username ?? '?')[0].toUpperCase()}
          </Text>
        </View>
      )}
      <View style={[styles.bubble, isMe && styles.bubbleMe]}>
        {!isMe && <Text style={styles.bubbleSender}>{message.profile?.display_name ?? message.profile?.username}</Text>}
        <Text style={[styles.bubbleText, isMe && styles.bubbleTextMe]}>{message.content}</Text>
        <Text style={[styles.bubbleTime, isMe && styles.bubbleTimeMe]}>
          {new Date(message.created_at).toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' })}
        </Text>
      </View>
    </View>
  );
}

function GoalCard({ goal }: { goal: Goal }) {
  const periodLabel = { week: '週間', month: '月間', year: '年間' }[goal.period];
  const daysLeft = Math.max(0, Math.ceil((new Date(goal.end_date).getTime() - Date.now()) / 86400000));
  return (
    <View style={[styles.goalCard, goal.is_achieved && styles.goalCardAchieved]}>
      <View style={styles.goalCardHeader}>
        <Text style={styles.goalTitle}>{goal.title}</Text>
        {goal.is_achieved && <Text style={styles.achievedBadge}>達成！</Text>}
      </View>
      {goal.description && <Text style={styles.goalDesc}>{goal.description}</Text>}
      <Text style={styles.goalMeta}>
        {periodLabel}目標 · {goal.is_achieved ? '達成済み' : `残り${daysLeft}日`}
      </Text>
    </View>
  );
}

function CompareTab({ groupId, members }: { groupId: string; members: GroupMember[] }) {
  const [data, setData] = useState<{ username: string; sessions: number; totalSets: number }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const now = new Date();
      const weekStart = new Date(now);
      weekStart.setDate(now.getDate() - now.getDay());
      weekStart.setHours(0, 0, 0, 0);

      const results = await Promise.all(
        members.map(async m => {
          const { count: sessions } = await supabase
            .from('workout_sessions')
            .select('*', { count: 'exact', head: true })
            .eq('user_id', m.user_id)
            .gte('date', weekStart.toISOString().split('T')[0]);
          return {
            username: m.profile?.display_name ?? m.profile?.username ?? 'Unknown',
            sessions: sessions ?? 0,
            totalSets: 0,
          };
        })
      );
      setData(results.sort((a, b) => b.sessions - a.sessions));
      setLoading(false);
    }
    load();
  }, [groupId, members]);

  if (loading) return <ActivityIndicator color={COLORS.primary} style={{ marginTop: 40 }} />;

  return (
    <ScrollView contentContainerStyle={styles.tabContent}>
      <Text style={styles.compareTitle}>今週のトレーニング回数</Text>
      {data.map((d, i) => (
        <View key={d.username} style={styles.compareRow}>
          <Text style={styles.compareRank}>#{i + 1}</Text>
          <View style={{ flex: 1 }}>
            <Text style={styles.compareUsername}>{d.username}</Text>
            <View style={styles.compareBarBg}>
              <View style={[
                styles.compareBar,
                { width: `${Math.max(4, (d.sessions / Math.max(1, data[0].sessions)) * 100)}%` },
              ]} />
            </View>
          </View>
          <Text style={styles.compareCount}>{d.sessions}回</Text>
        </View>
      ))}
    </ScrollView>
  );
}

function GroupGoalForm({ groupId, userId, onClose, onSaved }: {
  groupId: string; userId: string; onClose: () => void; onSaved: () => void;
}) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [period, setPeriod] = useState<'week' | 'month' | 'year'>('month');
  const [targetValue, setTargetValue] = useState('');
  const [saving, setSaving] = useState(false);

  async function save() {
    if (!title.trim()) return Alert.alert('エラー', 'タイトルを入力してください');
    setSaving(true);
    const { start, end } = getPeriodDates(period);
    const { error } = await supabase.from('goals').insert({
      user_id: userId,
      group_id: groupId,
      title: title.trim(),
      description: description.trim() || null,
      period,
      target_value: targetValue ? parseFloat(targetValue) : null,
      target_unit: 'sessions',
      start_date: start.toISOString().split('T')[0],
      end_date: end.toISOString().split('T')[0],
    });
    setSaving(false);
    if (error) return Alert.alert('エラー', error.message);
    onSaved();
  }

  return (
    <View style={styles.goalFormOverlay}>
      <View style={styles.goalForm}>
        <View style={styles.goalFormHeader}>
          <Text style={styles.goalFormTitle}>グループ目標を追加</Text>
          <TouchableOpacity onPress={onClose}>
            <Ionicons name="close" size={24} color={COLORS.text} />
          </TouchableOpacity>
        </View>
        <Text style={styles.inputLabel}>タイトル *</Text>
        <TextInput style={styles.formInput} value={title} onChangeText={setTitle} placeholder="例：今月10回トレーニング" placeholderTextColor={COLORS.textSecondary} />
        <Text style={styles.inputLabel}>説明</Text>
        <TextInput style={styles.formInput} value={description} onChangeText={setDescription} placeholder="詳細説明（任意）" placeholderTextColor={COLORS.textSecondary} />
        <Text style={styles.inputLabel}>期間</Text>
        <View style={styles.periodRow}>
          {(['week', 'month', 'year'] as const).map(p => (
            <TouchableOpacity key={p} style={[styles.periodBtn, period === p && styles.periodBtnActive]} onPress={() => setPeriod(p)}>
              <Text style={[styles.periodBtnText, period === p && styles.periodBtnTextActive]}>
                {{ week: '週間', month: '月間', year: '年間' }[p]}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <Text style={styles.inputLabel}>目標セッション数</Text>
        <TextInput style={styles.formInput} value={targetValue} onChangeText={setTargetValue} keyboardType="number-pad" placeholder="例：10" placeholderTextColor={COLORS.textSecondary} />
        <TouchableOpacity style={styles.submitBtn} onPress={save} disabled={saving}>
          {saving ? <ActivityIndicator color="#fff" /> : <Text style={styles.submitBtnText}>保存する</Text>}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    paddingTop: 56,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    gap: 12,
  },
  headerTitle: { flex: 1 },
  groupName: { fontSize: 17, fontWeight: '700', color: COLORS.text },
  memberCount: { fontSize: 12, color: COLORS.textSecondary },
  tabs: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: COLORS.border },
  tab: { flex: 1, paddingVertical: 12, alignItems: 'center' },
  tabActive: { borderBottomWidth: 2, borderBottomColor: COLORS.primary },
  tabText: { fontSize: 13, fontWeight: '600', color: COLORS.textSecondary },
  tabTextActive: { color: COLORS.primary },
  chatList: { padding: 16, gap: 8 },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    gap: 8,
  },
  chatInput: {
    flex: 1,
    backgroundColor: COLORS.surface,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    color: COLORS.text,
    fontSize: 15,
    maxHeight: 100,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  sendBtn: { backgroundColor: COLORS.primary, borderRadius: 20, width: 40, height: 40, justifyContent: 'center', alignItems: 'center' },
  sendBtnDisabled: { backgroundColor: COLORS.surfaceLight },
  bubbleWrapper: { flexDirection: 'row', alignItems: 'flex-end', gap: 8, marginBottom: 4 },
  bubbleWrapperMe: { flexDirection: 'row-reverse' },
  bubbleAvatar: { width: 28, height: 28, borderRadius: 8, backgroundColor: COLORS.secondary, justifyContent: 'center', alignItems: 'center' },
  bubbleAvatarText: { fontSize: 12, fontWeight: '700', color: '#fff' },
  bubble: { maxWidth: '75%', backgroundColor: COLORS.surface, borderRadius: 16, padding: 10, borderBottomLeftRadius: 4 },
  bubbleMe: { backgroundColor: COLORS.primary, borderBottomLeftRadius: 16, borderBottomRightRadius: 4 },
  bubbleSender: { fontSize: 11, fontWeight: '700', color: COLORS.primary, marginBottom: 3 },
  bubbleText: { fontSize: 15, color: COLORS.text },
  bubbleTextMe: { color: '#fff' },
  bubbleTime: { fontSize: 10, color: COLORS.textSecondary, marginTop: 4, textAlign: 'right' },
  bubbleTimeMe: { color: 'rgba(255,255,255,0.7)' },
  achievementBubble: {
    backgroundColor: `${COLORS.warning}20`,
    borderRadius: 12,
    padding: 12,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: `${COLORS.warning}40`,
    alignItems: 'center',
  },
  achievementText: { fontSize: 15, fontWeight: '600', color: COLORS.warning, textAlign: 'center' },
  achievementTime: { fontSize: 10, color: COLORS.textSecondary, marginTop: 4 },
  tabContent: { padding: 16 },
  memberRow: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: COLORS.border },
  memberAvatar: { width: 40, height: 40, borderRadius: 12, backgroundColor: COLORS.primary, justifyContent: 'center', alignItems: 'center' },
  memberAvatarText: { fontSize: 18, fontWeight: '700', color: '#fff' },
  memberName: { fontSize: 15, fontWeight: '600', color: COLORS.text },
  memberUsername: { fontSize: 12, color: COLORS.textSecondary },
  adminBadge: { backgroundColor: `${COLORS.primary}20`, borderRadius: 6, paddingHorizontal: 8, paddingVertical: 3 },
  adminBadgeText: { fontSize: 11, fontWeight: '700', color: COLORS.primary },
  addGoalBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: COLORS.surface, borderRadius: 12, padding: 14, marginBottom: 12, borderWidth: 1, borderColor: COLORS.primary, borderStyle: 'dashed', gap: 8 },
  addGoalText: { color: COLORS.primary, fontSize: 15, fontWeight: '600' },
  goalCard: { backgroundColor: COLORS.surface, borderRadius: 12, padding: 14, marginBottom: 8, borderWidth: 1, borderColor: COLORS.border },
  goalCardAchieved: { borderColor: COLORS.success },
  goalCardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  goalTitle: { fontSize: 15, fontWeight: '700', color: COLORS.text, flex: 1 },
  achievedBadge: { backgroundColor: `${COLORS.success}20`, borderRadius: 6, paddingHorizontal: 8, paddingVertical: 3, fontSize: 11, fontWeight: '700', color: COLORS.success },
  goalDesc: { fontSize: 13, color: COLORS.textSecondary, marginTop: 4 },
  goalMeta: { fontSize: 12, color: COLORS.textSecondary, marginTop: 6 },
  empty: { alignItems: 'center', paddingVertical: 60, gap: 12 },
  emptyText: { color: COLORS.textSecondary, fontSize: 14 },
  compareTitle: { fontSize: 17, fontWeight: '700', color: COLORS.text, marginBottom: 16 },
  compareRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 12 },
  compareRank: { fontSize: 14, fontWeight: '800', color: COLORS.textSecondary, width: 28 },
  compareUsername: { fontSize: 14, fontWeight: '600', color: COLORS.text, marginBottom: 4 },
  compareBarBg: { height: 8, backgroundColor: COLORS.surfaceLight, borderRadius: 4 },
  compareBar: { height: 8, backgroundColor: COLORS.primary, borderRadius: 4 },
  compareCount: { fontSize: 15, fontWeight: '700', color: COLORS.primary, width: 36, textAlign: 'right' },
  goalFormOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  goalForm: { backgroundColor: COLORS.bg, borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 20, paddingBottom: 40 },
  goalFormHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  goalFormTitle: { fontSize: 18, fontWeight: '700', color: COLORS.text },
  inputLabel: { fontSize: 14, color: COLORS.textSecondary, marginBottom: 8 },
  formInput: { backgroundColor: COLORS.surface, borderRadius: 12, padding: 14, color: COLORS.text, fontSize: 15, borderWidth: 1, borderColor: COLORS.border, marginBottom: 16 },
  periodRow: { flexDirection: 'row', gap: 8, marginBottom: 16 },
  periodBtn: { flex: 1, padding: 10, borderRadius: 10, borderWidth: 1, borderColor: COLORS.border, alignItems: 'center' },
  periodBtnActive: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  periodBtnText: { fontSize: 13, fontWeight: '600', color: COLORS.textSecondary },
  periodBtnTextActive: { color: '#fff' },
  submitBtn: { backgroundColor: COLORS.primary, borderRadius: 12, padding: 16, alignItems: 'center' },
  submitBtnText: { color: '#fff', fontSize: 16, fontWeight: '700' },
});
