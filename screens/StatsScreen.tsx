import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { GlassCard } from '../components/GlassCard';
import { useTheme } from '../theme/ThemeContext';

const STATS = [
  { icon: 'document-text-outline' as const, label: 'Tổng bài thi', value: '12' },
  { icon: 'checkmark-circle-outline' as const, label: 'Câu đúng', value: '248' },
  { icon: 'flame-outline' as const, label: 'Streak hiện tại', value: '5 ngày' },
  { icon: 'trophy-outline' as const, label: 'Kỷ lục streak', value: '12 ngày' },
];

const WEEK = [
  { day: 'T2', height: 0.3 },
  { day: 'T3', height: 0.5 },
  { day: 'T4', height: 0.7 },
  { day: 'T5', height: 0.4 },
  { day: 'T6', height: 0.9 },
  { day: 'T7', height: 0.6 },
  { day: 'CN', height: 0.2, today: true },
];

export function StatsScreen() {
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
      <Text style={[styles.title, { color: colors.foreground }]}>
        Thống kê
      </Text>

      <View style={styles.grid}>
        {STATS.map((item) => (
          <View key={item.label} style={styles.gridItem}>
            <GlassCard padding={16}>
              <View
                style={[
                  styles.iconWrap,
                  { backgroundColor: colors.glassStrong },
                ]}
              >
                <Ionicons
                  name={item.icon}
                  size={22}
                  color={colors.foreground}
                />
              </View>
              <Text style={[styles.statValue, { color: colors.foreground }]}>
                {item.value}
              </Text>
              <Text style={[styles.statLabel, { color: colors.muted }]}>
                {item.label}
              </Text>
            </GlassCard>
          </View>
        ))}
      </View>

      <GlassCard style={styles.chartCard} padding={18}>
        <Text style={[styles.cardTitle, { color: colors.foreground }]}>
          Hoạt động 7 ngày
        </Text>
        <View style={styles.bars}>
          {WEEK.map((d) => (
            <View key={d.day} style={styles.barCol}>
              <View
                style={[
                  styles.barTrack,
                  { backgroundColor: colors.glassStrong },
                ]}
              >
                <View
                  style={[
                    styles.barFill,
                    {
                      height: `${d.height * 100}%`,
                      backgroundColor: d.today
                        ? colors.primary
                        : colors.muted,
                    },
                  ]}
                />
              </View>
              <Text
                style={[
                  styles.barDay,
                  {
                    color: d.today ? colors.foreground : colors.muted,
                    fontWeight: d.today ? '700' : '500',
                  },
                ]}
              >
                {d.day}
              </Text>
            </View>
          ))}
        </View>
      </GlassCard>

      <GlassCard padding={18}>
        <Text style={[styles.cardTitle, { color: colors.foreground }]}>
          Hiệu suất theo môn
        </Text>
        {['Toán học', 'Vật lý', 'Hóa học', 'Tiếng Anh'].map((name, i) => (
          <View key={name} style={styles.perfRow}>
            <Text style={[styles.perfName, { color: colors.foreground }]}>
              {name}
            </Text>
            <View
              style={[
                styles.perfTrack,
                { backgroundColor: colors.glassStrong },
              ]}
            >
              <View
                style={[
                  styles.perfFill,
                  {
                    width: `${[72, 65, 58, 80][i]}%`,
                    backgroundColor: colors.primary,
                  },
                ]}
              />
            </View>
            <Text style={[styles.perfPct, { color: colors.muted }]}>
              {[72, 65, 58, 80][i]}%
            </Text>
          </View>
        ))}
      </GlassCard>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: { flex: 1 },
  content: { paddingHorizontal: 20 },
  title: { fontSize: 26, fontWeight: '800', marginBottom: 20 },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 16,
  },
  gridItem: { width: '47.5%' },
  iconWrap: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  statValue: { fontSize: 22, fontWeight: '800', marginBottom: 2 },
  statLabel: { fontSize: 12 },
  chartCard: { marginBottom: 16 },
  cardTitle: { fontSize: 16, fontWeight: '700', marginBottom: 16 },
  bars: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 120,
    gap: 6,
  },
  barCol: { flex: 1, alignItems: 'center', gap: 8 },
  barTrack: {
    width: '100%',
    height: 90,
    borderRadius: 8,
    justifyContent: 'flex-end',
    overflow: 'hidden',
  },
  barFill: { width: '100%', borderRadius: 8, minHeight: 4 },
  barDay: { fontSize: 11 },
  perfRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 14,
  },
  perfName: { width: 72, fontSize: 13, fontWeight: '600' },
  perfTrack: {
    flex: 1,
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
  },
  perfFill: { height: '100%', borderRadius: 4 },
  perfPct: { width: 36, fontSize: 12, textAlign: 'right' },
});
