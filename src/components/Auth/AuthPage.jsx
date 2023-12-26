"use client"
import React, { useState } from 'react';
import LoginTab from './LoginTab';
import SignUpTab from './SignUpTab';

const AuthPage = ({className}) => {
  const [activeTab, setActiveTab] = useState('login');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className={className}>
      <div className="flex mb-4">
        <button
          className={`rounded flex-1 py-2 text-center ${
            activeTab === 'login' ? 'bg-green-500 text-white' : 'bg-gray-300'
          }`}
          onClick={() => handleTabChange('login')}
        >
          Login
        </button>
        <button
          className={` rounded flex-1 py-2 text-center ${
            activeTab === 'signup' ? 'bg-green-500 text-white' : 'bg-gray-300'
          }`}
          onClick={() => handleTabChange('signup')}
        >
          Sign Up
        </button>
      </div>
      {activeTab === 'login' ? <LoginTab /> : <SignUpTab />}
    </div>
  );
};

export default AuthPage;
