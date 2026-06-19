import { useState, useEffect, useCallback } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet,
  Dimensions, FlatList, ActivityIndicator
} from 'react-native';
import { useRouter } from 'expo-router';
import { LineChart } from 'react-native-chart-kit';
import { Ionicons } from '@expo/vector-icons';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/context/AuthContext';
import { Exercise, WorkoutSet } from '@/lib/types';
import { COLORS, formatDate, EXERCISE_CATEGORIES } from '@/lib/utils';

const { width } = Dimensions.get('window');

interface ExerciseSummary {
  exercise: Exercise;
  lastWeight: number | null;
  lastUnit: string;
  sessionCount: number;
  maxWeight: number | null;
  sets: WorkoutSet[];
}

export default function HistoryScreen() {
  const { profile } = useAuth();
  const router = useRouter();
  const [summaries, setSummaries] = useState<ExerciseSummary[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedExercise, setSelectedExercise] = useState<ExerciseSummary | null>(null);
  const [chartData, setChartData] = useState<{ labels: string[]; data: number[] } | null>(null);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    if (!profile) return;
    const { data } = await supabase
      .from('workout_sets')
      .select('*, exercise:exercises(*), session:workout_sessions(date)')
      .eq('workout_sessions.user_id', profile.id)
      .order('created_at', { ascending: false });

    if (!data) { setLoading(false); return; }

    // Group by exercise
    const byExercise = new Map<string, { exercise: Exercise; sets: (WorkoutSet & { session: { date: string } })[] }>();
    for (const set of data as (WorkoutSet & { exercise: Exercise; session: { date: string } })[]) {
      if (!set.exercise) continue;
      if (!byExercise.has(set.exercise_id)) {
        byExercise.set(set.exercise_id, { exercise: set.exercise, sets: [] });
      }
      byExercise.get(set.exercise_id)!.sets.push(set as WorkoutSet & { session: { date: string } });
    }

    const result: ExerciseSummary[] = [];
    for (const [, { exercise, sets }] of byExercise) {
      const weights = sets.filter(s => s.weight !== null).map(s => s.weight!);
      result.push({
        exercise,
        lastWeight: sets[0]?.weight ?? null,
        lastUnit: sets[0]?.unit ?? 'kg',
        sessionCount: new Set(sets.map(s => (s as WorkoutSet & { session: { date: string } }).session?.date)).size,
        maxWeight: weights.length > 0 ? Math.max(...weights) : null,
        sets,
      });
    }
    setSummaries(result);
    setLoading(false);
  }, [profile]);

  useEffect(() => { load(); }, [load]);

  function selectExercise(summary: ExerciseSummary) {
    setSelectedExercise(summary);
    // Build chart data from last 8 sessions
    const sessionMap = new Map<string, number>();
    for (const set of (summary.sets as (WorkoutSet & { session: { date: string } })[]).reverse()) {
      const date = set.session?.date;
      if (!date || !set.weight) continue;
      if (!sessionMap.has(date) || set.weight > sessionMap.get(date)!) {
        sessionMap.set(date, set.weight);
      }
    }
    const entries = [...sessionMap.entries()].slice(-8);
    if (entries.length >= 2) {
      setChartData({
        labels: entries.map(([d]) => d.slice(5)),
        data: entries.map(([, w]) => w),
      });
    } else {
      setChartData(null);
    }
  }

  const categories = ['all', ...EXERCISE_CATEGORIES.map(c => c.id)];
  const filtered = selectedCategory && selectedCategory !== 'all'
    ? summaries.filter(s => s.exercise.category === selectedCategory)
    : summaries;

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator color={COLORS.primary} size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>種目別履歴</Text>

        {/* Category filter */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
          {[{ id: 'all', label: 'すべて' }, ...EXERCISE_CATEGORIES].map(cat => (
            <TouchableOpacity
              key={cat.id}
              style={[styles.catChip, selectedCategory === cat.id && styles.catChipActive]}
              onPress={() => setSelectedCategory(cat.id === 'all' ? null : cat.id)}
            >
              <Text style={[styles.catChipText, selectedCategory === cat.id && styles.catChipTextActive]}>
                {cat.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Chart for selected exercise */}
        {selectedExercise && (
          <View style={styles.chartContainer}>
            <View style={styles.chartHeader}>
              <Text style={styles.chartTitle}>{selectedExercise.exercise.name_ja ?? selectedExercise.exercise.name}</Text>
              <TouchableOpacity onPress={() => setSelectedExercise(null)}>
                <Ionicons name="close" size={20} color={COLORS.textSecondary} />
              </TouchableOpacity>
            </View>
            <View style={styles.chartStats}>
              <StatBadge label="最高重量" value={selectedExercise.maxWeight ? `${selectedExercise.maxWeight}${selectedExercise.lastUnit}` : '-'} />
              <StatBadge label="最近の重量" value={selectedExercise.lastWeight ? `${selectedExercise.lastWeight}${selectedExercise.lastUnit}` : '-'} />
              <StatBadge label="セッション数" value={`${selectedExercise.sessionCount}回`} />
            </View>
            {chartData && chartData.data.length >= 2 ? (
              <LineChart
                data={{
                  labels: chartData.labels,
                  datasets: [{ data: chartData.data, color: () => COLORS.primary, strokeWidth: 2 }],
                }}
                width={width - 64}
                height={180}
                chartConfig={{
                  backgroundColor: COLORS.surface,
                  backgroundGradientFrom: COLORS.surface,
                  backgroundGradientTo: COLORS.surface,
                  decimalPlaces: 1,
                  color: () => COLORS.primary,
                  labelColor: () => COLORS.textSecondary,
                  style: { borderRadius: 12 },
                  propsForDots: { r: '4', strokeWidth: '2', stroke: COLORS.primary },
                }}
                bezier
                style={{ borderRadius: 12, marginTop: 12 }}
              />
            ) : (
              <View style={styles.noChart}>
                <Text style={styles.noChartText}>グラフ表示には2回以上の記録が必要です</Text>
              </View>
            )}

            <TouchableOpacity
              style={styles.detailBtn}
              onPress={() => router.push(`/exercise/${selectedExercise.exercise.id}`)}
            >
              <Text style={styles.detailBtnText}>詳細な履歴を見る</Text>
              <Ionicons name="chevron-forward" size={16} color={COLORS.primary} />
            </TouchableOpacity>
          </View>
        )}

        {/* Exercise list */}
        <View style={styles.list}>
          {filtered.length === 0 ? (
            <View style={styles.empty}>
              <Ionicons name="barbell-outline" size={48} color={COLORS.textSecondary} />
              <Text style={styles.emptyText}>まだ記録がありません</Text>
            </View>
          ) : (
            filtered.map(summary => (
              <TouchableOpacity
                key={summary.exercise.id}
                style={[
                  styles.exerciseCard,
                  selectedExercise?.exercise.id === summary.exercise.id && styles.exerciseCardSelected,
                ]}
                onPress={() => selectExercise(summary)}
              >
                <View style={styles.exerciseCardLeft}>
                  <Text style={styles.exerciseCardName}>
                    {summary.exercise.name_ja ?? summary.exercise.name}
                  </Text>
                  <Text style={styles.exerciseCardCategory}>{summary.exercise.category}</Text>
                </View>
                <View style={styles.exerciseCardRight}>
                  {summary.lastWeight && (
                    <Text style={styles.exerciseCardWeight}>
                      {summary.lastWeight}{summary.lastUnit}
                    </Text>
                  )}
                  <Text style={styles.exerciseCardSessions}>{summary.sessionCount}回</Text>
                </View>
                <Ionicons name="chevron-forward" size={16} color={COLORS.textSecondary} />
              </TouchableOpacity>
            ))
          )}
        </View>
      </ScrollView>
    </View>
  );
}

function StatBadge({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.statBadge}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  content: { padding: 20, paddingTop: 60, paddingBottom: 40 },
  title: { fontSize: 26, fontWeight: '800', color: COLORS.text, marginBottom: 16 },
  categoryScroll: { marginBottom: 20 },
  catChip: {
    backgroundColor: COLORS.surface,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  catChipActive: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  catChipText: { fontSize: 13, fontWeight: '600', color: COLORS.textSecondary },
  catChipTextActive: { color: '#fff' },
  chartContainer: {
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  chartHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  chartTitle: { fontSize: 17, fontWeight: '700', color: COLORS.text },
  chartStats: { flexDirection: 'row', gap: 8, marginTop: 12 },
  statBadge: {
    flex: 1,
    backgroundColor: COLORS.bg,
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
  },
  statValue: { fontSize: 16, fontWeight: '700', color: COLORS.text },
  statLabel: { fontSize: 11, color: COLORS.textSecondary, marginTop: 2 },
  noChart: { height: 80, justifyContent: 'center', alignItems: 'center' },
  noChartText: { fontSize: 13, color: COLORS.textSecondary },
  detailBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
    gap: 4,
  },
  detailBtnText: { color: COLORS.primary, fontSize: 14, fontWeight: '600' },
  list: { gap: 8 },
  exerciseCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
    gap: 12,
  },
  exerciseCardSelected: { borderColor: COLORS.primary },
  exerciseCardLeft: { flex: 1 },
  exerciseCardName: { fontSize: 15, fontWeight: '600', color: COLORS.text },
  exerciseCardCategory: { fontSize: 12, color: COLORS.textSecondary, marginTop: 2 },
  exerciseCardRight: { alignItems: 'flex-end' },
  exerciseCardWeight: { fontSize: 15, fontWeight: '700', color: COLORS.primary },
  exerciseCardSessions: { fontSize: 12, color: COLORS.textSecondary, marginTop: 2 },
  empty: { alignItems: 'center', paddingVertical: 60, gap: 12 },
  emptyText: { color: COLORS.textSecondary, fontSize: 15 },
});
