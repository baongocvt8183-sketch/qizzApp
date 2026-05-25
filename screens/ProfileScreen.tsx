import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { GlassCard } from '../components/GlassCard';
import { InputField } from '../components/InputField';
import { UserProfile } from './HomeScreen';
import { useTheme } from '../theme/ThemeContext';

export type ProfileDetail = 'personal' | 'goals' | 'notifications' | 'history' | 'achievements';

const MENU: Array<{
  id: ProfileDetail;
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  desc: string;
  color: string;
}> = [
  { id: 'personal', icon: 'person-outline', label: 'Thông tin cá nhân', desc: 'Cập nhật hồ sơ', color: '#60a5fa' },
  { id: 'goals', icon: 'flag-outline', label: 'Mục tiêu học tập', desc: '20 câu/ngày', color: '#a78bfa' },
  { id: 'notifications', icon: 'notifications-outline', label: 'Thông báo', desc: 'Quản lý nhắc nhở', color: '#f59e0b' },
  { id: 'history', icon: 'time-outline', label: 'Lịch sử hoạt động', desc: 'Xem log học tập', color: '#22d3ee' },
  { id: 'achievements', icon: 'ribbon-outline', label: 'Thành tích', desc: '3 đã mở', color: '#f472b6' },
];

interface ProfileScreenProps {
  user: UserProfile;
  onOpenDetail: (detail: ProfileDetail) => void;
  onLogout: () => void;
}

export function ProfileScreen({ user, onOpenDetail, onLogout }: ProfileScreenProps) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={[
        styles.content,
        { paddingTop: insets.top + 16, paddingBottom: 124 },
      ]}
      showsVerticalScrollIndicator={false}
    >
      <GlassCard strong padding={20} style={styles.profileCard}>
        <View style={styles.profileRow}>
          <View style={[styles.avatar, { backgroundColor: colors.glassStrong }]}>
            <Text style={[styles.avatarText, { color: colors.foreground }]}>QM</Text>
          </View>
          <View style={styles.profileInfo}>
            <Text style={[styles.name, { color: colors.foreground }]}>{user.name}</Text>
            <Text style={[styles.email, { color: colors.muted }]}>{user.email}</Text>
          </View>
          <Pressable
            onPress={() => onOpenDetail('personal')}
            style={[styles.editBtn, { backgroundColor: colors.glassStrong }]}
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
              <Text style={[styles.statV, { color: colors.foreground }]}>{s.v}</Text>
              <Text style={[styles.statL, { color: colors.muted }]}>{s.l}</Text>
            </View>
          ))}
        </View>
      </GlassCard>

      {MENU.map((item) => (
        <Pressable key={item.id} style={styles.menuItem} onPress={() => onOpenDetail(item.id)}>
          <GlassCard padding={14}>
            <View style={styles.menuRow}>
              <View style={[styles.menuIcon, { backgroundColor: item.color }]}>
                <Ionicons name={item.icon} size={20} color="#fff" />
              </View>
              <View style={styles.menuText}>
                <Text style={[styles.menuLabel, { color: colors.foreground }]}>
                  {item.label}
                </Text>
                <Text style={[styles.menuDesc, { color: colors.muted }]}>{item.desc}</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={colors.muted} />
            </View>
          </GlassCard>
        </Pressable>
      ))}

      <Pressable style={styles.logout} onPress={onLogout}>
        <GlassCard padding={14}>
          <View style={styles.logoutRow}>
            <Ionicons name="log-out-outline" size={20} color={colors.destructive} />
            <Text style={[styles.logoutText, { color: colors.destructive }]}>Đăng xuất</Text>
          </View>
        </GlassCard>
      </Pressable>
    </ScrollView>
  );
}

interface ProfileDetailProps {
  detail: ProfileDetail;
  user: UserProfile;
  onBack: () => void;
  onSaveUser: (user: UserProfile) => void;
}

