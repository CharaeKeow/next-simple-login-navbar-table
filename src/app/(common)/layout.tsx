import { Navbar } from '@/components/navbar/navbar';
import { AuthProvider } from '@/features/auth/contexts/auth-provider';
import { cookies } from 'next/headers';

export default async function CommonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Check session from cookie
  const session = (await cookies()).get('session');

  return (
    <AuthProvider isAuth={session ? true : false}>
      <Navbar />
      {children}
    </AuthProvider>
  );
}
