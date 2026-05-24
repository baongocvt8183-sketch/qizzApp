# QuizMaster (React Native)

Mobile quiz app based on the Figma **Optimize UI/UX for Quiz App** design, rebuilt in **React Native (Expo)** with:

- **Monochrome UI** — black & white palette instead of purple gradients
- **Light & dark mode** — toggle under **Thêm** (persisted with AsyncStorage)
- **Glassmorphism** — frosted cards via `expo-blur`
- **Bottom navigation** — Thống kê, Môn học, elevated Trang chủ, Hồ sơ, Thêm

## Run

```bash
cd quizmaster
npm install
npm start
```

Then press `a` for Android, `i` for iOS, or scan the QR code with **Expo Go**.

## Project structure

```
quizmaster/
├── App.tsx                 # Root + tab routing
├── components/
│   ├── BottomNav.tsx       # 5-tab bar with center home FAB
│   ├── GlassCard.tsx       # Blur + glass panels
│   ├── InputField.tsx
│   └── ScreenBackground.tsx
├── screens/
│   ├── HomeScreen.tsx      # Login + challenge + quick practice (Figma demo)
│   ├── StatsScreen.tsx
│   ├── SubjectsScreen.tsx
│   ├── ProfileScreen.tsx
│   └── MoreScreen.tsx      # Theme toggle
└── theme/
    ├── colors.ts
    └── ThemeContext.tsx
```

## Design notes

The home screen matches the Figma illustration: QuizMaster header, đăng nhập/đăng ký, thử thách hôm nay, and luyện tập nhanh grid. Subject accent colors are neutral grays to stay on-brand with the monochrome theme.
