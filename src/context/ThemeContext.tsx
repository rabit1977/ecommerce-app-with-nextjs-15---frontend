// src/context/ThemeContext.tsx
'use client';

import React, { createContext, ReactNode, useContext, useState } from 'react';
import { ThemeClasses } from '@/lib/theme'; // Assuming ThemeClasses is defined in theme.ts

// Define the shape of the theme context
interface ThemeContextType {
  theme: { mode: string; scheme: string };
  toggleThemeMode: () => void;
  setThemeScheme: (scheme: string) => void;
}

// Create the ThemeContext
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// ThemeProvider component to wrap your application
export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  // State for theme mode and scheme
  const [theme, setTheme] = useState({ mode: 'light', scheme: 'blue' });

  // Function to toggle between light and dark mode
  const toggleThemeMode = () =>
    setTheme((prev) => ({
      ...prev,
      mode: prev.mode === 'light' ? 'dark' : 'light',
    }));

  // Function to set the color scheme
  const setThemeScheme = (scheme: string) =>
    setTheme((prev) => ({ ...prev, scheme }));

  // Value object to be provided by the context
  const value: ThemeContextType = {
    theme,
    toggleThemeMode,
    setThemeScheme,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

// Custom hook to consume the theme context
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
