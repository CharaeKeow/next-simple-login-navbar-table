import { TransactionHistory } from "@/features/transaction-history/types";

type ApiErrorResponse = { message: string };

export type GetSecureWordRequestBody = { username: string };
export type GetSecureWordRequestResponseSuccess = { secureWord: string };
export type GetSecureWordRequestResponseError = ApiErrorResponse;

export type PostLoginRequestBody = { username: string; password: string };
export type PostLoginResponseSuccess = { success: true };
export type PostLoginResponseError = ApiErrorResponse;

export type GetTransactionHistorySuccess = {
  transactions: TransactionHistory[];
};
export type GetTransactionHistoryError = ApiErrorResponse;
