import React from 'react';

import Logout from '../Logout';

type HeaderProp = {
  setIsAdding: (value:boolean) => void;
  setIsAuthenticated: (value:boolean) => void;
}

const Header = ({ setIsAdding, setIsAuthenticated }:HeaderProp) => {
  return (
    <header>
      <h1>Expense Tracker</h1>
      <div style={{ marginTop: '30px', marginBottom: '18px' }}>
        <button onClick={() => setIsAdding(true)}>Add Expense</button>
        <Logout setIsAuthenticated={setIsAuthenticated} />
      </div>
    </header>
  );
};

export default Header;