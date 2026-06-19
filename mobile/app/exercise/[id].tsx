import { useState, useEffect } from 'react';
import {
  View, Text, ScrollView, StyleSheet, Dimensions, ActivityIndicator
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { TouchableOpacity } from 'react-native';
import { LineChart, BarChart } from 'react-native-chart-kit';
import { Ionicons } from '@expo/vector-icons';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/context/AuthContext';
import { Exercise, WorkoutSet } from '@/lib/types';
import { COLORS, formatDate } from '@/lib/utils';

const { width } = Dimensions.get('window');
const CHART_WIDTH = width - 40;

interface SessionData {
  date: string;
  maxWeight: number;
  totalReps: number;
  sets: WorkoutSet[];
}

export default function ExerciseDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { profile } = useAuth();
  const router = useRouter();
  const [exercise, setExercise] = useState<Exercise | null>(null);
  const [sessions, setSessions] = useState<SessionData[]>([]);
  const [loading, setLoading] = useState(true);
  const [chartMode, setChartMode] = useState<'weight' | 'reps'>('weight');

  useEffect(() => {
    async function load() {
      if (!profile) return;
      const [{ data: ex }, { data: sets }] = await Promise.all([
        supabase.from('exercises').select('*').eq('id', id).single(),
        supabase
          .from('workout_sets')
          .select('*, session:workout_sessions!inner(date, user_id)')
          .eq('exercise_id', id)
          .eq('workout_sessions.user_id', profile.id)
          .order('workout_sessions.date', { ascending: true }),
      ]);
      setExercise(ex);

      // Group sets by session date
      const byDate = new Map<string, WorkoutSet[]>();
      for (const set of (sets ?? []) as (WorkoutSet & { session: { date: string } })[]) {
        const date = set.session.date;
        if (!byDate.has(date)) byDate.set(date, []);
        byDate.get(date)!.push(set);
      }

      const result: SessionData[] = [];
      for (const [date, dateSets] of byDate) {
        const weights = dateSets.filter(s => s.weight).map(s => s.weight!);
        const reps = dateSets.filter(s => s.reps).map(s => s.reps!);
        result.push({
          date,
          maxWeight: weights.length > 0 ? Math.max(...weights) : 0,
          totalReps: reps.reduce((a, b) => a + b, 0),
          sets: dateSets,
        });
      }
      setSessions(result);
      setLoading(false);
    }
    load();
  }, [id, profile]);

  const chartSessions = sessions.slice(-10);
  const chartLabels = chartSessions.map(s => s.date.slice(5));
  const weightData = chartSessions.map(s => s.maxWeight);
  const repsData = chartSessions.map(s => s.totalReps);

  const hasData = chartSessions.length >= 2;
  const maxWeight = sessions.length > 0 ? Math.max(...sessions.map(s => s.maxWeight)) : 0;
  const totalSessions = sessions.length;

  const chartConfig = {
    backgroundColor: COLORS.surface,
    backgroundGradientFrom: COLORS.surface,
    backgroundGradientTo: COLORS.surface,
    decimalPlaces: 1,
    color: () => COLORS.primary,
    labelColor: () => COLORS.textSecondary,
    propsForDots: { r: '4', strokeWidth: '2', stroke: COLORS.primary },
  };

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator color={COLORS.primary} size="large" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <View style={{ flex: 1, marginLeft: 12 }}>
          <Text style={styles.title}>{exercise?.name_ja ?? exercise?.name ?? ''}</Text>
          <Text style={styles.category}>{exercise?.category}</Text>
        </View>
      </View>

      {/* Stats overview */}
      <View style={styles.statsRow}>
        <StatCard label="最高重量" value={maxWeight > 0 ? `${maxWeight}kg` : '-'} icon="trophy" />
        <StatCard label="セッション数" value={`${totalSessions}回`} icon="calendar" />
        <StatCard label="最近の傾向" value={sessions.length >= 2 ? (sessions[sessions.length - 1].maxWeight >= sessions[sessions.length - 2].maxWeight ? '📈 上昇' : '📉 下降') : '-'} icon="trending-up" />
      </View>

      {/* Chart */}
      {hasData ? (
        <View style={styles.chartBox}>
          <View style={styles.chartToggle}>
            <TouchableOpacity
              style={[styles.toggleBtn, chartMode === 'weight' && styles.toggleBtnActive]}
              onPress={() => setChartMode('weight')}
            >
              <Text style={[styles.toggleText, chartMode === 'weight' && styles.toggleTextActive]}>重量</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.toggleBtn, chartMode === 'reps' && styles.toggleBtnActive]}
              onPress={() => setChartMode('reps')}
            >
              <Text style={[styles.toggleText, chartMode === 'reps' && styles.toggleTextActive]}>レップ数</Text>
            </TouchableOpacity>
          </View>
          <LineChart
            data={{
              labels: chartLabels,
              datasets: [{
                data: chartMode === 'weight' ? weightData : repsData,
                color: () => COLORS.primary,
                strokeWidth: 2,
              }],
            }}
            width={CHART_WIDTH - 32}
            height={200}
            chartConfig={chartConfig}
            bezier
            style={{ borderRadius: 12, marginTop: 8 }}
          />
        </View>
      ) : (
        <View style={styles.noChart}>
          <Ionicons name="bar-chart-outline" size={40} color={COLORS.textSecondary} />
          <Text style={styles.noChartText}>グラフ表示には2回以上の記録が必要です</Text>
        </View>
      )}

      {/* Session history */}
      <Text style={styles.sectionTitle}>セッション履歴</Text>
      {[...sessions].reverse().map(session => (
        <View key={session.date} style={styles.sessionCard}>
          <Text style={styles.sessionDate}>{formatDate(session.date)}</Text>
          <View style={styles.sessionSets}>
            {session.sets.map((set, i) => (
              <View key={set.id} style={styles.setRow}>
                <Text style={styles.setNum}>SET {set.set_number}</Text>
                <Text style={styles.setWeight}>{set.weight ?? '-'}{set.unit}</Text>
                <Text style={styles.setReps}>{set.reps ?? '-'} reps</Text>
                {set.has_assistance && (
                  <View style={styles.assistBadge}>
                    <Text style={styles.assistText}>補助あり</Text>
                  </View>
                )}
              </View>
            ))}
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

function StatCard({ label, value, icon }: { label: string; value: string; icon: string }) {
  return (
    <View style={styles.statCard}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  content: { padding: 20, paddingTop: 60, paddingBottom: 40 },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  title: { fontSize: 22, fontWeight: '800', color: COLORS.text },
  category: { fontSize: 13, color: COLORS.textSecondary, marginTop: 2 },
  statsRow: { flexDirection: 'row', gap: 8, marginBottom: 20 },
  statCard: { flex: 1, backgroundColor: COLORS.surface, borderRadius: 12, padding: 12, alignItems: 'center', borderWidth: 1, borderColor: COLORS.border },
  statValue: { fontSize: 16, fontWeight: '800', color: COLORS.primary, textAlign: 'center' },
  statLabel: { fontSize: 11, color: COLORS.textSecondary, marginTop: 4, textAlign: 'center' },
  chartBox: { backgroundColor: COLORS.surface, borderRadius: 16, padding: 16, marginBottom: 20, borderWidth: 1, borderColor: COLORS.border },
  chartToggle: { flexDirection: 'row', backgroundColor: COLORS.bg, borderRadius: 8, padding: 3, gap: 3 },
  toggleBtn: { flex: 1, paddingVertical: 6, borderRadius: 6, alignItems: 'center' },
  toggleBtnActive: { backgroundColor: COLORS.primary },
  toggleText: { fontSize: 13, fontWeight: '600', color: COLORS.textSecondary },
  toggleTextActive: { color: '#fff' },
  noChart: { backgroundColor: COLORS.surface, borderRadius: 16, padding: 32, alignItems: 'center', gap: 12, marginBottom: 20, borderWidth: 1, borderColor: COLORS.border },
  noChartText: { fontSize: 14, color: COLORS.textSecondary, textAlign: 'center' },
  sectionTitle: { fontSize: 17, fontWeight: '700', color: COLORS.text, marginBottom: 12 },
  sessionCard: { backgroundColor: COLORS.surface, borderRadius: 14, padding: 14, marginBottom: 12, borderWidth: 1, borderColor: COLORS.border },
  sessionDate: { fontSize: 14, fontWeight: '700', color: COLORS.primary, marginBottom: 10 },
  sessionSets: { gap: 6 },
  setRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  setNum: { fontSize: 12, fontWeight: '700', color: COLORS.textSecondary, width: 48 },
  setWeight: { fontSize: 15, fontWeight: '700', color: COLORS.text, flex: 1 },
  setReps: { fontSize: 14, color: COLORS.textSecondary },
  assistBadge: { backgroundColor: `${COLORS.accent}20`, borderRadius: 6, paddingHorizontal: 6, paddingVertical: 2 },
  assistText: { fontSize: 10, fontWeight: '700', color: COLORS.accent },
});
