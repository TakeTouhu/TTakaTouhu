import { useState, useEffect, useCallback } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet,
  TextInput, Modal, Alert, ActivityIndicator, FlatList
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/context/AuthContext';
import { Group } from '@/lib/types';
import { COLORS } from '@/lib/utils';

export default function GroupsScreen() {
  const { profile } = useAuth();
  const router = useRouter();
  const [groups, setGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [showJoin, setShowJoin] = useState(false);
  const [groupName, setGroupName] = useState('');
  const [groupDesc, setGroupDesc] = useState('');
  const [joinSearch, setJoinSearch] = useState('');
  const [searchResults, setSearchResults] = useState<Group[]>([]);
  const [creating, setCreating] = useState(false);

  const load = useCallback(async () => {
    if (!profile) return;
    const { data } = await supabase
      .from('group_members')
      .select('group:groups(*, member_count:group_members(count))')
      .eq('user_id', profile.id);

    const g = data?.map(d => {
      const group = d.group as Group & { member_count: { count: number }[] };
      return { ...group, member_count: group.member_count?.[0]?.count ?? 0 };
    }) ?? [];
    setGroups(g);
    setLoading(false);
  }, [profile]);

  useEffect(() => { load(); }, [load]);

  async function createGroup() {
    if (!profile || !groupName.trim()) return Alert.alert('エラー', 'グループ名を入力してください');
    setCreating(true);
    const { data: group, error } = await supabase
      .from('groups')
      .insert({ name: groupName.trim(), description: groupDesc.trim() || null, created_by: profile.id })
      .select('id')
      .single();

    if (error || !group) {
      setCreating(false);
      return Alert.alert('エラー', error?.message);
    }
    await supabase.from('group_members').insert({ group_id: group.id, user_id: profile.id, role: 'admin' });
    setCreating(false);
    setShowCreate(false);
    setGroupName('');
    setGroupDesc('');
    load();
    router.push(`/group/${group.id}`);
  }

  async function searchGroups() {
    const { data } = await supabase
      .from('groups')
      .select('*')
      .ilike('name', `%${joinSearch}%`)
      .limit(10);
    setSearchResults(data ?? []);
  }

  async function joinGroup(groupId: string) {
    if (!profile) return;
    const { error } = await supabase
      .from('group_members')
      .insert({ group_id: groupId, user_id: profile.id, role: 'member' });
    if (error) {
      if (error.code === '23505') Alert.alert('', '既に参加しています');
      else Alert.alert('エラー', error.message);
      return;
    }
    setShowJoin(false);
    setJoinSearch('');
    setSearchResults([]);
    load();
  }

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
          <Text style={styles.title}>グループ</Text>
          <View style={styles.headerBtns}>
            <TouchableOpacity style={styles.iconBtn} onPress={() => setShowJoin(true)}>
              <Ionicons name="search" size={20} color={COLORS.primary} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconBtn} onPress={() => setShowCreate(true)}>
              <Ionicons name="add" size={20} color={COLORS.primary} />
            </TouchableOpacity>
          </View>
        </View>

        {groups.length === 0 ? (
          <View style={styles.empty}>
            <Ionicons name="people-outline" size={64} color={COLORS.textSecondary} />
            <Text style={styles.emptyTitle}>グループに参加しよう</Text>
            <Text style={styles.emptyText}>友達と一緒に筋トレの進捗を共有できます</Text>
            <TouchableOpacity style={styles.createBtn} onPress={() => setShowCreate(true)}>
              <Text style={styles.createBtnText}>グループを作成する</Text>
            </TouchableOpacity>
          </View>
        ) : (
          groups.map(group => (
            <TouchableOpacity
              key={group.id}
              style={styles.groupCard}
              onPress={() => router.push(`/group/${group.id}`)}
            >
              <View style={styles.groupAvatar}>
                <Text style={styles.groupAvatarText}>{group.name[0]?.toUpperCase()}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.groupName}>{group.name}</Text>
                {group.description && (
                  <Text style={styles.groupDesc} numberOfLines={1}>{group.description}</Text>
                )}
                <Text style={styles.groupMeta}>{group.member_count}人のメンバー</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={COLORS.textSecondary} />
            </TouchableOpacity>
          ))
        )}
      </ScrollView>

      {/* Create group modal */}
      <Modal visible={showCreate} animationType="slide" presentationStyle="pageSheet">
        <View style={styles.modal}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>グループを作成</Text>
            <TouchableOpacity onPress={() => { setShowCreate(false); setGroupName(''); setGroupDesc(''); }}>
              <Ionicons name="close" size={24} color={COLORS.text} />
            </TouchableOpacity>
          </View>

          <Text style={styles.inputLabel}>グループ名 *</Text>
          <TextInput
            style={styles.input}
            value={groupName}
            onChangeText={setGroupName}
            placeholder="例：チームA筋トレ部"
            placeholderTextColor={COLORS.textSecondary}
          />

          <Text style={styles.inputLabel}>説明</Text>
          <TextInput
            style={[styles.input, { height: 80, textAlignVertical: 'top' }]}
            value={groupDesc}
            onChangeText={setGroupDesc}
            placeholder="グループの説明（任意）"
            placeholderTextColor={COLORS.textSecondary}
            multiline
          />

          <TouchableOpacity style={styles.submitBtn} onPress={createGroup} disabled={creating}>
            {creating ? <ActivityIndicator color="#fff" /> : <Text style={styles.submitBtnText}>作成する</Text>}
          </TouchableOpacity>
        </View>
      </Modal>

      {/* Join group modal */}
      <Modal visible={showJoin} animationType="slide" presentationStyle="pageSheet">
        <View style={styles.modal}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>グループを検索</Text>
            <TouchableOpacity onPress={() => { setShowJoin(false); setJoinSearch(''); setSearchResults([]); }}>
              <Ionicons name="close" size={24} color={COLORS.text} />
            </TouchableOpacity>
          </View>

          <View style={styles.searchRow}>
            <TextInput
              style={[styles.input, { flex: 1 }]}
              value={joinSearch}
              onChangeText={setJoinSearch}
              placeholder="グループ名で検索..."
              placeholderTextColor={COLORS.textSecondary}
            />
            <TouchableOpacity style={styles.searchBtn} onPress={searchGroups}>
              <Ionicons name="search" size={20} color="#fff" />
            </TouchableOpacity>
          </View>

          <FlatList
            data={searchResults}
            keyExtractor={g => g.id}
            renderItem={({ item }) => (
              <View style={styles.searchResult}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.groupName}>{item.name}</Text>
                  {item.description && <Text style={styles.groupDesc}>{item.description}</Text>}
                </View>
                <TouchableOpacity style={styles.joinBtn} onPress={() => joinGroup(item.id)}>
                  <Text style={styles.joinBtnText}>参加</Text>
                </TouchableOpacity>
              </View>
            )}
          />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  content: { padding: 20, paddingTop: 60, paddingBottom: 40 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 },
  title: { fontSize: 26, fontWeight: '800', color: COLORS.text },
  headerBtns: { flexDirection: 'row', gap: 8 },
  iconBtn: {
    backgroundColor: COLORS.surface,
    padding: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  groupCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    gap: 14,
  },
  groupAvatar: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  groupAvatarText: { fontSize: 22, fontWeight: '800', color: '#fff' },
  groupName: { fontSize: 16, fontWeight: '700', color: COLORS.text },
  groupDesc: { fontSize: 13, color: COLORS.textSecondary, marginTop: 2 },
  groupMeta: { fontSize: 12, color: COLORS.textSecondary, marginTop: 4 },
  empty: { alignItems: 'center', paddingVertical: 60, gap: 12 },
  emptyTitle: { fontSize: 20, fontWeight: '700', color: COLORS.text },
  emptyText: { fontSize: 14, color: COLORS.textSecondary, textAlign: 'center' },
  createBtn: { backgroundColor: COLORS.primary, borderRadius: 12, paddingHorizontal: 24, paddingVertical: 14, marginTop: 8 },
  createBtnText: { color: '#fff', fontSize: 15, fontWeight: '700' },
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
  submitBtn: { backgroundColor: COLORS.primary, borderRadius: 12, padding: 16, alignItems: 'center', marginTop: 8 },
  submitBtnText: { color: '#fff', fontSize: 16, fontWeight: '700' },
  searchRow: { flexDirection: 'row', gap: 8, marginBottom: 16 },
  searchBtn: { backgroundColor: COLORS.primary, borderRadius: 12, padding: 14, justifyContent: 'center' },
  searchResult: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    gap: 12,
  },
  joinBtn: { backgroundColor: COLORS.primary, borderRadius: 8, paddingHorizontal: 14, paddingVertical: 8 },
  joinBtnText: { color: '#fff', fontSize: 13, fontWeight: '700' },
});
