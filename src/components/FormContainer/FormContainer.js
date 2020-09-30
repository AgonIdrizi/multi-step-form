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
const steps = ['form1', 'form2']

const FormContainer = () => {
  const [stepSelected, setStepSelected] = useState(0)
  const [form1isValid, setForm1IsValid] = useState(false)
  const [formsValidityObj, setFormsValidityObj] = useState({0: true, 1: false})


  const onBackButtonHandler = () => {
    setStepSelected(stepSelected - 1)
  }

  const onNextButtonHandler = () => {
    if (formsValidityObj[`${stepSelected}`]) setStepSelected(stepSelected + 1)
  }

  const displayBackNextButtons = () => {
    if(stepSelected == 0) {
      return (<button onClick={onNextButtonHandler}>next</button>)
      
    }
    
    if(stepSelected !== 0 && stepSelected !== steps.length -1) {
      return(<><button onClick={onBackButtonHandler}>back</button>
      <button onClick={onNextButtonHandler}>next</button></>)
      
    }
    if(stepSelected === steps.length-1) {
      return(<button onClick={onBackButtonHandler}>back</button>)
      
    }
  }

  return (
    <div>
      <Form schema={schema} formNumber={0} formsValidityObj={formsValidityObj} setFormsValidityObj={setFormsValidityObj} setForm1IsValid={setForm1IsValid} form1isValid={form1isValid} />
      {displayBackNextButtons()}
    </div>
  );
}

export default FormContainer;
