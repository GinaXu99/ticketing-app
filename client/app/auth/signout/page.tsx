'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useRequest from '@/hooks/use-request';

export default function SignOutPage() {
  const router = useRouter();

  const { doRequest } = useRequest({
    url: '/api/uers/signout',
    method: 'post',
    body: {},
    onSuccess: () => router.push('/'),
  });

  useEffect(() => {
    doRequest();
  }, []);

  return <div>Signing you out...</div>;
}
