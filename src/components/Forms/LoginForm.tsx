import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { login } from "../../services/authService";
import { AxiosResponse } from "axios";

// Schema for validation with YUP
const loginSchema = Yup.object().shape(
    {
        email: Yup.string().email('Invalid email format').required('Email is Required'),
        password: Yup.string().required('Password is Required')
    }
);

// Login component
const LoginForm = () => {
    // We define the initials credentials
    const initalCredentials = {
        email: '',
        password: ''
    }

    return (
        <div>
            <h4>Login Form</h4>
            {/* Formik to encapsulate a form */}
            <Formik
                initialValues={initalCredentials}
                validationSchema={loginSchema}
                onSubmit={ async (values) => {    
                    login(values.email, values.password).then((response: AxiosResponse) => {
                        if(response.status === 200){
                            if(response.data.token){     
                                sessionStorage.setItem('sessionToken', response.data.token);                          
                            }
                        }else {
                            throw new Error('Error Login Token')
                        }
                    }).catch((error) => console.error(`[LOGIN ERROR]: Something was wrong: ${error}`));
                }}
            >
                {({values, touched, errors, handleChange, handleBlur, isSubmitting}) => (
                    <Form>
                        {/* Email Field */}
                        <label htmlFor="email">Email</label>
                        <Field id="email" type="email" name="email" placeholder="example@email.com" />
                        {/* Email Errors */}
                        {
                            errors.email && touched.email && (
                                <ErrorMessage name="email" component="div"></ErrorMessage> 
                            )
                        }
                        {/* Password Field */}
                        <label htmlFor="password">Password</label>
                        <Field id="password" type="password" name="password" placeholder="password" />
                        {/* Password Errors */}
                        {
                            errors.password && touched.password && (
                                <ErrorMessage name="password" component="div"></ErrorMessage> 
                            )
                        }
                        {/* Submit Button */}
                        <button type="submit">Login</button>

                        {/* Message if the form is submiting */}
                        {
                            isSubmitting ? (<p>Checking Credentials...</p>) : null
                        }

                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default LoginForm;