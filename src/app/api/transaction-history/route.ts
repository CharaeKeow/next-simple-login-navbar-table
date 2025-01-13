import { TransactionHistory } from '@/features/transaction-history/types';
import {
  GetTransactionHistoryError,
  GetTransactionHistorySuccess,
} from '@/types/api';
import { getAuthCookie } from '@/utils/cookies';
import { NextResponse } from 'next/server';

const mockTransactionHistoryData: TransactionHistory[] = [
  {
    date: new Date('12-08-2023'),
    amount: 400,
    recipient: 'BloomThis',
    recipientReference: 'Flower payment',
    transactionId: '123-123-123',
    type: 'Bank Transfer',
  },
  {
    date: new Date('07-13-2023'),
    amount: 150,
    recipient: 'MARA',
    recipientReference: 'Study loan payment',
    transactionId: '321-123-321',
    type: 'Bank Transfer',
  },
  {
    date: new Date('12-09-2023'),
    amount: 10,
    recipient: 'Mr. X',
    recipientReference: 'Lunch (nasi goreng kampung)',
    transactionId: '888-999-123',
    type: 'DuitNow Payment',
  },
];

export const GET = async (): Promise<
  NextResponse<GetTransactionHistorySuccess | GetTransactionHistoryError>
> => {
  try {
    const session = await getAuthCookie();

    if (!session) {
      return NextResponse.json(
        {
          message: 'Unauthorized',
        },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { transactions: mockTransactionHistoryData },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }

    return NextResponse.json(
      { message: 'Something went wrong' },
      { status: 500 }
    );
  }
};
