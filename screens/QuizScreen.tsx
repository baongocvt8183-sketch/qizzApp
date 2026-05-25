import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Subject } from '../data/subjects';
import { useTheme } from '../theme/ThemeContext';

interface Question {
  prompt: string;
  options: string[];
  answer: number;
}

const QUESTION_BANK: Record<string, Question[]> = {
  math: [
    {
      prompt: 'Phương trình x² - 5x + 6 = 0 có nghiệm là?',
      options: ['x = 1 và x = 6', 'x = 2 và x = 3', 'x = -2 và x = -3', 'x = 1 và x = 5'],
      answer: 1,
    },
    {
      prompt: 'Đạo hàm của hàm số y = x³ là gì?',
      options: ['3x²', 'x²', '3x', 'x³/3'],
      answer: 0,
    },
    {
      prompt: 'Giá trị của log₁₀(100) bằng bao nhiêu?',
      options: ['1', '2', '10', '100'],
      answer: 1,
    },
    {
      prompt: 'Tổng các góc trong một tam giác bằng bao nhiêu?',
      options: ['90°', '120°', '180°', '360°'],
      answer: 2,
    },
    {
      prompt: 'Nếu 2x + 4 = 10 thì x bằng?',
      options: ['2', '3', '4', '5'],
      answer: 1,
    },
  ],
};

const DEFAULT_QUESTIONS: Question[] = [
  {
    prompt: 'Đơn vị đo cường độ dòng điện là gì?',
    options: ['Volt', 'Ampere', 'Newton', 'Joule'],
    answer: 1,
  },
  {
    prompt: 'Nước có công thức hóa học là gì?',
    options: ['CO₂', 'NaCl', 'H₂O', 'O₂'],
    answer: 2,
  },
  {
    prompt: 'Từ nào có nghĩa là "practice"?',
    options: ['Luyện tập', 'Nghỉ ngơi', 'Kết thúc', 'Bắt đầu'],
    answer: 0,
  },
  {
    prompt: 'Một bài trắc nghiệm tốt nên làm gì trước?',
    options: ['Đọc kỹ câu hỏi', 'Chọn ngẫu nhiên', 'Bỏ qua toàn bộ', 'Tắt đồng hồ'],
    answer: 0,
  },
  {
    prompt: 'Khi gặp câu khó, chiến lược hợp lý là gì?',
    options: ['Dừng bài thi', 'Đánh dấu và quay lại', 'Xóa đáp án đúng', 'Không đọc đề'],
    answer: 1,
  },
];

interface QuizScreenProps {
  subject: Subject;
  onBack: () => void;
}

