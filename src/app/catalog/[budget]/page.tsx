"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function CatalogRedirectPage({ params }: { params: { budget: string }}) {
  const router = useRouter();

  useEffect(() => {
    router.replace('/');
  }, [router]);

  return null;
}
