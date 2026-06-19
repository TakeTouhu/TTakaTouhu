import { useState, useEffect, useCallback } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, TextInput,
  StyleSheet, Alert, ActivityIndicator, FlatList, RefreshControl
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/context/AuthContext';
import { Profile, Friendship } from '@/lib/types';
import { COLORS } from '@/lib/utils';

type FriendTab = 'friends' | 'requests' | 'search';

interface FriendEntry {
  friendship: Friendship;
  profile: Profile;
}

export default function FriendsScreen() {
  const { profile } = useAuth();
  const router = useRouter();
  const [tab, setTab] = useState<FriendTab>('friends');
  const [friends, setFriends] = useState<FriendEntry[]>([]);
  const [incoming, setIncoming] = useState<FriendEntry[]>([]);
  const [outgoing, setOutgoing] = useState<FriendEntry[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Profile[]>([]);
  const [searching, setSearching] = useState(false);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const load = useCallback(async () => {
    if (!profile) return;
    const { data } = await supabase
      .from('friendships')
      .select('*, requester:requester_id(id, username, display_name), addressee:addressee_id(id, username, display_name)')
      .or(`requester_id.eq.${profile.id},addressee_id.eq.${profile.id}`);

    const accepted: FriendEntry[] = [];
    const inc: FriendEntry[] = [];
    const out: FriendEntry[] = [];

    for (const f of data ?? []) {
      const friendProfile = f.requester_id === profile.id
        ? (f.addressee as Profile)
        : (f.requester as Profile);
      const entry: FriendEntry = { friendship: f as Friendship, profile: friendProfile };

      if (f.status === 'accepted') {
        accepted.push(entry);
      } else if (f.status === 'pending') {
        if (f.addressee_id === profile.id) inc.push(entry);
        else out.push(entry);
      }
    }

    setFriends(accepted);
    setIncoming(inc);
    setOutgoing(out);
    setLoading(false);
  }, [profile]);

  useEffect(() => { load(); }, [load]);

  const onRefresh = async () => {
    setRefreshing(true);
    await load();
    setRefreshing(false);
  };

  async function searchUsers() {
    if (!searchQuery.trim() || !profile) return;
    setSearching(true);
    const { data } = await supabase
      .from('profiles')
      .select('*')
      .or(`username.ilike.%${searchQuery}%,display_name.ilike.%${searchQuery}%`)
      .neq('id', profile.id)
      .limit(10);
    setSearchResults(data ?? []);
    setSearching(false);
  }

  async function sendRequest(targetId: string) {
    if (!profile) return;
    const { error } = await supabase.from('friendships').insert({
      requester_id: profile.id,
      addressee_id: targetId,
      status: 'pending',
    });
    if (error) {
      if (error.code === '23505') Alert.alert('', '既にリクエスト済みです');
      else Alert.alert('エラー', error.message);
      return;
    }
    Alert.alert('送信しました', 'フレンドリクエストを送りました');
    setSearchResults(prev => prev.filter(p => p.id !== targetId));
    load();
  }

  async function acceptRequest(friendshipId: string) {
    const { error } = await supabase
      .from('friendships')
      .update({ status: 'accepted' })
      .eq('id', friendshipId);
    if (error) return Alert.alert('エラー', error.message);
    load();
  }

  async function rejectRequest(friendshipId: string) {
    await supabase.from('friendships').delete().eq('id', friendshipId);
    load();
  }

  async function removeFriend(friendshipId: string, name: string) {
    Alert.alert(`${name}をフレンド削除`, 'フレンドを削除しますか？', [
      { text: 'キャンセル', style: 'cancel' },
      {
        text: '削除', style: 'destructive', onPress: async () => {
          await supabase.from('friendships').delete().eq('id', friendshipId);
          load();
        }
      },
    ]);
  }

  const pendingCount = incoming.length;

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator color={COLORS.primary} size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.title}>フレンド</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Tabs */}
      <View style={styles.tabs}>
        {([
          { key: 'friends', label: 'フレンド', count: friends.length },
          { key: 'requests', label: 'リクエスト', count: pendingCount },
          { key: 'search', label: '検索', count: 0 },
        ] as { key: FriendTab; label: string; count: number }[]).map(t => (
          <TouchableOpacity
            key={t.key}
            style={[styles.tab, tab === t.key && styles.tabActive]}
            onPress={() => setTab(t.key)}
          >
            <Text style={[styles.tabText, tab === t.key && styles.tabTextActive]}>{t.label}</Text>
            {t.count > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{t.count}</Text>
              </View>
            )}
          </TouchableOpacity>
        ))}
      </View>

      {/* Friends tab */}
      {tab === 'friends' && (
        <ScrollView
          contentContainerStyle={styles.content}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={COLORS.primary} />}
        >
          {friends.length === 0 ? (
            <EmptyState icon="people-outline" text="まだフレンドがいません" sub="「検索」からフレンドを追加しましょう" />
          ) : (
            friends.map(({ friendship, profile: fp }) => (
              <View key={friendship.id} style={styles.userRow}>
                <UserAvatar name={fp.display_name ?? fp.username} />
                <View style={styles.userInfo}>
                  <Text style={styles.userName}>{fp.display_name ?? fp.username}</Text>
                  <Text style={styles.userHandle}>@{fp.username}</Text>
                </View>
                <TouchableOpacity
                  style={styles.removeBtn}
                  onPress={() => removeFriend(friendship.id, fp.display_name ?? fp.username)}
                >
                  <Ionicons name="person-remove-outline" size={18} color={COLORS.error} />
                </TouchableOpacity>
              </View>
            ))
          )}
        </ScrollView>
      )}

      {/* Requests tab */}
      {tab === 'requests' && (
        <ScrollView contentContainerStyle={styles.content}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={COLORS.primary} />}
        >
          {incoming.length > 0 && (
            <>
              <Text style={styles.sectionLabel}>届いたリクエスト</Text>
              {incoming.map(({ friendship, profile: fp }) => (
                <View key={friendship.id} style={styles.userRow}>
                  <UserAvatar name={fp.display_name ?? fp.username} />
                  <View style={styles.userInfo}>
                    <Text style={styles.userName}>{fp.display_name ?? fp.username}</Text>
                    <Text style={styles.userHandle}>@{fp.username}</Text>
                  </View>
                  <View style={styles.requestBtns}>
                    <TouchableOpacity style={styles.acceptBtn} onPress={() => acceptRequest(friendship.id)}>
                      <Ionicons name="checkmark" size={18} color="#fff" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.rejectBtn} onPress={() => rejectRequest(friendship.id)}>
                      <Ionicons name="close" size={18} color={COLORS.error} />
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </>
          )}

          {outgoing.length > 0 && (
            <>
              <Text style={styles.sectionLabel}>送ったリクエスト</Text>
              {outgoing.map(({ friendship, profile: fp }) => (
                <View key={friendship.id} style={styles.userRow}>
                  <UserAvatar name={fp.display_name ?? fp.username} />
                  <View style={styles.userInfo}>
                    <Text style={styles.userName}>{fp.display_name ?? fp.username}</Text>
                    <Text style={styles.userHandle}>@{fp.username}</Text>
                  </View>
                  <TouchableOpacity style={styles.cancelBtn} onPress={() => rejectRequest(friendship.id)}>
                    <Text style={styles.cancelBtnText}>取消</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </>
          )}

          {incoming.length === 0 && outgoing.length === 0 && (
            <EmptyState icon="mail-outline" text="リクエストはありません" sub="" />
          )}
        </ScrollView>
      )}

      {/* Search tab */}
      {tab === 'search' && (
        <View style={styles.searchContainer}>
          <View style={styles.searchRow}>
            <TextInput
              style={styles.searchInput}
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholder="ユーザー名・表示名で検索..."
              placeholderTextColor={COLORS.textSecondary}
              onSubmitEditing={searchUsers}
              returnKeyType="search"
              autoFocus
            />
            <TouchableOpacity style={styles.searchBtn} onPress={searchUsers}>
              {searching ? (
                <ActivityIndicator color="#fff" size="small" />
              ) : (
                <Ionicons name="search" size={20} color="#fff" />
              )}
            </TouchableOpacity>
          </View>

          <FlatList
            data={searchResults}
            keyExtractor={p => p.id}
            contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 40 }}
            ListEmptyComponent={
              searchResults.length === 0 && searchQuery.length > 0 && !searching ? (
                <EmptyState icon="search-outline" text="見つかりませんでした" sub="別のユーザー名で検索してみてください" />
              ) : null
            }
            renderItem={({ item }) => {
              const alreadyFriend = friends.some(f => f.profile.id === item.id);
              const pending = outgoing.some(f => f.profile.id === item.id);
              return (
                <View style={styles.userRow}>
                  <UserAvatar name={item.display_name ?? item.username} />
                  <View style={styles.userInfo}>
                    <Text style={styles.userName}>{item.display_name ?? item.username}</Text>
                    <Text style={styles.userHandle}>@{item.username}</Text>
                  </View>
                  {alreadyFriend ? (
                    <View style={styles.friendedBadge}>
                      <Text style={styles.friendedText}>フレンド</Text>
                    </View>
                  ) : pending ? (
                    <View style={styles.pendingBadge}>
                      <Text style={styles.pendingText}>申請中</Text>
                    </View>
                  ) : (
                    <TouchableOpacity style={styles.addBtn} onPress={() => sendRequest(item.id)}>
                      <Ionicons name="person-add" size={16} color="#fff" />
                      <Text style={styles.addBtnText}>追加</Text>
                    </TouchableOpacity>
                  )}
                </View>
              );
            }}
          />
        </View>
      )}
    </View>
  );
}

