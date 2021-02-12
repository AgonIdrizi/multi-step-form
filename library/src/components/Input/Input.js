import React from 'react';
import './Input.css'

const Input = ({ field, form, ...props }) => {
  return ( <input {...field} {...props}  />);
}

export default Input;