export function ProfileDetail({ detail, user, onBack, onSaveUser }: ProfileDetailProps) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const [draft, setDraft] = useState(user);
  const [dailyGoal, setDailyGoal] = useState(20);
  const [accuracy, setAccuracy] = useState(90);

  const titles: Record<ProfileDetail, string> = {
    personal: 'Chỉnh sửa hồ sơ',
    goals: 'Mục tiêu học tập',
    notifications: 'Thông báo',
    history: 'Lịch sử hoạt động',
    achievements: 'Thành tích',
  };

  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={[
        styles.detailContent,
        { paddingTop: insets.top + 20, paddingBottom: 32 },
      ]}
      showsVerticalScrollIndicator={false}
    >
      <DetailHeader title={titles[detail]} onBack={onBack} />
      {detail === 'personal' && (
        <>
          <View style={styles.avatarEdit}>
            <View style={[styles.bigAvatar, { borderColor: colors.glassBorder }]}>
              <Text style={[styles.bigAvatarText, { color: colors.foreground }]}>
                {draft.name.slice(0, 2).toUpperCase()}
              </Text>
            </View>
            <View style={[styles.pencil, { backgroundColor: colors.primary }]}>
              <Ionicons name="pencil" size={16} color={colors.primaryForeground} />
            </View>
          </View>
          <FieldLabel label="HỌ VÀ TÊN" />
          <InputField icon="person-outline" value={draft.name} onChangeText={(name) => setDraft({ ...draft, name })} />
          <FieldLabel label="EMAIL" />
          <InputField icon="mail-outline" value={draft.email} onChangeText={(email) => setDraft({ ...draft, email })} />
          <FieldLabel label="SỐ ĐIỆN THOẠI" />
          <InputField icon="call-outline" placeholder="Số điện thoại" value={draft.phone} onChangeText={(phone) => setDraft({ ...draft, phone })} />
          <FieldLabel label="TRƯỜNG HỌC" />
          <InputField icon="business-outline" placeholder="Tên trường" value={draft.school} onChangeText={(school) => setDraft({ ...draft, school })} />
          <FieldLabel label="LỚP / KHỐI" />
          <InputField icon="school-outline" value={draft.grade} onChangeText={(grade) => setDraft({ ...draft, grade })} />
          <PrimaryAction label="Lưu thay đổi" onPress={() => { onSaveUser(draft); onBack(); }} />
        </>
      )}
      {detail === 'goals' && (
        <>
          <PickerCard title="Câu hỏi mỗi ngày" subtitle="Chọn mục tiêu hằng ngày phù hợp" values={[10, 20, 30, 50, 100]} selected={dailyGoal} onSelect={setDailyGoal} />
          <PickerCard title="Độ chính xác mục tiêu" subtitle="Tỷ lệ câu trả lời đúng mục tiêu" values={[60, 70, 80, 90, 100]} selected={accuracy} onSelect={setAccuracy} suffix="%" />
          <GlassCard padding={16} style={styles.goalSummary}>
            <Text style={[styles.goalText, { color: colors.foreground }]}>
              Mục tiêu: <Text style={{ color: '#facc15' }}>{dailyGoal} câu/ngày</Text> với độ chính xác <Text style={{ color: '#10b981' }}>{accuracy}%</Text>
            </Text>
          </GlassCard>
          <PrimaryAction label="Lưu mục tiêu" onPress={onBack} />
        </>
      )}
      {detail === 'notifications' && <NotificationSettings onDone={onBack} />}
      {detail === 'history' && <EmptyState />}
      {detail === 'achievements' && <Achievements />}
    </ScrollView>
  );
}

function DetailHeader({ title, onBack }: { title: string; onBack: () => void }) {
  const { colors } = useTheme();
  return (
    <View style={styles.detailHeader}>
      <Pressable onPress={onBack} style={[styles.backBtn, { borderColor: colors.glassBorder }]}>
        <Ionicons name="arrow-back" size={22} color={colors.foreground} />
      </Pressable>
      <Text style={[styles.detailTitle, { color: colors.foreground }]}>{title}</Text>
    </View>
  );
}

