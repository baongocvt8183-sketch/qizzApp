import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
  Pressable,
  StyleSheet,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';

import { useTheme } from '../theme/ThemeContext';
import { GlassCard } from './GlassCard';

interface InputFieldProps extends TextInputProps {
  icon: keyof typeof Ionicons.glyphMap;
  secureToggle?: boolean;
  showSecure?: boolean;
  onToggleSecure?: () => void;
}

export function InputField({
  icon,
  secureToggle,
  showSecure,
  onToggleSecure,
  style,
  ...props
}: InputFieldProps) {
  const { colors } = useTheme();

  return (
    <GlassCard padding={0} style={styles.field}>
      <View style={styles.row}>
        <Ionicons
          name={icon}
          size={20}
          color={colors.muted}
          style={styles.leading}
        />
        <TextInput
          placeholderTextColor={colors.muted}
          style={[styles.input, { color: colors.foreground }, style]}
          {...props}
        />
        {secureToggle && (
          <Pressable onPress={onToggleSecure} style={styles.trailing}>
            <Ionicons
              name={showSecure ? 'eye-off-outline' : 'eye-outline'}
              size={20}
              color={colors.muted}
            />
          </Pressable>
        )}
      </View>
    </GlassCard>
  );
}

const styles = StyleSheet.create({
  field: {
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 52,
    paddingHorizontal: 16,
  },
  leading: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 15,
    paddingVertical: 14,
  },
  trailing: {
    padding: 4,
    marginLeft: 8,
  },
});
