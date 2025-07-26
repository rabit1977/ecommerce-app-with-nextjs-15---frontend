'use client';
import { useApp } from '@/context/AppContext';
import { getThemeClasses } from '@/lib/theme';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import AddToCartButton from './AddToCartButton';
import StarRating from './StarRating';

interface ProductDetailProps {
  productId: number;
}

export default function ProductDetail({ productId }: ProductDetailProps) {
  const { getProductById, addComment, currentUser, theme } = useApp();
  const [commentText, setCommentText] = useState('');
  const product = getProductById(productId);
  const themeClasses = getThemeClasses(theme.scheme);

  if (!product) {
    return (
      <div className='container mx-auto px-4 py-12 text-center'>
        <h2 className='text-2xl font-bold text-gray-800 dark:text-gray-100'>
          Product not found.
        </h2>
        <Link
          href='/'
          className={`mt-4 ${themeClasses.text} ${themeClasses.darkText} hover:underline`}
        >
          &larr; Back to Products
        </Link>
      </div>
    );
  }

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (commentText.trim() && currentUser) {
      const newComment = {
        author: currentUser.name,
        text: commentText,
        date: new Date().toISOString().split('T')[0],
      };
      addComment(productId, newComment);
      setCommentText('');
    }
  };

  return (
    <div className='container mx-auto px-4 py-8'>
      <Link
        href='/'
        className={`mb-8 inline-block ${themeClasses.text} ${themeClasses.darkText} hover:underline`}
      >
        &larr; Back to Products
      </Link>
      <div className='bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden'>
        <div className='md:flex'>
          <div className='md:w-1/2'>
            <Image
              src={product.image}
              alt={product.name}
              className='w-full h-full object-cover'
            />
          </div>
          <div className='md:w-1/2 p-8 flex flex-col'>
            <h2 className='text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2'>
              {product.name}
            </h2>
            <div className='flex justify-between items-center mb-4'>
              <p className='text-gray-500 dark:text-gray-400 text-sm'>
                {product.category}
              </p>
              <div
                className={`text-white text-xs font-bold px-3 py-1 rounded-full ${
                  product.inStock ? 'bg-green-500' : 'bg-red-500'
                }`}
              >
                {product.inStock ? 'In Stock' : 'Out of Stock'}
              </div>
            </div>
            <div className='flex items-center mb-4'>
              <StarRating rating={product.rating} />
              <span className='text-gray-600 dark:text-gray-400 text-sm ml-2'>
                {product.rating} stars ({product.reviews} reviews)
              </span>
            </div>
            <p className='text-3xl font-bold text-gray-900 dark:text-white mb-4'>
              ${product.price.toFixed(2)}
            </p>
            <p className='text-gray-700 dark:text-gray-300 mb-6 flex-grow'>
              {product.description}
            </p>
            <AddToCartButton product={product} className='py-3 px-6' />
          </div>
        </div>
      </div>

      <div className='mt-12 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8'>
        <h3 className='text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6'>
          Customer Reviews
        </h3>
        {currentUser ? (
          <form onSubmit={handleCommentSubmit} className='mb-8'>
            <textarea
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              className='w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200'
              rows={4}
              placeholder='Write your review here...'
            ></textarea>
            <button
              type='submit'
              className='mt-4 bg-green-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-green-600'
            >
              Submit Review
            </button>
          </form>
        ) : (
          <div className='text-center p-4 border dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-700 mb-8'>
            <p className='text-gray-700 dark:text-gray-300'>
              You must be{' '}
              <Link
                href='/login'
                className={`${themeClasses.text} ${themeClasses.darkText} font-semibold cursor-pointer`}
              >
                logged in
              </Link>{' '}
              to post a review.
            </p>
          </div>
        )}
        <div className='space-y-6'>
          {product.comments.length > 0 ? (
            product.comments.map((comment, index) => (
              <div
                key={index}
                className='border-b border-gray-200 dark:border-gray-700 pb-4'
              >
                <p className='font-semibold text-gray-800 dark:text-gray-200'>
                  {comment.author}
                </p>
                <p className='text-sm text-gray-500 dark:text-gray-400 mb-2'>
                  {comment.date}
                </p>
                <p className='text-gray-700 dark:text-gray-300'>
                  {comment.text}
                </p>
              </div>
            ))
          ) : (
            <p className='text-gray-600 dark:text-gray-400'>
              No reviews yet. Be the first to comment!
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
