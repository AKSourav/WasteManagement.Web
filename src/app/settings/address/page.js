"use client"
import React, { useState } from 'react';
import Modal from '@/components/Modal/Modal';
import AddressInput from '@/components/Address/AddressComponent';
import withAuth from '@/utils/withAuth';

const AddressPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className='pt-20'>
      <button onClick={handleOpenModal} className="fixed bottom-8 right-8 bg-slate-500 text-white rounded-full p-4 shadow-md">
        <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        className="w-6 h-6"
        >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="4"
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
        />
        </svg>
      </button>
      <Modal title={"Add Address"} isOpen={isModalOpen} onClose={handleCloseModal}>
        <AddressInput/>
      </Modal>
    </div>
  );
};

export default withAuth(AddressPage);
