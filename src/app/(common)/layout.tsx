import { Navbar } from '@/components/navbar/navbar';
import { AuthProvider } from '@/features/auth/contexts/auth-provider';
import { getAuthCookie } from '@/utils/cookies';

export default async function CommonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Check session from cookie
  const session = await getAuthCookie();

  return (
    <AuthProvider isAuth={session ? true : false}>
      <Navbar />
      {children}
    </AuthProvider>
  );
}
