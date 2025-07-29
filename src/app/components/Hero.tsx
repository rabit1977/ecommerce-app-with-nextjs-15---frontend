'use client';
import { useApp } from '@/context/AppContext';
import { getThemeClasses } from '@/lib/theme';
import Image from 'next/image';

export default function Hero() {
  const { allProducts, theme } = useApp();
  const heroProducts = allProducts.slice(0, 4);
  const themeClasses = getThemeClasses(theme.scheme);

  const handleScroll = () => {
    const productsSection = document.getElementById('products-section');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className='bg-gray-100 dark:bg-gray-800'>
      <div className='container mx-auto px-4 py-16 lg:py-24'>
        <div className='grid lg:grid-cols-2 gap-8 items-center'>
          <div className='text-center lg:text-left'>
            <h1 className='text-4xl lg:text-6xl font-extrabold text-gray-800 dark:text-gray-100 mb-4'>
              Next-Gen Tech, Today.
            </h1>
            <p className='text-lg text-gray-600 dark:text-gray-300 mb-8'>
              Discover the latest in electronics, gadgets, and accessories.
              Unbeatable prices, unmatched quality.
            </p>
            <button
              onClick={handleScroll}
              className={`text-white font-bold py-3 px-8 rounded-lg transition-transform transform hover:scale-105 ${themeClasses.primary} ${themeClasses.primaryHover}`}
            >
              Shop Our Collection
            </button>
          </div>
          <div className='hidden lg:grid grid-cols-2 gap-4'>
            {heroProducts.map((p, i) => (
              <div
                key={p.id}
                className={`rounded-lg overflow-hidden shadow-lg ${
                  i === 0 ? 'row-span-2' : ''
                }`}
              >
                <Image
                  src={p.image}
                  alt={p.name}
                  fill
                  priority
                  className='object-cover'
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
