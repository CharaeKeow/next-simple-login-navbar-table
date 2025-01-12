import { TransactionHistory } from "@/features/transaction-history/types";
import {
  GetTransactionHistoryError,
  GetTransactionHistorySuccess,
} from "@/types/api";
import { NextResponse } from "next/server";

const mockTransactionHistoryData: TransactionHistory[] = [
  {
    date: new Date("12-08-2023"),
    amount: 400,
    recipient: "BloomThis",
    recipientReference: "Flower payment",
    referenceId: "123-123-123",
    type: "Bank Transfer",
  },
  {
    date: new Date("07-13-2023"),
    amount: 150,
    recipient: "MARA",
    recipientReference: "Study loan payment",
    referenceId: "321-123-321",
    type: "Bank Transfer",
  },
  {
    date: new Date("12-09-2023"),
    amount: 10,
    recipient: "Mr. X",
    recipientReference: "Lunch (nasi goreng kampung)",
    referenceId: "888-999-123",
    type: "DuitNow Payment",
  },
];

// Note: Ideally this API route should be auth protected, but that is out of scope of this app
export const GET = async (): Promise<
  NextResponse<GetTransactionHistorySuccess | GetTransactionHistoryError>
> => {
  try {
    return NextResponse.json(
      { transactions: mockTransactionHistoryData },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }

    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
};
