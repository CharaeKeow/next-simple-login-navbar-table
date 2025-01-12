"use client";

import { useAuth } from "@/features/auth/contexts/auth-provider";
import { redirect } from "next/navigation";
import { useGetTransactionHistory } from "../../hooks/use-get-transaction-history";

export const TransactionHistoryView = () => {
  const { isAuthenticated } = useAuth();

  const { data, isLoading, error } = useGetTransactionHistory({
    enabled: isAuthenticated,
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

  console.log({ data, error, isLoading });

  return <div>Transaction history page</div>;
};
