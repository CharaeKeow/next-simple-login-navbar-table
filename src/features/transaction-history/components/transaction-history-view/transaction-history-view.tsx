"use client";

import { useAuth } from "@/features/auth/contexts/auth-provider";
import { redirect } from "next/navigation";

export const TransactionHistoryView = () => {
  const { isAuthenticated } = useAuth();

  // Ideally auth check this should sits in middleware layer or server component. But for the purpose of this test app,
  // we're just doing the check on client side
  if (!isAuthenticated) {
    redirect("/login");
  }

  return <div>Transaction history page</div>;
};
