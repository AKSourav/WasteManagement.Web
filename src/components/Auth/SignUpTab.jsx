"use client"
import { useToast } from '@/utils/RefreshWrapper/Wrapper';
import { register } from '@/utils/redux/features/authSlice';
import Link from 'next/link';
import React, { useState } from 'react';
import {useDispatch} from 'react-redux'

const SignUpTab = () => {
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [phone, setPhone] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [accountType, setAccountType] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const [loading,setLoading] = useState(false);

  const dispatch = useDispatch();

  const toast= useToast();

  const validatePassword = () => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(password);

    if (
      password.length < minLength ||
      !hasUpperCase ||
      !hasLowerCase ||
      !hasNumber ||
      !hasSpecialChar
    ) {
      return false;
    } else {
      return true;
    }
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit =  async (e) => {
    e.preventDefault();

    if(password!==confirmPassword)
    {
      return toast.error("Confirm Password must be same!");
    }
    if (!firstName || !lastName || !phone || !email || !password)
    {
      const message=`Required Fields: ${!firstName? "firstName, ":""}${!lastName? "lastName, ":""}${!phone? "phone, ":""}${!email? "email":""}`
      return toast.error(message);
    }
    if(validatePassword())
    {
      const message=`Password must have at least 8 characters, including uppercase, lowercase, number, and special character.`;
      return toast.error(message);
    }

    // Add your registration logic here
    console.log({
      firstName,
      lastName,
      phone,
      email,
      password,
      confirmPassword,
    });
    const formValue={
      first_name:firstName,
      last_name:lastName,
      password,
      phone,
      email,
    }
    await dispatch(register({formValue,toast}));
    // setFirstName(null);
    // setLastName(null);
    // setPhone(null);
    // setEmail(null);
    // setPassword(null);
    // setConfirmPassword(null);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-black dark:text-white">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="dark:text-slate-900 mt-1 p-2 w-full border rounded-md"
            />
          </div>
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-black dark:text-white">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="dark:text-slate-900 mt-1 p-2 w-full border rounded-md"
            />
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="phone" className="block text-sm font-medium text-black dark:text-white">
            Phone
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="dark:text-slate-900 mt-1 p-2 w-full border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-black dark:text-white">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="dark:text-slate-900 mt-1 p-2 w-full border rounded-md"
          />
        </div>
        <div className="mb-4 relative">
          <label htmlFor="password" className="block text-sm font-medium text-black dark:text-white">
            Password
          </label>
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="dark:text-slate-900 mt-1 p-2 w-full border rounded-md"
          />
          <button
            type="button"
            onClick={handleTogglePassword}
            className="top-5 absolute inset-y-0 right-0 p-2 text-gray-500 focus:outline-none"
          >
            {showPassword ? 'Hide' : 'Show'}
          </button>
        </div>
        <div className="mb-4">
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-black dark:text-white">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="dark:text-slate-900 mt-1 p-2 w-full border rounded-md"
          />
        </div>
        {/* <div className="mb-4">
          <label htmlFor="accountType" className="block text-sm font-medium text-black dark:text-white">
            Account Type
          </label>
          <select
            id="accountType"
            name="accountType"
            value={accountType}
            onChange={(e) => setAccountType(e.target.value)}
            className="dark:text-slate-900 mt-1 p-2 w-full border rounded-md"
          >
            <option value="" disabled>Select an option</option>
            <option value="personal">Personal</option>
            <option value="business">Business</option>
          </select>
        </div> */}

      <div className="form-check mt-3">
        <input className="form-check-input" type="checkbox" id="check1" name="option1" value="something"  />
        <label className="form-check-label text-black dark:text-white" htmlFor="check1">I agree to these <span>Term & condition</span> </label>
       </div>
      
        <div className='flex justify-center items-center'>
          <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md">
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUpTab;
