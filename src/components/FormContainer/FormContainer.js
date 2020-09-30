import React, { useState } from 'react';
import Form from './Form/Form';
import * as yup from 'yup';

const schema = yup.object({
  username: yup
    .string()
    .required()
    .min(3),
  password: yup
    .string()
    .required('No password provided.')
    .min(8, 'Password is too short - should be 8 chars minimum.')
    .matches(/[a-zA-Z]/, "Password must be aplhanumeric.")
})
const fields = ['username', 'password']
const FormContainer = () => {
  const [form1isValid, setForm1IsValid] = useState(false)
  
  return (
    <div>
      <Form schema={schema} setForm1IsValid={setForm1IsValid} />
    </div>
  );
}

export default FormContainer;
