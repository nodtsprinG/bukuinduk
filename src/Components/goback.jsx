import React from 'react';
import { Link } from 'react-router-dom';

const GoBackButton = ({ to ,className = "text-white", children }) => {
  return (
    <Link to={to} className={` ${className}`}>
      {children || "Kembali"}
    </Link>
  );
};

export default GoBackButton;
