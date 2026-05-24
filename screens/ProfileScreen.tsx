import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { GlassCard } from '../components/GlassCard';
import { useTheme } from '../theme/ThemeContext';

const MENU = [
  { icon: 'person-outline' as const, label: 'Thông tin cá nhân', desc: 'Cập nhật hồ sơ' },
  { icon: 'flag-outline' as const, label: 'Mục tiêu học tập', desc: '20 câu/ngày' },
  { icon: 'notifications-outline' as const, label: 'Thông báo', desc: 'Quản lý nhắc nhở' },
  { icon: 'time-outline' as const, label: 'Lịch sử hoạt động', desc: 'Xem log học tập' },
  { icon: 'ribbon-outline' as const, label: 'Thành tích', desc: '3 đã mở' },
];

export function ProfileScreen() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={[
        styles.content,
        { paddingTop: insets.top + 16, paddingBottom: 120 },
      ]}
      showsVerticalScrollIndicator={false}
    >
      <GlassCard strong padding={20} style={styles.profileCard}>
        <View style={styles.profileRow}>
          <View
            style={[styles.avatar, { backgroundColor: colors.glassStrong }]}
          >
            <Text style={[styles.avatarText, { color: colors.foreground }]}>
              QM
            </Text>
          </View>
          <View style={styles.profileInfo}>
            <Text style={[styles.name, { color: colors.foreground }]}>
              Người dùng
            </Text>
            <Text style={[styles.email, { color: colors.muted }]}>
              guest@quizmaster.vn
            </Text>
          </View>
          <Pressable
            style={[
              styles.editBtn,
              { backgroundColor: colors.glassStrong },
            ]}
          >
            <Ionicons name="create-outline" size={18} color={colors.foreground} />
          </Pressable>
        </View>
        <View style={[styles.statsRow, { borderTopColor: colors.glassBorder }]}>
          {[
            { v: '120', l: 'Điểm' },
            { v: '5', l: 'Streak' },
            { v: '12', l: 'Bài thi' },
          ].map((s, i) => (
            <View
              key={s.l}
              style={[
                styles.stat,
                i === 1 && {
                  borderLeftWidth: 1,
                  borderRightWidth: 1,
                  borderColor: colors.glassBorder,
                },
              ]}
            >
              <Text style={[styles.statV, { color: colors.foreground }]}>
                {s.v}
              </Text>
              <Text style={[styles.statL, { color: colors.muted }]}>{s.l}</Text>
            </View>
          ))}
        </View>
      </GlassCard>

      {MENU.map((item) => (
        <Pressable key={item.label} style={styles.menuItem}>
          <GlassCard padding={14}>
            <View style={styles.menuRow}>
              <View
                style={[
                  styles.menuIcon,
                  { backgroundColor: colors.glassStrong },
                ]}
              >
                <Ionicons
                  name={item.icon}
                  size={20}
                  color={colors.foreground}
                />
              </View>
              <View style={styles.menuText}>
                <Text style={[styles.menuLabel, { color: colors.foreground }]}>
                  {item.label}
                </Text>
                <Text style={[styles.menuDesc, { color: colors.muted }]}>
                  {item.desc}
                </Text>
              </View>
              <Ionicons
                name="chevron-forward"
                size={20}
                color={colors.muted}
              />
            </View>
          </GlassCard>
        </Pressable>
      ))}

      <Pressable style={styles.logout}>
        <GlassCard padding={14}>
          <View style={styles.logoutRow}>
            <Ionicons
              name="log-out-outline"
              size={20}
              color={colors.destructive}
            />
            <Text style={[styles.logoutText, { color: colors.destructive }]}>
              Đăng xuất
            </Text>
          </View>
        </GlassCard>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: { flex: 1 },
  content: { paddingHorizontal: 20 },
  profileCard: { marginBottom: 16 },
  profileRow: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: { fontSize: 22, fontWeight: '800' },
  profileInfo: { flex: 1 },
  name: { fontSize: 20, fontWeight: '800', marginBottom: 2 },
  email: { fontSize: 13 },
  editBtn: {
    width: 36,
    height: 36,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statsRow: {
    flexDirection: 'row',
    marginTop: 18,
    paddingTop: 16,
    borderTopWidth: 1,
  },
  stat: { flex: 1, alignItems: 'center' },
  statV: { fontSize: 20, fontWeight: '800' },
  statL: { fontSize: 11, marginTop: 2 },
  menuItem: { marginBottom: 10 },
  menuRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuText: { flex: 1 },
  menuLabel: { fontSize: 14, fontWeight: '700' },
  menuDesc: { fontSize: 12, marginTop: 2 },
  logout: { marginTop: 8 },
  logoutRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  logoutText: { fontSize: 15, fontWeight: '700' },
});
