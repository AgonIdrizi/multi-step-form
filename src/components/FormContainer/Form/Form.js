import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';

const MyInput = ({ field, form, ...props }) => {
  return <input {...field} {...props} />;
};



const FormComponent = React.memo(({schema, fields, formNumber, handleFormFieldChanges, handleFormValidity}) => {
  const [isValid, setIsavlid] = useState(false)
  const [localFormFields, setLocalFormFields] = useState(fields)
  const onSubmitHandler= values => {
    console.log(values)
  }

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
        initialValues={{username: "", password: ""}}
        isInitialValid={false}
        onSubmit={(values) => onSubmitHandler(values)}
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
                component={MyInput}
              />
              <ErrorMessage key={field - id} name={field} />
              </>
            ))}
            {handleValidity(props.isValid, props.values)}
            <button disabled={ !props.isValid } type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  );
})

export default FormComponent;
