'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function RedirectToProductsClient() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/products');
  }, [router]);

  return null;
}