function UserAvatar({ name }: { name: string }) {
  return (
    <View style={styles.avatar}>
      <Text style={styles.avatarText}>{name[0]?.toUpperCase() ?? '?'}</Text>
    </View>
  );
}

function EmptyState({ icon, text, sub }: { icon: string; text: string; sub: string }) {
  return (
    <View style={styles.empty}>
      <Ionicons name={icon as any} size={52} color={COLORS.textSecondary} />
      <Text style={styles.emptyText}>{text}</Text>
      {sub ? <Text style={styles.emptySubText}>{sub}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 20, paddingTop: 60 },
  title: { fontSize: 20, fontWeight: '800', color: COLORS.text },
  tabs: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: COLORS.border },
  tab: { flex: 1, paddingVertical: 12, alignItems: 'center', flexDirection: 'row', justifyContent: 'center', gap: 6 },
  tabActive: { borderBottomWidth: 2, borderBottomColor: COLORS.primary },
  tabText: { fontSize: 13, fontWeight: '600', color: COLORS.textSecondary },
  tabTextActive: { color: COLORS.primary },
  badge: { backgroundColor: COLORS.error, borderRadius: 10, minWidth: 18, height: 18, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 4 },
  badgeText: { fontSize: 10, fontWeight: '800', color: '#fff' },
  content: { padding: 20, paddingBottom: 40 },
  sectionLabel: { fontSize: 12, fontWeight: '700', color: COLORS.textSecondary, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 12, marginTop: 4 },
  userRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: COLORS.border, gap: 12 },
  avatar: { width: 44, height: 44, borderRadius: 14, backgroundColor: COLORS.primary, justifyContent: 'center', alignItems: 'center' },
  avatarText: { fontSize: 18, fontWeight: '800', color: '#fff' },
  userInfo: { flex: 1 },
  userName: { fontSize: 15, fontWeight: '700', color: COLORS.text },
  userHandle: { fontSize: 12, color: COLORS.textSecondary, marginTop: 2 },
  requestBtns: { flexDirection: 'row', gap: 8 },
  acceptBtn: { backgroundColor: COLORS.success, borderRadius: 10, padding: 8 },
  rejectBtn: { backgroundColor: `${COLORS.error}20`, borderRadius: 10, padding: 8, borderWidth: 1, borderColor: COLORS.error },
  cancelBtn: { borderWidth: 1, borderColor: COLORS.border, borderRadius: 8, paddingHorizontal: 12, paddingVertical: 6 },
  cancelBtnText: { fontSize: 12, fontWeight: '600', color: COLORS.textSecondary },
  removeBtn: { padding: 8 },
  addBtn: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: COLORS.primary, borderRadius: 10, paddingHorizontal: 12, paddingVertical: 8 },
  addBtnText: { fontSize: 13, fontWeight: '700', color: '#fff' },
  friendedBadge: { backgroundColor: `${COLORS.success}20`, borderRadius: 8, paddingHorizontal: 10, paddingVertical: 6 },
  friendedText: { fontSize: 12, fontWeight: '700', color: COLORS.success },
  pendingBadge: { backgroundColor: `${COLORS.warning}20`, borderRadius: 8, paddingHorizontal: 10, paddingVertical: 6 },
  pendingText: { fontSize: 12, fontWeight: '700', color: COLORS.warning },
  searchContainer: { flex: 1 },
  searchRow: { flexDirection: 'row', gap: 8, padding: 20, paddingBottom: 12 },
  searchInput: { flex: 1, backgroundColor: COLORS.surface, borderRadius: 12, padding: 14, color: COLORS.text, fontSize: 15, borderWidth: 1, borderColor: COLORS.border },
  searchBtn: { backgroundColor: COLORS.primary, borderRadius: 12, padding: 14, justifyContent: 'center', alignItems: 'center' },
  empty: { alignItems: 'center', paddingVertical: 60, gap: 10 },
  emptyText: { fontSize: 16, fontWeight: '600', color: COLORS.textSecondary },
  emptySubText: { fontSize: 13, color: COLORS.textSecondary, textAlign: 'center' },
});
