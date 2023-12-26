"use client"
import Link from 'next/link';
import { useState } from 'react';

const SideDrawer = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button className="text-2xl" onClick={toggleDrawer}>
        ☰
      </button>

      <nav className={`z-10 lg:flex lg:flex-col lg:w-64 bg-gray-800 text-white p-4 fixed top-0 left-0 h-full transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out`}>
        <button className="text-2xl" onClick={toggleDrawer}>
          ✕
        </button>
        <div className='flex flex-col justify-center items-center pt-12'>
            <Link href="/services/map" className="block mb-2 hover:text-gray-300 transition duration-300 pr-8 pl-8">Map</Link>
        </div>
        {/* <Link href="/profile" className="block hover:text-gray-300 transition duration-300">Profile</Link> */}
      </nav>
    </>
  );
};

export default SideDrawer;
