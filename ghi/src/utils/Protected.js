import React from 'react';
import { Navigate, Outlet } from "react-router-dom";


const Protected = ({ token }) => {
    if (token === undefined){
    return null
  }
  return (

    token === null ?
      <Navigate to="/" replace />
      :
      <Outlet />
  );
};

export default Protected;
