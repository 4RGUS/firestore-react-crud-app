import React, { useState, useEffect, Dispatch, SetStateAction } from 'react';
import Swal from 'sweetalert2';

import Header from './Header';
import Table from './Table';
import Add from './Add';
import Edit from './Edit';

import { deleteExpenseHandle, getExpenseHandle } from '../../config/firestore'
import { Expense } from './types';
import { COLLECTION_NAME } from '../../constants';


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

        deleteExpenseHandle(COLLECTION_NAME, expense.id).then(async()=>{
          Swal.fire({
            icon: 'success',
            title: 'Deleted!',
            text: `${expense.expense_name} has been deleted.`,
            showConfirmButton: false,
            timer: 1500,
          });
  
        await getExpenses()
        })

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
          getExpenses={getExpenses}
        />
      )}
      {isEditing && (
        <Edit
          selectedExpense={selectedExpense}
          setIsEditing={setIsEditing}
          getExpenses={getExpenses}
        />
      )}
    </div>
  );
};

export default Dashboard;
