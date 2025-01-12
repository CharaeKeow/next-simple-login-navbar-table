import { TransactionHistoryView } from '@/features/transaction-history/components/transaction-history-view/transaction-history-view';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function TransactionHistoryPage() {
  const isAuthenticated = (await cookies()).get('session');

  // Ideally auth check this should sits in middleware layer or server component. But for the purpose of this test app,
  // we're just doing the check on client side
  if (!isAuthenticated) {
    redirect('/login');
  }

  return <TransactionHistoryView />;
}
