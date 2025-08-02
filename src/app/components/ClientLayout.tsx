// src/app/components/ClientLayout.tsx
'use client';
import { useTheme } from '@/context/ThemeContext'; // Use useTheme
import { ReactNode, useEffect } from 'react';
import Footer from './Footer';
import Header from './Header';
import Toast from './Toast';
import ScrollToTopButton from './ScrollToTopButton';

export default function ClientLayout({ children }: { children: ReactNode }) {
  const { theme } = useTheme(); // Use useTheme here

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme.mode === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme.mode]);

  return (
    <div className='bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen font-sans transition-colors duration-300'>
      <Header />
      <main>{children}</main>
      <Footer />
      <Toast />
      <ScrollToTopButton />
    </div>
  );
}