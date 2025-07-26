'use client';
import { useApp } from '@/context/AppContext';
import { getThemeClasses } from '@/lib/theme';

const SearchAndFilter = () => {
  const {
    searchTerm,
    setSearchTerm,
    activeCategory,
    setActiveCategory,
    allProducts,
    theme,
    priceRange,
    setPriceRange,
    maxPrice,
    sortOrder,
    setSortOrder,
    stockFilter,
    setStockFilter,
  } = useApp();
  const categories = ['All', ...new Set(allProducts.map((p) => p.category))];
  const themeClasses = getThemeClasses(theme.scheme);

  return (
    <div className='container mx-auto px-4 pt-8'>
      <div className='flex flex-col md:flex-row gap-4 mb-8'>
        <div className='relative flex-grow'>
          <input
            type='text'
            placeholder='Search for products...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className='w-full p-3 pl-10 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100'
          />
          <svg
            className='w-5 h-5 text-gray-400 absolute top-1/2 left-3 -translate-y-1/2'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
            ></path>
          </svg>
        </div>
        <div className='flex-shrink-0'>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className='w-full md:w-auto p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100'
          >
            <option value='default'>Default Sorting</option>
            <option value='price-asc'>Price: Low to High</option>
            <option value='price-desc'>Price: High to Low</option>
          </select>
        </div>
      </div>
      <div className='bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm mb-8'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          <div>
            <h3 className='font-semibold mb-2 text-gray-800 dark:text-gray-200'>
              Category
            </h3>
            <div className='flex flex-wrap gap-2'>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-3 py-1 text-sm font-semibold rounded-full transition-colors ${
                    activeCategory === category
                      ? `${themeClasses.primary} text-white`
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label
              htmlFor='price'
              className='block text-sm font-medium text-gray-800 dark:text-gray-200 mb-2'
            >
              Max Price:{' '}
              <span
                className={`font-bold ${themeClasses.text} ${themeClasses.darkText}`}
              >
                ${priceRange}
              </span>
            </label>
            <input
              type='range'
              id='price'
              min='0'
              max={maxPrice}
              value={priceRange}
              onChange={(e) => setPriceRange(Number(e.target.value))}
              className='w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700'
            />
          </div>
          <div>
            <h3 className='font-semibold mb-2 text-gray-800 dark:text-gray-200'>
              Availability
            </h3>
            <div className='flex flex-wrap gap-2'>
              {['all', 'in-stock', 'out-of-stock'].map((status) => (
                <button
                  key={status}
                  onClick={() => setStockFilter(status)}
                  className={`px-3 py-1 text-sm font-semibold rounded-full capitalize transition-colors ${
                    stockFilter === status
                      ? `${themeClasses.primary} text-white`
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {status.replace('-', ' ')}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SearchAndFilter;
