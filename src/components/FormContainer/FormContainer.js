import React, { useState } from 'react';
import Form from './Form/Form';
import * as yup from 'yup';

const schema1 = yup.object({
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
    .string()
    .required()
    .min(3)
    .max(9)
})
const schemaArray=[schema1, schema2, schema3]


const FormContainer = () => {
  const [stepSelected, setStepSelected] = useState(0)
  const [formsValidityObj, setFormsValidityObj] = useState(
    {
      0: {valid: false, fields: {username: '', password:''}}, 
      1: {valid: false, fields: {address: '', city:''}}, 
      2: {valid: false, fields: {phone: ''}} 
    })


  const handleFormValidity = (isValid, formNumber, fieldValues) => {
    setFormsValidityObj({...formsValidityObj, [`${formNumber}`]: {valid: isValid, fields: fieldValues}})
  }

  const handleFormFieldChanges = (formNumber, fieldValues) => {
    setFormsValidityObj({...formsValidityObj, [`${formNumber}`]: {valid: formsValidityObj[`${formNumber}`].valid, fields: fieldValues}})
  }

  const onBackButtonHandler = () => {
    setStepSelected(stepSelected - 1)
  }

  const onNextButtonHandler = () => {
    if (formsValidityObj[`${stepSelected}`]) setStepSelected(stepSelected + 1)
  }

  const displayBackNextButtons = () => {
    if(stepSelected === 0) {
      return (<button disabled={!formsValidityObj[`${stepSelected}`].valid} onClick={onNextButtonHandler}>next</button>)
    }
    
    if(stepSelected !== 0 && stepSelected !== schemaArray.length -1) {
      return (
            <>
              <button onClick={onBackButtonHandler}>back</button>
              <button disabled={!formsValidityObj[`${stepSelected}`].valid} onClick={onNextButtonHandler}>next</button>
            </>
      )
      
    }
    if(stepSelected === schemaArray.length-1) {
      return (<button onClick={onBackButtonHandler}>back</button>)
      
    }
  }

  return (
    <div>
      {console.log('Form container renders')}
      { stepSelected === 0 && <Form 
        schema={schemaArray[stepSelected]} 
        fields={{...formsValidityObj[0].fields}} 
        formNumber={stepSelected} 
        handleFormFieldChanges={handleFormFieldChanges} 
        handleFormValidity={handleFormValidity} 
      /> }
      { stepSelected === 1 && <Form 
        schema={schemaArray[stepSelected]} 
        fields={{...formsValidityObj[stepSelected].fields}} 
        formNumber={stepSelected} 
        handleFormFieldChanges={handleFormFieldChanges} 
        handleFormValidity={handleFormValidity} 
      /> }
      { stepSelected === 2 && <Form 
        schema={schemaArray[stepSelected]} 
        fields={{...formsValidityObj[stepSelected].fields}} 
        formNumber={stepSelected} 
        handleFormFieldChanges={handleFormFieldChanges} 
        handleFormValidity={handleFormValidity} 
      /> }
     
      {displayBackNextButtons()}
    </div>
  );
}

export default FormContainer;
