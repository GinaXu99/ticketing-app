import { cookies } from 'next/headers';

interface User {
  id: string;
  email: string;
}

interface CurrentUserResponse {
  currentUser: User | null;
}

interface ServerFetchOptions extends RequestInit {
  cache?: RequestCache;
}

export async function serverFecth(
  url: string,
  options: ServerFetchOptions = {}
): Promise<Response> {
  const cookieStore = await cookies();
  console.log(cookieStore.toString());
  const baseURL =
    'http://ingress-nginx-controller.ingress-nginx.srv.cluster.local';
  const response = await fetch(`${baseURL}${url}`, {
    ...options,
    headers: {
      Cookie: cookieStore.toString(),
      ...options.headers,
    },
    cache: options.cache || 'no-store',
  });

  return response;
}

export async function getCurrentUser(): Promise<CurrentUserResponse> {
  try {
    const response = await serverFecth('/api/users/currentuser');
    if (!response.ok) {
      return { currentUser: null };
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('error fetching current users');
    return { currentUser: null };
  }
}
