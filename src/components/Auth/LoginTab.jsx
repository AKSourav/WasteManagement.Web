"use client"
import { login, setUser } from '@/utils/redux/features/authSlice';
import React, { useContext, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";

const LoginTab = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const user= useSelector((state)=>state.auth.user);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin=async()=>{
    try{
      const formValue={phone:phoneNumber,password:password};
      await dispatch(login({formValue}));
    }
    catch(error)
    {
      console.log(error);
    }
  }

  return (
    <div>
      phone:{user?.phone}
      <div className="mb-4">
        <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-600 dark:text-white">
          Phone Number
        </label>
        <input
          type="tel"
          id="phoneNumber"
          name="phoneNumber"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className="dark:text-slate-900 mt-1 p-2 w-full border rounded-md"
        />
      </div>
      <div className="mb-4 relative">
        <label htmlFor="password" className="block text-sm font-medium text-gray-600 dark:text-white">
          Password
        </label>
        <input
          type={showPassword ? 'text' : 'password'}
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-1 p-2 w-full border rounded-md dark:text-slate-900"
        />
        <button
          type="button"
          onClick={handleTogglePassword}
          className="top-5 absolute inset-y-0 right-0 p-2 text-gray-500  focus:outline-none"
        >
          {showPassword ? 'Hide' : 'Show'}
        </button>
      </div>
      <div className='flex justify-center items-center'>
        <button className="bg-blue-500 text-white py-2 px-4 rounded-md" onClick={handleLogin}>
            Log In
        </button>
      </div>
    </div>
  );
};

export default LoginTab;
