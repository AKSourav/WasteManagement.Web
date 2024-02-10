"use client"
import React from 'react';
import AuthPage from '../../components/Auth/AuthPage';
import withoutAuth from '@/utils/withoutAuth';
import "./page.css"

const Auth = () => {
  return (
    <div className="flex justify-center item-center mt-0 h-screen pt-20 auth">
        

        <div className='p-1 pr-9 mt-5'>
            <AuthPage className="p-4 border-zinc-300 border dark:border-slate-800 rounded shadow w-96 h-fit"/>
        </div>
    </div>
  );
};

export default withoutAuth(Auth);
