import { useState, useEffect } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, TextInput,
  StyleSheet, Alert, Switch, Modal, FlatList, ActivityIndicator
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/context/AuthContext';
import { Exercise, WorkoutSet, WeightUnit } from '@/lib/types';
import { COLORS } from '@/lib/utils';

interface SetEntry {
  id: string;
  exerciseId: string;
  exerciseName: string;
  setNumber: number;
  weight: string;
  reps: string;
  unit: WeightUnit;
  hasAssistance: boolean;
}

export default function WorkoutScreen() {
  const { profile } = useAuth();
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [sets, setSets] = useState<SetEntry[]>([]);
  const [notes, setNotes] = useState('');
  const [saving, setSaving] = useState(false);
  const [showExercisePicker, setShowExercisePicker] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [defaultUnit, setDefaultUnit] = useState<WeightUnit>(profile?.preferred_unit ?? 'kg');

  useEffect(() => {
    supabase.from('exercises').select('*').order('name_ja').then(({ data }) => {
      setExercises(data ?? []);
    });
  }, []);

  const filteredExercises = exercises.filter(e =>
    (e.name_ja ?? e.name).toLowerCase().includes(searchQuery.toLowerCase())
  );

  function addSet(exercise: Exercise) {
    const existingSets = sets.filter(s => s.exerciseId === exercise.id);
    const lastSet = existingSets[existingSets.length - 1];
    setSets(prev => [...prev, {
      id: Math.random().toString(36),
      exerciseId: exercise.id,
      exerciseName: exercise.name_ja ?? exercise.name,
      setNumber: existingSets.length + 1,
      weight: lastSet?.weight ?? '',
      reps: lastSet?.reps ?? '',
      unit: lastSet?.unit ?? defaultUnit,
      hasAssistance: lastSet?.hasAssistance ?? false,
    }]);
    setShowExercisePicker(false);
    setSearchQuery('');
  }

  function addSetToExercise(exerciseId: string) {
    const existingSets = sets.filter(s => s.exerciseId === exerciseId);
    const lastSet = existingSets[existingSets.length - 1];
    const exercise = exercises.find(e => e.id === exerciseId);
    if (!exercise || !lastSet) return;
    setSets(prev => [...prev, {
      ...lastSet,
      id: Math.random().toString(36),
      setNumber: existingSets.length + 1,
    }]);
  }

  function updateSet(id: string, field: keyof SetEntry, value: unknown) {
    setSets(prev => prev.map(s => s.id === id ? { ...s, [field]: value } : s));
  }

  function removeSet(id: string) {
    setSets(prev => {
      const filtered = prev.filter(s => s.id !== id);
      // Re-number sets per exercise
      const exerciseIds = [...new Set(filtered.map(s => s.exerciseId))];
      return filtered.map(s => ({
        ...s,
        setNumber: filtered.filter(f => f.exerciseId === s.exerciseId && filtered.indexOf(f) <= filtered.indexOf(s)).length,
      }));
    });
  }

  async function saveSession() {
    if (!profile || sets.length === 0) {
      Alert.alert('エラー', 'セットを追加してください');
      return;
    }
    setSaving(true);
    const today = new Date().toISOString().split('T')[0];

    // Upsert session for today
    let sessionId: string;
    const { data: existing } = await supabase
      .from('workout_sessions')
      .select('id')
      .eq('user_id', profile.id)
      .eq('date', today)
      .single();

    if (existing) {
      sessionId = existing.id;
      if (notes) {
        await supabase.from('workout_sessions').update({ notes }).eq('id', sessionId);
      }
      // Remove old sets and re-insert
      await supabase.from('workout_sets').delete().eq('session_id', sessionId);
    } else {
      const { data: newSession, error } = await supabase
        .from('workout_sessions')
        .insert({ user_id: profile.id, date: today, notes })
        .select('id')
        .single();
      if (error || !newSession) {
        setSaving(false);
        return Alert.alert('エラー', error?.message);
      }
      sessionId = newSession.id;
    }

    const setsToInsert = sets.map(s => ({
      session_id: sessionId,
      exercise_id: s.exerciseId,
      set_number: s.setNumber,
      weight: s.weight ? parseFloat(s.weight) : null,
      reps: s.reps ? parseInt(s.reps) : null,
      unit: s.unit,
      has_assistance: s.hasAssistance,
    }));

    const { error: setsError } = await supabase.from('workout_sets').insert(setsToInsert);
    setSaving(false);
    if (setsError) return Alert.alert('エラー', setsError.message);

    // Check goal achievements
    await checkGoals(profile.id);

    Alert.alert('保存完了', '今日のトレーニングを保存しました！', [
      { text: 'OK', onPress: () => setSets([]) }
    ]);
  }

  async function checkGoals(userId: string) {
    const { data: goals } = await supabase
      .from('goals')
      .select('*, groups:group_id(*)')
      .eq('user_id', userId)
      .eq('is_achieved', false);

    if (!goals) return;
    for (const goal of goals) {
      // Simple session count goal check
      if (!goal.exercise_id && goal.target_unit === 'sessions') {
        const { count } = await supabase
          .from('workout_sessions')
          .select('*', { count: 'exact', head: true })
          .eq('user_id', userId)
          .gte('date', goal.start_date)
          .lte('date', goal.end_date);

        if (count && count >= (goal.target_value ?? 0)) {
          await supabase.from('goals').update({ is_achieved: true, achieved_at: new Date().toISOString() }).eq('id', goal.id);
          if (goal.group_id) {
            await supabase.from('messages').insert({
              group_id: goal.group_id,
              user_id: userId,
              content: `🎉 目標達成！「${goal.title}」を達成しました！`,
              message_type: 'achievement',
              metadata: { goal_id: goal.id, goal_title: goal.title },
            });
          }
        }
      }
    }
  }

  // Group sets by exercise
  const exerciseGroups = [...new Set(sets.map(s => s.exerciseId))].map(eid => ({
    exerciseId: eid,
    exerciseName: sets.find(s => s.exerciseId === eid)?.exerciseName ?? '',
    sets: sets.filter(s => s.exerciseId === eid),
  }));

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>トレーニング記録</Text>
        <Text style={styles.subtitle}>{new Date().toLocaleDateString('ja-JP', { year: 'numeric', month: 'long', day: 'numeric' })}</Text>

        {exerciseGroups.map(group => (
          <View key={group.exerciseId} style={styles.exerciseGroup}>
            <Text style={styles.exerciseName}>{group.exerciseName}</Text>

            <View style={styles.setHeader}>
              <Text style={[styles.setHeaderText, { flex: 0.5 }]}>SET</Text>
              <Text style={[styles.setHeaderText, { flex: 1 }]}>重量</Text>
              <Text style={[styles.setHeaderText, { flex: 0.8 }]}>レップ</Text>
              <Text style={[styles.setHeaderText, { flex: 0.8 }]}>補助</Text>
              <View style={{ width: 28 }} />
            </View>

            {group.sets.map(set => (
              <SetRow
                key={set.id}
                set={set}
                onUpdate={(field, value) => updateSet(set.id, field, value)}
                onRemove={() => removeSet(set.id)}
              />
            ))}

            <TouchableOpacity
              style={styles.addSetBtn}
              onPress={() => addSetToExercise(group.exerciseId)}
            >
              <Ionicons name="add" size={16} color={COLORS.primary} />
              <Text style={styles.addSetText}>セットを追加</Text>
            </TouchableOpacity>
          </View>
        ))}

        <TouchableOpacity
          style={styles.addExerciseBtn}
          onPress={() => setShowExercisePicker(true)}
        >
          <Ionicons name="add-circle" size={20} color={COLORS.primary} />
          <Text style={styles.addExerciseText}>種目を追加</Text>
        </TouchableOpacity>

        {sets.length > 0 && (
          <>
            <TextInput
              style={styles.notesInput}
              value={notes}
              onChangeText={setNotes}
              placeholder="メモ（任意）"
              placeholderTextColor={COLORS.textSecondary}
              multiline
              numberOfLines={3}
            />

            <TouchableOpacity style={styles.saveBtn} onPress={saveSession} disabled={saving}>
              {saving ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.saveBtnText}>今日のトレーニングを保存</Text>
              )}
            </TouchableOpacity>
          </>
        )}
      </ScrollView>

      {/* Exercise picker modal */}
      <Modal visible={showExercisePicker} animationType="slide" presentationStyle="pageSheet">
        <View style={styles.modal}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>種目を選択</Text>
            <TouchableOpacity onPress={() => { setShowExercisePicker(false); setSearchQuery(''); }}>
              <Ionicons name="close" size={24} color={COLORS.text} />
            </TouchableOpacity>
          </View>
          <TextInput
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="種目を検索..."
            placeholderTextColor={COLORS.textSecondary}
          />
          <FlatList
            data={filteredExercises}
            keyExtractor={e => e.id}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.exerciseItem} onPress={() => addSet(item)}>
                <Text style={styles.exerciseItemName}>{item.name_ja ?? item.name}</Text>
                <Text style={styles.exerciseItemCategory}>{item.category}</Text>
              </TouchableOpacity>
            )}
            contentContainerStyle={{ paddingBottom: 40 }}
          />
        </View>
      </Modal>
    </View>
  );
}

