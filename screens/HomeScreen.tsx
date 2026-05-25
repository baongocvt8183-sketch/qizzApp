import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { GlassCard } from '../components/GlassCard';
import { InputField } from '../components/InputField';
import { SUBJECTS, Subject } from '../data/subjects';
import { useTheme } from '../theme/ThemeContext';
import type { AppColors } from '../theme/colors';

type AuthTab = 'login' | 'register';

export interface UserProfile {
  name: string;
  email: string;
  grade: string;
  phone: string;
  school: string;
}

interface HomeScreenProps {
  user: UserProfile | null;
  onLogin: (user: UserProfile) => void;
  onGuest: () => void;
  onStartQuiz: (subject: Subject) => void;
  onSeeSubjects: () => void;
}

export function HomeScreen({
  user,
  onLogin,
  onGuest,
  onStartQuiz,
  onSeeSubjects,
}: HomeScreenProps) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const [authTab, setAuthTab] = useState<AuthTab>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const submitAuth = () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Thiếu thông tin', 'Vui lòng nhập email và mật khẩu.');
      return;
    }

    onLogin({
      name: authTab === 'register' && name.trim() ? name.trim() : 'Người dùng',
      email: email.trim(),
      grade: '12',
      phone: '',
      school: '',
    });
    Alert.alert('Thành công', authTab === 'login' ? 'Đã đăng nhập.' : 'Đã tạo tài khoản.');
  };

  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={[
        styles.content,
        { paddingTop: insets.top + 16, paddingBottom: 124 },
      ]}
      showsVerticalScrollIndicator={false}
    >
      <Header colors={colors} user={user} />

      {!user && (
        <>
          <AuthTabs active={authTab} onChange={setAuthTab} colors={colors} />

          {authTab === 'register' && (
            <InputField
              icon="person-outline"
              placeholder="Họ và tên"
              value={name}
              onChangeText={setName}
            />
          )}

          <InputField
            icon="mail-outline"
            placeholder="Email của bạn"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <InputField
            icon="lock-closed-outline"
            placeholder="Mật khẩu"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            secureToggle
            showSecure={showPassword}
            onToggleSecure={() => setShowPassword((v) => !v)}
          />

          <Pressable style={styles.forgot}>
            <Text style={[styles.forgotText, { color: colors.foreground }]}>
              Quên mật khẩu?
            </Text>
          </Pressable>

          <Pressable
            style={[styles.primaryBtn, { backgroundColor: colors.primary }]}
            onPress={submitAuth}
          >
            <Text style={[styles.primaryBtnText, { color: colors.primaryForeground }]}>
              {authTab === 'login' ? 'Đăng nhập' : 'Tạo tài khoản'}
            </Text>
          </Pressable>

          <OrDivider colors={colors} />

          <Pressable style={styles.guestBtn} onPress={onGuest}>
            <GlassCard padding={14}>
              <Text style={[styles.guestText, { color: colors.foreground }]}>
                Tiếp tục với tư cách khách
              </Text>
            </GlassCard>
          </Pressable>
        </>
      )}

      {user && <SummaryCard colors={colors} user={user} />}

      <ChallengeCard colors={colors} onStart={() => onStartQuiz(SUBJECTS[0])} />

      <View style={styles.sectionHeader}>
        <Ionicons name="sparkles-outline" size={20} color={colors.accent} />
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          Luyện tập nhanh
        </Text>
      </View>

      <View style={styles.grid}>
        {SUBJECTS.map((subject) => (
          <Pressable
            key={subject.id}
            style={styles.gridItem}
            onPress={() => onStartQuiz(subject)}
          >
            <GlassCard padding={14}>
              <SubjectIcon colors={colors} subject={subject} />
              <Text style={[styles.subjectName, { color: colors.foreground }]}>
                {subject.name}
              </Text>
              <Text style={[styles.subjectCount, { color: colors.muted }]}>
                {subject.questions} câu
              </Text>
            </GlassCard>
          </Pressable>
        ))}
      </View>

      <Pressable style={styles.seeAll} onPress={onSeeSubjects}>
        <GlassCard padding={14}>
          <Text style={[styles.seeAllText, { color: colors.foreground }]}>
            Xem tất cả môn học ›
          </Text>
        </GlassCard>
      </Pressable>
    </ScrollView>
  );
}

function Header({ colors, user }: { colors: AppColors; user: UserProfile | null }) {
  return (
    <View style={styles.header}>
      <View style={[styles.logoBox, { backgroundColor: colors.primary }]}>
        <Ionicons name="bulb-outline" size={28} color={colors.primaryForeground} />
      </View>
      <View style={styles.headerText}>
        <Text style={[styles.appName, { color: colors.foreground }]}>QuizMaster</Text>
        <Text style={[styles.tagline, { color: colors.muted }]}>
          {user ? `Mừng trở lại, ${user.name}` : 'Luyện thi thông minh, đạt điểm cao hơn'}
        </Text>
      </View>
    </View>
  );
}

function SummaryCard({ colors, user }: { colors: AppColors; user: UserProfile }) {
  return (
    <GlassCard strong style={styles.summaryCard} padding={18}>
      <View style={styles.summaryTop}>
        <View>
          <Text style={[styles.welcome, { color: colors.muted }]}>Mừng trở lại</Text>
          <Text style={[styles.summaryName, { color: colors.foreground }]}>{user.name}</Text>
        </View>
        <View style={[styles.smallAvatar, { borderColor: colors.glassBorder }]}>
          <Text style={[styles.smallAvatarText, { color: colors.foreground }]}>
            {user.name.slice(0, 2).toUpperCase()}
          </Text>
        </View>
      </View>
      <View style={[styles.streakBox, { borderColor: colors.glassBorder }]}>
        <Ionicons name="flame" size={20} color="#fb923c" />
        <Text style={[styles.streakText, { color: colors.foreground }]}>1 ngày liên tiếp 🔥</Text>
        <Text style={[styles.streakGoal, { color: colors.muted }]}>0/20 câu hôm nay</Text>
      </View>
    </GlassCard>
  );
}

