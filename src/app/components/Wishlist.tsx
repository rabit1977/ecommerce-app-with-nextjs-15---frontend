'use client';
import { useApp } from '@/context/AppContext';
import { useCart } from '@/context/CartContext';
import { useTheme } from '@/context/ThemeContext';
import { getThemeClasses } from '@/lib/theme';
import Image from 'next/image';
import Link from 'next/link';

export default function Wishlist() {
  const { wishlistItems, toggleWishlist } = useApp();
  const { addToCart } = useCart();
  const { theme } = useTheme();
  const themeClasses = getThemeClasses(theme.scheme);

  if (wishlistItems.length === 0) {
    return (
      <div className='container mx-auto px-4 py-12 text-center'>
        <h2 className='text-3xl font-bold text-gray-800 dark:text-gray-100 mb-4'>
          Your Wishlist is Empty
        </h2>
        <p className='text-gray-600 dark:text-gray-400 mb-8'>
          Add products you like to your wishlist to see them here.
        </p>
        <Link
          href='/'
          className={`font-bold py-3 px-6 rounded-lg transition-colors duration-300 ${themeClasses.primary} ${themeClasses.primaryHover} text-white`}
        >
          Discover Products
        </Link>
      </div>
    );
  }

  return (
    <div className='container mx-auto px-4 py-8'>
      <h2 className='text-3xl font-bold text-gray-800 dark:text-gray-100 mb-8'>
        Your Wishlist
      </h2>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8'>
        {wishlistItems.map((item) => (
          <div
            key={item.id}
            className='bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden'
          >
            <div className='relative w-full h-56 overflow-hidden'>
              <Image
                src={item.image}
                alt={item.name}
                fill
                className='object-cover'
              />
            </div>
            <div className='p-4'>
              <h3 className='font-semibold truncate text-gray-800 dark:text-gray-200'>
                {item.name}
              </h3>
              <p className='text-gray-600 dark:text-gray-400'>
                ${item.price.toFixed(2)}
              </p>
              <div className='mt-4 flex space-x-2'>
                <button
                  onClick={() => {
                    addToCart(item);
                    toggleWishlist(item);
                  }}
                  className={`w-full text-white text-sm font-bold py-2 px-3 rounded-lg cursor-pointer transition-colors ${themeClasses.primary} ${themeClasses.primaryHover}`}
                >
                  Move to Cart
                </button>
                <button
                  onClick={() => toggleWishlist(item)}
                  className='p-2 bg-gray-200 dark:bg-gray-700 rounded-lg cursor-pointer hover:bg-red-200 dark:hover:bg-red-900/50 text-red-500'
                >
                  <svg
                    className='w-5 h-5'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
                    ></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Link
        href='/'
        className={`mt-8 inline-block ${themeClasses.text} ${themeClasses.darkText} hover:underline`}
      >
        &larr; Back to Products
      </Link>
    </div>
  );
}