export function QuizScreen({ subject, onBack }: QuizScreenProps) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const questions = useMemo(
    () => QUESTION_BANK[subject.id] ?? DEFAULT_QUESTIONS,
    [subject.id],
  );
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);
  const [seconds, setSeconds] = useState(0);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    if (finished) {
      return undefined;
    }
    const timer = setInterval(() => setSeconds((value) => value + 1), 1000);
    return () => clearInterval(timer);
  }, [finished]);

  const current = questions[index];
  const progress = (index + 1) / questions.length;
  const correct = answers.filter((answer, i) => answer === questions[i].answer).length;

  const next = () => {
    if (selected === null) {
      return;
    }
    const nextAnswers = [...answers, selected];
    setAnswers(nextAnswers);
    setSelected(null);

    if (index === questions.length - 1) {
      setFinished(true);
      return;
    }

    setIndex((value) => value + 1);
  };

  if (finished) {
    const finalCorrect = answers.filter((answer, i) => answer === questions[i].answer).length;
    const percent = Math.round((finalCorrect / questions.length) * 100);

    return (
      <View style={[styles.resultRoot, { paddingTop: insets.top + 24, paddingHorizontal: 22 }]}>
        <Pressable onPress={onBack} style={[styles.backBtn, { borderColor: colors.glassBorder }]}>
          <Ionicons name="arrow-back" size={22} color={colors.foreground} />
        </Pressable>
        <View style={styles.resultBody}>
          <View style={[styles.resultIcon, { backgroundColor: colors[subject.colorKey] }]}>
            <Ionicons name="trophy-outline" size={42} color="#fff" />
          </View>
          <Text style={[styles.resultTitle, { color: colors.foreground }]}>Hoàn thành</Text>
          <Text style={[styles.resultSub, { color: colors.muted }]}>
            Bạn đúng {finalCorrect}/{questions.length} câu trong {formatTime(seconds)}
          </Text>
          <Text style={[styles.resultScore, { color: colors.foreground }]}>{percent}%</Text>
          <Pressable style={[styles.resultButton, { backgroundColor: colors.primary }]} onPress={onBack}>
            <Text style={[styles.resultButtonText, { color: colors.primaryForeground }]}>
              Về trang chủ
            </Text>
          </Pressable>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.root}>
      <View
        style={[
          styles.topBar,
          {
            paddingTop: insets.top + 12,
            backgroundColor: colors.glass,
            borderBottomColor: colors.glassBorder,
          },
        ]}
      >
        <View style={styles.quizHeader}>
          <Pressable onPress={onBack} style={[styles.backBtn, { borderColor: colors.glassBorder }]}>
            <Ionicons name="arrow-back" size={22} color={colors.foreground} />
          </Pressable>
          <Text style={[styles.quizTitle, { color: colors.foreground }]}>{subject.name}</Text>
          <View style={[styles.timer, { backgroundColor: colors.glassStrong }]}>
            <Ionicons name="time-outline" size={14} color={colors.foreground} />
            <Text style={[styles.timerText, { color: colors.foreground }]}>
              {formatTime(seconds)}
            </Text>
          </View>
        </View>
        <View style={styles.progressRow}>
          <View style={[styles.progressTrack, { backgroundColor: colors.glassStrong }]}>
            <View
              style={[
                styles.progressFill,
                { width: `${progress * 100}%`, backgroundColor: colors.primary },
              ]}
            />
          </View>
          <Text style={[styles.progressText, { color: colors.foreground }]}>
            {index + 1}/{questions.length}
          </Text>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={[
          styles.quizContent,
          { paddingBottom: insets.bottom + 118 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <Text style={[styles.questionBadge, { color: colors.primaryForeground, backgroundColor: colors.primary }]}>
          Câu {index + 1}
        </Text>
        <Text style={[styles.question, { color: colors.foreground }]}>{current.prompt}</Text>

        <View style={styles.options}>
          {current.options.map((option, optionIndex) => {
            const active = selected === optionIndex;
            return (
              <Pressable
                key={option}
                onPress={() => setSelected(optionIndex)}
                style={[
                  styles.option,
                  {
                    borderColor: active ? colors.primary : colors.glassBorder,
                    backgroundColor: active ? colors.glassStrong : colors.glass,
                  },
                ]}
              >
                <View
                  style={[
                    styles.radio,
                    {
                      borderColor: active ? colors.primary : colors.glassBorder,
                      backgroundColor: active ? colors.primary : 'transparent',
                    },
                  ]}
                />
                <Text style={[styles.optionText, { color: colors.foreground }]}>{option}</Text>
              </Pressable>
            );
          })}
        </View>
      </ScrollView>

      <View
        style={[
          styles.footer,
          {
            paddingBottom: insets.bottom + 16,
            backgroundColor: colors.background,
            borderTopColor: colors.glassBorder,
          },
        ]}
      >
        <Text style={[styles.liveScore, { color: colors.muted }]}>
          Đúng tạm tính: {correct}/{answers.length}
        </Text>
        <Pressable
          onPress={next}
          disabled={selected === null}
          style={[
            styles.nextButton,
            {
              backgroundColor: selected === null ? colors.glassStrong : colors.primary,
              opacity: selected === null ? 0.55 : 1,
            },
          ]}
        >
          <Text style={[styles.nextButtonText, { color: colors.primaryForeground }]}>
            {index === questions.length - 1 ? 'Nộp bài' : 'Câu sau'}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

function formatTime(total: number) {
  const minutes = Math.floor(total / 60).toString().padStart(2, '0');
  const seconds = (total % 60).toString().padStart(2, '0');
  return `${minutes}:${seconds}`;
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  topBar: {
    paddingHorizontal: 18,
    paddingBottom: 18,
    borderBottomWidth: 1,
  },
  quizHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: 16,
  },
  backBtn: {
    width: 42,
    height: 42,
    borderRadius: 21,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quizTitle: { flex: 1, textAlign: 'center', fontSize: 15, fontWeight: '900' },
  timer: {
    minWidth: 78,
    height: 34,
    borderRadius: 17,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  timerText: { fontSize: 13, fontWeight: '900' },
  progressRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  progressTrack: { flex: 1, height: 6, borderRadius: 3, overflow: 'hidden' },
  progressFill: { height: '100%', borderRadius: 3 },
  progressText: { width: 34, fontSize: 12, fontWeight: '900', textAlign: 'right' },
  quizContent: { paddingHorizontal: 22, paddingTop: 22 },
  questionBadge: {
    alignSelf: 'flex-start',
    overflow: 'hidden',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 7,
    fontSize: 12,
    fontWeight: '900',
    marginBottom: 20,
  },
  question: { fontSize: 19, lineHeight: 30, fontWeight: '900', marginBottom: 26 },
  options: { gap: 14 },
  option: {
    minHeight: 56,
    borderRadius: 16,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  radio: { width: 24, height: 24, borderRadius: 12, borderWidth: 1 },
  optionText: { flex: 1, fontSize: 15, fontWeight: '800', lineHeight: 22 },
  footer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 18,
    paddingTop: 14,
    borderTopWidth: 1,
  },
  liveScore: { textAlign: 'center', fontSize: 12, fontWeight: '700', marginBottom: 10 },
  nextButton: {
    borderRadius: 18,
    paddingVertical: 16,
    alignItems: 'center',
  },
  nextButtonText: { fontSize: 15, fontWeight: '900' },
  resultRoot: { flex: 1 },
  resultBody: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 14 },
  resultIcon: {
    width: 86,
    height: 86,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  resultTitle: { fontSize: 28, fontWeight: '900' },
  resultSub: { fontSize: 15, textAlign: 'center' },
  resultScore: { fontSize: 54, fontWeight: '900' },
  resultButton: {
    marginTop: 12,
    borderRadius: 18,
    paddingHorizontal: 34,
    paddingVertical: 16,
  },
  resultButtonText: { fontSize: 15, fontWeight: '900' },
});
