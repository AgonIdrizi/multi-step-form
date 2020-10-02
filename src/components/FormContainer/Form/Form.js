import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';

const MyInput = ({ field, form, ...props }) => {
  return <input {...field} {...props} />;
};



const FormComponent = ({schema, formNumber, handleFormValidity}) => {
  const [isValid, setIsavlid] = useState(false)
  const onSubmitHandler= values => {
    console.log(values)
  }

  const handleValidity = (formIsValid) => {
    if (formIsValid !== isValid) {
      setIsavlid(formIsValid)
      handleFormValidity(formIsValid, formNumber)
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
            {handleValidity(props.isValid)}
            <button disabled={ !props.isValid } type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default FormComponent;
