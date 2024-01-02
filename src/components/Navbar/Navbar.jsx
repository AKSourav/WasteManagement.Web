"use client"
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import Header from '../Dashboard/Header';
import {useSelector, useDispatch} from 'react-redux'
import { setLogout } from '@/utils/redux/features/authSlice';
import ProfileAvatar from '../Auth/ProfileAvatar';
import darkModeSVG from './darkMode.svg'
import lightModeSVG from './lightMode.svg'

const Navbar = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState("light");
  const router= useRouter();
  const pathname= usePathname();
  const routesToHide=["dashboard"];
  const dispatch= useDispatch();
  const {isAuthenticated,user}= useSelector((state)=>state.auth);

  useEffect(()=>{
    if(window.matchMedia('(prefers-color-scheme: dark)').matches || localStorage.getItem('theme')==='dark')
    {
        setTheme('dark');
    } else {
        setTheme('light');
    }
  },[]);

  useEffect(()=>{
    if(theme === 'dark')
    {
        document.documentElement.classList.add("dark");
    } else {
        document.documentElement.classList.remove("dark");
    }
  },[theme]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const handleThemeSwitch = ()=>{
    if(theme==="dark")
    {
        setTheme("light");
        localStorage.setItem('theme','light');
    }
    else
    {
        setTheme("dark");
        localStorage.setItem('theme','dark'); 
    }
  }

  return (
    <>
    { !routesToHide.includes(pathname.split('/')[1]) && <nav className="bg-opacity-70 bg-zinc-300 dark:bg-slate-950 p-4 z-30 w-full top-0 fixed" {...props}>
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="text-slate-600 dark:text-white font-bold text-lg">
            Your Logo
          </Link>
          <Image
            className='m-2 cursor-pointer'
            src={(theme==="dark")?darkModeSVG:lightModeSVG}
            alt="Light/Dark Mode"
            width={23}
            height={23}
            onClick={handleThemeSwitch}
          />
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            type="button"
            className="text-black hover:text-gray-300 focus:outline-none"
          >
            <Image
                src='hamburger.svg'
                alt="hamburger"
                width={25}
                height={25}
            />
          </button>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex lg:flex space-x-4 text-slate-600 dark:text-white items-center">
          <Link href="/" className="hover:text-slate-900 hover:dark:text-purple-200">Home</Link>
          <Link href="/map" className="hover:text-slate-900 hover:dark:text-purple-200">Map</Link>
          <Link href="/about" className="hover:text-slate-900 hover:dark:text-purple-200">About</Link>
          <Link href="/services" className="hover:text-slate-900 hover:dark:text-purple-200">Services</Link>
          {isAuthenticated && <Link href="/dashboard" className="hover:text-slate-900 hover:dark:text-purple-200">Dashboard</Link>}
          <Link href="/contact" className="hover:text-slate-900 hover:dark:text-purple-200">Contact</Link>
          {!isAuthenticated && <button onClick={()=>router.replace(`/auth`)}  className="hover:text-gray- bg-green-400 p-2 rounded-md">SignIn</button>}
          {isAuthenticated && <ProfileAvatar user={user} onLogout={()=>dispatch(setLogout())}/>}
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="mid:hidden lg:hidden text-black dark:text-white">
          <div className="flex flex-col items-center">
            <Link href="/" className="hover:text-gray-950 py-2 hover:dark:text-purple-200">Home</Link>
            <Link href="/about" className="hover:text-gray-950 py-2 hover:dark:text-purple-200">About</Link>
            <Link href="/services" className="hover:text-gray-950 py-2 hover:dark:text-purple-200">Services</Link>
            <Link href="/contact" className="hover:text-gray-950 py-2 hover:dark:text-purple-200">Contact</Link>
          </div>
        </div>
      )}
    </nav>}
    {pathname.split('/')[1]=="dashboard" && <Header/>}
    </>
  );
};

export default Navbar;
