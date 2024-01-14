"use client"
import BingMap from '@/components/Map/BingMap'
import { getOrders } from '@/utils/redux/features/orderSlice';
import React, { useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';

const page = () => {
  const dispatch= useDispatch();
  useEffect(()=>{
    dispatch(getOrders({}))
  },[])
  const {orders} = useSelector(state=>state.orders);
  return (
    <div className='pt-20 h-screen flex justify-center'>
        {orders && orders.length>0 && <BingMap apiKey={process.env.NEXT_PUBLIC_BING_MAPS_API_KEY} data={orders || []}/>}
    </div>
  )
}

export default page