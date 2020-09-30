import React, { useRef } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';

const MyInput = ({ field, form, ...props }) => {
  return <input {...field} {...props} />;
};

const FormComponent = ({schema, setForm1IsValid}) => {
  const handleFormValidity = () => {
    
  }
  const onSubmitHandler= values => {
    console.log(formikRef.current)
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
            <button disabled={!props.isValid}>Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default FormComponent;
