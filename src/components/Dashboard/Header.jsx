"use client"
import Link from 'next/link';
import SideDrawer from './SideDrawer';
import { useSelector } from "react-redux";
import { useRouter } from 'next/navigation';
import ProfileAvatar from '../Auth/ProfileAvatar';
import { setLogout } from '@/utils/redux/features/authSlice';
import {useDispatch} from 'react-redux';

const Header = () => {
  const user = useSelector((state)=>state.auth.user);
  const dispatch= useDispatch();
  const router = useRouter();
  return (
    <header className="bg-gradient-to-r from-slate-950 to-slate-500 text-white p-4 flex justify-between items-center shadow-md">
      <SideDrawer />
      <Link href="/dashboard" className="text-2xl font-bold">Dashboard</Link>
      <nav className="flex justify-center items-center space-x-4">
        <Link href="/" className="hover:text-gray-300 transition duration-300">Home</Link>
        <ProfileAvatar user={user} className="text-slate-950 dark:text-slate-200" onLogout={()=>dispatch(setLogout({router}))}/>
      </nav>
    </header>
  );
};

export default Header;
