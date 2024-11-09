import React from 'react';
import { useAuth } from './authContext'; // Import the useAuth hook from your AuthContext

const Log = () => {
  const { logout } = useAuth(); // Destructure the logout function from useAuth

  const handleLogout = () => {
    logout(); // Call the logout function
  };

  return (
    <button onClick={handleLogout}>Logout</button> // Render a button that triggers logout on click
  );
};

export default Log;