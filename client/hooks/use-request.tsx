import axios, { AxiosError } from 'axios';
import { useState } from 'react';
import React from 'react';

interface ApiError {
  message: string;
  field?: string;
}

interface ErrorResponse {
  errors: ApiError[];
}

interface UseRequestConfig<T = any> {
  url: string;
  method: 'get' | 'post' | 'put' | 'patch' | 'delete';
  onSuccess?: (data: T) => void;
  body?: Record<string, any>;
}

interface UseRequestReturn<T = any> {
  doRequest: () => Promise<T | void>;
  errors: React.ReactElement | null;
}

export default function useRequest<T = any>({
  url,
  method,
  body,
  onSuccess,
}: UseRequestConfig<T>): UseRequestReturn<T> {
  const [errors, setErrors] = useState<React.ReactElement | null>(null);

  const doRequest = async (): Promise<T | void> => {
    try {
      setErrors(null);
      const response = await axios[method](url, body);

      if (onSuccess) {
        onSuccess(response.data);
      }
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      if (axiosError.response?.data?.errors) {
        setErrors(
          <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4'>
            <h4 className='font-bold mb-2'>Ooops....</h4>

            <ul className='list-disc pl-5'>
              {axiosError.response.data.errors.map((err) => (
                <li key={err.message}>{err.message}</li>
              ))}
            </ul>
          </div>
        );
      } else {
        setErrors(
          <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4'>
            <h4 className='font-bold mb-2'>Ooops....</h4>
            <p>An unexpected error occurred</p>
          </div>
        );
      }
    }
  };

  return { doRequest, errors };
}
