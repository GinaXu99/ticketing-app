'use client';

import { useState, FormEvent, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import useRequest from '@/hooks/use-request';

interface SigninResponse {
  id: string;
  email: string;
}

export default function SigninPage() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const router = useRouter();

  const { doRequest, errors } = useRequest<SigninResponse>({
    url: '/api/users/signin',
    method: 'post',
    body: {
      email,
      password,
    },
    onSuccess: () => router.push('/'),
  });

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await doRequest();
  };

  return (
    <div className='max-w-md mx-auto mt-8 p-6'>
      <form onSubmit={onSubmit}>
        <h1 className='text-2xl font-bold mb-6'> Signin</h1>
        <div className='mb-4'>
          <label className='block text-gray-700 text-sm font-medium mb-2'>
            Email Address
          </label>
          <input
            value={email}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
          />
        </div>
        <div className='mb-4'>
          <label className='block text-gray-700 text-sm font-medium mb-2'>
            Password
          </label>
          <input
            value={password}
            className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            type='password'
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
          />
        </div>
        {errors}
        <button className='w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors'>
          Signin
        </button>
      </form>
    </div>
  );
}
