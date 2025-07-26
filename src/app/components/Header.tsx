"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { getThemeClasses } from '@/lib/theme';

const Header = () => {
  const { totalItems, totalWishlistItems, currentUser, logout, theme, toggleThemeMode, setThemeScheme } = useApp();
  const [showThemes, setShowThemes] = useState(false);
  const themeClasses = getThemeClasses(theme.scheme);
  const themes = [
      { name: 'blue', color: '#3b82f6' },
      { name: 'orange', color: '#f97316' },
      { name: 'green', color: '#16a34a' },
      { name: 'purple', color: '#8b5cf6' },
  ]

  return (
    <header className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-20">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className={`text-2xl font-bold ${themeClasses.text} ${themeClasses.darkText} cursor-pointer`}>
          NextGen Store
        </Link>
        <div className="hidden md:flex items-center space-x-6">
            <Link href="/" className={`text-gray-600 dark:text-gray-300 hover:${themeClasses.text} dark:hover:${themeClasses.darkText.split(':')[1]} cursor-pointer`}>Home</Link>
            <Link href="/about" className={`text-gray-600 dark:text-gray-300 hover:${themeClasses.text} dark:hover:${themeClasses.darkText.split(':')[1]} cursor-pointer`}>About</Link>
            <Link href="/contact" className={`text-gray-600 dark:text-gray-300 hover:${themeClasses.text} dark:hover:${themeClasses.darkText.split(':')[1]} cursor-pointer`}>Contact</Link>
        </div>
        <div className="flex items-center space-x-2 sm:space-x-4">
            <div className="relative">
                <button onClick={() => setShowThemes(!showThemes)} className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"></path></svg>
                </button>
                {showThemes && (
                    <div className="absolute top-full right-0 mt-2 w-32 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-2 z-30">
                        <div className="grid grid-cols-2 gap-2">
                            {themes.map(t => (
                                <button key={t.name} onClick={() => { setThemeScheme(t.name); setShowThemes(false); }} className="w-10 h-10 rounded-full" style={{backgroundColor: t.color}}></button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
            <button onClick={toggleThemeMode} className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                {theme.mode === 'light' ? (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path></svg>
                ) : (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
                )}
            </button>
            {currentUser ? (
                <div className="flex items-center space-x-4">
                    <span className="text-gray-700 dark:text-gray-300 hidden sm:inline">Welcome, {currentUser.name}!</span>
                    <button onClick={logout} className={`text-sm text-gray-600 dark:text-gray-300 hover:${themeClasses.text} dark:hover:${themeClasses.darkText.split(':')[1]}`}>Logout</button>
                </div>
            ) : (
                <div className="hidden sm:flex items-center space-x-2">
                    <Link href="/login" className={`text-sm font-semibold text-gray-700 dark:text-gray-300 hover:${themeClasses.text} dark:hover:${themeClasses.darkText.split(':')[1]}`}>Login</Link>
                    <Link href="/signup" className={`text-sm font-semibold text-white py-2 px-4 rounded-lg ${themeClasses.primary} ${themeClasses.primaryHover}`}>Sign Up</Link>
                </div>
            )}
            <Link href="/wishlist" className="relative text-gray-600 dark:text-gray-300">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 016.364 6.364L12 20.364l-7.682-7.682a4.5 4.5 0 010-6.364z"></path></svg>
                {totalWishlistItems > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {totalWishlistItems}
                    </span>
                )}
            </Link>
            <Link href="/cart" className="relative text-gray-600 dark:text-gray-300">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                {totalItems > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {totalItems}
                    </span>
                )}
            </Link>
        </div>
      </nav>
    </header>
  );
};
export default Header;