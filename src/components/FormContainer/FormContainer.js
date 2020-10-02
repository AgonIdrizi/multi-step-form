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

const schema2 = yup.object({
  address: yup
    .string()
    .required()
    .min(3),
  city: yup
    .string()
    .required('city is required.')
    .min(2)
    .max(20)
    
})

const schema3 = yup.object({
  phone: yup
    .number()
    .required()
    .min(3)
    .max(9)
})

const fields = ['username', 'password']
const steps = ['form1', 'form2']

const FormContainer = () => {
  const [stepSelected, setStepSelected] = useState(0)
  const [formsValidityObj, setFormsValidityObj] = useState({0: false, 1: false, 2: false})


  const handleFormValidity = (isValid, formNumber) => {
    console.log('handleFormValidity', isValid)
    console.log('formsValidityObj[`${formNumber}`]',formsValidityObj[`${formNumber}`])
      setFormsValidityObj({...formsValidityObj, [`${formNumber}`]: isValid})
  }

  const onBackButtonHandler = () => {
    setStepSelected(stepSelected - 1)
  }

  const onNextButtonHandler = () => {
    if (formsValidityObj[`${stepSelected}`]) setStepSelected(stepSelected + 1)
  }

  const displayBackNextButtons = () => {
    if(stepSelected == 0) {
      return (<button disabled={!formsValidityObj[`${stepSelected}`]} onClick={onNextButtonHandler}>next</button>)
      
    }
    
    if(stepSelected !== 0 && stepSelected !== steps.length -1) {
      return(<><button onClick={onBackButtonHandler}>back</button>
      <button disabled={!formsValidityObj[`${stepSelected}`]} onClick={onNextButtonHandler}>next</button></>)
      
    }
    if(stepSelected === steps.length-1) {
      return(<button onClick={onBackButtonHandler}>back</button>)
      
    }
  }

  return (
    <div>
      <Form schema={schema} formNumber={0} handleFormValidity={handleFormValidity} />
      <Form schema={schema} formNumber={1} handleFormValidity={handleFormValidity} />
      <Form schema={schema} formNumber={2} handleFormValidity={handleFormValidity} />
      {displayBackNextButtons()}
    </div>
  );
}

export default FormContainer;
