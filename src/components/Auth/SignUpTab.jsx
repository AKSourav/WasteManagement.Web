"use client"
import React, { useState } from 'react';

const SignUpTab = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [accountType, setAccountType] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Add your registration logic here
    console.log({
      firstName,
      lastName,
      phone,
      email,
      password,
      confirmPassword,
      accountType,
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-600 dark:text-white">
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
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-600 dark:text-white">
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
          <label htmlFor="phone" className="block text-sm font-medium text-gray-600 dark:text-white">
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
          <label htmlFor="email" className="block text-sm font-medium text-gray-600 dark:text-white">
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
          <label htmlFor="password" className="block text-sm font-medium text-gray-600 dark:text-white">
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
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-600 dark:text-white">
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
        <div className="mb-4">
          <label htmlFor="accountType" className="block text-sm font-medium text-gray-600 dark:text-white">
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
