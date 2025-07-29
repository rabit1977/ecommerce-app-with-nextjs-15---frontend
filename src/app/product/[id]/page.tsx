import { use } from 'react';
import ProductDetail from '@/app/components/ProductDetail';

/**
 * This is a React Server Component (RSC). In Next.js 15, the `params` object
 * passed to page components is a Promise.
 *
 * @param params A Promise containing the route parameters.
 * @returns The product detail page.
 */
export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  // We use the `use` hook to unwrap the Promise-like `params` object.
  // This is the recommended approach in React for resolving promises within RSCs.
  const resolvedParams = use(params);

  // The unwrapped ID is then passed to the client component.
  return <ProductDetail productId={Number(resolvedParams.id)} />;
}