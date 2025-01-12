export type TransactionHistory = {
  date: Date;
  referenceId: string;
  recipient: string;
  recipientReference: string;
  type: "DuitNow Payment" | "Bank Transfer";
  amount: number;
};
