import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { GlassCard } from '../components/GlassCard';
import { InputField } from '../components/InputField';
import { SUBJECTS } from '../data/subjects';
import { useTheme } from '../theme/ThemeContext';
import type { AppColors } from '../theme/colors';

type AuthTab = 'login' | 'register';

export function HomeScreen() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const [authTab, setAuthTab] = useState<AuthTab>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={[
        styles.content,
        { paddingTop: insets.top + 16, paddingBottom: 120 },
      ]}
      showsVerticalScrollIndicator={false}
    >
      <Header colors={colors} />

      <AuthTabs
        active={authTab}
        onChange={setAuthTab}
        colors={colors}
      />

      {authTab === 'login' ? (
        <>
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
        </>
      ) : (
        <>
          <InputField
            icon="person-outline"
            placeholder="Họ và tên"
          />
          <InputField
            icon="mail-outline"
            placeholder="Email của bạn"
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <InputField
            icon="lock-closed-outline"
            placeholder="Mật khẩu (tối thiểu 6 ký tự)"
            secureTextEntry
          />
        </>
      )}

      <Pressable
        style={[styles.primaryBtn, { backgroundColor: colors.primary }]}
      >
        <Text style={[styles.primaryBtnText, { color: colors.primaryForeground }]}>
          {authTab === 'login' ? 'Đăng nhập' : 'Tạo tài khoản'}
        </Text>
      </Pressable>

      <OrDivider colors={colors} />

      <Pressable style={styles.guestBtn}>
        <GlassCard padding={14}>
          <Text style={[styles.guestText, { color: colors.foreground }]}>
            Tiếp tục với tư cách khách
          </Text>
        </GlassCard>
      </Pressable>

      <ChallengeCard colors={colors} />

      <View style={styles.sectionHeader}>
        <Ionicons name="planet-outline" size={20} color={colors.foreground} />
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          Luyện tập nhanh
        </Text>
      </View>

      <View style={styles.grid}>
        {SUBJECTS.map((subject) => (
          <Pressable key={subject.id} style={styles.gridItem}>
            <GlassCard padding={14}>
              <View
                style={[
                  styles.subjectIcon,
                  { backgroundColor: colors[subject.colorKey] },
                ]}
              >
                <Text style={styles.subjectIconText}>{subject.icon}</Text>
              </View>
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

      <Pressable style={styles.seeAll}>
        <GlassCard padding={14}>
          <Text style={[styles.seeAllText, { color: colors.foreground }]}>
            Xem tất cả môn học ›
          </Text>
        </GlassCard>
      </Pressable>
    </ScrollView>
  );
}

function Header({ colors }: { colors: AppColors }) {
  return (
    <View style={styles.header}>
      <View style={[styles.logoBox, { backgroundColor: colors.primary }]}>
        <Ionicons name="bulb-outline" size={28} color={colors.primaryForeground} />
      </View>
      <View style={styles.headerText}>
        <Text style={[styles.appName, { color: colors.foreground }]}>
          QuizMaster
        </Text>
        <Text style={[styles.tagline, { color: colors.muted }]}>
          Luyện thi thông minh, đạt điểm cao hơn
        </Text>
      </View>
    </View>
  );
}

function AuthTabs({
  active,
  onChange,
  colors,
}: {
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
            style={[
              styles.authTab,
              active === tab && {
                backgroundColor: colors.glassStrong,
              },
            ]}
          >
            <Text
              style={[
                styles.authTabText,
                {
                  color:
                    active === tab ? colors.foreground : colors.muted,
                  fontWeight: active === tab ? '700' : '500',
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

function ChallengeCard({ colors }: { colors: AppColors }) {
  return (
    <GlassCard strong style={styles.challenge} padding={18}>
      <View style={styles.challengeTop}>
        <View style={styles.challengeLabel}>
          <Ionicons name="flash" size={16} color={colors.foreground} />
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
        style={[
          styles.startBtn,
          {
            backgroundColor: colors.glassStrong,
            borderColor: colors.glassBorder,
          },
        ]}
      >
        <Text style={[styles.startBtnText, { color: colors.foreground }]}>
          Bắt đầu ngay
        </Text>
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
    marginBottom: 24,
  },
  logoBox: {
    width: 56,
    height: 56,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: { flex: 1 },
  appName: { fontSize: 26, fontWeight: '800', marginBottom: 4 },
  tagline: { fontSize: 13, lineHeight: 18 },
  authTabs: { marginBottom: 16 },
  authTabsRow: { flexDirection: 'row' },
  authTab: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 14,
    alignItems: 'center',
  },
  authTabText: { fontSize: 14 },
  forgot: { alignSelf: 'flex-end', marginBottom: 16, marginTop: -4 },
  forgotText: { fontSize: 13, fontWeight: '600' },
  primaryBtn: {
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 4,
  },
  primaryBtnText: { fontSize: 16, fontWeight: '700' },
  orRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
    gap: 12,
  },
  orLine: { flex: 1, height: 1 },
  orText: { fontSize: 12 },
  guestBtn: { marginBottom: 28 },
  guestText: { textAlign: 'center', fontSize: 15, fontWeight: '600' },
  challenge: { marginBottom: 24 },
  challengeTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  challengeLabel: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  challengeBadge: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  challengeTitle: { fontSize: 20, fontWeight: '800', marginBottom: 4 },
  challengeSub: { fontSize: 13, marginBottom: 16 },
  startBtn: {
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
    borderWidth: 1,
  },
  startBtnText: { fontSize: 15, fontWeight: '700' },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 14,
  },
  sectionTitle: { fontSize: 16, fontWeight: '700' },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 12,
  },
  gridItem: { width: '47.5%' },
  subjectIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  subjectIconText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#fff',
  },
  subjectName: { fontSize: 14, fontWeight: '700', marginBottom: 2 },
  subjectCount: { fontSize: 12 },
  seeAll: { marginTop: 4 },
  seeAllText: { textAlign: 'center', fontSize: 14, fontWeight: '600' },
});
