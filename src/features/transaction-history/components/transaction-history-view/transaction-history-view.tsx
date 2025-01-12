"use client";

import { useAuth } from "@/features/auth/contexts/auth-provider";
import { redirect } from "next/navigation";
import { useGetTransactionHistory } from "../../hooks/use-get-transaction-history";
import { TRANSACTIONS_TABLE_COLUMNS } from "../../constants";
import { formatDate } from "../../utils/format-date";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/table/table";
import { cn } from "@/utils/cn";

export const TransactionHistoryView = () => {
  const { isAuthenticated } = useAuth();

  // Opted to fetch transaction history data on client side instead since auth state is only available on the client
  // (as we're using provider). Setting `enabled` to `false` means the transaction data won't be fetched unless
  // user is authenticated
  const {
    data: transactions,
    isLoading,
    error,
  } = useGetTransactionHistory({
    enabled: true,
  });

  // Ideally auth check this should sits in middleware layer or server component. But for the purpose of this test app,
  // we're just doing the check on client side
  if (!isAuthenticated) {
    redirect("/login");
  }

  if (isLoading) {
    return <div>Fetching transactions data...</div>;
  }

  if (error) {
    return <div>Error fetching transaction data: {error.message}</div>;
  }

  return (
    <div>
      <Table>
        <TableHeader className="bg-gray-100">
          <TableRow>
            {TRANSACTIONS_TABLE_COLUMNS.map((header) => (
              <TableHead
                className={cn(header.key === "amount" && "text-right pr-6")}
                key={header.key}
              >
                {header.label}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions?.map((transaction, index) => {
            return (
              <TableRow key={index} className="border-b">
                {/* TODO: Transaction.date is string (cos it's returned from API), but TS detects it as Date format. To revisit this if time permits */}
                <TableCell>{formatDate(new Date(transaction.date))}</TableCell>
                <TableCell>{transaction.transactionId}</TableCell>
                <TableCell>
                  <div className="font-semibold">{transaction.recipient}</div>
                  <div className="text-gray-500 font-normal">
                    {transaction.recipientReference}
                  </div>
                </TableCell>
                <TableCell>{transaction.type}</TableCell>
                <TableCell className="text-right pr-6">
                  {transaction.amount}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};
