import Link from 'next/link';

interface User {
  id: string;
  email: string;
}

interface HeaderProps {
  currentUser: User | null;
}

interface LinkConfig {
  label: string;
  href: string;
}

export default function Header({ currentUser }: HeaderProps) {
  const links = [
    !currentUser && { label: 'Sign Up', href: '/auth/signup' },
    !currentUser && { label: 'Sign in', href: '/auth/signin' },
    currentUser && { label: 'Sign Out', href: '/auth/signout' },
  ]
    .filter((linkConfig): linkConfig is LinkConfig => Boolean(linkConfig))
    .map(({ label, href }) => {
      return (
        <li key={href}>
          <Link
            href={href}
            className=' transition-colors text-gray-700 hover:text-amber-500'
          >
            {label}
          </Link>
        </li>
      );
    });

  return (
    <nav className='bg-gray-100 shadow-md px-6 py-4'>
      <div className='flex justify-between items-center'>
        <Link className='text-xl font-bold text-gray-900' href='/'>
          GitTix
        </Link>
        <ul className='flex items-center gap-6'>{links}</ul>
      </div>
    </nav>
  );
}
