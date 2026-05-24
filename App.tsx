import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { BottomNav, TabId } from './components/BottomNav';
import { ScreenBackground } from './components/ScreenBackground';
import { HomeScreen } from './screens/HomeScreen';
import { MoreScreen } from './screens/MoreScreen';
import { ProfileScreen } from './screens/ProfileScreen';
import { StatsScreen } from './screens/StatsScreen';
import { SubjectsScreen } from './screens/SubjectsScreen';
import { ThemeProvider, useTheme } from './theme/ThemeContext';

function AppContent() {
  const { isDark } = useTheme();
  const [activeTab, setActiveTab] = useState<TabId>('home');

  const renderScreen = () => {
    switch (activeTab) {
      case 'stats':
        return <StatsScreen />;
      case 'subjects':
        return <SubjectsScreen />;
      case 'home':
        return <HomeScreen />;
      case 'profile':
        return <ProfileScreen />;
      case 'more':
        return <MoreScreen />;
      default:
        return <HomeScreen />;
    }
  };

  return (
    <View style={styles.root}>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <ScreenBackground>
        <View style={styles.screen}>{renderScreen()}</View>
        <BottomNav active={activeTab} onChange={setActiveTab} />
      </ScreenBackground>
    </View>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  screen: {
    flex: 1,
  },
});
