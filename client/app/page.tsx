import { getCurrentUser } from '@/lib/fetch-client';

export default async function Home() {
  const { currentUser } = await getCurrentUser();

  return currentUser ? (
    <h1>You are signed in</h1>
  ) : (
    <h1>Yout are not signed in</h1>
  );
}
