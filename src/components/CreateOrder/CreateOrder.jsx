"use client"
import React, { useEffect, useState } from 'react';
import Modal from '@/components/Modal/Modal';
import AddressInput from '@/components/Address/AddressComponent';
import withAuth from '@/utils/withAuth';
import {useDispatch, useSelector} from 'react-redux';
import { addAddress, deleteAddress, editAddress, getAddress, setCurrentAddress } from '@/utils/redux/features/addressSlice';
import { useToast } from '@/utils/RefreshWrapper/Wrapper';
import GridView from '@/components/GridView/Gridview';
import MicrosoftMaps from '../Address/Map';

const CreateOrder = ({handleCloseCreateOrder}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editFormData, setEditFormData] = useState(null);
  const {all:addressList,current:selectedAddress}=useSelector(state=>state.savedAddress);
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
    dispatch(deleteAddress({id:addressList[index].saved_address_id,toast}));
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

  const handleSubmit=async ()=>{
    handleCloseCreateOrder();
  }

  const handleChooseAddress= async ()=>{
    await dispatch(setCurrentAddress(null));
    fetchAddress();
  }
  const handleSelectAddress= async ({item,index})=>{
    await dispatch(setCurrentAddress(addressList[index]));
  }
  useEffect(()=>{
    fetchAddress();
  },[])

  const renderButton={
    title: "More Address",
    action: handleChooseAddress
  }

  return (
    <>
        {selectedAddress?(
            <div className=''>
                {/* lat:{selectedAddress?.lattitude} long:{selectedAddress?.longitude} */}
                <MicrosoftMaps className={'w-full h-96'} coordinates={{
                    lat:selectedAddress?.lattitude,
                    lon:selectedAddress?.longitude
                }}/>
                <div className='flex items-center mt-11'>
                    <GridView className={"w-full"} data={[selectedAddress]?.map((item)=>{
                        const {id,saved_address_id,customer_ref,lattitude,longitude,...rest}= item;
                        return rest;
                        })}
                        renderButton={renderButton}
                    />
                </div>
                <button className='font-bold shadow-lg bg-green-400 rounded text-white w-full p-2' onClick={handleSubmit}>Submit</button>
            </div>
        ):(
            <div className='w-screen'>
                <GridView data={addressList?.map((item)=>{
                    const {id,saved_address_id,customer_ref,lattitude,longitude,...rest}= item;
                    return rest;
                    })} 
                    onSelect={handleSelectAddress} onEdit={handleOpenEditModal} onDelete={handleDelete}
                />
                <button onClick={handleOpenModal} className=" flex justify-center items-center fixed bottom-8 left-2 bg-slate-500 text-white rounded p-4 shadow-md">
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
                    New Address
                </button>
                <Modal className={"w-screen max-h-full"} title={"Add Address"} isOpen={isModalOpen} onClose={handleCloseModal}>
                    <AddressInput handleSubmit={handleAddAddress}/>
                </Modal>
                <Modal className={"w-screen max-h-full"} title={"Edit Address"} isOpen={isEditModalOpen} onClose={handleCloseEditModal}>
                    <AddressInput data={editFormData} handleSubmit={handleEditAddress}/>
                </Modal>
            </div>
        )}
    </>
  );
};

export default withAuth(CreateOrder);
