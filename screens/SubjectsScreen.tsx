import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { GlassCard } from '../components/GlassCard';
import { ALL_SUBJECTS, Subject } from '../data/subjects';
import { useTheme } from '../theme/ThemeContext';

interface SubjectsScreenProps {
  onStartQuiz: (subject: Subject) => void;
}

export function SubjectsScreen({ onStartQuiz }: SubjectsScreenProps) {
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
      <Text style={[styles.title, { color: colors.foreground }]}>Môn học</Text>

      <Pressable style={styles.upload}>
        <GlassCard padding={18}>
          <View style={styles.uploadRow}>
            <View style={[styles.uploadIcon, { backgroundColor: colors.glassStrong }]}>
              <Ionicons name="add" size={30} color={colors.foreground} />
            </View>
            <View style={styles.uploadText}>
              <Text style={[styles.uploadTitle, { color: colors.foreground }]}>
                Thêm từ tài liệu cá nhân
              </Text>
              <Text style={[styles.uploadSub, { color: colors.muted }]}>
                PDF, Word, ảnh chụp tài liệu của bạn
              </Text>
            </View>
          </View>
        </GlassCard>
      </Pressable>

      <Text style={[styles.sectionLabel, { color: colors.muted }]}>MÔN HỌC CHÍNH</Text>

      {ALL_SUBJECTS.map((subject, index) => {
        const answered = Math.round(subject.questions * [0.38, 0.3, 0.28, 0.4, 0.25, 0.22][index]);
        const progress = Math.round((answered / subject.questions) * 100);

        return (
          <Pressable
            key={subject.id}
            style={styles.card}
            onPress={() => onStartQuiz(subject)}
          >
            <GlassCard padding={16}>
              <View style={styles.row}>
                <View style={[styles.icon, { backgroundColor: colors[subject.colorKey] }]}>
                  <Text style={styles.iconText}>{subject.icon}</Text>
                </View>
                <View style={styles.info}>
                  <View style={styles.infoTop}>
                    <Text style={[styles.name, { color: colors.foreground }]}>
                      {subject.name}
                    </Text>
                    <Ionicons name="chevron-forward" size={20} color={colors.muted} />
                  </View>
                  <Text style={[styles.count, { color: colors.muted }]}>
                    {answered}/{subject.questions} câu
                  </Text>
                  <View style={[styles.track, { backgroundColor: colors.glassStrong }]}>
                    <View
                      style={[
                        styles.fill,
                        { width: `${progress}%`, backgroundColor: colors[subject.colorKey] },
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
  title: { fontSize: 28, fontWeight: '900', marginBottom: 24 },
  upload: { marginBottom: 18 },
  uploadRow: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  uploadIcon: {
    width: 54,
    height: 54,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadText: { flex: 1, minWidth: 0 },
  uploadTitle: { fontSize: 15, fontWeight: '900' },
  uploadSub: { fontSize: 12, marginTop: 3 },
  sectionLabel: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.8,
    marginBottom: 12,
  },
  card: { marginBottom: 12 },
  row: { flexDirection: 'row', gap: 14, alignItems: 'center' },
  icon: {
    width: 58,
    height: 58,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconText: { fontSize: 22, color: '#fff', fontWeight: '900' },
  info: { flex: 1, minWidth: 0 },
  infoTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  name: { fontSize: 16, fontWeight: '900' },
  count: { fontSize: 13, marginBottom: 10 },
  track: { height: 5, borderRadius: 3, overflow: 'hidden' },
  fill: { height: '100%', borderRadius: 3 },
});