function SetRow({
  set,
  onUpdate,
  onRemove,
}: {
  set: SetEntry;
  onUpdate: (field: keyof SetEntry, value: unknown) => void;
  onRemove: () => void;
}) {
  return (
    <View style={styles.setRow}>
      <Text style={[styles.setNumber, { flex: 0.5 }]}>{set.setNumber}</Text>

      <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', gap: 4 }}>
        <TextInput
          style={styles.setInput}
          value={set.weight}
          onChangeText={v => onUpdate('weight', v)}
          keyboardType="decimal-pad"
          placeholder="0"
          placeholderTextColor={COLORS.textSecondary}
        />
        <TouchableOpacity onPress={() => onUpdate('unit', set.unit === 'kg' ? 'lbs' : 'kg')}>
          <Text style={styles.unitToggle}>{set.unit}</Text>
        </TouchableOpacity>
      </View>

      <TextInput
        style={[styles.setInput, { flex: 0.8 }]}
        value={set.reps}
        onChangeText={v => onUpdate('reps', v)}
        keyboardType="number-pad"
        placeholder="0"
        placeholderTextColor={COLORS.textSecondary}
      />

      <View style={{ flex: 0.8, alignItems: 'center' }}>
        <Switch
          value={set.hasAssistance}
          onValueChange={v => onUpdate('hasAssistance', v)}
          trackColor={{ true: COLORS.primary }}
          thumbColor="#fff"
          style={{ transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] }}
        />
      </View>

      <TouchableOpacity onPress={onRemove} style={{ width: 28 }}>
        <Ionicons name="trash-outline" size={18} color={COLORS.error} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  content: { padding: 20, paddingTop: 60, paddingBottom: 100 },
  title: { fontSize: 26, fontWeight: '800', color: COLORS.text, marginBottom: 4 },
  subtitle: { fontSize: 14, color: COLORS.textSecondary, marginBottom: 24 },
  exerciseGroup: {
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  exerciseName: { fontSize: 17, fontWeight: '700', color: COLORS.text, marginBottom: 12 },
  setHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  setHeaderText: { fontSize: 11, fontWeight: '600', color: COLORS.textSecondary, textTransform: 'uppercase' },
  setRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8, gap: 8 },
  setNumber: { fontSize: 14, fontWeight: '700', color: COLORS.textSecondary, textAlign: 'center' },
  setInput: {
    backgroundColor: COLORS.bg,
    borderRadius: 8,
    padding: 10,
    color: COLORS.text,
    fontSize: 15,
    fontWeight: '600',
    textAlign: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
    flex: 1,
  },
  unitToggle: {
    color: COLORS.primary,
    fontSize: 12,
    fontWeight: '700',
    backgroundColor: `${COLORS.primary}20`,
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 6,
  },
  addSetBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    gap: 6,
    marginTop: 4,
  },
  addSetText: { color: COLORS.primary, fontSize: 14, fontWeight: '600' },
  addExerciseBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderStyle: 'dashed',
    gap: 8,
    marginBottom: 16,
  },
  addExerciseText: { color: COLORS.primary, fontSize: 16, fontWeight: '600' },
  notesInput: {
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: 16,
    color: COLORS.text,
    fontSize: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 16,
    textAlignVertical: 'top',
  },
  saveBtn: {
    backgroundColor: COLORS.primary,
    borderRadius: 16,
    padding: 18,
    alignItems: 'center',
  },
  saveBtnText: { color: '#fff', fontSize: 16, fontWeight: '700' },
  modal: { flex: 1, backgroundColor: COLORS.bg, padding: 20 },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  modalTitle: { fontSize: 20, fontWeight: '700', color: COLORS.text },
  searchInput: {
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: 14,
    color: COLORS.text,
    fontSize: 15,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 12,
  },
  exerciseItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  exerciseItemName: { fontSize: 15, fontWeight: '600', color: COLORS.text },
  exerciseItemCategory: { fontSize: 13, color: COLORS.textSecondary },
});
