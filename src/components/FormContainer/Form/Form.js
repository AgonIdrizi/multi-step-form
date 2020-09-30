import React, { useRef } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';

const MyInput = ({ field, form, ...props }) => {
  return <input {...field} {...props} />;
};

const FormComponent = ({schema, formsValidityObj, formNumber, setFormsValidityObj, setForm1IsValid, form1isValid}) => {
  const handleFormValidity = (value) => {
    
  }
  const onSubmitHandler= values => {
    console.log(values)
  }

  return (
    <div>
      <h2>Title</h2>
      <Formik
        validationSchema={schema}
        initialValues={{username: "", password: ""}}
        onSubmit={(values) => onSubmitHandler(values)}
      >
        {(props) => (
          <Form>
            <Field
              id="username"
              label="Username"
              name="username"
              placeholder="Username"
              component={MyInput}
            />
            <ErrorMessage name="username" />
            <Field
              id="password"
              label="Password"
              name="password"
              placeholder="Password"
              component={MyInput}
            />
            <ErrorMessage name="password" />
            {handleFormValidity(props.isValid)}
            {props.isValid}
            <button disabled={ props.initialTouched || !props.isValid } type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default FormComponent;
