'use client';
import { ReactNode } from 'react';
import Footer from './Footer';
import Header from './Header';
import ScrollToTopButton from './ScrollToTopButton';
import Toast from './Toast';
import { useApp } from '@/context/AppContext';

export default function ClientLayout({ children }: { children: ReactNode }) {
  const { theme } = useApp();

  return (
    <div className={theme.mode}>
      <div className='bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen font-sans transition-colors duration-300'>
        <Header />
        <main className='pb-12'>{children}</main>
        <Footer />
        <Toast />
        <ScrollToTopButton />
      </div>
    </div>
  );
}
