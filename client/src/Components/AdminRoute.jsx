// components/AdminRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const AdminRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  const isAdmin = JSON.parse(localStorage.getItem('isAdmin')); // Fetch isAdmin from local storage or auth context

  return token && isAdmin ? children : <Navigate to="/login" />;
};

export default AdminRoute;
