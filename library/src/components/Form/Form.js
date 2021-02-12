import React, { useState } from 'react';
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
}) => {
  const [isValid, setIsavlid] = useState(false);
  const [localFormFields] = useState(fields);

  const handleValidity = (formIsValid, formValues) => {
    if (formIsValid !== isValid) {
      setIsavlid(formIsValid);
      handleFormValidity(formIsValid, formNumber, formValues);
    }
  };

  return (
    <div>
      <h2>Title</h2>
      <Formik
        validationSchema={schema}
        initialValues={{ ...fields }}
        isInitialValid={false}
      >
        {(props) => (
          <Form>
            {Object.keys(localFormFields).map((field, id) => (
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
                    handleFormFieldChanges(formNumber, {
                      ...props.values,
                      [`${field}`]: e.target.value,
                    });
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
