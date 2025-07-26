'use client';
import { useApp } from '@/context/AppContext';
import { ReactNode, useEffect } from 'react';
import Footer from './Footer';
import Header from './Header';
import Toast from './Toast';
import ScrollToTopButton from './ScrollToTopButton';

export default function ClientLayout({ children }: { children: ReactNode }) {
  const { theme } = useApp();

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
      <main className='pb-12'>{children}</main>
      <Footer />
      <Toast />
      <ScrollToTopButton />
    </div>
  );
}
