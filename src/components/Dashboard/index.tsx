import React, { useState, useEffect, Dispatch, SetStateAction } from 'react';
import Swal from 'sweetalert2';

import Header from './Header';
import Table from './Table';
import Add from './Add';
import Edit from './Edit';

import { getExpenseHandle } from '../../config/firestore'
import { Expense } from './types';


const Dashboard = ({ setIsAuthenticated }: { setIsAuthenticated: (value: boolean) => void }) => {
  const [expenses, setExpenses] = useState<Expense[]>();
  const [selectedExpense, setSelectedExpense] = useState<Expense>();


  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleSetExpenses = (expenses:Expense[]|undefined) => {
    setExpenses(expenses)
  }

  const handleSetIsAdding = (value:boolean) => {
    console.log(value)
    setIsAdding(value)
  }

  const getExpenses = async () => {
    const expenses = await getExpenseHandle("expense_jan_2024")
    setExpenses(expenses)
  }

  useEffect(() => {
    // TODO: create getEmployees function and call it here
    getExpenses();
  }, []);

  const handleEdit = (id: string) => {
    if (expenses) {
      const [expense] = expenses.filter(expense => expense.id === id);
      setSelectedExpense(expense);
      setIsEditing(true);
    }
  };

  const handleDelete = (id:string) => {
    Swal.fire({
      icon: 'warning',
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
    }).then(result => {
      if (result.value && expenses) {
        const [expense] = expenses.filter(expense => expense.id === id);

        // TODO delete document

        Swal.fire({
          icon: 'success',
          title: 'Deleted!',
          text: `${expense.expense_name} has been deleted.`,
          showConfirmButton: false,
          timer: 1500,
        });

        const expenseCopy = expenses.filter(expense => expense.id !== id);
        setExpenses(expenseCopy);
      }
    });
  };

  return (
    <div className="container">
      {!isAdding && !isEditing && (
        <>
          <Header
            setIsAdding={handleSetIsAdding}
            setIsAuthenticated={setIsAuthenticated}
          />
          <Table
            expenses={expenses}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        </>
      )}
      {isAdding && (
        <Add
          setIsAdding={handleSetIsAdding}
        />
      )}
      {isEditing && (
        <Edit
          expenses={expenses}
          selectedExpense={selectedExpense}
          setExpenses={handleSetExpenses}
          setIsEditing={setIsEditing}
        />
      )}
    </div>
  );
};

export default Dashboard;
