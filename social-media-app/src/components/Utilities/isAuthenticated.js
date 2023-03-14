import React from 'react'

const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  if (!token) {
    return false;
  }

  return true;
}

export default isAuthenticated