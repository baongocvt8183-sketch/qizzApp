import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import React from 'react';
import {
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useTheme } from '../theme/ThemeContext';

export type TabId = 'stats' | 'subjects' | 'home' | 'profile' | 'more';

interface TabItem {
  id: TabId;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  center?: boolean;
}

const TABS: TabItem[] = [
  { id: 'stats', label: 'Thống kê', icon: 'bar-chart-outline' },
  { id: 'subjects', label: 'Môn học', icon: 'book-outline' },
  { id: 'home', label: 'Trang chủ', icon: 'home', center: true },
  { id: 'profile', label: 'Hồ sơ', icon: 'person-outline' },
  { id: 'more', label: 'Thêm', icon: 'add-circle-outline' },
];

interface BottomNavProps {
  active: TabId;
  onChange: (tab: TabId) => void;
}

export function BottomNav({ active, onChange }: BottomNavProps) {
  const { colors, isDark } = useTheme();
  const insets = useSafeAreaInsets();

  const bar = (
    <View
      style={[
        styles.bar,
        {
          paddingBottom: Math.max(insets.bottom, 12),
          backgroundColor:
            Platform.OS === 'web' ? colors.tabBar : 'transparent',
          borderTopColor: colors.tabBarBorder,
        },
      ]}
    >
      {TABS.map((tab) => {
        const isActive = active === tab.id;

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
                    borderColor: colors.glassBorder,
                  },
                ]}
              >
                <Ionicons
                  name={tab.icon}
                  size={26}
                  color={colors.primaryForeground}
                />
              </View>
              <Text
                style={[
                  styles.label,
                  { color: isActive ? colors.foreground : colors.muted },
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
            <Ionicons
              name={tab.icon}
              size={22}
              color={isActive ? colors.foreground : colors.muted}
            />
            <Text
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
  );

  if (Platform.OS === 'web') {
    return <View style={styles.container}>{bar}</View>;
  }

  return (
    <View style={styles.container}>
      <BlurView
        intensity={isDark ? 50 : 80}
        tint={isDark ? 'dark' : 'light'}
        style={StyleSheet.absoluteFill}
      />
      <View
        style={[
          StyleSheet.absoluteFill,
          { backgroundColor: colors.tabBar },
        ]}
      />
      {bar}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    borderTopWidth: 1,
    overflow: 'hidden',
  },
  bar: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-around',
    paddingTop: 8,
    paddingHorizontal: 8,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
    paddingBottom: 4,
  },
  centerWrap: {
    flex: 1,
    alignItems: 'center',
    marginTop: -28,
  },
  centerButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  label: {
    fontSize: 10,
    fontWeight: '500',
  },
  labelActive: {
    fontWeight: '700',
  },
});
