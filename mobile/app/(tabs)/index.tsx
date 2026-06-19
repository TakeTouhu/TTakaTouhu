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

export default function HomeScreen() {
  const { profile } = useAuth();
  const router = useRouter();
  const [sessions, setSessions] = useState<WorkoutSession[]>([]);
  const [goals, setGoals] = useState<Goal[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const load = useCallback(async () => {
    if (!profile) return;
    const [{ data: sessionData }, { data: goalData }] = await Promise.all([
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
    ]);
    setSessions(sessionData ?? []);
    setGoals(goalData ?? []);
    setLoading(false);
  }, [profile]);

  useEffect(() => { load(); }, [load]);

  const onRefresh = async () => {
    setRefreshing(true);
    await load();
    setRefreshing(false);
  };

  const today = new Date().toLocaleDateString('ja-JP', { month: 'long', day: 'numeric', weekday: 'long' });
  const todaySession = sessions.find(s => s.date === new Date().toISOString().split('T')[0]);

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator color={COLORS.primary} size="large" />
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={COLORS.primary} />}
    >
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>おはようございます 👋</Text>
          <Text style={styles.name}>{profile?.display_name ?? profile?.username}</Text>
          <Text style={styles.date}>{today}</Text>
        </View>
        <TouchableOpacity style={styles.goalBtn} onPress={() => router.push('/goals')}>
          <Ionicons name="flag" size={20} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      {/* Today's workout card */}
      <TouchableOpacity
        style={[styles.todayCard, todaySession && styles.todayCardActive]}
        onPress={() => router.push('/(tabs)/workout')}
      >
        <View style={styles.todayCardInner}>
          <Ionicons
            name={todaySession ? 'checkmark-circle' : 'add-circle-outline'}
            size={28}
            color={todaySession ? COLORS.success : COLORS.primary}
          />
          <View style={{ flex: 1, marginLeft: 12 }}>
            <Text style={styles.todayTitle}>
              {todaySession ? '今日のトレーニング完了！' : '今日のトレーニングを記録する'}
            </Text>
            {todaySession && (
              <Text style={styles.todayMeta}>
                {todaySession.sets?.length ?? 0}セット記録済み
              </Text>
            )}
          </View>
          <Ionicons name="chevron-forward" size={20} color={COLORS.textSecondary} />
        </View>
      </TouchableOpacity>

      {/* Active goals */}
      {goals.length > 0 && (
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>進行中の目標</Text>
            <TouchableOpacity onPress={() => router.push('/goals')}>
              <Text style={styles.seeAll}>すべて見る</Text>
            </TouchableOpacity>
          </View>
          {goals.map(goal => (
            <GoalRow key={goal.id} goal={goal} />
          ))}
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
            <Text style={styles.emptyText}>まだトレーニングの記録がありません</Text>
          </View>
        ) : (
          sessions.map(session => (
            <SessionCard key={session.id} session={session} />
          ))
        )}
      </View>
    </ScrollView>
  );
}

function GoalRow({ goal }: { goal: Goal }) {
  const daysLeft = Math.max(0, Math.ceil(
    (new Date(goal.end_date).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
  ));
  const periodLabel = { week: '週間', month: '月間', year: '年間' }[goal.period];

  return (
    <View style={styles.goalRow}>
      <View style={styles.goalIcon}>
        <Ionicons name="flag" size={16} color={COLORS.warning} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.goalTitle}>{goal.title}</Text>
        <Text style={styles.goalMeta}>{periodLabel}目標 · 残り{daysLeft}日</Text>
      </View>
    </View>
  );
}

function SessionCard({ session }: { session: WorkoutSession }) {
  const exerciseNames = [...new Set(
    session.sets?.map(s => s.exercise?.name_ja ?? s.exercise?.name ?? '')
  )].filter(Boolean).slice(0, 3);

  return (
    <View style={styles.sessionCard}>
      <View style={styles.sessionDate}>
        <Text style={styles.sessionDateText}>{formatDate(session.date)}</Text>
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.sessionExercises} numberOfLines={1}>
          {exerciseNames.length > 0 ? exerciseNames.join('、') : 'トレーニング'}
        </Text>
        <Text style={styles.sessionMeta}>{session.sets?.length ?? 0}セット</Text>
      </View>
      <Ionicons name="chevron-forward" size={16} color={COLORS.textSecondary} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  content: { padding: 20, paddingTop: 60, paddingBottom: 40 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 },
  greeting: { fontSize: 14, color: COLORS.textSecondary },
  name: { fontSize: 24, fontWeight: '800', color: COLORS.text, marginVertical: 2 },
  date: { fontSize: 13, color: COLORS.textSecondary },
  goalBtn: {
    backgroundColor: COLORS.surface,
    padding: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  todayCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  todayCardActive: { borderColor: COLORS.success },
  todayCardInner: { flexDirection: 'row', alignItems: 'center' },
  todayTitle: { fontSize: 15, fontWeight: '600', color: COLORS.text },
  todayMeta: { fontSize: 13, color: COLORS.textSecondary, marginTop: 2 },
  section: { marginBottom: 24 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  sectionTitle: { fontSize: 17, fontWeight: '700', color: COLORS.text },
  seeAll: { fontSize: 13, color: COLORS.primary },
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
  goalIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: `${COLORS.warning}20`,
    justifyContent: 'center',
    alignItems: 'center',
  },
  goalTitle: { fontSize: 14, fontWeight: '600', color: COLORS.text },
  goalMeta: { fontSize: 12, color: COLORS.textSecondary, marginTop: 2 },
  sessionCard: {
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
  sessionDate: {
    backgroundColor: `${COLORS.primary}20`,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  sessionDateText: { fontSize: 12, fontWeight: '700', color: COLORS.primary },
  sessionExercises: { fontSize: 14, fontWeight: '600', color: COLORS.text, flex: 1 },
  sessionMeta: { fontSize: 12, color: COLORS.textSecondary, marginTop: 2 },
  empty: { backgroundColor: COLORS.surface, borderRadius: 12, padding: 24, alignItems: 'center' },
  emptyText: { color: COLORS.textSecondary, fontSize: 14 },
});
