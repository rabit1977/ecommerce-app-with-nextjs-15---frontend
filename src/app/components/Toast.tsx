'use client';

import { useApp } from '@/context/AppContext';

export default function Toast() {
  const { showToast, toastMessage } = useApp();
  return (
    <div
      className={`fixed bottom-5 right-5 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 py-3 px-5 rounded-lg shadow-lg transform transition-transform duration-300 z-30 ${
        showToast ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
      }`}
    >
      {toastMessage}
    </div>
  );
}
