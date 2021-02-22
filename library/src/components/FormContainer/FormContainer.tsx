import React, { useState, useEffect } from 'react';
import * as yup from 'yup';
import Form from '../Form/Form';
import {IObjectKeys} from '../types.dt'
import './FormContainer.css';

type User = yup.InferType<{username: string, password: string}>


type fieldType = {} | IObjectKeys


interface IFormsValidityObj {
  [key: string]: { valid: boolean, fields: fieldType } 
}


const schema1: any = yup.object({
  username: yup.string().required().min(3),
  password: yup
    .string()
    .required('No password provided.')
    .min(8, 'Password is too short - should be 8 chars minimum.')
    .matches(/[a-zA-Z]/, 'Password must be aplhanumeric.'),
});

const schema2: any = yup.object({
  address: yup.string().required().min(3),
  city: yup.string().required('city is required.').min(2).max(20),
});

const schema3: any = yup.object({
  phone: yup.string().required().min(3).max(9),
});
const schemaArray: IObjectKeys[] = [schema1, schema2, schema3];

const FormContainer = ({displaySteps = true, title = "Title"}) => {
  const [stepSelected, setStepSelected] = useState(0);
  const [formsValidityObj, setFormsValidityObj] = useState<IFormsValidityObj>({})

  useEffect(() => {
    let formsObject: IObjectKeys | any  = {};
    schemaArray.map((schema:any, id: number|string|any) => {
      let fieldsObject: IObjectKeys | any = {};
      Object.keys(schema.fields).map(
        (elem) => (fieldsObject[elem] = '')
      );
      formsObject[id] = { valid: false, fields: fieldsObject };
    });
    setFormsValidityObj(formsObject);
  }, []);

  const handleFormValidity = (isValid: boolean, formNumber: number, fieldValues:IObjectKeys) => {
    setFormsValidityObj({
      ...formsValidityObj,
      [`${formNumber}`]: { valid: isValid, fields: fieldValues },
    });
  };

  const onBackButtonHandler = () => {
    setStepSelected(stepSelected - 1);
  };

  const onNextButtonHandler = () => {
    if (formsValidityObj[`${stepSelected}`])
      setStepSelected(stepSelected + 1);
  };

  const displayBackNextButtons = () => {
    if (stepSelected === 0) {
      return (
        <div className="nextButton">
          <button
            disabled={!formsValidityObj[`${stepSelected}`].valid}
            onClick={onNextButtonHandler}
          >
            next
          </button>
        </div>
      );
    }

    if (
      stepSelected !== 0 &&
      stepSelected !== schemaArray.length - 1
    ) {
      return (
        <div className="stepButtons">
          <button onClick={onBackButtonHandler}>back</button>
          <button
            disabled={!formsValidityObj[`${stepSelected}`].valid}
            onClick={onNextButtonHandler}
          >
            next
          </button>
        </div>
      );
    }
    if (stepSelected === schemaArray.length - 1) {
      return (
        <div className="backButton">
          <button onClick={onBackButtonHandler}>back</button>
        </div>
      );
    }
  };

  if (Object.keys(formsValidityObj).length === 0) return null;
  return (
    <div className="FormContainer">
      <span className="steps">
        Steps: {stepSelected + 1} /{' '}
        {Object.keys(formsValidityObj).length}
      </span>
      <h2>{title}</h2>
      {Object.keys(formsValidityObj).map(
        (elem) =>
          stepSelected === Number(elem) && (
            <Form
              key={elem}
              schema={schemaArray[stepSelected]}
              fields={{ ...formsValidityObj[stepSelected].fields }}
              formNumber={stepSelected}
              handleFormValidity={handleFormValidity}
            />
          )
      )}
      <div>agon</div>
      {displayBackNextButtons()}
    </div>
  );
};

export default FormContainer;
