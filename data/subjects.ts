export interface Subject {
  id: string;
  name: string;
  icon: string;
  questions: number;
  colorKey: 'subjectMath' | 'subjectPhysics' | 'subjectChemistry' | 'subjectEnglish';
}

export const SUBJECTS: Subject[] = [
  {
    id: 'math',
    name: 'Toán học',
    icon: '1234',
    questions: 120,
    colorKey: 'subjectMath',
  },
  {
    id: 'physics',
    name: 'Vật lý',
    icon: '⚛',
    questions: 100,
    colorKey: 'subjectPhysics',
  },
  {
    id: 'chemistry',
    name: 'Hóa học',
    icon: '🧪',
    questions: 90,
    colorKey: 'subjectChemistry',
  },
  {
    id: 'english',
    name: 'Tiếng Anh',
    icon: 'GB',
    questions: 150,
    colorKey: 'subjectEnglish',
  },
];

export const ALL_SUBJECTS: Subject[] = [
  ...SUBJECTS,
  { id: 'literature', name: 'Văn học', icon: '📚', questions: 80, colorKey: 'subjectMath' },
  { id: 'history', name: 'Lịch sử', icon: '🏛', questions: 70, colorKey: 'subjectPhysics' },
];
