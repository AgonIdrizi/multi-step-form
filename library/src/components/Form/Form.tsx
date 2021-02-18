import React, { useState, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import Input from '../Input/Input';
import Label from '../Label/Label';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import { upperCaseFirstLetter } from '../../utility/helpers';
import './Form.css';

const FormComponent = ({
  schema,
  fields,
  formNumber,
  handleFormFieldChanges,
  handleFormValidity,
}:any) => {
  const [isValid, setIsavlid] = useState(false);
  const [localFormFields] = useState(fields);

  const handleValidity = (formIsValid:any, formValues:any) => {
    if (formIsValid !== isValid) {
      setIsavlid(formIsValid);
      handleFormValidity(formIsValid, formNumber, formValues);
    }
  };
  useEffect(() => {}, []);

  return (
    <div>
      <h2>Title</h2>
      <Formik
        validationSchema={schema}
        initialValues={{ ...fields }}
        isInitialValid={false}
        onSubmit={() => {}}
      >
        {(props) => (
          <Form>
            {Object.keys(localFormFields).map((field:any, id) => (
              <>
                <Label
                  key={field}
                  name={upperCaseFirstLetter(field)}
                />
                <Field
                  key={field + id}
                  id={field}
                  label={upperCaseFirstLetter(field)}
                  name={field}
                  onChange={(e) => {
                    props.handleChange(e);
                  }}
                  placeholder={upperCaseFirstLetter(field)}
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
};

export default FormComponent;
