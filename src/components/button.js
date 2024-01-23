import React from 'react';
import '../style/sass/button.scss';

const Button = ({ onClick, className, disabled, children }) => {
  return (
    <button
      onClick={onClick}
      className={`button ${className}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
