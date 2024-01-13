"use client"
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import {useSelector} from 'react-redux'
import roles from './roles.js'
import Modal from '../Modal/Modal.jsx';
import CreateOrder from '../CreateOrder/CreateOrder.jsx';

const SideDrawer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openCreateOrder,setOpenCreateOrder] = useState(false);
  const pathname= usePathname();
  const user=useSelector((state)=>state.auth.user);

  const handleOpenCreateOrder = () => {
    setOpenCreateOrder(true);
  };

  const handleCloseCreateOrder = () => {
    setOpenCreateOrder(false);
  };

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button className="text-2xl" onClick={toggleDrawer}>
        ☰
      </button>

      <nav style={{zIndex:999999999}} className={`lg:flex lg:flex-col lg:w-64 bg-gray-800 text-white p-4 fixed top-0 left-0 h-full transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out`}>
        <button className="text-2xl" onClick={toggleDrawer}>
          ✕
        </button>
        <div className='flex flex-col justify-between mt-3'>
          {user?.user_type==="USER" && <button className='bg-slate-950 text-slate-300 rounded p-2 mb-3' onClick={handleOpenCreateOrder}>
              Create Order
          </button>}
          <Modal className={"w-screen max-h-full"} title={"Create Order"} isOpen={openCreateOrder} onClose={handleCloseCreateOrder}>
            <CreateOrder handleCloseCreateOrder={handleCloseCreateOrder}/>
          </Modal>
          {
            user && roles[user?.user_type]?.map((menu,index)=>(
              <div key={index} className={`flex flex-col ${(pathname===`/dashboard${menu.path}`)?"bg-slate-200 rounded text-slate-800 font-extrabold hover:text-black":" hover:bg-slate-900 bg-transparent rounded"} justify-center items-center p-3 mt-3 mb-3`}>
                <Link href={`/dashboard${menu.path}`} className="block mb-2 transition duration-300 pr-8 pl-8">{menu.option}</Link>
              </div >
            ))
          }
        </div>
      </nav>
    </>
  );
};

export default SideDrawer;
