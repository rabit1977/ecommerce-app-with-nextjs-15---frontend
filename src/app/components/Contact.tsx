'use client';
import { useApp } from '@/context/AppContext';
import { useTheme } from '@/context/ThemeContext';
import { getThemeClasses } from '@/lib/theme';
import React, { useState } from 'react';

export default function Contact() {
  const { displayToast } = useApp();
  const { theme } = useTheme();
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState({
    submitting: false,
    message: null as string | null,
    success: false,
  });
  const themeClasses = getThemeClasses(theme.scheme);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ submitting: true, message: null, success: false });

    if (!formState.name || !formState.email || !formState.message) {
      setStatus({
        submitting: false,
        message: 'Please fill out all fields.',
        success: false,
      });
      return;
    }

    await new Promise((resolve) => setTimeout(resolve, 1500));

    console.log(formState);
    displayToast('Message sent successfully!');
    setStatus({
      submitting: false,
      message: "Thank you for your message! We'll get back to you soon.",
      success: true,
    });
    setFormState({ name: '', email: '', message: '' });
  };

  return (
    <div className='container mx-auto px-4 py-12'>
      <h1 className='text-4xl font-bold text-center text-gray-800 dark:text-gray-100 mb-8'>
        Contact Us
      </h1>
      <div className='grid md:grid-cols-2 gap-12'>
        <div className='bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md'>
          <h2 className='text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200'>
            Send us a Message
          </h2>
          <form onSubmit={handleSubmit}>
            <div className='mb-4'>
              <label className='block text-gray-700 dark:text-gray-300 mb-1'>
                Name
              </label>
              <input
                type='text'
                name='name'
                value={formState.name}
                onChange={handleChange}
                className='w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200'
              />
            </div>
            <div className='mb-4'>
              <label className='block text-gray-700 dark:text-gray-300 mb-1'>
                Email
              </label>
              <input
                type='email'
                name='email'
                value={formState.email}
                onChange={handleChange}
                className='w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200'
              />
            </div>
            <div className='mb-4'>
              <label className='block text-gray-700 dark:text-gray-300 mb-1'>
                Message
              </label>
              <textarea
                name='message'
                rows={5}
                value={formState.message}
                onChange={handleChange}
                className='w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200'
              ></textarea>
            </div>
            <button
              type='submit'
              disabled={status.submitting}
              className={`text-white font-bold py-2 px-6 rounded-lg disabled:bg-gray-400 ${themeClasses.primary} ${themeClasses.primaryHover}`}
            >
              {status.submitting ? 'Sending...' : 'Send'}
            </button>
            {status.message && (
              <p
                className={`mt-4 text-sm ${
                  status.success ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {status.message}
              </p>
            )}
          </form>
        </div>
        <div className='bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md'>
          <h2 className='text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200'>
            Our Location
          </h2>
          <div className='space-y-4 text-gray-700 dark:text-gray-300'>
            <p>
              <strong>Address:</strong> 123 Tech Avenue, Kumanovo, 1300, North
              Macedonia
            </p>
            <p>
              <strong>Phone:</strong> +389 12 345 678
            </p>
            <p>
              <strong>Email:</strong> contact@nextgenstore.com
            </p>
          </div>
          <div className='mt-6 h-64 rounded-lg overflow-hidden'>
            <iframe
              src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d47241.83999957458!2d21.68260434149667!3d42.14245591666419!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1354475a3c8af139%3A0x3ae285cc8288869!2sKumanovo%2C%20North%20Macedonia!5e0!3m2!1sen!2s!4v1690307731234!5m2!1sen!2s'
              width='100%'
              height='100%'
              style={{ border: 0 }}
              allowFullScreen={true}
              loading='lazy'
              referrerPolicy='no-referrer-when-downgrade'
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}
