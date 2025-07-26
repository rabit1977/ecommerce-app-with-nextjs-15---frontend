'use client';

import ProductDetail from '@/app/components/ProductDetail';

export default function ProductPage({ params }: { params: { id: string } }) {
  return <ProductDetail productId={Number(params.id)} />;
}
