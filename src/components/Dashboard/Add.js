import React, { useState } from 'react';
import Swal from 'sweetalert2';

const Add = ({ expenses, setExpenses, setIsAdding }) => {
  const [firstName, setFirstName] = useState('');
  const [expenseName, setExpenseName] = useState('');
  const [amount, setAmount] = useState(0);
  const [lastDate, setLastDate] = useState("");
  const [paidAmount, setPaidAmount] = useState(0);
  const [paidDate, setPaidDate] = useState("");
  const [remarks, setRemarks] = useState("");

  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [salary, setSalary] = useState('');
  const [date, setDate] = useState('');

  const handleAdd = e => {
    // e.preventDefault();

    // if (!firstName || !lastName || !email || !salary || !date) {
    //   return Swal.fire({
    //     icon: 'error',
    //     title: 'Error!',
    //     text: 'All fields are required.',
    //     showConfirmButton: true,
    //   });
    // }

    // const newEmployee = {
    //   firstName,
    //   lastName,
    //   email,
    //   salary,
    //   date,
    // };

    // employees.push(newEmployee);

    // // TODO: Add doc to DB

    // setEmployees(employees);
    // setIsAdding(false);

    // Swal.fire({
    //   icon: 'success',
    //   title: 'Added!',
    //   text: `${firstName} ${lastName}'s data has been Added.`,
    //   showConfirmButton: false,
    //   timer: 1500,
    // });
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
          onChange={e => setAmount(e.target.value)}
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
          onChange={e => setPaidAmount(e.target.value)}
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
          <input type="submit" value="Add" />
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
