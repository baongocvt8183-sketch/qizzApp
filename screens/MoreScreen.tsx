import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { GlassCard } from '../components/GlassCard';
import { useTheme } from '../theme/ThemeContext';

export function MoreScreen() {
  const { colors, mode, toggleMode, isDark } = useTheme();
  const insets = useSafeAreaInsets();

  const items = [
    {
      icon: isDark ? ('sunny-outline' as const) : ('moon-outline' as const),
      label: 'Chế độ tối',
      desc: mode === 'dark' ? 'Đang bật' : 'Đang tắt',
      action: toggleMode,
      trailing: (
        <View
          style={[
            styles.toggle,
            { backgroundColor: isDark ? colors.primary : colors.glassStrong },
          ]}
        >
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
    },
    {
      icon: 'information-circle-outline' as const,
      label: 'Về ứng dụng',
      desc: 'QuizMaster v1.0.0',
    },
    {
      icon: 'help-circle-outline' as const,
      label: 'Trợ giúp',
      desc: 'FAQ & hỗ trợ',
    },
  ];

  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={[
        styles.content,
        { paddingTop: insets.top + 16, paddingBottom: 120 },
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
          onPress={item.action}
          style={styles.item}
        >
          <GlassCard padding={14}>
            <View style={styles.row}>
              <View
                style={[
                  styles.icon,
                  { backgroundColor: colors.glassStrong },
                ]}
              >
                <Ionicons
                  name={item.icon}
                  size={22}
                  color={colors.foreground}
                />
              </View>
              <View style={styles.text}>
                <Text style={[styles.label, { color: colors.foreground }]}>
                  {item.label}
                </Text>
                <Text style={[styles.desc, { color: colors.muted }]}>
                  {item.desc}
                </Text>
              </View>
              {item.trailing ?? (
                <Ionicons
                  name="chevron-forward"
                  size={20}
                  color={colors.muted}
                />
              )}
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
  title: { fontSize: 26, fontWeight: '800', marginBottom: 4 },
  subtitle: { fontSize: 14, marginBottom: 20 },
  item: { marginBottom: 10 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  icon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: { flex: 1 },
  label: { fontSize: 15, fontWeight: '700' },
  desc: { fontSize: 12, marginTop: 2 },
  toggle: {
    width: 48,
    height: 28,
    borderRadius: 14,
    padding: 3,
    justifyContent: 'center',
  },
  toggleKnob: {
    width: 22,
    height: 22,
    borderRadius: 11,
  },
});
