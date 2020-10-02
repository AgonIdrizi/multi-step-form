import React from 'react';

const Input = ({ field, form, ...props }) => {
  return ( <input {...field} {...props}  />);
}

export default Input;
