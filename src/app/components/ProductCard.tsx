'use client';
import { useApp } from '@/context/AppContext';
import { getThemeClasses } from '@/lib/theme';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '../../../types';
import AddToCartButton from './AddToCartButton';
import StarRating from './StarRating';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { toggleWishlist, isInWishlist, theme } = useApp();
  const isLiked = isInWishlist(product.id);
  const themeClasses = getThemeClasses(theme.scheme);

  return (
    <div className='bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition-transform duration-300 ease-in-out group flex flex-col'>
      <div className='relative w-full h-56 overflow-hidden '>
        <Link href={`/product/${product.id}`}>
          <Image
            src={product.image}
            alt={product.name}
            fill
            className=' object-cover cursor-pointer'
          />
        </Link>
        <div
          className={`absolute top-2 left-2 ${themeClasses.primary} text-white text-xs font-bold px-2 py-1 rounded-full`}
        >
          {product.category}
        </div>
        <div
          className={`absolute bottom-2 right-2 text-white text-xs font-bold px-2 py-1 rounded-full ${
            product.inStock ? 'bg-green-500' : 'bg-red-500'
          }`}
        >
          {product.inStock ? 'In Stock' : 'Out of Stock'}
        </div>
        <button
          onClick={() => toggleWishlist(product)}
          className={`absolute top-2 right-2 p-2 rounded-full transition-colors duration-200 active:scale-90 ${
            isLiked
              ? 'bg-red-500 text-white'
              : 'bg-white/70 text-gray-700 hover:bg-red-500 hover:text-white'
          }`}
        >
          <svg
            className='w-6 h-6 cursor-pointer'
            fill={isLiked ? 'currentColor' : 'none'}
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 016.364 6.364L12 20.364l-7.682-7.682a4.5 4.5 0 010-6.364z'
            ></path>
          </svg>
        </button>
      </div>
      <div className='p-4 flex flex-col flex-grow'>
        <Link href={`/product/${product.id}`}>
          <h3 className='text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2 truncate cursor-pointer'>
            {product.name}
          </h3>
        </Link>
        <div className='flex items-center justify-between mb-4'>
          <span className='text-2xl font-bold text-gray-900 dark:text-white'>
            ${product.price.toFixed(2)}
          </span>
          <div className='flex items-center'>
            <StarRating rating={product.rating} />
            <span className='text-gray-600 dark:text-gray-400 text-sm ml-1'>
              ({product.reviews})
            </span>
          </div>
        </div>
        <div className='mt-auto'>
          <AddToCartButton product={product} />
        </div>
      </div>
    </div>
  );
}
