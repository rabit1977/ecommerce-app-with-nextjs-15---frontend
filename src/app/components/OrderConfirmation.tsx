'use client';
import { useTheme } from '@/context/ThemeContext';
import { getThemeClasses } from '@/lib/theme';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export default function OrderConfirmation() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get('orderNumber');
  const { theme } = useTheme();
  const themeClasses = getThemeClasses(theme.scheme);
  const router = useRouter();

  // Redirect to home if no order number is found (e.g., direct access)
  useEffect(() => {
    if (!orderNumber) {
      router.push('/');
    }
  }, [orderNumber, router]);

  if (!orderNumber) {
    return null; // Or a loading spinner, or a message indicating redirect
  }

  return (
    <div className='container mx-auto px-4 py-12 text-center'>
      <div className='bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg max-w-md mx-auto'>
        <svg
          className={`mx-auto mb-6 w-16 h-16 ${themeClasses.text}`}
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
          ></path>
        </svg>
        <h2 className='text-3xl font-bold text-gray-800 dark:text-gray-100 mb-4'>
          Order Confirmed!
        </h2>
        <p className='text-gray-600 dark:text-gray-400 mb-6'>
          Thank you for your purchase. Your order has been placed successfully.
        </p>
        <p className='text-lg font-semibold text-gray-700 dark:text-gray-300 mb-8'>
          Order Number:{' '}
          <span className={`${themeClasses.text}`}>{orderNumber}</span>
        </p>
        <Link
          href='/'
          className={`font-bold py-3 px-6 rounded-lg transition-colors duration-300 ${themeClasses.primary} ${themeClasses.primaryHover} text-white`}
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
