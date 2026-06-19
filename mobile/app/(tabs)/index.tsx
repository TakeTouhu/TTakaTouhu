import { useEffect, useState, useCallback } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, RefreshControl, ActivityIndicator
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/context/AuthContext';
import { WorkoutSession, Goal } from '@/lib/types';
import { COLORS, formatDate } from '@/lib/utils';

interface WeeklyStats {
  sessionCount: number;
  totalSets: number;
  totalVolume: number;
  streakDays: number;
  vsLastWeek: number | null;
}

export default function HomeScreen() {
  const { profile } = useAuth();
  const router = useRouter();
  const [sessions, setSessions] = useState<WorkoutSession[]>([]);
  const [goals, setGoals] = useState<Goal[]>([]);
  const [weeklyStats, setWeeklyStats] = useState<WeeklyStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const load = useCallback(async () => {
    if (!profile) return;

    const today = new Date();
    const weekStart = new Date(today);
    weekStart.setDate(today.getDate() - today.getDay());
    weekStart.setHours(0, 0, 0, 0);
    const lastWeekStart = new Date(weekStart);
    lastWeekStart.setDate(weekStart.getDate() - 7);

    const [{ data: sessionData }, { data: goalData }, { data: thisWeekSessions }, { data: lastWeekSessions }] = await Promise.all([
      supabase
        .from('workout_sessions')
        .select('*, sets:workout_sets(*, exercise:exercises(name, name_ja))')
        .eq('user_id', profile.id)
        .order('date', { ascending: false })
        .limit(5),
      supabase
        .from('goals')
        .select('*, exercise:exercises(name, name_ja)')
        .eq('user_id', profile.id)
        .eq('is_achieved', false)
        .order('end_date', { ascending: true })
        .limit(3),
      supabase
        .from('workout_sessions')
        .select('*, sets:workout_sets(weight, reps, unit)')
        .eq('user_id', profile.id)
        .gte('date', weekStart.toISOString().split('T')[0]),
      supabase
        .from('workout_sessions')
        .select('id')
        .eq('user_id', profile.id)
        .gte('date', lastWeekStart.toISOString().split('T')[0])
        .lt('date', weekStart.toISOString().split('T')[0]),
    ]);

    setSessions(sessionData ?? []);
    setGoals(goalData ?? []);

    // Compute weekly stats
    const tw = thisWeekSessions ?? [];
    let totalSets = 0;
    let totalVolume = 0;
    for (const s of tw) {
      totalSets += s.sets?.length ?? 0;
      for (const set of s.sets ?? []) {
        const w = set.unit === 'lbs' ? (set.weight ?? 0) / 2.20462 : (set.weight ?? 0);
        totalVolume += w * (set.reps ?? 0);
      }
    }

    // Streak: count consecutive days from today
    let streak = 0;
    const allDates = (sessionData ?? []).map((s: WorkoutSession) => s.date).sort().reverse();
    const cursor = new Date(today);
    cursor.setHours(0, 0, 0, 0);
    for (const d of allDates) {
      const sd = new Date(d);
      sd.setHours(0, 0, 0, 0);
      const diff = Math.round((cursor.getTime() - sd.getTime()) / 86400000);
      if (diff === 0 || diff === streak) {
        streak++;
        cursor.setDate(cursor.getDate() - 1);
      } else break;
    }

    setWeeklyStats({
      sessionCount: tw.length,
      totalSets,
      totalVolume: Math.round(totalVolume),
      streakDays: streak,
      vsLastWeek: lastWeekSessions ? tw.length - lastWeekSessions.length : null,
    });

    setLoading(false);
  }, [profile]);

  useEffect(() => { load(); }, [load]);

  const onRefresh = async () => {
    setRefreshing(true);
    await load();
    setRefreshing(false);
  };

  const todayDate = new Date().toISOString().split('T')[0];
  const todaySession = sessions.find(s => s.date === todayDate);

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator color={COLORS.primary} size="large" />
      </View>
    );
  }

  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'おはようございます' : hour < 18 ? 'こんにちは' : 'こんばんは';

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={COLORS.primary} />}
    >
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>{greeting} 👋</Text>
          <Text style={styles.name}>{profile?.display_name ?? profile?.username}</Text>
          <Text style={styles.date}>
            {new Date().toLocaleDateString('ja-JP', { month: 'long', day: 'numeric', weekday: 'long' })}
          </Text>
        </View>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.iconBtn} onPress={() => router.push('/friends')}>
            <Ionicons name="people-outline" size={20} color={COLORS.primary} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconBtn} onPress={() => router.push('/goals')}>
            <Ionicons name="flag-outline" size={20} color={COLORS.primary} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Today's workout card */}
      <TouchableOpacity
        style={[styles.todayCard, todaySession && styles.todayCardDone]}
        onPress={() => router.push('/(tabs)/workout')}
        activeOpacity={0.85}
      >
        <View style={styles.todayCardInner}>
          <View style={[styles.todayIcon, todaySession && styles.todayIconDone]}>
            <Ionicons
              name={todaySession ? 'checkmark' : 'add'}
              size={22}
              color={todaySession ? '#fff' : COLORS.primary}
            />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.todayTitle}>
              {todaySession ? '今日のトレーニング完了！' : '今日のトレーニングを記録'}
            </Text>
            <Text style={styles.todaySubtitle}>
              {todaySession
                ? `${todaySession.sets?.length ?? 0}セット · ${[...new Set(todaySession.sets?.map(s => s.exercise?.name_ja ?? s.exercise?.name))].filter(Boolean).slice(0, 2).join('、')}`
                : 'タップして記録を開始'}
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color={COLORS.textSecondary} />
        </View>
      </TouchableOpacity>

      {/* Weekly stats */}
      {weeklyStats && (
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>今週の記録</Text>
            {weeklyStats.vsLastWeek !== null && (
              <View style={styles.vsChip}>
                <Ionicons
                  name={weeklyStats.vsLastWeek >= 0 ? 'trending-up' : 'trending-down'}
                  size={12}
                  color={weeklyStats.vsLastWeek >= 0 ? COLORS.success : COLORS.error}
                />
                <Text style={[styles.vsText, { color: weeklyStats.vsLastWeek >= 0 ? COLORS.success : COLORS.error }]}>
                  {weeklyStats.vsLastWeek >= 0 ? '+' : ''}{weeklyStats.vsLastWeek} vs 先週
                </Text>
              </View>
            )}
          </View>
          <View style={styles.statsGrid}>
            <StatCard
              icon="barbell-outline"
              label="セッション"
              value={`${weeklyStats.sessionCount}`}
              unit="回"
              color={COLORS.primary}
            />
            <StatCard
              icon="list-outline"
              label="総セット数"
              value={`${weeklyStats.totalSets}`}
              unit="セット"
              color={COLORS.secondary}
            />
            <StatCard
              icon="fitness-outline"
              label="総ボリューム"
              value={weeklyStats.totalVolume >= 1000 ? `${(weeklyStats.totalVolume / 1000).toFixed(1)}t` : `${weeklyStats.totalVolume}`}
              unit={weeklyStats.totalVolume >= 1000 ? '' : 'kg'}
              color={COLORS.accent}
            />
            <StatCard
              icon="flame-outline"
              label="連続日数"
              value={`${weeklyStats.streakDays}`}
              unit="日"
              color={COLORS.warning}
            />
          </View>
        </View>
      )}

      {/* Active goals */}
      {goals.length > 0 && (
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>進行中の目標</Text>
            <TouchableOpacity onPress={() => router.push('/goals')}>
              <Text style={styles.seeAll}>すべて見る</Text>
            </TouchableOpacity>
          </View>
          {goals.map(goal => <GoalRow key={goal.id} goal={goal} />)}
        </View>
      )}

      {/* Recent sessions */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>最近のトレーニング</Text>
          <TouchableOpacity onPress={() => router.push('/(tabs)/history')}>
            <Text style={styles.seeAll}>すべて見る</Text>
          </TouchableOpacity>
        </View>
        {sessions.length === 0 ? (
          <View style={styles.empty}>
            <Ionicons name="barbell-outline" size={32} color={COLORS.textSecondary} />
            <Text style={styles.emptyText}>まだトレーニングの記録がありません</Text>
          </View>
        ) : (
          sessions.map(session => <SessionCard key={session.id} session={session} />)
        )}
      </View>
    </ScrollView>
  );
}

