"use client"
import React, { useEffect } from 'react';
import {useSelector,useDispatch} from 'react-redux'
import GridView from '@/components/GridView/Gridview';
import { getOrders } from '@/utils/redux/features/orderSlice';
import withAuth from '@/utils/withAuth';

const page = () => {
    const {orders} = useSelector(state=>state.orders);
    const dispatch = useDispatch();
    const fetchOrders= async ()=>{
        console.log("HIIIII")
        await dispatch(getOrders({}));
    };
    useEffect(()=>{
        fetchOrders();
    },[])
  return (
    <div className='pt-20 h-screen'>
        {orders?<GridView
            data={orders.map(order=>{
                const {collection_point_id,customer_ref,waste_collector_ref,lattitude,longitude,updated,created,...rest}= order
                const timestamp = new Date(created);
                rest.created = timestamp.toLocaleDateString();
                return rest;
            })}
        />:"NO DATA"}
    </div>
  )
}

export default withAuth(page);