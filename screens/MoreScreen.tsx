import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { GlassCard } from '../components/GlassCard';
import { useTheme } from '../theme/ThemeContext';

type MoreDetail = 'privacy' | 'about' | 'help' | 'clear-data';

interface MoreScreenProps {
  detail?: MoreDetail;
  onBack?: () => void;
  onOpenDetail?: (detail: MoreDetail) => void;
}

export function MoreScreen({ detail, onBack, onOpenDetail }: MoreScreenProps) {
  const { colors, mode, toggleMode, isDark } = useTheme();
  const insets = useSafeAreaInsets();

  if (detail) {
    const title: Record<MoreDetail, string> = {
      privacy: 'Quyền riêng tư',
      about: 'Về ứng dụng',
      help: 'Trợ giúp',
      'clear-data': 'Xóa dữ liệu',
    };
    const body: Record<MoreDetail, string> = {
      privacy: 'Dữ liệu hồ sơ và lịch sử học tập chỉ dùng để cá nhân hóa trải nghiệm luyện thi trên thiết bị này.',
      about: 'QuizMaster v1.0.0\nLuyện thi thông minh, làm bài trắc nghiệm có tính giờ và theo dõi tiến độ học tập.',
      help: 'Chọn môn học để làm bài, dùng hồ sơ để chỉnh mục tiêu và xem thành tích. Mỗi bài có 5 câu hỏi mẫu.',
      'clear-data': 'Tính năng xóa toàn bộ lịch sử học tập đã sẵn sàng cho bản lưu trữ dữ liệu thật.',
    };

    return (
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[
          styles.content,
          { paddingTop: insets.top + 20, paddingBottom: 32 },
        ]}
      >
        <View style={styles.detailHeader}>
          <Pressable
            onPress={onBack}
            style={[styles.backBtn, { borderColor: colors.glassBorder }]}
          >
            <Ionicons name="arrow-back" size={22} color={colors.foreground} />
          </Pressable>
          <Text style={[styles.detailTitle, { color: colors.foreground }]}>
            {title[detail]}
          </Text>
        </View>
        <GlassCard padding={18}>
          <Text style={[styles.detailBody, { color: colors.foreground }]}>
            {body[detail]}
          </Text>
        </GlassCard>
      </ScrollView>
    );
  }

  const items = [
    {
      icon: isDark ? ('sunny-outline' as const) : ('moon-outline' as const),
      label: 'Chế độ tối',
      desc: mode === 'dark' ? 'Đang bật' : 'Đang tắt',
      action: toggleMode,
      color: '#f59e0b',
      trailing: (
        <View style={[styles.toggle, { backgroundColor: isDark ? colors.primary : colors.glassStrong }]}>
          <View
            style={[
              styles.toggleKnob,
              {
                backgroundColor: colors.primaryForeground,
                alignSelf: isDark ? 'flex-end' : 'flex-start',
              },
            ]}
          />
        </View>
      ),
    },
    {
      icon: 'shield-outline' as const,
      label: 'Quyền riêng tư',
      desc: 'Quản lý dữ liệu cá nhân',
      color: '#60a5fa',
      detail: 'privacy' as const,
    },
    {
      icon: 'information-circle-outline' as const,
      label: 'Về ứng dụng',
      desc: 'QuizMaster v1.0.0',
      color: '#a78bfa',
      detail: 'about' as const,
    },
    {
      icon: 'help-circle-outline' as const,
      label: 'Trợ giúp',
      desc: 'FAQ & hỗ trợ',
      color: '#34d399',
      detail: 'help' as const,
    },
    {
      icon: 'trash-outline' as const,
      label: 'Xóa dữ liệu',
      desc: 'Xóa toàn bộ lịch sử học tập',
      color: '#f87171',
      detail: 'clear-data' as const,
    },
  ];

  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={[
        styles.content,
        { paddingTop: insets.top + 16, paddingBottom: 124 },
      ]}
      showsVerticalScrollIndicator={false}
    >
      <Text style={[styles.title, { color: colors.foreground }]}>Thêm</Text>
      <Text style={[styles.subtitle, { color: colors.muted }]}>
        Cài đặt và tùy chọn bổ sung
      </Text>

      {items.map((item) => (
        <Pressable
          key={item.label}
          onPress={item.action ?? (() => item.detail && onOpenDetail?.(item.detail))}
          style={styles.item}
        >
          <GlassCard padding={14}>
            <View style={styles.row}>
              <View style={[styles.icon, { backgroundColor: item.color }]}>
                <Ionicons name={item.icon} size={22} color="#fff" />
              </View>
              <View style={styles.text}>
                <Text style={[styles.label, { color: colors.foreground }]}>
                  {item.label}
                </Text>
                <Text style={[styles.desc, { color: colors.muted }]}>{item.desc}</Text>
              </View>
              {item.trailing ?? <Ionicons name="chevron-forward" size={20} color={colors.muted} />}
            </View>
          </GlassCard>
        </Pressable>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: { flex: 1 },
  content: { paddingHorizontal: 20 },
  title: { fontSize: 28, fontWeight: '900', marginBottom: 4 },
  subtitle: { fontSize: 14, marginBottom: 24 },
  item: { marginBottom: 12 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  icon: {
    width: 46,
    height: 46,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: { flex: 1, minWidth: 0 },
  label: { fontSize: 15, fontWeight: '900' },
  desc: { fontSize: 12, marginTop: 2 },
  toggle: {
    width: 50,
    height: 30,
    borderRadius: 15,
    padding: 4,
    justifyContent: 'center',
  },
  toggleKnob: {
    width: 22,
    height: 22,
    borderRadius: 11,
  },
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
  detailBody: { fontSize: 15, lineHeight: 23, fontWeight: '700' },
});
