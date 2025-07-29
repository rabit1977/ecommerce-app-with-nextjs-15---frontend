'use client';
import { useApp } from '@/context/AppContext';
import { getThemeClasses } from '@/lib/theme';
import Link from 'next/link';

const Footer = () => {
  const { theme } = useApp();
  const themeClasses = getThemeClasses(theme.scheme);

  // A reusable style for all interactive links for consistency
  const linkHoverStyles =
    'transition-all duration-300 hover:text-black dark:hover:text-white';
  const iconHoverStyles = 'transition-all duration-300 hover:opacity-75';

  return (
    // Set base text colors here
    <div className='bg-gray-200 text-gray-600 dark:bg-gray-800 dark:text-gray-400'>
      <div className='container mx-auto px-4 py-12'>
        <div className='grid grid-cols-2 md:grid-cols-4 gap-8'>
          {/* Section 1: Brand Info */}
          <div className='dark:text-gray-200'>
            <h4
              className={`font-bold text-lg mb-4 ${themeClasses.text} ${themeClasses.darkText}`}
            >
              NextGen Store
            </h4>
            <p className='text-sm'>
              Your one-stop shop for the latest and greatest in technology and
              gadgets.
            </p>
          </div>

          {/* Section 2: Quick Links */}
          <div>
            <h4 className='font-bold text-lg mb-4 text-gray-900 dark:text-white'>
              Quick Links
            </h4>
            <ul className='space-y-2 text-sm'>
              <li>
                <Link href='/' className={linkHoverStyles}>
                  Home
                </Link>
              </li>
              <li>
                <Link href='/about' className={linkHoverStyles}>
                  About Us
                </Link>
              </li>
              <li>
                <Link href='/contact' className={linkHoverStyles}>
                  Contact Us
                </Link>
              </li>
              <li>
                <a href='#' className={linkHoverStyles}>
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Section 3: Support */}
          <div>
            <h4 className='font-bold text-lg mb-4 text-gray-900 dark:text-white'>
              Support
            </h4>
            <ul className='space-y-2 text-sm'>
              <li>
                <a href='#' className={linkHoverStyles}>
                  Shipping & Returns
                </a>
              </li>
              <li>
                <a href='#' className={linkHoverStyles}>
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href='#' className={linkHoverStyles}>
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

          {/* Section 4: Follow Us */}
          <div>
            <h4 className='font-bold text-lg mb-4 text-gray-900 dark:text-white'>
              Follow Us
            </h4>
            <div className='flex space-x-4'>
              <a href='#' className={iconHoverStyles}>
                <svg
                  className='w-6 h-6'
                  fill='currentColor'
                  viewBox='0 0 24 24'
                >
                  {/* Facebook Icon Path */}
                  <path d='M22.675 0h-21.35C.59 0 0 .59 0 1.325v21.351C0 23.41.59 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h5.713c.735 0 1.325-.59 1.325-1.325V1.325C24 .59 23.41 0 22.675 0z' />
                </svg>
              </a>
              <a href='#' className={iconHoverStyles}>
                <svg
                  className='w-6 h-6'
                  fill='currentColor'
                  viewBox='0 0 24 24'
                >
                  {/* Twitter Icon Path */}
                  <path d='M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.223.085c.645 1.956 2.52 3.379 4.738 3.419a9.868 9.868 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z' />
                </svg>
              </a>
              <a href='#' className={iconHoverStyles}>
                <svg
                  className='w-6 h-6'
                  fill='currentColor'
                  viewBox='0 0 24 24'
                >
                  {/* Instagram Icon Path */}
                  <path d='M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.07 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.689-.073-4.948-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.79 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z' />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className='mt-12 border-t border-gray-300 dark:border-gray-700 pt-8 text-center text-sm'>
          <p>
            &copy; {new Date().getFullYear()} NextGen Store. All Rights
            Reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
