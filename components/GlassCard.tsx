import { BlurView } from 'expo-blur';
import React from 'react';
import { Platform, StyleSheet, View, ViewStyle } from 'react-native';

import { useTheme } from '../theme/ThemeContext';

interface GlassCardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  strong?: boolean;
  padding?: number;
}

export function GlassCard({
  children,
  style,
  strong = false,
  padding = 16,
}: GlassCardProps) {
  const { colors, isDark } = useTheme();
  const tint = isDark ? 'dark' : 'light';
  const bg = strong ? colors.glassStrong : colors.glass;

  const content = (
    <View
      style={[
        styles.inner,
        {
          padding,
          backgroundColor: Platform.OS === 'web' ? bg : 'transparent',
          borderColor: colors.glassBorder,
        },
        style,
      ]}
    >
      {children}
    </View>
  );

  if (Platform.OS === 'web') {
    return (
      <View style={[styles.wrapper, { borderColor: colors.glassBorder }]}>
        {content}
      </View>
    );
  }

  return (
    <View style={[styles.wrapper, { borderColor: colors.glassBorder }]}>
      <BlurView intensity={isDark ? 40 : 60} tint={tint} style={StyleSheet.absoluteFill} />
      <View style={[StyleSheet.absoluteFill, { backgroundColor: bg }]} />
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 20,
    borderWidth: 1,
    overflow: 'hidden',
  },
  inner: {
    borderRadius: 20,
  },
});
