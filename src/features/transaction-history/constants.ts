import { TransactionHistory } from './types';

type Column<T> = {
  key: keyof T;
  label: string;
};

export const TRANSACTIONS_TABLE_COLUMNS: Column<TransactionHistory>[] = [
  {
    key: 'date',
    label: 'Date',
  },
  {
    key: 'transactionId',
    label: 'Reference ID',
  },
  {
    key: 'recipient',
    label: 'To',
  },
  {
    key: 'type',
    label: 'Transaction Type',
  },
  {
    key: 'amount',
    label: 'Amount',
  },
] as const;
