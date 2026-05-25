import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { BottomNav, TabId } from './components/BottomNav';
import { ScreenBackground } from './components/ScreenBackground';
import { Subject } from './data/subjects';
import { HomeScreen, UserProfile } from './screens/HomeScreen';
import { MoreScreen } from './screens/MoreScreen';
import { ProfileDetail, ProfileScreen } from './screens/ProfileScreen';
import { QuizScreen } from './screens/QuizScreen';
import { StatsScreen } from './screens/StatsScreen';
import { SubjectsScreen } from './screens/SubjectsScreen';
import { ThemeProvider, useTheme } from './theme/ThemeContext';

type AppRoute =
  | { name: 'tabs' }
  | { name: 'quiz'; subject: Subject }
  | { name: 'profile-detail'; detail: ProfileDetail }
  | { name: 'more-detail'; detail: 'privacy' | 'about' | 'help' | 'clear-data' };

const GUEST: UserProfile = {
  name: 'Khách',
  email: 'guest@quizmaster.vn',
  grade: '12',
  phone: '',
  school: '',
};

function AppContent() {
  const { isDark } = useTheme();
  const [activeTab, setActiveTab] = useState<TabId>('home');
  const [route, setRoute] = useState<AppRoute>({ name: 'tabs' });
  const [user, setUser] = useState<UserProfile | null>(null);

  const openTab = (tab: TabId) => {
    setActiveTab(tab);
    setRoute({ name: 'tabs' });
  };

  const startQuiz = (subject: Subject) => setRoute({ name: 'quiz', subject });
  const backToTabs = () => setRoute({ name: 'tabs' });

  const renderTabs = () => {
    switch (activeTab) {
      case 'stats':
        return <StatsScreen />;
      case 'subjects':
        return <SubjectsScreen onStartQuiz={startQuiz} />;
      case 'home':
        return (
          <HomeScreen
            user={user}
            onLogin={setUser}
            onGuest={() => setUser(GUEST)}
            onStartQuiz={startQuiz}
            onSeeSubjects={() => openTab('subjects')}
          />
        );
      case 'profile':
        return (
          <ProfileScreen
            user={user ?? GUEST}
            onOpenDetail={(detail) => setRoute({ name: 'profile-detail', detail })}
            onLogout={() => {
              setUser(null);
              openTab('home');
            }}
          />
        );
      case 'more':
        return (
          <MoreScreen
            onOpenDetail={(detail) => setRoute({ name: 'more-detail', detail })}
          />
        );
      default:
        return null;
    }
  };

  const renderScreen = () => {
    if (route.name === 'quiz') {
      return <QuizScreen subject={route.subject} onBack={backToTabs} />;
    }

    if (route.name === 'profile-detail') {
      return (
        <ProfileDetail
          detail={route.detail}
          user={user ?? GUEST}
          onBack={backToTabs}
          onSaveUser={setUser}
        />
      );
    }

    if (route.name === 'more-detail') {
      return <MoreScreen detail={route.detail} onBack={backToTabs} />;
    }

    return renderTabs();
  };

  return (
    <View style={styles.root}>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <ScreenBackground>
        <View style={styles.screen}>{renderScreen()}</View>
        {route.name === 'tabs' && <BottomNav active={activeTab} onChange={openTab} />}
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
