import { Timestamp } from "firebase/firestore";

export type Expense = {
  id: string;
  expense_name: string;
  amount: number;
  last_date: Timestamp;
  paid_date: Timestamp;
  amount_paid: number;
  remarks: string;
};
