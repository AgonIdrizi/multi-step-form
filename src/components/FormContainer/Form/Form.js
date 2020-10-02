import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import Input from '../Input/Input';



const FormComponent = ({schema, fields, formNumber, handleFormFieldChanges, handleFormValidity}) => {
  const [isValid, setIsavlid] = useState(false)
  const [localFormFields] = useState(fields)

  const handleValidity = (formIsValid, formValues) => {
    if (formIsValid !== isValid) {
      setIsavlid(formIsValid)
      handleFormValidity(formIsValid, formNumber, formValues)
    }
  }

  return (
    <div>
      <h2>Title</h2>
      <Formik
        validationSchema={schema}
        initialValues={{...fields}}
        isInitialValid={false}
      >
        {(props) => (
          <Form>
            { Object.keys(localFormFields).map((field, id )=> (
              <>
              <Field
                key={field + id}
                id={field}
                label={field.charAt(0).toUpperCase() + field.slice(1)}
                name={field}
                onChange={(e) => {
                  handleFormFieldChanges(formNumber, {...props.values, [`${field}`]: e.target.value})
                  props.handleChange(e)
                }}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                component={Input}
              />
              <ErrorMessage key={field - id} name={field} />
              </>
            ))}
            {handleValidity(props.isValid, props.values)}
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default FormComponent;
