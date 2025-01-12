export type TransactionHistory = {
  date: Date;
  transactionId: string;
  recipient: string;
  recipientReference: string;
  type: "DuitNow Payment" | "Bank Transfer";
  amount: number;
};
