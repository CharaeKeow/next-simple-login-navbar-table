import {
  GetTransactionHistoryError,
  GetTransactionHistorySuccess,
} from "@/types/api";
import { useQuery } from "@tanstack/react-query";

type UseGetTransactionHistoryParams = {
  enabled: boolean | undefined;
};

export const useGetTransactionHistory = ({
  enabled = true,
}: UseGetTransactionHistoryParams) => {
  return useQuery({
    queryKey: ["transaction-history"],
    queryFn: async () => {
      const res = await fetch("/api/transaction-history");

      if (res.status === 500) {
        const resData: GetTransactionHistoryError = await res.json();

        throw new Error(resData.message);
      }

      const resData: GetTransactionHistorySuccess = await res.json();
      return resData.transactions;
    },
    enabled,
  });
};