function SubjectIcon({ colors, subject }: { colors: AppColors; subject: Subject }) {
  return (
    <View style={[styles.subjectIcon, { backgroundColor: colors[subject.colorKey] }]}>
      <Text style={styles.subjectIconText}>{subject.icon}</Text>
    </View>
  );
}

function AuthTabs({ active, onChange, colors }: {
  active: AuthTab;
  onChange: (t: AuthTab) => void;
  colors: AppColors;
}) {
  return (
    <GlassCard style={styles.authTabs} padding={4}>
      <View style={styles.authTabsRow}>
        {(['login', 'register'] as const).map((tab) => (
          <Pressable
            key={tab}
            onPress={() => onChange(tab)}
            style={[styles.authTab, active === tab && { backgroundColor: colors.glassStrong }]}
          >
            <Text
              style={[
                styles.authTabText,
                {
                  color: active === tab ? colors.foreground : colors.muted,
                  fontWeight: active === tab ? '800' : '600',
                },
              ]}
            >
              {tab === 'login' ? 'Đăng nhập' : 'Đăng ký'}
            </Text>
          </Pressable>
        ))}
      </View>
    </GlassCard>
  );
}

function OrDivider({ colors }: { colors: AppColors }) {
  return (
    <View style={styles.orRow}>
      <View style={[styles.orLine, { backgroundColor: colors.glassBorder }]} />
      <Text style={[styles.orText, { color: colors.muted }]}>hoặc</Text>
      <View style={[styles.orLine, { backgroundColor: colors.glassBorder }]} />
    </View>
  );
}

function ChallengeCard({ colors, onStart }: { colors: AppColors; onStart: () => void }) {
  return (
    <GlassCard strong style={styles.challenge} padding={18}>
      <View style={styles.challengeTop}>
        <View style={styles.challengeLabel}>
          <Ionicons name="flash" size={16} color="#facc15" />
          <Text style={[styles.challengeBadge, { color: colors.muted }]}>
            THỬ THÁCH HÔM NAY
          </Text>
        </View>
        <Ionicons name="bookmark" size={22} color="#fbbf24" />
      </View>
      <Text style={[styles.challengeTitle, { color: colors.foreground }]}>
        Đề thi thử THPT 2024
      </Text>
      <Text style={[styles.challengeSub, { color: colors.muted }]}>
        Hoàn thành để nhận 50 điểm
      </Text>
      <Pressable
        onPress={onStart}
        style={[
          styles.startBtn,
          { backgroundColor: colors.glassStrong, borderColor: colors.glassBorder },
        ]}
      >
        <Text style={[styles.startBtnText, { color: colors.foreground }]}>Bắt đầu ngay</Text>
      </Pressable>
    </GlassCard>
  );
}

const styles = StyleSheet.create({
  scroll: { flex: 1 },
  content: { paddingHorizontal: 20 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    marginBottom: 20,
  },
  logoBox: {
    width: 56,
    height: 56,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: { flex: 1, minWidth: 0 },
  appName: { fontSize: 26, fontWeight: '900', marginBottom: 4 },
  tagline: { fontSize: 13, lineHeight: 18 },
  authTabs: { marginBottom: 14 },
  authTabsRow: { flexDirection: 'row' },
  authTab: {
    flex: 1,
    minHeight: 44,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  authTabText: { fontSize: 14 },
  forgot: { alignSelf: 'flex-end', marginBottom: 16, marginTop: -4 },
  forgotText: { fontSize: 13, fontWeight: '700' },
  primaryBtn: {
    borderRadius: 18,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 4,
  },
  primaryBtnText: { fontSize: 16, fontWeight: '800' },
  orRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
    gap: 12,
  },
  orLine: { flex: 1, height: 1 },
  orText: { fontSize: 12 },
  guestBtn: { marginBottom: 24 },
  guestText: { textAlign: 'center', fontSize: 15, fontWeight: '700' },
  summaryCard: { marginBottom: 18 },
  summaryTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  welcome: { fontSize: 12, fontWeight: '700' },
  summaryName: { fontSize: 22, fontWeight: '900' },
  smallAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  smallAvatarText: { fontWeight: '800' },
  streakBox: {
    borderWidth: 1,
    borderRadius: 16,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  streakText: { flex: 1, fontSize: 14, fontWeight: '800' },
  streakGoal: { fontSize: 11 },
  challenge: { marginBottom: 24 },
  challengeTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  challengeLabel: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  challengeBadge: { fontSize: 11, fontWeight: '800' },
  challengeTitle: { fontSize: 20, fontWeight: '900', marginBottom: 4 },
  challengeSub: { fontSize: 13, marginBottom: 16 },
  startBtn: {
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
    borderWidth: 1,
  },
  startBtnText: { fontSize: 15, fontWeight: '800' },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 14,
  },
  sectionTitle: { fontSize: 18, fontWeight: '900' },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 12,
  },
  gridItem: { width: '48%' },
  subjectIcon: {
    width: 46,
    height: 46,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  subjectIconText: { fontSize: 14, fontWeight: '900', color: '#fff' },
  subjectName: { fontSize: 14, fontWeight: '800', marginBottom: 2 },
  subjectCount: { fontSize: 12 },
  seeAll: { marginTop: 4 },
  seeAllText: { textAlign: 'center', fontSize: 14, fontWeight: '800' },
});
