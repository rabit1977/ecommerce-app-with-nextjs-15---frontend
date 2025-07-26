'use client';

import { useApp } from '@/context/AppContext';
import ProductCard from './ProductCard';

export default function ProductList() {
  const { products } = useApp();

  return (
    <div id='products-section' className='container mx-auto px-4 py-8'>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <div className='col-span-full text-center py-12'>
            <h3 className='text-2xl font-semibold text-gray-700 dark:text-gray-300'>
              No products found.
            </h3>
            <p className='text-gray-500 dark:text-gray-400 mt-2'>
              Try adjusting your search or filter.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
