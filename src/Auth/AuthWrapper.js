// AuthWrapper.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const AuthWrapper = ({ isAuthenticated, children }) => {
  const navigate = useNavigate();

  if (!isAuthenticated) {
    navigate('/'); // Redirect to the login page if not authenticated
    return null; // Return null to prevent rendering children until the redirect takes place.
  }

  return <>{children}</>;
};

export default AuthWrapper;
