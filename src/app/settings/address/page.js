"use client"
import React, { useEffect, useState } from 'react';
import Modal from '@/components/Modal/Modal';
import AddressInput from '@/components/Address/AddressComponent';
import withAuth from '@/utils/withAuth';
import {useDispatch, useSelector} from 'react-redux';
import { addAddress, deleteAddress, editAddress, getAddress } from '@/utils/redux/features/addressSlice';
import { useToast } from '@/utils/RefreshWrapper/Wrapper';
import GridView from '@/components/GridView/Gridview';

const AddressPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editFormData, setEditFormData] = useState(null);
  const {all:addressList}=useSelector(state=>state.savedAddress);
  const dispatch= useDispatch();
  const toast = useToast();

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const handleOpenEditModal = ({item,index}) => {
    setEditFormData(addressList[index]);
    setIsEditModalOpen(true);
  };
  const handleDelete = ({item,index}) => {
    dispatch(deleteAddress({id:addressList[index].id,toast}));
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
  };

  const handleAddAddress=async (formValue)=>{
    await dispatch(addAddress({formValue,toast}));
    handleCloseModal();
  }
  const handleEditAddress=async (formValue,id)=>{
    await dispatch(editAddress({formValue,id,toast,close:handleCloseEditModal}));
    // handleCloseEditModal();
  }

  const fetchAddress= async()=>{
    await dispatch(getAddress({toast}));
  }

  useEffect(()=>{
    fetchAddress();
  },[])

  return (
    <div className='pt-20 h-screen'>
      <GridView data={addressList.map((item)=>{
          const {id,saved_address_id,customer_ref,lattitude,longitude,...rest}= item;
          return rest;
        })} 
        onSelect={()=>null} onEdit={handleOpenEditModal} onDelete={handleDelete}
      />
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
        <AddressInput handleSubmit={handleAddAddress}/>
      </Modal>
      <Modal title={"Edit Address"} isOpen={isEditModalOpen} onClose={handleCloseEditModal}>
        <AddressInput data={editFormData} handleSubmit={handleEditAddress}/>
      </Modal>
    </div>
  );
};

export default withAuth(AddressPage);
