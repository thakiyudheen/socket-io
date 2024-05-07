
import React, { useState } from 'react';
import { Formik, Form, Field , ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { signupUser } from '../../services/api/userRouter';



function Signup() {
  const [error,setError]=useState('')
    const initialValues = {
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
      };
    
      const validationSchema = Yup.object().shape({
        username: Yup.string().required('Username is required'),
        email: Yup.string().email('Invalid email').required('Email is required'),
        password: Yup.string()
          .min(8, 'Password must be at least 8 characters')
          .required('Password is required'),
        confirmPassword: Yup.string()
          .oneOf([Yup.ref('password'), null], 'Passwords must match')
          .required('Confirm Password is required'),
      });

      const handleSubmit = async(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
        const user = await signupUser(values)
        console.log('this is after effect',user)
        if(!user.status){
          setError(user.error)
        }
        
      };
  return (
    <>
        <div className='bg-white-500 w-[40%] ml-[30%] flex justify-center items-center p-10 shadow-lg'>
            
            <Formik 
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form className="w-full pt-2">
      <h3 className='text-[20px] font-bold mb-4'>Signup</h3>
        <small className='text-[13px] text-[red]'>{error}</small>
        <div>
          <label className='font-bold'  htmlFor="username">Username</label ><br />
          <Field className="px-4 text-sm bg-white-50' w-full mt-2 py-[4px] rounded-sm border border-1"  type="text" name="username" placeholder="Username" />
          <ErrorMessage className="text-[12px] text-[red] fond-small" name="username" component="div" />
        </div>
        <div>
          <label className='font-bold' htmlFor="email">Email</label><br />
          <Field className="px-4 text-sm bg-white-50' w-full mt-2 py-[4px] rounded-sm border border-1" type="email" name="email" placeholder="Email" />
          <ErrorMessage className="text-[12px] text-[red] font-small" name="email"component="div" />
        </div>
        <div>
          <label className='font-bold' htmlFor="password">Password</label><br />
          <Field className="px-4 text-sm bg-white-50' w-full mt-2 py-[4px] rounded-sm border border-1" type="password" name="password" placeholder="Password" />
          <ErrorMessage className="text-[12px] text-[red] font-small" name="password"component="div" />
        </div>
        <div>
          <label className='font-bold' htmlFor="confirmPassword">Confirm Password</label><br />
          <Field className="px-4 text-sm bg-white-50' w-full mt-2 py-[4px]  rounded-sm border border-1"
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
          />
          <ErrorMessage className="text-[12px] text-[red] font-small" name="confirmPassword" component="div" />
        </div>
        <button type="submit" className='bg-blue-500 rounded-lg text-[12px] w-[70px] h-[30px] font-bold mt-2'>Submit</button>
      </Form>
    </Formik>

            
        </div>
    </>
  )
}

export default Signup