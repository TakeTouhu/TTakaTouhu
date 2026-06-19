import { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, KeyboardAvoidingView, Platform, ActivityIndicator, Alert, ScrollView
} from 'react-native';
import { Link } from 'expo-router';
import { supabase } from '@/lib/supabase';
import { COLORS } from '@/lib/utils';

export default function RegisterScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleRegister() {
    if (!email || !password || !username) {
      return Alert.alert('エラー', '必須項目を入力してください');
    }
    if (password.length < 6) {
      return Alert.alert('エラー', 'パスワードは6文字以上で入力してください');
    }
    setLoading(true);
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error || !data.user) {
      setLoading(false);
      return Alert.alert('登録失敗', error?.message ?? '不明なエラー');
    }
    const { error: profileError } = await supabase.from('profiles').insert({
      id: data.user.id,
      username,
      display_name: displayName || username,
      preferred_unit: 'kg',
    });
    setLoading(false);
    if (profileError) Alert.alert('プロフィール作成失敗', profileError.message);
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.inner}>
        <Text style={styles.logo}>💪 FitShare</Text>
        <Text style={styles.tagline}>アカウントを作成する</Text>

        <View style={styles.form}>
          <Text style={styles.label}>ユーザー名 *</Text>
          <TextInput
            style={styles.input}
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
            placeholderTextColor={COLORS.textSecondary}
            placeholder="username"
          />

          <Text style={styles.label}>表示名</Text>
          <TextInput
            style={styles.input}
            value={displayName}
            onChangeText={setDisplayName}
            placeholderTextColor={COLORS.textSecondary}
            placeholder="山田 太郎"
          />

          <Text style={styles.label}>メールアドレス *</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
            placeholderTextColor={COLORS.textSecondary}
            placeholder="you@example.com"
          />

          <Text style={styles.label}>パスワード *（6文字以上）</Text>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            placeholderTextColor={COLORS.textSecondary}
            placeholder="••••••••"
          />

          <TouchableOpacity style={styles.button} onPress={handleRegister} disabled={loading}>
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>登録する</Text>
            )}
          </TouchableOpacity>

          <Link href="/(auth)/login" asChild>
            <TouchableOpacity style={styles.link}>
              <Text style={styles.linkText}>既にアカウントをお持ちの方はログイン</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  inner: { flexGrow: 1, justifyContent: 'center', padding: 24 },
  logo: { fontSize: 36, fontWeight: '800', color: COLORS.primary, textAlign: 'center', marginBottom: 8 },
  tagline: { fontSize: 14, color: COLORS.textSecondary, textAlign: 'center', marginBottom: 32 },
  form: { gap: 12 },
  label: { fontSize: 14, color: COLORS.textSecondary, marginBottom: -4 },
  input: {
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: 16,
    color: COLORS.text,
    fontSize: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  button: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '700' },
  link: { alignItems: 'center', marginTop: 8 },
  linkText: { color: COLORS.primary, fontSize: 14 },
});
