'use client';
import { useApp } from '@/context/AppContext';
import { getThemeClasses, ThemeClasses } from '@/lib/theme';
import { Search, SlidersHorizontal } from 'lucide-react';
import { useState } from 'react';
import { CustomDropdown } from './CustomDropdown';
import { FilterPills } from './FilterPills';
import { useTheme } from '@/context/ThemeContext';

export const SearchAndFilter = () => {
  const {
    searchTerm,
    setSearchTerm,
    activeCategory,
    setActiveCategory,
    allProducts,
    priceRange,
    setPriceRange,
    maxPrice,
    sortOrder,
    setSortOrder,
    stockFilter,
    setStockFilter,
  } = useApp();
  const { theme } = useTheme(); // Use useTheme to get the current theme

  // Filters are now hidden by default on page load.
  const [showFilters, setShowFilters] = useState(false);
  const themeClasses: ThemeClasses = getThemeClasses(theme.scheme);

  const categories = ['All', ...new Set(allProducts.map((p) => p.category))];
  const sortOptions = [
    { value: 'default', label: 'Default Sorting' },
    { value: 'price-asc', label: 'Price: Low to High' },
    { value: 'price-desc', label: 'Price: High to Low' },
  ];
  const availabilityOptions = [
    { value: 'all', label: 'All' },
    { value: 'in-stock', label: 'In Stock' },
    { value: 'out-of-stock', label: 'Out of Stock' },
  ];

  return (
    <div className='container mx-auto px-4 pt-8 mb-8'>
      {/* Search and Sort Section */}
      <div className='flex flex-col md:flex-row items-center gap-4 mb-6'>
        <div className='relative w-full flex-grow'>
          <Search
            className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400'
            size={20}
          />
          <input
            type='text'
            placeholder='Search for products...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className='w-full rounded-lg border border-gray-200 bg-white p-3 pl-10 text-gray-900 shadow-sm transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:focus:border-blue-500'
          />
        </div>
        {/* FIX: Simplified the container for the dropdown and button to ensure visibility */}
        <div className='flex w-full items-center justify-end gap-4 md:w-auto relative'>
          <CustomDropdown
            options={sortOptions}
            value={sortOrder}
            onChange={setSortOrder}
            themeClasses={themeClasses}
          />
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex shrink-0 items-center gap-2 rounded-lg border p-3 text-gray-600 shadow-sm transition-colors hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 ${
              showFilters
                ? `${themeClasses.primary} bg-opacity-10 border-current`
                : 'border-gray-200 bg-white'
            }`}
          >
            <SlidersHorizontal size={20} />
            <span className='text-sm font-medium'>Filters</span>
          </button>
        </div>
      </div>

      {/* Advanced Filters Section */}
      {showFilters && (
        <div className='flex flex-col gap-y-6 rounded-xl border border-gray-200 bg-white/50 p-4 backdrop-blur-sm dark:border-gray-800 dark:bg-gray-900/50 '>
          {/* Category filter now sits in its own row to span the full width */}
          <div className='flex flex-col'>
            <label className='mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300'>
              Category
            </label>
            <FilterPills
              options={categories.map((cat) => ({ value: cat, label: cat }))}
              selectedValue={activeCategory}
              onSelect={setActiveCategory}
              themeClasses={themeClasses}
            />
          </div>

          {/* Wrapper for the bottom row of filters with justify-between on larger screens */}
          <div className='flex flex-col gap-6 md:flex-row md:items-center md:justify-between'>
            {/* Price Range Filter */}
            <div className='flex w-full flex-col md:w-1/3'>
              <div className='mb-2 flex justify-between'>
                <label
                  htmlFor='price'
                  className='text-sm font-semibold text-gray-700 dark:text-gray-300'
                >
                  Max Price
                </label>
                <span
                  className={`text-sm font-bold ${themeClasses.text} ${themeClasses.darkText}`}
                >
                  ${priceRange}
                </span>
              </div>
              <input
                type='range'
                id='price'
                min='0'
                max={maxPrice}
                value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
                className={`range-thumb:${themeClasses.primary} h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 dark:bg-gray-700`}
              />
            </div>

            {/* Availability Filter */}
            <div className='flex flex-col'>
              <label className='mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300'>
                Availability
              </label>
              <FilterPills
                options={availabilityOptions}
                selectedValue={stockFilter}
                onSelect={setStockFilter}
                themeClasses={themeClasses}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchAndFilter;
