import { AuthFormView } from '@/features/auth/components/auth-form-view/auth-form-view';
// import { getAuthCookie } from '@/utils/cookies';
// import { redirect } from 'next/navigation';

export default async function LoginPage() {
  // Redirect to other page if access login when already logged in. Ideally this can be done in middleware as well
  // Note: Removed because user can't see the successful login message (as outlined in the requirement)
  // const session = await getAuthCookie();

  // if (session) {
  //   redirect('/transaction-history');
  // }

  return <AuthFormView />;
}
