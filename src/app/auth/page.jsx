"use client"
import React from 'react';
import AuthPage from '../../components/Auth/AuthPage';
import withoutAuth from '@/utils/withoutAuth';

const Auth = () => {
  return (
    <div className="flex justify-center md:justify-between h-screen pt-20">
        <div className='w-96 hidden md:flex'>
            IMAGE
        </div>
        <div className='p-1 pr-9'>
            <AuthPage className="p-4 border-zinc-300 border dark:border-slate-800 rounded shadow w-96 h-fit"/>
        </div>
    </div>
  );
};

export default withoutAuth(Auth);
