import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { Expense } from './types';
import { formatDate } from '../../utils/formatDate';
import { Timestamp } from 'firebase/firestore';
import { setDocHandle } from '../../config/firestore';
import { COLLECTION_NAME } from '../../constants';

type AddProps = {
  setIsAdding: (value: boolean) => void;
  getExpenses:  () => Promise<void>
}

const Add = ({ setIsAdding, getExpenses }: AddProps) => {
  const [expenseName, setExpenseName] = useState('');
  const [amount, setAmount] = useState(0);
  const [lastDate, setLastDate] = useState("");
  const [paidAmount, setPaidAmount] = useState(0);
  const [paidDate, setPaidDate] = useState("");
  const [remarks, setRemarks] = useState("");

  const handleAdd = (e: any) => {
    e.preventDefault();
    if (!expenseName || !amount || !lastDate || !paidAmount || !paidDate || !remarks) {
      return Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'All fields are required.',
        showConfirmButton: true,
      });
    }

    const newExpense: Omit<Expense, 'id'> = {
      expense_name: expenseName,
      amount,
      amount_paid: paidAmount,
      last_date: Timestamp.fromDate(new Date(lastDate)),
      paid_date: Timestamp.fromDate(new Date(paidDate)),
      remarks
    }

    setDocHandle(COLLECTION_NAME, newExpense).then(() => {
      Swal.fire({
        icon: 'success',
        title: 'Added!',
        text: `${expenseName} has been Added.`,
        showConfirmButton: false,
        timer: 1500,
      });
      getExpenses()
      setIsAdding(false)
    })
  };

  return (
    <div className="small-container">
      <form onSubmit={handleAdd}>
        <h1>Add Expense</h1>
        <label htmlFor="expenseName">Expense Name</label>
        <input
          id="expenseName"
          type="text"
          name="expenseName"
          value={expenseName}
          onChange={e => setExpenseName(e.target.value)}
        />
        <label htmlFor="amount">Amount(₹)</label>
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
          value={lastDate}
          onChange={e => setLastDate(e.target.value)}
        />
        <label htmlFor="paidAmount">Paid Amount(₹)</label>
        <input
          id="paidAmount"
          type="number"
          name="paidAmount"
          value={paidAmount}
          onChange={e => setPaidAmount(parseFloat(e.target.value))}
        />
        <label htmlFor="paidDate">Paid Date</label>
        <input
          id="paidDate"
          type="date"
          name="paidDate"
          value={paidDate}
          onChange={e => setPaidDate(e.target.value)}
        />
        <label htmlFor="remarks">Remarks</label>
        <input
          id="remarks"
          type="text"
          name="remarks"
          value={remarks}
          onChange={e => setRemarks(e.target.value)}
        />
        <div style={{ marginTop: '30px' }}>
          <input onClick={handleAdd} type="submit" value="Add" />
          <input
            style={{ marginLeft: '12px' }}
            className="muted-button"
            type="button"
            value="Cancel"
            onClick={() => setIsAdding(false)}
          />
        </div>
      </form>
    </div>
  );
};

export default Add;
