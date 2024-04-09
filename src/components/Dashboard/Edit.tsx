import React, { DetailedHTMLProps, FormEventHandler, FormHTMLAttributes, useState } from 'react';
import Swal from 'sweetalert2';
import { Expense } from './types';
import { createTimeStamp, formatDate } from '../../utils/formatDate';
import { Timestamp } from 'firebase/firestore';
import { editExpenseHandle } from '../../config/firestore';
import { COLLECTION_NAME } from '../../constants';

type EditProps = {
  selectedExpense: Expense | undefined,
  setIsEditing: (value: boolean) => void;
  getExpenses: () => Promise<void>
}

const Edit = ({ selectedExpense, setIsEditing, getExpenses }: EditProps) => {
  const id = selectedExpense?.id ?? "00";
  console.log(selectedExpense)
  const [expenseName, setExpenseName] = useState(selectedExpense?.expense_name);
  const [amount, setAmount] = useState(selectedExpense?.amount);
  const [lastDate, setLastDate] = useState(selectedExpense?.last_date);
  const [paidDate, setPaidDate] = useState(selectedExpense?.paid_date);
  const [paidAmount, setPaidAmount] = useState(selectedExpense?.amount_paid);
  const [remarks, setRemarks] = useState(selectedExpense?.remarks);

  const handleUpdate = (e: any) => {
    e.preventDefault();

    if (!expenseName || !amount || !lastDate || !paidDate || !paidAmount) {
      return Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'All fields are required.',
        showConfirmButton: true,
      });
    }

    if (selectedExpense) {

      const expense: Expense = {
        id: selectedExpense?.id,
        expense_name: expenseName,
        amount: amount,
        amount_paid: paidAmount,
        last_date: lastDate,
        paid_date: paidDate,
        remarks: remarks ?? ""
      }

      // TODO: Update document
      editExpenseHandle(COLLECTION_NAME, selectedExpense.id,expense)
      setIsEditing(false);
      getExpenses();
      Swal.fire({
        icon: 'success',
        title: 'Updated!',
        text: `"${expense.expense_name}" expense has been updated.`,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <div className="small-container">
      <form onSubmit={handleUpdate}>
        <h1>Edit Expense</h1>
        <label htmlFor="expenseName">Expense Name</label>
        <input
          id="expenseName"
          type="text"
          name="expenseName"
          value={expenseName}
          onChange={e => setExpenseName(e.target.value)}
        />
        <label htmlFor="amount">Amount</label>
        <input
          id="amount"
          type="number"
          name="amount"
          value={amount}
          onChange={e => setAmount(parseFloat(e.target.value))}
        />
        <label htmlFor="lastDate">Last Date</label>
        <input
          id="lastDate"
          type="date"
          name="lastDate"
          value={formatDate(lastDate ?? createTimeStamp(new Date()))}
          onChange={e => setLastDate(createTimeStamp(e.target.value))}
        />
        <label htmlFor="paidAmount">Paid amount(₹)</label>
        <input
          id="paidAmount"
          type="number"
          name="paidAmount"
          value={paidAmount}
          onChange={e => setPaidAmount(parseFloat(e.target.value))}
        />
        <label htmlFor="paidDate">Paid date</label>
        <input
          id="paidDate"
          type="date"
          name="paidDate"
          value={formatDate(paidDate ?? createTimeStamp(new Date()))}
          onChange={e => setPaidDate(createTimeStamp(e.target.value))}
        />
        <label htmlFor="paidDate">Remarks</label>
        <input
          id="paidDate"
          type="date"
          name="paidDate"
          value={remarks}
          onChange={e => setRemarks(e.target.value)}
        />
        <div style={{ marginTop: '30px' }}>
          <input type="submit" value="Update" />
          <input
            style={{ marginLeft: '12px' }}
            className="muted-button"
            type="button"
            value="Cancel"
            onClick={() => setIsEditing(false)}
          />
        </div>
      </form>
    </div>
  );
};

export default Edit;
