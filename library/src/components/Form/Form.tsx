import React, { useState, useEffect, useRef } from 'react';
import { Formik, Form, Field, useFormikContext } from 'formik';
import Input from '../Input/Input';
import Label from '../Label/Label';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import { upperCaseFirstLetter } from '../../utility/helpers';
import { IObjectKeys } from '../types.dt';
import './Form.css';

const FormFields = ({
  localFormFields,
  handleFormValidity,
  formNumber,
}): JSX.Element => {
  const {
    values,
    isValid,
    handleChange,
    setValues,
  } = useFormikContext();

  useEffect(() => {
    handleFormValidity(isValid, formNumber, values);
  }, [values, isValid]);

  return (
    <>
      {Object.keys(localFormFields).map(
        (field: string | any, id: number): JSX.Element => (
          <div key={id}>
            <Label key={field} name={upperCaseFirstLetter(field)} />
            <Field
              key={field + id}
              id={field}
              label={upperCaseFirstLetter(field)}
              name={field}
              onChange={(e: any) => {
                handleChange(e);
              }}
              placeholder={upperCaseFirstLetter(field)}
              component={Input}
            />
            <ErrorMessage key={field - id} name={field} />
          </div>
        )
      )}
    </>
  );
};

const FormComponent = ({
  schema,
  fields,
  formNumber,
  handleFormValidity,
}: any): JSX.Element => {
  const formRef = useRef<any>({});

  useEffect(() => {
    if (formRef.current) {
      if (Object.keys(fields).length !== 0) {
        formRef.current.validateForm();
      }
    }
  }, []);

  return (
    <Formik
      key={formNumber}
      validationSchema={schema}
      initialValues={{ ...fields }}
      handleChange={() => console.log('handleChange')}
      onSubmit={() => {}}
      innerRef={formRef}
    >
      <Form key={formNumber}>
        <FormFields
          formNumber={formNumber}
          handleFormValidity={handleFormValidity}
          localFormFields={fields}
        />
      </Form>
    </Formik>
  );
};

export default FormComponent;
