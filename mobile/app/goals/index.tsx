import { useState, useEffect, useCallback } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet,
  TextInput, Modal, Alert, ActivityIndicator
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/context/AuthContext';
import { Goal, Exercise } from '@/lib/types';
import { COLORS, getPeriodDates } from '@/lib/utils';

export default function GoalsScreen() {
  const { profile } = useAuth();
  const router = useRouter();
  const [goals, setGoals] = useState<Goal[]>([]);
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState<'active' | 'achieved'>('active');

  // Form state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [period, setPeriod] = useState<'week' | 'month' | 'year'>('month');
  const [targetValue, setTargetValue] = useState('');
  const [targetUnit, setTargetUnit] = useState('sessions');
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    if (!profile) return;
    const [{ data: g }, { data: e }] = await Promise.all([
      supabase.from('goals').select('*, exercise:exercises(name, name_ja)').eq('user_id', profile.id).order('created_at', { ascending: false }),
      supabase.from('exercises').select('*').order('name_ja'),
    ]);
    setGoals(g ?? []);
    setExercises(e ?? []);
    setLoading(false);
  }, [profile]);

  useEffect(() => { load(); }, [load]);

  async function saveGoal() {
    if (!profile || !title.trim()) return Alert.alert('エラー', 'タイトルを入力してください');
    setSaving(true);
    const { start, end } = getPeriodDates(period);
    const { error } = await supabase.from('goals').insert({
      user_id: profile.id,
      group_id: null,
      title: title.trim(),
      description: description.trim() || null,
      period,
      target_value: targetValue ? parseFloat(targetValue) : null,
      target_unit: targetUnit,
      start_date: start.toISOString().split('T')[0],
      end_date: end.toISOString().split('T')[0],
    });
    setSaving(false);
    if (error) return Alert.alert('エラー', error.message);
    setShowForm(false);
    resetForm();
    load();
  }

  function resetForm() {
    setTitle(''); setDescription(''); setPeriod('month'); setTargetValue(''); setTargetUnit('sessions');
  }

  const filtered = goals.filter(g => filter === 'active' ? !g.is_achieved : g.is_achieved);

  const activeCount = goals.filter(g => !g.is_achieved).length;
  const achievedCount = goals.filter(g => g.is_achieved).length;

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
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color={COLORS.text} />
          </TouchableOpacity>
          <Text style={styles.title}>目標管理</Text>
          <TouchableOpacity style={styles.addBtn} onPress={() => setShowForm(true)}>
            <Ionicons name="add" size={22} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Stats */}
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{activeCount}</Text>
            <Text style={styles.statLabel}>進行中</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={[styles.statValue, { color: COLORS.success }]}>{achievedCount}</Text>
            <Text style={styles.statLabel}>達成済み</Text>
          </View>
        </View>

        {/* Filter */}
        <View style={styles.filterRow}>
          <TouchableOpacity style={[styles.filterBtn, filter === 'active' && styles.filterBtnActive]} onPress={() => setFilter('active')}>
            <Text style={[styles.filterText, filter === 'active' && styles.filterTextActive]}>進行中</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.filterBtn, filter === 'achieved' && styles.filterBtnActive]} onPress={() => setFilter('achieved')}>
            <Text style={[styles.filterText, filter === 'achieved' && styles.filterTextActive]}>達成済み</Text>
          </TouchableOpacity>
        </View>

        {/* Goals list */}
        {filtered.length === 0 ? (
          <View style={styles.empty}>
            <Ionicons name="flag-outline" size={48} color={COLORS.textSecondary} />
            <Text style={styles.emptyText}>
              {filter === 'active' ? '進行中の目標がありません' : '達成した目標はまだありません'}
            </Text>
            {filter === 'active' && (
              <TouchableOpacity style={styles.createBtn} onPress={() => setShowForm(true)}>
                <Text style={styles.createBtnText}>目標を設定する</Text>
              </TouchableOpacity>
            )}
          </View>
        ) : (
          filtered.map(goal => <GoalDetailCard key={goal.id} goal={goal} onRefresh={load} />)
        )}
      </ScrollView>

      {/* Create goal modal */}
      <Modal visible={showForm} animationType="slide" presentationStyle="pageSheet">
        <ScrollView style={styles.modal} contentContainerStyle={{ padding: 20, paddingBottom: 60 }}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>個人目標を設定</Text>
            <TouchableOpacity onPress={() => { setShowForm(false); resetForm(); }}>
              <Ionicons name="close" size={24} color={COLORS.text} />
            </TouchableOpacity>
          </View>

          <Text style={styles.inputLabel}>タイトル *</Text>
          <TextInput style={styles.input} value={title} onChangeText={setTitle} placeholder="例：ベンチプレス100kg達成" placeholderTextColor={COLORS.textSecondary} />

          <Text style={styles.inputLabel}>詳細</Text>
          <TextInput style={[styles.input, { height: 80, textAlignVertical: 'top' }]} value={description} onChangeText={setDescription} placeholder="目標の詳細（任意）" placeholderTextColor={COLORS.textSecondary} multiline />

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

          <Text style={styles.inputLabel}>目標種別</Text>
          <View style={styles.periodRow}>
            {[
              { id: 'sessions', label: 'セッション数' },
              { id: 'weight', label: '重量(kg)' },
            ].map(u => (
              <TouchableOpacity key={u.id} style={[styles.periodBtn, targetUnit === u.id && styles.periodBtnActive]} onPress={() => setTargetUnit(u.id)}>
                <Text style={[styles.periodBtnText, targetUnit === u.id && styles.periodBtnTextActive]}>{u.label}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.inputLabel}>目標値</Text>
          <TextInput style={styles.input} value={targetValue} onChangeText={setTargetValue} keyboardType="decimal-pad" placeholder="例：10" placeholderTextColor={COLORS.textSecondary} />

          <TouchableOpacity style={styles.submitBtn} onPress={saveGoal} disabled={saving}>
            {saving ? <ActivityIndicator color="#fff" /> : <Text style={styles.submitBtnText}>目標を設定する</Text>}
          </TouchableOpacity>
        </ScrollView>
      </Modal>
    </View>
  );
}

