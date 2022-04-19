// Libraries
import React from 'react';
import { Navigate, Route, useLocation } from 'react-router-dom';

function PrivateRoute({ children: Children, redirectTo }) {
  const isAuth = localStorage.getItem('token')
  let location = useLocation();
  if (!isAuth) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />
  }
  return Children
}

export default PrivateRoute;