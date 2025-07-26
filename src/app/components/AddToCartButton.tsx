'use client';
import { useApp } from '@/context/AppContext';
import { getThemeClasses } from '@/lib/theme';
import { useState } from 'react';
import { Product } from '../../../types';

interface AddToCartButtonProps {
  product: Product;
  className?: string;
}

export default function AddToCartButton({
  product,
  className,
}: AddToCartButtonProps) {
  const { addToCart, theme } = useApp();
  const [isAdding, setIsAdding] = useState(false);
  const themeClasses = getThemeClasses(theme.scheme);
  const isOutOfStock = !product.inStock;

  const handleAddToCart = () => {
    setIsAdding(true);
    addToCart(product);
    setTimeout(() => {
      setIsAdding(false);
    }, 2000);
  };

  return (
    <button
      onClick={handleAddToCart}
      disabled={isAdding || isOutOfStock}
      className={`w-full font-bold py-2 px-4 rounded-lg transition-all duration-300 flex items-center justify-center transform active:scale-95 ${className} ${
        isOutOfStock
          ? 'bg-gray-400 dark:bg-gray-600 cursor-not-allowed text-white'
          : isAdding
          ? 'bg-green-500 text-white'
          : `${themeClasses.primary} ${themeClasses.primaryHover} text-white`
      }`}
    >
      {isOutOfStock ? (
        'Out of Stock'
      ) : isAdding ? (
        <>
          <svg
            className='w-5 h-5 mr-2'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M5 13l4 4L19 7'
            ></path>
          </svg>
          Added!
        </>
      ) : (
        <>
          <svg
            className='w-5 h-5 mr-2'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z'
            ></path>
          </svg>
          Add to Cart
        </>
      )}
    </button>
  );
}
