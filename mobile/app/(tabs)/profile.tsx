import { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet,
  Switch, Alert, TextInput, Modal, ActivityIndicator
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/context/AuthContext';
import { WeightUnit } from '@/lib/types';
import { COLORS } from '@/lib/utils';

export default function ProfileScreen() {
  const { profile, signOut, refreshProfile } = useAuth();
  const router = useRouter();
  const [showEdit, setShowEdit] = useState(false);
  const [displayName, setDisplayName] = useState(profile?.display_name ?? '');
  const [saving, setSaving] = useState(false);

  async function toggleUnit() {
    if (!profile) return;
    const newUnit: WeightUnit = profile.preferred_unit === 'kg' ? 'lbs' : 'kg';
    await supabase.from('profiles').update({ preferred_unit: newUnit }).eq('id', profile.id);
    refreshProfile();
  }

  async function saveProfile() {
    if (!profile) return;
    setSaving(true);
    const { error } = await supabase
      .from('profiles')
      .update({ display_name: displayName })
      .eq('id', profile.id);
    setSaving(false);
    if (error) return Alert.alert('エラー', error.message);
    refreshProfile();
    setShowEdit(false);
  }

  async function handleSignOut() {
    Alert.alert('ログアウト', 'ログアウトしますか？', [
      { text: 'キャンセル', style: 'cancel' },
      { text: 'ログアウト', style: 'destructive', onPress: signOut },
    ]);
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Avatar and name */}
      <View style={styles.profileSection}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {(profile?.display_name ?? profile?.username ?? '?')[0].toUpperCase()}
          </Text>
        </View>
        <Text style={styles.displayName}>{profile?.display_name ?? profile?.username}</Text>
        <Text style={styles.username}>@{profile?.username}</Text>
        <TouchableOpacity style={styles.editBtn} onPress={() => { setDisplayName(profile?.display_name ?? ''); setShowEdit(true); }}>
          <Text style={styles.editBtnText}>プロフィールを編集</Text>
        </TouchableOpacity>
      </View>

      {/* Friends */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>ソーシャル</Text>
        <TouchableOpacity style={styles.settingRow} onPress={() => router.push('/friends')}>
          <View style={styles.settingLeft}>
            <Ionicons name="people-outline" size={20} color={COLORS.primary} />
            <Text style={[styles.settingLabel, { marginLeft: 12 }]}>フレンド管理</Text>
          </View>
          <Ionicons name="chevron-forward" size={16} color={COLORS.textSecondary} />
        </TouchableOpacity>
      </View>

      {/* Settings */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>設定</Text>

        <View style={styles.settingRow}>
          <View style={styles.settingLeft}>
            <Ionicons name="barbell-outline" size={20} color={COLORS.primary} />
            <View style={{ marginLeft: 12 }}>
              <Text style={styles.settingLabel}>重量の単位</Text>
              <Text style={styles.settingValue}>{profile?.preferred_unit === 'kg' ? 'キログラム (kg)' : 'ポンド (lbs)'}</Text>
            </View>
          </View>
          <View style={styles.unitToggle}>
            <Text style={[styles.unitLabel, profile?.preferred_unit === 'kg' && styles.unitLabelActive]}>kg</Text>
            <Switch
              value={profile?.preferred_unit === 'lbs'}
              onValueChange={toggleUnit}
              trackColor={{ true: COLORS.primary, false: COLORS.surfaceLight }}
              thumbColor="#fff"
            />
            <Text style={[styles.unitLabel, profile?.preferred_unit === 'lbs' && styles.unitLabelActive]}>lbs</Text>
          </View>
        </View>
      </View>

      {/* Account */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>アカウント</Text>

        <TouchableOpacity style={[styles.settingRow, styles.dangerRow]} onPress={handleSignOut}>
          <View style={styles.settingLeft}>
            <Ionicons name="log-out-outline" size={20} color={COLORS.error} />
            <Text style={[styles.settingLabel, { marginLeft: 12, color: COLORS.error }]}>ログアウト</Text>
          </View>
          <Ionicons name="chevron-forward" size={16} color={COLORS.error} />
        </TouchableOpacity>
      </View>

      {/* Edit modal */}
      <Modal visible={showEdit} animationType="slide" presentationStyle="pageSheet">
        <View style={styles.modal}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>プロフィールを編集</Text>
            <TouchableOpacity onPress={() => setShowEdit(false)}>
              <Ionicons name="close" size={24} color={COLORS.text} />
            </TouchableOpacity>
          </View>

          <Text style={styles.inputLabel}>表示名</Text>
          <TextInput
            style={styles.input}
            value={displayName}
            onChangeText={setDisplayName}
            placeholder="表示名"
            placeholderTextColor={COLORS.textSecondary}
          />

          <TouchableOpacity style={styles.saveBtn} onPress={saveProfile} disabled={saving}>
            {saving ? <ActivityIndicator color="#fff" /> : <Text style={styles.saveBtnText}>保存する</Text>}
          </TouchableOpacity>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  content: { padding: 20, paddingTop: 60, paddingBottom: 40 },
  profileSection: { alignItems: 'center', marginBottom: 32 },
  avatar: {
    width: 88,
    height: 88,
    borderRadius: 28,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatarText: { fontSize: 40, fontWeight: '800', color: '#fff' },
  displayName: { fontSize: 22, fontWeight: '800', color: COLORS.text },
  username: { fontSize: 14, color: COLORS.textSecondary, marginTop: 4 },
  editBtn: {
    marginTop: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  editBtnText: { color: COLORS.text, fontSize: 14, fontWeight: '600' },
  section: { marginBottom: 24 },
  sectionTitle: { fontSize: 13, fontWeight: '700', color: COLORS.textSecondary, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 8 },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  dangerRow: { borderColor: `${COLORS.error}40` },
  settingLeft: { flexDirection: 'row', alignItems: 'center' },
  settingLabel: { fontSize: 15, fontWeight: '600', color: COLORS.text },
  settingValue: { fontSize: 12, color: COLORS.textSecondary, marginTop: 2 },
  unitToggle: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  unitLabel: { fontSize: 13, fontWeight: '700', color: COLORS.textSecondary },
  unitLabelActive: { color: COLORS.primary },
  modal: { flex: 1, backgroundColor: COLORS.bg, padding: 20 },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 },
  modalTitle: { fontSize: 20, fontWeight: '700', color: COLORS.text },
  inputLabel: { fontSize: 14, color: COLORS.textSecondary, marginBottom: 8 },
  input: {
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: 14,
    color: COLORS.text,
    fontSize: 15,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 16,
  },
  saveBtn: { backgroundColor: COLORS.primary, borderRadius: 12, padding: 16, alignItems: 'center' },
  saveBtnText: { color: '#fff', fontSize: 16, fontWeight: '700' },
});
