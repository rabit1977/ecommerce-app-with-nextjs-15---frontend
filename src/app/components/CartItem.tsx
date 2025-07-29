'use client';
import { useApp } from '@/context/AppContext';
import Image from 'next/image';
import { CartItem as CartItemType } from '../../../types';

interface CartItemProps {
  item: CartItemType;
}

export default function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeFromCart } = useApp();

  return (
    <div className='flex flex-col md:flex-row md:items-center md:space-x-4 py-4 border-b border-gray-200 dark:border-gray-700'>
      <div className='flex items-center space-x-4 flex-grow '>
        <div className='relative w-24 h-24 flex-shrink-0'>
          <Image
            src={item.image}
            alt={item.name}
            fill
            className=' object-cover rounded-lg flex-shrink-0'
          />
        </div>
        <div>
          <h4 className='font-semibold text-gray-800 dark:text-gray-100'>
            {item.name}
          </h4>
          <p className='text-sm text-gray-500 dark:text-gray-400'>
            {item.category}
          </p>
        </div>
      </div>
      <div className='flex items-center justify-between md:justify-end md:space-x-8 w-full md:w-auto mt-4 md:mt-0'>
        <div className='flex items-center border border-gray-300 dark:border-gray-600 rounded-md'>
          <button
            onClick={() => updateQuantity(item.id, item.quantity - 1)}
            className='px-3 py-1 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-l-md'
          >
            -
          </button>
          <span className='px-4 py-1 text-center text-gray-800 dark:text-gray-200'>
            {item.quantity}
          </span>
          <button
            onClick={() => updateQuantity(item.id, item.quantity + 1)}
            className='px-3 py-1 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-r-md'
          >
            +
          </button>
        </div>
        <p className='font-semibold w-24 text-right text-gray-800 dark:text-gray-100'>
          ${(item.price * item.quantity).toFixed(2)}
        </p>
        <button
          onClick={() => removeFromCart(item.id)}
          className='text-red-500 hover:text-red-700 cursor-pointer'
        >
          <svg
            className='w-6 h-6'
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
  );
}
