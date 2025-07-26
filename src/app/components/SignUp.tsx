'use client';
import { useApp } from '@/context/AppContext';
import { getThemeClasses } from '@/lib/theme';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

export default function SignUp() {
  const { login, theme } = useApp();
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const themeClasses = getThemeClasses(theme.scheme);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setError('Please fill in all fields.');
      return;
    }
    login(email, name);
    router.push('/');
  };

  return (
    <div className='container mx-auto px-4 py-12 flex justify-center'>
      <div className='bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md'>
        <h1 className='text-3xl font-bold text-center text-gray-800 dark:text-gray-100 mb-8'>
          Create Account
        </h1>
        <form onSubmit={handleSubmit}>
          {error && (
            <p className='bg-red-100 text-red-700 p-3 rounded-lg mb-4'>
              {error}
            </p>
          )}
          <div className='mb-4'>
            <label className='block text-gray-700 dark:text-gray-300 mb-1'>
              Name
            </label>
            <input
              type='text'
              value={name}
              onChange={(e) => setName(e.target.value)}
              className='w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200'
            />
          </div>
          <div className='mb-4'>
            <label className='block text-gray-700 dark:text-gray-300 mb-1'>
              Email
            </label>
            <input
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200'
            />
          </div>
          <div className='mb-6'>
            <label className='block text-gray-700 dark:text-gray-300 mb-1'>
              Password
            </label>
            <input
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200'
            />
          </div>
          <button
            type='submit'
            className={`w-full text-white font-bold py-3 rounded-lg ${themeClasses.primary} ${themeClasses.primaryHover}`}
          >
            Sign Up
          </button>
          <p className='text-center text-sm text-gray-600 dark:text-gray-400 mt-4'>
            Already have an account?{' '}
            <Link
              href='/login'
              className={`${themeClasses.text} ${themeClasses.darkText} font-semibold cursor-pointer`}
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
