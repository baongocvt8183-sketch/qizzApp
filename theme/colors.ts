export type ThemeMode = 'light' | 'dark';

export interface AppColors {
  background: string;
  backgroundGradientEnd: string;
  foreground: string;
  muted: string;
  card: string;
  cardBorder: string;
  glass: string;
  glassBorder: string;
  glassStrong: string;
  primary: string;
  primaryForeground: string;
  inputBg: string;
  tabBar: string;
  tabBarBorder: string;
  accent: string;
  destructive: string;
  subjectMath: string;
  subjectPhysics: string;
  subjectChemistry: string;
  subjectEnglish: string;
  subjectLiterature: string;
  subjectHistory: string;
}

export const lightColors: AppColors = {
  background: '#f2f2f2',
  backgroundGradientEnd: '#ffffff',
  foreground: '#0a0a0a',
  muted: '#6b6b6b',
  card: 'rgba(255, 255, 255, 0.85)',
  cardBorder: 'rgba(0, 0, 0, 0.08)',
  glass: 'rgba(255, 255, 255, 0.55)',
  glassBorder: 'rgba(255, 255, 255, 0.9)',
  glassStrong: 'rgba(255, 255, 255, 0.72)',
  primary: '#7c3aed',
  primaryForeground: '#ffffff',
  inputBg: 'rgba(255, 255, 255, 0.6)',
  tabBar: 'rgba(255, 255, 255, 0.88)',
  tabBarBorder: 'rgba(0, 0, 0, 0.06)',
  accent: '#06b6d4',
  destructive: '#dc2626',
  subjectMath: '#8b5cf6',
  subjectPhysics: '#0ea5e9',
  subjectChemistry: '#10b981',
  subjectEnglish: '#f43f5e',
  subjectLiterature: '#f97316',
  subjectHistory: '#6366f1',
};

export const darkColors: AppColors = {
  background: '#0a0a0a',
  backgroundGradientEnd: '#1a1a1a',
  foreground: '#fafafa',
  muted: '#a3a3a3',
  card: 'rgba(255, 255, 255, 0.08)',
  cardBorder: 'rgba(255, 255, 255, 0.12)',
  glass: 'rgba(255, 255, 255, 0.1)',
  glassBorder: 'rgba(255, 255, 255, 0.18)',
  glassStrong: 'rgba(255, 255, 255, 0.14)',
  primary: '#ffffff',
  primaryForeground: '#0a0a0a',
  inputBg: 'rgba(255, 255, 255, 0.08)',
  tabBar: 'rgba(20, 20, 20, 0.92)',
  tabBarBorder: 'rgba(255, 255, 255, 0.08)',
  accent: '#22d3ee',
  destructive: '#f87171',
  subjectMath: '#8b5cf6',
  subjectPhysics: '#0ea5e9',
  subjectChemistry: '#10b981',
  subjectEnglish: '#f43f5e',
  subjectLiterature: '#f97316',
  subjectHistory: '#6366f1',
};

export function getColors(mode: ThemeMode): AppColors {
  return mode === 'dark' ? darkColors : lightColors;
}
