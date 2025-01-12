import { TransactionHistoryView } from '@/features/transaction-history/components/transaction-history-view/transaction-history-view';
import { getAuthCookie } from '@/utils/cookies';
import { redirect } from 'next/navigation';

export default async function TransactionHistoryPage() {
  const session = await getAuthCookie();

  // Ideally auth check this should sits in middleware layer or server component. But for the purpose of this test app,
  // we're just doing the check on client side
  if (!session) {
    redirect('/login');
  }

  return <TransactionHistoryView />;
}
