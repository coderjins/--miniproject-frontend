import React from 'react';
import '../style/sass/inputBox.scss';

const inputBox = ({ className, children }) => {
  return <button className={`button ${className}`}>{children}</button>;
};

export default inputBox;
