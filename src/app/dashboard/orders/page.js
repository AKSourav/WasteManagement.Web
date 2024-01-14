"use client"
import React, { useEffect } from 'react';
import {useSelector,useDispatch} from 'react-redux'
import GridView from '@/components/GridView/Gridview';
import { cancelOrder, getOrders } from '@/utils/redux/features/orderSlice';
import toast,{Toaster} from 'react-hot-toast';
import withAuth from '@/utils/withAuth';

const page = () => {
    const {orders} = useSelector(state=>state.orders);
    const dispatch = useDispatch();
    const {user} = useSelector(state=>state.auth);

    const fetchOrders= async ()=>{
        await dispatch(getOrders({toast}));
    };

    const handleCancelOrder= async ({item,index})=>{
        await dispatch(cancelOrder({toast,id:orders[index].collection_point_id}))
    }
    const renderExtraButton=({item,index})=>{
        return[
            {
                title:"Cancel",
                action: handleCancelOrder,
                visibility: ["USER","WC"].includes(user?.user_type) && ["pending","accepted"].includes(item.status),
                className:"p-3 font-bold dark:text-slate-300 text-slate-900 bg-red-500 rounded",
                prompt:`Confirm Delete Order Raised on ${item.created} with Id: ${item.id} ?`

            }
        ]
    }

    useEffect(()=>{
        fetchOrders();
    },[])
  return (
    <div className='pt-20 h-screen'>
        <Toaster/>
        {orders?<GridView
            data={orders?.map(order=>{
                const {collection_point_id,customer_ref,waste_collector_ref,lattitude,longitude,updated,created,...rest}= order
                const timestamp = new Date(created);
                rest.created = timestamp.toLocaleDateString();
                rest.id = collection_point_id;
                return rest;
            })}
            renderExtraButtons={renderExtraButton}
        />:"NO DATA"}
    </div>
  )
}

export default withAuth(page);