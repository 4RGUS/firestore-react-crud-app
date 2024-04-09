import React from 'react';
import { formatDate } from '../../utils/formatDate';
import { Expense } from './types';

type TableProp = {
  expenses: Expense[] | undefined;
  handleEdit: (id: string) => void;
  handleDelete: (id: string) => void;
}

const Table = ({ expenses, handleEdit, handleDelete }: TableProp) => {

  return (
    <div className="contain-table">
      <table className="striped-table">
        <thead>
          <tr>
            <th>Expense name</th>
            <th>Amount</th>
            <th>Paid amount</th>
            <th>Last date</th>
            <th>Paid date</th>
            <th>comments</th>
            <th colSpan={2} className="text-center">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {expenses ? (
            expenses.map((expense, i) => (
              <tr key={expense.id}>
                <td>{expense.expense_name}</td>
                <td>{expense.amount}</td>
                <td>{expense.amount_paid}</td>
                <td>{formatDate(expense.last_date)}</td>
                <td>{formatDate(expense.paid_date)}</td>
                <td>{expense.remarks} </td>
                <td className="text-right">
                  <button
                    onClick={() => handleEdit(expense.id)}
                    className="button muted-button"
                  >
                    Edit
                  </button>
                </td>
                <td className="text-left">
                  <button
                    onClick={() => handleDelete(expense.id)}
                    className="button muted-button"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7}>No expenses</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