function GoalDetailCard({ goal, onRefresh }: { goal: Goal; onRefresh: () => void }) {
  const periodLabel = { week: '週間', month: '月間', year: '年間' }[goal.period];
  const daysLeft = Math.max(0, Math.ceil((new Date(goal.end_date).getTime() - Date.now()) / 86400000));
  const isExpired = new Date(goal.end_date) < new Date() && !goal.is_achieved;

  return (
    <View style={[styles.goalCard, goal.is_achieved && styles.goalCardAchieved, isExpired && styles.goalCardExpired]}>
      <View style={styles.goalCardTop}>
        <Ionicons
          name={goal.is_achieved ? 'checkmark-circle' : isExpired ? 'close-circle' : 'flag'}
          size={22}
          color={goal.is_achieved ? COLORS.success : isExpired ? COLORS.error : COLORS.warning}
        />
        <View style={{ flex: 1, marginLeft: 10 }}>
          <Text style={styles.goalCardTitle}>{goal.title}</Text>
          <Text style={styles.goalCardMeta}>
            {periodLabel}目標 · {goal.is_achieved ? `${new Date(goal.achieved_at!).toLocaleDateString('ja-JP')} 達成` : isExpired ? '期間終了' : `残り${daysLeft}日`}
          </Text>
        </View>
      </View>
      {goal.description && <Text style={styles.goalCardDesc}>{goal.description}</Text>}
      {goal.target_value && (
        <Text style={styles.goalCardTarget}>
          目標: {goal.target_value}{goal.target_unit === 'sessions' ? 'セッション' : 'kg'}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  content: { padding: 20, paddingTop: 60, paddingBottom: 40 },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 20, gap: 12 },
  title: { flex: 1, fontSize: 26, fontWeight: '800', color: COLORS.text },
  addBtn: { backgroundColor: COLORS.primary, borderRadius: 12, padding: 8 },
  statsRow: { flexDirection: 'row', gap: 12, marginBottom: 20 },
  statCard: { flex: 1, backgroundColor: COLORS.surface, borderRadius: 12, padding: 16, alignItems: 'center', borderWidth: 1, borderColor: COLORS.border },
  statValue: { fontSize: 28, fontWeight: '800', color: COLORS.primary },
  statLabel: { fontSize: 12, color: COLORS.textSecondary, marginTop: 4 },
  filterRow: { flexDirection: 'row', backgroundColor: COLORS.surface, borderRadius: 12, padding: 4, marginBottom: 20 },
  filterBtn: { flex: 1, paddingVertical: 8, borderRadius: 8, alignItems: 'center' },
  filterBtnActive: { backgroundColor: COLORS.primary },
  filterText: { fontSize: 14, fontWeight: '600', color: COLORS.textSecondary },
  filterTextActive: { color: '#fff' },
  goalCard: { backgroundColor: COLORS.surface, borderRadius: 14, padding: 16, marginBottom: 12, borderWidth: 1, borderColor: COLORS.border },
  goalCardAchieved: { borderColor: COLORS.success },
  goalCardExpired: { borderColor: COLORS.error, opacity: 0.7 },
  goalCardTop: { flexDirection: 'row', alignItems: 'flex-start' },
  goalCardTitle: { fontSize: 15, fontWeight: '700', color: COLORS.text },
  goalCardMeta: { fontSize: 12, color: COLORS.textSecondary, marginTop: 3 },
  goalCardDesc: { fontSize: 13, color: COLORS.textSecondary, marginTop: 8 },
  goalCardTarget: { fontSize: 13, color: COLORS.primary, marginTop: 8, fontWeight: '600' },
  empty: { alignItems: 'center', paddingVertical: 60, gap: 12 },
  emptyText: { fontSize: 15, color: COLORS.textSecondary, textAlign: 'center' },
  createBtn: { backgroundColor: COLORS.primary, borderRadius: 12, paddingHorizontal: 24, paddingVertical: 12, marginTop: 8 },
  createBtnText: { color: '#fff', fontSize: 15, fontWeight: '700' },
  modal: { flex: 1, backgroundColor: COLORS.bg },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 },
  modalTitle: { fontSize: 20, fontWeight: '700', color: COLORS.text },
  inputLabel: { fontSize: 14, color: COLORS.textSecondary, marginBottom: 8 },
  input: { backgroundColor: COLORS.surface, borderRadius: 12, padding: 14, color: COLORS.text, fontSize: 15, borderWidth: 1, borderColor: COLORS.border, marginBottom: 16 },
  periodRow: { flexDirection: 'row', gap: 8, marginBottom: 16 },
  periodBtn: { flex: 1, padding: 10, borderRadius: 10, borderWidth: 1, borderColor: COLORS.border, alignItems: 'center' },
  periodBtnActive: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  periodBtnText: { fontSize: 13, fontWeight: '600', color: COLORS.textSecondary },
  periodBtnTextActive: { color: '#fff' },
  submitBtn: { backgroundColor: COLORS.primary, borderRadius: 12, padding: 16, alignItems: 'center', marginTop: 8 },
  submitBtnText: { color: '#fff', fontSize: 16, fontWeight: '700' },
});
