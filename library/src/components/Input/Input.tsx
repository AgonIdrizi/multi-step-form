import React from 'react';
import './Input.css'

const Input = ({ field, form, ...props }:any) => {
  return ( <input {...field} {...props}  />);
}

export default Input;