function StatCard({ icon, label, value, unit, color }: { icon: string; label: string; value: string; unit: string; color: string }) {
  return (
    <View style={[styles.statCard, { borderColor: `${color}30` }]}>
      <View style={[styles.statIcon, { backgroundColor: `${color}15` }]}>
        <Ionicons name={icon as any} size={16} color={color} />
      </View>
      <Text style={styles.statValue}>
        {value}<Text style={styles.statUnit}>{unit}</Text>
      </Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

function GoalRow({ goal }: { goal: Goal }) {
  const daysLeft = Math.max(0, Math.ceil(
    (new Date(goal.end_date).getTime() - Date.now()) / 86400000
  ));
  const periodLabel = { week: '週', month: '月', year: '年' }[goal.period];
  const urgentColor = daysLeft <= 3 ? COLORS.error : daysLeft <= 7 ? COLORS.warning : COLORS.primary;

  return (
    <View style={styles.goalRow}>
      <View style={[styles.goalDot, { backgroundColor: urgentColor }]} />
      <View style={{ flex: 1 }}>
        <Text style={styles.goalTitle} numberOfLines={1}>{goal.title}</Text>
        <Text style={styles.goalMeta}>{periodLabel}間目標 · 残り{daysLeft}日</Text>
      </View>
      {daysLeft <= 3 && (
        <View style={[styles.urgentBadge, { backgroundColor: `${urgentColor}20` }]}>
          <Text style={[styles.urgentText, { color: urgentColor }]}>まもなく</Text>
        </View>
      )}
    </View>
  );
}

function SessionCard({ session }: { session: WorkoutSession }) {
  const exerciseNames = [...new Set(
    session.sets?.map(s => s.exercise?.name_ja ?? s.exercise?.name ?? '')
  )].filter(Boolean).slice(0, 3);
  const totalVolume = session.sets?.reduce((sum, s) => {
    const w = s.unit === 'lbs' ? (s.weight ?? 0) / 2.20462 : (s.weight ?? 0);
    return sum + w * (s.reps ?? 0);
  }, 0) ?? 0;

  return (
    <View style={styles.sessionCard}>
      <View style={styles.sessionDateBox}>
        <Text style={styles.sessionMonth}>{new Date(session.date).toLocaleDateString('ja-JP', { month: 'short' })}</Text>
        <Text style={styles.sessionDay}>{new Date(session.date).getDate()}</Text>
        <Text style={styles.sessionWeekday}>{new Date(session.date).toLocaleDateString('ja-JP', { weekday: 'short' })}</Text>
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.sessionExercises} numberOfLines={1}>
          {exerciseNames.length > 0 ? exerciseNames.join(' · ') : 'トレーニング'}
        </Text>
        <View style={styles.sessionMetaRow}>
          <Text style={styles.sessionMeta}>{session.sets?.length ?? 0}セット</Text>
          {totalVolume > 0 && (
            <Text style={styles.sessionMeta}> · {Math.round(totalVolume)}kg ボリューム</Text>
          )}
        </View>
      </View>
      <Ionicons name="chevron-forward" size={16} color={COLORS.textSecondary} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  content: { padding: 20, paddingTop: 60, paddingBottom: 40 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 },
  greeting: { fontSize: 13, color: COLORS.textSecondary },
  name: { fontSize: 24, fontWeight: '800', color: COLORS.text, marginVertical: 2 },
  date: { fontSize: 12, color: COLORS.textSecondary },
  headerActions: { flexDirection: 'row', gap: 8 },
  iconBtn: { backgroundColor: COLORS.surface, padding: 10, borderRadius: 12, borderWidth: 1, borderColor: COLORS.border },
  todayCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1.5,
    borderColor: COLORS.border,
  },
  todayCardDone: { borderColor: COLORS.success },
  todayCardInner: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  todayIcon: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: `${COLORS.primary}15`,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: `${COLORS.primary}40`,
  },
  todayIconDone: { backgroundColor: COLORS.success, borderColor: COLORS.success },
  todayTitle: { fontSize: 15, fontWeight: '700', color: COLORS.text },
  todaySubtitle: { fontSize: 12, color: COLORS.textSecondary, marginTop: 3 },
  section: { marginBottom: 24 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  sectionTitle: { fontSize: 17, fontWeight: '700', color: COLORS.text },
  seeAll: { fontSize: 13, color: COLORS.primary, fontWeight: '600' },
  vsChip: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  vsText: { fontSize: 12, fontWeight: '600' },
  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  statCard: {
    width: '47%',
    backgroundColor: COLORS.surface,
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    gap: 6,
  },
  statIcon: { width: 32, height: 32, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
  statValue: { fontSize: 22, fontWeight: '800', color: COLORS.text },
  statUnit: { fontSize: 13, fontWeight: '500', color: COLORS.textSecondary },
  statLabel: { fontSize: 12, color: COLORS.textSecondary },
  goalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: 14,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
    gap: 12,
  },
  goalDot: { width: 8, height: 8, borderRadius: 4 },
  goalTitle: { fontSize: 14, fontWeight: '600', color: COLORS.text },
  goalMeta: { fontSize: 12, color: COLORS.textSecondary, marginTop: 2 },
  urgentBadge: { borderRadius: 8, paddingHorizontal: 8, paddingVertical: 3 },
  urgentText: { fontSize: 11, fontWeight: '700' },
  sessionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
    gap: 14,
  },
  sessionDateBox: { alignItems: 'center', width: 40 },
  sessionMonth: { fontSize: 11, fontWeight: '600', color: COLORS.textSecondary },
  sessionDay: { fontSize: 22, fontWeight: '800', color: COLORS.primary },
  sessionWeekday: { fontSize: 11, color: COLORS.textSecondary },
  sessionExercises: { fontSize: 14, fontWeight: '700', color: COLORS.text },
  sessionMetaRow: { flexDirection: 'row', marginTop: 3 },
  sessionMeta: { fontSize: 12, color: COLORS.textSecondary },
  empty: { backgroundColor: COLORS.surface, borderRadius: 14, padding: 28, alignItems: 'center', gap: 10 },
  emptyText: { color: COLORS.textSecondary, fontSize: 14 },
});
