'use client';
import { useApp } from '@/context/AppContext';
import { getThemeClasses } from '@/lib/theme';
import Link from 'next/link';
import CartItem from './CartItem';

export default function Cart() {
  const {
    cartItems,
    cartSubtotal,
    clearCart,
    shippingCost,
    tax,
    totalCost,
    theme,
  } = useApp();
  const themeClasses = getThemeClasses(theme.scheme);

  if (cartItems.length === 0) {
    return (
      <div className='container mx-auto px-4 py-12 text-center'>
        <h2 className='text-3xl font-bold text-gray-800 dark:text-gray-100 mb-4'>
          Your Cart is Empty
        </h2>
        <p className='text-gray-600 dark:text-gray-400 mb-8'>
          Looks like you have not added anything to your cart yet.
        </p>
        <Link
          href='/'
          className={`font-bold py-3 px-6 rounded-lg transition-colors duration-300 ${themeClasses.primary} ${themeClasses.primaryHover} text-white`}
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className='container mx-auto px-4 py-8'>
      <h2 className='text-3xl font-bold text-gray-800 dark:text-gray-100 mb-8'>
        Your Shopping Cart
      </h2>
      <div className='lg:flex lg:space-x-8'>
        <div className='lg:w-2/3 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8 lg:mb-0'>
          <div className='hidden md:flex justify-between font-semibold text-gray-600 dark:text-gray-300 border-b dark:border-gray-700 pb-4 mb-4'>
            <h3 className='flex-grow'>Product</h3>
            <div className='flex items-center justify-end space-x-8 w-auto'>
              <h3 className='w-24 text-center'>Quantity</h3>
              <h3 className='w-24 text-right'>Total</h3>
              <div className='w-6'></div> {/* Spacer for remove button */}
            </div>
          </div>
          <div>
            {cartItems.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>
          <div className='mt-8 flex justify-between items-center'>
            <Link
              href='/'
              className={`${themeClasses.text} ${themeClasses.darkText} hover:underline`}
            >
              &larr; Back to Products
            </Link>
            <button
              onClick={clearCart}
              className='text-sm text-red-500 hover:underline'
            >
              Clear Cart
            </button>
          </div>
        </div>
        <div className='lg:w-1/3'>
          <div className='bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 sticky top-28'>
            <h3 className='text-xl font-bold mb-4 text-gray-800 dark:text-gray-100'>
              Order Summary
            </h3>
            <div className='space-y-2 text-gray-700 dark:text-gray-300'>
              <div className='flex justify-between'>
                <span>Subtotal</span>
                <span>${cartSubtotal.toFixed(2)}</span>
              </div>
              <div className='flex justify-between'>
                <span>Shipping</span>
                <span>${shippingCost.toFixed(2)}</span>
              </div>
              <div className='flex justify-between'>
                <span>Tax (8%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className='flex justify-between font-bold text-lg border-t dark:border-gray-700 pt-2 mt-2 text-gray-800 dark:text-gray-100'>
                <span>Total</span>
                <span>${totalCost.toFixed(2)}</span>
              </div>
            </div>
            <button className='mt-6 w-full bg-green-500 text-white font-bold py-3 px-8 rounded-lg hover:bg-green-600 transition-colors duration-300'>
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
