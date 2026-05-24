import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import { useTheme } from '../theme/ThemeContext';

export function ScreenBackground({ children }: { children: React.ReactNode }) {
  const { colors, isDark } = useTheme();

  return (
    <View style={styles.root}>
      <LinearGradient
        colors={[colors.background, colors.backgroundGradientEnd]}
        style={StyleSheet.absoluteFill}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />
      <View
        style={[
          styles.blob,
          styles.blobTop,
          { backgroundColor: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.04)' },
        ]}
      />
      <View
        style={[
          styles.blob,
          styles.blobBottom,
          { backgroundColor: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.03)' },
        ]}
      />
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  blob: {
    position: 'absolute',
    borderRadius: 999,
  },
  blobTop: {
    width: 280,
    height: 280,
    top: -80,
    right: -60,
  },
  blobBottom: {
    width: 220,
    height: 220,
    bottom: 120,
    left: -40,
  },
});
