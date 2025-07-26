'use client';

import Hero from './Hero';
import ProductList from './ProductList';
import SearchAndFilter from './SearchAndFilter';

export default function HomePage() {
  return (
    <>
      <Hero />
      <SearchAndFilter />
      <ProductList />
    </>
  );
}
