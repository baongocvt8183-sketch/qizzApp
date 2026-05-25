import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import React from 'react';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useTheme } from '../theme/ThemeContext';

export type TabId = 'stats' | 'subjects' | 'home' | 'profile' | 'more';

interface TabItem {
  id: TabId;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
  center?: boolean;
}

const TABS: TabItem[] = [
  { id: 'stats', label: 'Thống kê', icon: 'bar-chart-outline', color: '#38bdf8' },
  { id: 'subjects', label: 'Môn học', icon: 'book-outline', color: '#a78bfa' },
  { id: 'home', label: 'Trang chủ', icon: 'home', color: '#111827', center: true },
  { id: 'profile', label: 'Hồ sơ', icon: 'person-outline', color: '#34d399' },
  { id: 'more', label: 'Thêm', icon: 'add-circle-outline', color: '#f472b6' },
];

interface BottomNavProps {
  active: TabId;
  onChange: (tab: TabId) => void;
}

export function BottomNav({ active, onChange }: BottomNavProps) {
  const { colors, isDark } = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <View pointerEvents="box-none" style={styles.container}>
      <View
        style={[
          styles.shell,
          {
            bottom: Math.max(insets.bottom, 10),
            borderColor: colors.glassBorder,
          },
        ]}
      >
        {Platform.OS !== 'web' && (
          <BlurView
            intensity={isDark ? 55 : 80}
            tint={isDark ? 'dark' : 'light'}
            style={StyleSheet.absoluteFill}
          />
        )}
        <View style={[StyleSheet.absoluteFill, { backgroundColor: colors.tabBar }]} />
        <View style={styles.bar}>
          {TABS.map((tab) => {
            const isActive = active === tab.id;
            const iconColor = isActive ? tab.color : colors.muted;

            if (tab.center) {
              return (
                <Pressable
                  key={tab.id}
                  onPress={() => onChange(tab.id)}
                  style={styles.centerWrap}
                  accessibilityRole="button"
                  accessibilityLabel={tab.label}
                >
                  <View
                    style={[
                      styles.centerButton,
                      {
                        backgroundColor: colors.primary,
                        borderColor: colors.background,
                      },
                    ]}
                  >
                    <Ionicons
                      name={tab.icon}
                      size={28}
                      color={colors.primaryForeground}
                    />
                  </View>
                  <Text
                    numberOfLines={1}
                    style={[
                      styles.label,
                      { color: isActive ? colors.foreground : colors.muted },
                      isActive && styles.labelActive,
                    ]}
                  >
                    {tab.label}
                  </Text>
                </Pressable>
              );
            }

            return (
              <Pressable
                key={tab.id}
                onPress={() => onChange(tab.id)}
                style={styles.tab}
                accessibilityRole="button"
                accessibilityLabel={tab.label}
              >
                <Ionicons name={tab.icon} size={23} color={iconColor} />
                <Text
                  numberOfLines={1}
                  style={[
                    styles.label,
                    { color: isActive ? colors.foreground : colors.muted },
                    isActive && styles.labelActive,
                  ]}
                >
                  {tab.label}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    justifyContent: 'flex-end',
  },
  shell: {
    position: 'absolute',
    left: 4,
    right: 4,
    minHeight: 62,
    borderRadius: 34,
    borderWidth: 1,
    overflow: 'visible',
  },
  bar: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-around',
    minHeight: 62,
    paddingHorizontal: 10,
    paddingTop: 8,
    paddingBottom: 8,
    overflow: 'visible',
  },
  tab: {
    flex: 1,
    minWidth: 0,
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 3,
  },
  centerWrap: {
    flex: 1,
    minWidth: 0,
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 2,
  },
  centerButton: {
    width: 58,
    height: 58,
    borderRadius: 29,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 5,
    marginTop: -30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.28,
    shadowRadius: 12,
    elevation: 10,
  },
  label: {
    maxWidth: 72,
    fontSize: 10,
    fontWeight: '600',
    textAlign: 'center',
  },
  labelActive: {
    fontWeight: '800',
  },
});
