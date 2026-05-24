import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { GlassCard } from '../components/GlassCard';
import { ALL_SUBJECTS } from '../data/subjects';
import { useTheme } from '../theme/ThemeContext';

export function SubjectsScreen() {
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
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.foreground }]}>
          Môn học
        </Text>
        <Pressable
          style={[styles.addBtn, { backgroundColor: colors.primary }]}
        >
          <Ionicons
            name="cloud-upload-outline"
            size={18}
            color={colors.primaryForeground}
          />
          <Text
            style={[styles.addBtnText, { color: colors.primaryForeground }]}
          >
            Thêm PDF
          </Text>
        </Pressable>
      </View>

      <Text style={[styles.sectionLabel, { color: colors.muted }]}>
        MÔN HỌC CHÍNH
      </Text>

      {ALL_SUBJECTS.map((subject) => {
        const progress = Math.round(
          (subject.questions * 0.35) / subject.questions * 100,
        );
        return (
          <Pressable key={subject.id} style={styles.card}>
            <GlassCard padding={16}>
              <View style={styles.row}>
                <View
                  style={[
                    styles.icon,
                    { backgroundColor: colors[subject.colorKey] },
                  ]}
                >
                  <Text style={styles.iconText}>{subject.icon}</Text>
                </View>
                <View style={styles.info}>
                  <View style={styles.infoTop}>
                    <Text
                      style={[styles.name, { color: colors.foreground }]}
                    >
                      {subject.name}
                    </Text>
                    <Ionicons
                      name="chevron-forward"
                      size={20}
                      color={colors.muted}
                    />
                  </View>
                  <Text style={[styles.count, { color: colors.muted }]}>
                    {Math.round(subject.questions * 0.35)}/
                    {subject.questions} câu
                  </Text>
                  <View
                    style={[
                      styles.track,
                      { backgroundColor: colors.glassStrong },
                    ]}
                  >
                    <View
                      style={[
                        styles.fill,
                        {
                          width: `${progress}%`,
                          backgroundColor: colors.primary,
                        },
                      ]}
                    />
                  </View>
                </View>
              </View>
            </GlassCard>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: { flex: 1 },
  content: { paddingHorizontal: 20 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: { fontSize: 26, fontWeight: '800' },
  addBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 14,
  },
  addBtnText: { fontSize: 13, fontWeight: '700' },
  sectionLabel: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.8,
    marginBottom: 12,
  },
  card: { marginBottom: 12 },
  row: { flexDirection: 'row', gap: 14 },
  icon: {
    width: 56,
    height: 56,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconText: { fontSize: 22, color: '#fff' },
  info: { flex: 1 },
  infoTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  name: { fontSize: 16, fontWeight: '700' },
  count: { fontSize: 13, marginBottom: 10 },
  track: { height: 6, borderRadius: 3, overflow: 'hidden' },
  fill: { height: '100%', borderRadius: 3 },
});
