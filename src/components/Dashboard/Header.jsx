// components/Header.js
import Link from 'next/link';
import SideDrawer from './SideDrawer';

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-slate-950 to-slate-500 text-white p-4 flex justify-between items-center shadow-md">
      <SideDrawer />
      <Link href="/services" className="text-2xl font-bold">Dashboard</Link>
      <nav className="hidden lg:flex space-x-4">
        <Link href="/" className="hover:text-gray-300 transition duration-300">Home</Link>
        <Link href="/profile" className="hover:text-gray-300 transition duration-300">Profile</Link>
      </nav>
    </header>
  );
};

export default Header;
