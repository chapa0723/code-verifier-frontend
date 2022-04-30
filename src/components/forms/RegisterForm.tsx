import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { register } from '../../services/authService';
import { AxiosResponse } from 'axios';

const RegiserForm = () => {
    const initialValues = {
        name: '',
        email: '',
        password: '',
        confirm: '',
        age: 18
    }

    // YUP validation schema
    const registerSchema = Yup.object().shape({
        name: Yup.string()
            .min(6, 'User name must have 6 letters minimun')
            .max(12, 'User name must have 12 letters maximun')
            .required('User name is required').required('User name is required'),
        email: Yup.string()
            .email('Invalid email format')
            .required('Email is required'),
        password: Yup.string()
            .min(8, 'Password must have 8 chars minimun')
            .required('Password is required'),
        // eslint-disable-next-line no-whitespace-before-property
        confirm: Yup.string().when("password", {
            is: (value: string) => (value && value.length > 0 ? true : false),
            then: Yup.string()
                .oneOf([Yup.ref("password")], "Passwords must match")
        })  .required('Confirm Password is required'),
        age: Yup.number()
        .min(10, 'Age must be over 10 years old')
        .required('Age is required')

        
    })

    return (
        <div>
            <h4>Register a new User</h4>
            {/* Formik wrapper */}
            <Formik
                initialValues={initialValues}
                validationSchema={registerSchema}
                onSubmit={ async (values) => {    
                    register (values.name, values.email, values.password, values.age).then((response: AxiosResponse) => {
                        if(response.status === 200){
                            console.log('User registered successfully');
                            console.log(response.data);
                            alert('User registered successfully');
                        }else {
                            throw new Error('Error Registering User')
                        }
                    }).catch((error) => console.error(`[REGISTER ERROR]: Something was wrong: ${error}`));
                }}
            >
            {({values, touched, errors, handleChange, handleBlur, isSubmitting}) => (
                <Form>
                    {/* Name Field */}
                    <label htmlFor="name">Email</label>
                    <Field id="name" type="text" name="name" placeholder="Your Name" />
                    {/* Name Errors */}
                    {
                        errors.name && touched.name && (
                            <ErrorMessage name="name" component="div"></ErrorMessage> 
                        )
                    }

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
                    
                    {/* Confirm Password Field */}
                    <label htmlFor="confirm">Confirm Password</label>
                    <Field id="confirm" type="password" name="confirm" placeholder="confirm your password" />
                    {/* confirm Password Errors */}
                    {
                        errors.confirm && touched.confirm && (
                            <ErrorMessage name="confirm" component="div"></ErrorMessage> 
                        )
                    }

                    {/* Age Field */}
                    <label htmlFor="age">Age</label>
                    <Field id="age" type="number" name="age" placeholder="" />
                    {/* Age Errors */}
                    {
                        errors.age && touched.age && (
                            <ErrorMessage name="age" component="div"></ErrorMessage> 
                        )
                    }

                    {/* Login Button */}
                    <button type="submit">Register</button>

                    {/* Message if the form is submiting */}
                    {
                        isSubmitting ? (<p>Sending data to register...</p>) : null
                    }
                </Form>
            )}
            </Formik>        
        </div>
    )
}

export default RegiserForm;