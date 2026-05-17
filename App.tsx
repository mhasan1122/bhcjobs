import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from './src/context/ThemeContext';
import { AuthProvider } from './src/context/AuthContext';
import { SuccessPopupProvider } from './src/context/SuccessPopupContext';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <SuccessPopupProvider>
          <AuthProvider>
            <AppNavigator />
          </AuthProvider>
        </SuccessPopupProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
