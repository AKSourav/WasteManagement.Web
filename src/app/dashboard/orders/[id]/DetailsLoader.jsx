"use client"
import Spinner from '@/utils/Spinner/Spinner';
import apiClient from '@/utils/apiClient';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import OrderDetail from './OrderDetail';

const DetailsLoader = ({id}) => {
    const [order,setOrder] = useState(null);
    const [record,setRecord] = useState(null);
    const [error,setError] = useState(null);
    const [loading,setLoading] = useState(true);
    const fetchOrderDetails= async ()=>{
        try{
            const {data} = await apiClient.get(`/api/waste_collection_point/${id}/`);
            setOrder(data);
            setError(null);
        }catch(error){
            setError(error);
            toast.error(String(error))
        }finally{
            setLoading(false);
        }
    }
    useEffect(()=>{
        setLoading(true);
        fetchOrderDetails();
    },[id])
  return (<div className='h-full w-full'>
    {
        loading?<div className=" inset-0 fixed w-full h-full"><Spinner/></div>:(
            error?<h1>Error</h1>:(<OrderDetail setData={setOrder} data={order}/>)
        )
    }
  </div>)
}

export default DetailsLoader