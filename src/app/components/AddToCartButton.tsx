'use client';

import { useApp } from '@/context/AppContext';
import { getThemeClasses } from '@/lib/theme';
import { useState, useEffect, useTransition } from 'react';
import { Product } from '../../../types';

interface AddToCartButtonProps {
  product: Product;
  className?: string;
}

export default function AddToCartButton({
  product,
  className = '',
}: AddToCartButtonProps) {
  const { addToCart, theme } = useApp();
  const themeClasses = getThemeClasses(theme.scheme);

  const [isPending, startTransition] = useTransition();
  const [isSuccess, setIsSuccess] = useState(false);

  const isOutOfStock = !product.inStock;
  const isDisabled = isPending || isSuccess || isOutOfStock;

  useEffect(() => {
    if (!isSuccess) return;

    const timeout = setTimeout(() => {
      setIsSuccess(false);
    }, 2000);

    return () => clearTimeout(timeout);
  }, [isSuccess]);

  const handleAddToCart = () => {
    startTransition(() => {
      addToCart(product);
      setIsSuccess(true);
    });
  };

  const getButtonContent = () => {
    if (isOutOfStock) {
      return 'Out of Stock';
    }
    if (isSuccess) {
      return (
        <>
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
          Added!
        </>
      );
    }
    if (isPending) {
      return (
        <>
          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          Adding...
        </>
      );
    }
    return (
      <>
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
        Add to Cart
      </>
    );
  };

  const getButtonClasses = () => {
    if (isOutOfStock) {
      return 'bg-gray-400 dark:bg-gray-600 cursor-not-allowed text-white';
    }
    if (isSuccess) {
      return 'bg-green-500 text-white animate-pulse';
    }
    if (isPending) {
      return `${themeClasses.primary} opacity-75 cursor-wait text-white`;
    }
    return `${themeClasses.primary} ${themeClasses.primaryHover} text-white`;
  };

  return (
    <button
      onClick={handleAddToCart}
      disabled={isDisabled}
      className={`w-full font-bold py-2 px-4 rounded-lg transition-all duration-300 flex items-center justify-center transform active:scale-95 ${className} ${getButtonClasses()}`}
    >
      {getButtonContent()}
    </button>
  );
}