function FieldLabel({ label }: { label: string }) {
  const { colors } = useTheme();
  return <Text style={[styles.fieldLabel, { color: colors.muted }]}>{label}</Text>;
}

function PrimaryAction({ label, onPress }: { label: string; onPress: () => void }) {
  const { colors } = useTheme();
  return (
    <Pressable style={[styles.primaryAction, { backgroundColor: colors.primary }]} onPress={onPress}>
      <Text style={[styles.primaryActionText, { color: colors.primaryForeground }]}>{label}</Text>
    </Pressable>
  );
}

function PickerCard({ title, subtitle, values, selected, onSelect, suffix = '' }: {
  title: string;
  subtitle: string;
  values: number[];
  selected: number;
  onSelect: (value: number) => void;
  suffix?: string;
}) {
  const { colors } = useTheme();
  return (
    <GlassCard padding={18} style={styles.pickerCard}>
      <Text style={[styles.pickerTitle, { color: colors.foreground }]}>{title}</Text>
      <Text style={[styles.pickerSub, { color: colors.muted }]}>{subtitle}</Text>
      <View style={styles.choiceRow}>
        {values.map((value) => {
          const active = selected === value;
          return (
            <Pressable
              key={value}
              onPress={() => onSelect(value)}
              style={[styles.choice, { backgroundColor: active ? colors.primary : colors.glassStrong }]}
            >
              <Text style={[styles.choiceText, { color: active ? colors.primaryForeground : colors.foreground }]}>
                {value}{suffix}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </GlassCard>
  );
}

function NotificationSettings({ onDone }: { onDone: () => void }) {
  const items = [
    ['Nhắc nhở hằng ngày', 'Nhắc bạn học vào giờ đã đặt'],
    ['Cảnh báo streak', 'Thông báo khi sắp mất chuỗi'],
    ['Mở khóa thành tích', 'Thông báo khi đạt thành tích mới'],
    ['Báo cáo tuần', 'Tóm tắt hoạt động mỗi tuần'],
  ];
  return (
    <>
      {items.map(([title, desc], index) => (
        <ToggleRow key={title} title={title} desc={desc} active={index < 3} />
      ))}
      <PrimaryAction label="Lưu cài đặt" onPress={onDone} />
    </>
  );
}

function ToggleRow({ title, desc, active }: { title: string; desc: string; active: boolean }) {
  const { colors } = useTheme();
  return (
    <GlassCard padding={14} style={styles.toggleRowCard}>
      <View style={styles.menuRow}>
        <View style={[styles.menuIcon, { backgroundColor: colors.glassStrong }]}>
          <Ionicons name="notifications-outline" size={20} color={colors.foreground} />
        </View>
        <View style={styles.menuText}>
          <Text style={[styles.menuLabel, { color: colors.foreground }]}>{title}</Text>
          <Text style={[styles.menuDesc, { color: colors.muted }]}>{desc}</Text>
        </View>
        <View style={[styles.switch, { backgroundColor: active ? colors.primary : colors.glassStrong }]}>
          <View style={[styles.switchKnob, { alignSelf: active ? 'flex-end' : 'flex-start', backgroundColor: colors.primaryForeground }]} />
        </View>
      </View>
    </GlassCard>
  );
}

function EmptyState() {
  const { colors } = useTheme();
  return (
    <View style={styles.emptyState}>
      <Ionicons name="pulse-outline" size={40} color={colors.muted} />
      <Text style={[styles.emptyText, { color: colors.muted }]}>Chưa có hoạt động nào</Text>
    </View>
  );
}

function Achievements() {
  const { colors } = useTheme();
  const badges = ['🏆\nStreak 7 ngày', '⭐\n100 câu đúng', '🎯\nĐiểm tuyệt đối', '💎\n500 câu đúng', '👑\nTop 10', '⚡\nSiêu tốc độ'];
  return (
    <>
      <GlassCard padding={18} style={styles.achievementSummary}>
        <View style={styles.menuRow}>
          <View style={[styles.menuIcon, { backgroundColor: '#f59e0b' }]}>
            <Ionicons name="trophy-outline" size={22} color="#fff" />
          </View>
          <View style={styles.menuText}>
            <Text style={[styles.menuDesc, { color: colors.muted }]}>Đã mở khóa</Text>
            <Text style={[styles.achievementCount, { color: colors.foreground }]}>0 / 9</Text>
          </View>
        </View>
      </GlassCard>
      <Text style={[styles.sectionCaption, { color: colors.muted }]}>CHƯA ĐẠT ĐƯỢC</Text>
      <View style={styles.badgeGrid}>
        {badges.map((badge) => (
          <GlassCard key={badge} padding={12} style={styles.badgeCard}>
            <Text style={[styles.badgeText, { color: colors.muted }]}>{badge}</Text>
          </GlassCard>
        ))}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  scroll: { flex: 1 },
  content: { paddingHorizontal: 20 },
  detailContent: { paddingHorizontal: 22 },
  profileCard: { marginBottom: 16 },
  profileRow: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: { fontSize: 22, fontWeight: '900' },
  profileInfo: { flex: 1, minWidth: 0 },
  name: { fontSize: 20, fontWeight: '900', marginBottom: 2 },
  email: { fontSize: 13 },
  editBtn: {
    width: 42,
    height: 42,
    borderRadius: 14,
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
  statV: { fontSize: 20, fontWeight: '900' },
  statL: { fontSize: 11, marginTop: 2 },
  menuItem: { marginBottom: 10 },
  menuRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  menuIcon: {
    width: 42,
    height: 42,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuText: { flex: 1, minWidth: 0 },
  menuLabel: { fontSize: 14, fontWeight: '900' },
  menuDesc: { fontSize: 12, marginTop: 2 },
  logout: { marginTop: 8 },
  logoutRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  logoutText: { fontSize: 15, fontWeight: '900' },
  detailHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 24,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  detailTitle: { fontSize: 20, fontWeight: '900' },
  avatarEdit: { alignItems: 'center', marginBottom: 24 },
  bigAvatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bigAvatarText: { fontSize: 26, fontWeight: '900' },
  pencil: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -24,
    marginLeft: 56,
  },
  fieldLabel: {
    fontSize: 11,
    fontWeight: '900',
    marginBottom: 8,
    marginTop: 8,
  },
  primaryAction: {
    borderRadius: 18,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 18,
  },
  primaryActionText: { fontSize: 15, fontWeight: '900' },
  pickerCard: { marginBottom: 18 },
  pickerTitle: { fontSize: 16, fontWeight: '900' },
  pickerSub: { fontSize: 12, marginTop: 4, marginBottom: 16 },
  choiceRow: { flexDirection: 'row', gap: 8, flexWrap: 'wrap' },
  choice: {
    minWidth: 58,
    height: 42,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  choiceText: { fontWeight: '900' },
  goalSummary: { marginBottom: 12 },
  goalText: { fontSize: 15, fontWeight: '900', lineHeight: 22 },
  toggleRowCard: { marginBottom: 12 },
  switch: {
    width: 50,
    height: 30,
    borderRadius: 15,
    padding: 4,
    justifyContent: 'center',
  },
  switchKnob: { width: 22, height: 22, borderRadius: 11 },
  emptyState: { alignItems: 'center', justifyContent: 'center', minHeight: 360, gap: 14 },
  emptyText: { fontSize: 15, fontWeight: '700' },
  achievementSummary: { marginBottom: 22 },
  achievementCount: { fontSize: 28, fontWeight: '900' },
  sectionCaption: { fontSize: 12, fontWeight: '900', marginBottom: 12 },
  badgeGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  badgeCard: { width: '31%', minHeight: 78, alignItems: 'center', justifyContent: 'center' },
  badgeText: { textAlign: 'center', fontSize: 12, fontWeight: '800', lineHeight: 20 },
});
