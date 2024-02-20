"use client"
import Link from 'next/link';
import SideDrawer from './SideDrawer';
import { useSelector } from "react-redux";
import { useRouter } from 'next/navigation';
import ProfileAvatar from '../Auth/ProfileAvatar';
import { setLogout } from '@/utils/redux/features/authSlice';
import { useDispatch } from 'react-redux';

const Header = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const router = useRouter();
  return (
    <header style={{ zIndex: 999999999 }} className="top-0 fixed w-screen bg-gradient-to-r from-slate-950 to-slate-500 text-white p-4 flex justify-between items-center shadow-md">
      <SideDrawer />
      <Link href="/dashboard" className="text-2xl font-bold">Dashboard</Link>
      <nav className="flex justify-center items-center space-x-4">
        <Link href="/" className="hover:text-gray-300 transition duration-300">Home</Link>
        <p className='text-lg m-0 ml-2 mr-2'>{user?.user_type}</p>
        <ProfileAvatar user={user} className="text-slate-950 dark:text-slate-200" onLogout={() => dispatch(setLogout({ router }))} />
      </nav>
    </header>
  );
};

export default Header;
