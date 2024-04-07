import React, { useState, useEffect } from 'react';

import Login from '../Login';
import Dashboard from '../Dashboard';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean|null>(null);

  const handleSetAuthenticated = (value:boolean) => {
    setIsAuthenticated(value);
  }

  useEffect(() => {
    setIsAuthenticated(JSON.parse(localStorage.getItem('is_authenticated') as string));
  }, []);

  return (
    <>
      {isAuthenticated ? (
        <Dashboard setIsAuthenticated={handleSetAuthenticated} />
      ) : (
        <Login setIsAuthenticated={setIsAuthenticated} />
      )}
    </>
  );
};

export default App;
