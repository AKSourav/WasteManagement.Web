"use client"
import React, { useEffect } from 'react';
import {useSelector,useDispatch} from 'react-redux'
import GridView from '@/components/GridView/Gridview';
import { acceptOrder, cancelOrder, getOrders } from '@/utils/redux/features/orderSlice';
import toast from 'react-hot-toast';
import DateTimePicker from './AssignSlot';
import { usePathname, useRouter } from 'next/navigation';

const OrderTab = ({TabTitle}) => {
    const router= useRouter();
    const pathname = usePathname();
    const {orders} = useSelector(state=>state.orders);
    const dispatch = useDispatch();
    const {user} = useSelector(state=>state.auth);
    const Filter=TabTitle?{status__iregex:TabTitle}:{}
    const fetchOrders= async ()=>{
        const thunkResponse=await dispatch(getOrders({toast,filter:{...Filter}}));
        console.log(thunkResponse.meta.requestStatus);
    };

    const handleCancelOrder= async ({item,index})=>{
        console.log("cancel button")
        await dispatch(cancelOrder({toast,id:orders[index].collection_point_id}))
    }
    const handleAcceptOrder= async ({item,index,formValue})=>{
        await dispatch(acceptOrder({toast,id:orders[index].collection_point_id,formValue:formValue}))
    }

    const handleSelectedOrder = async ({item,index})=>{
        router.push(`${pathname}/${orders[index]?.collection_point_id}`);
    }

    const renderExtraButton=({item,index})=>{
        return[
            {
                title:"Cancel",
                action: handleCancelOrder,
                visibility: (["USER","WC"].includes(user?.user_type) && ["pending","accepted"].includes(item?.status) && (user?.user_type==="WC"?item?.status==="accepted":true)),
                className:"p-3 font-bold dark:text-slate-300 text-slate-900 bg-red-500 rounded",
                prompt:`Confirm Delete Order Raised on ${item.created} with Id:${item.id} ?`

            }
            ,
            {
                title: "Accept",
                action: handleAcceptOrder,
                visibility: ["WC"].includes(user?.user_type) && ["pending"].includes(item?.status),
                className:"p-3 font-bold dark:text-slate-300 text-slate-900 bg-green-500 rounded",
                prompt:`Confirm Accept Order Raised on ${item.created} with Id:${item.id} ?`,
                Element: DateTimePicker
            }
        ]
    }

    useEffect(()=>{
        fetchOrders();
    },[])
  return (
    <div>
        {orders && orders.length>0?<GridView
            className={"dark:bg-slate-950 bg-slate-200"}
            data={orders?.map(order=>{
                const {collection_point_id,customer_ref,waste_collector_ref,lattitude,longitude,updated,created,...rest}= order
                const timestamp = new Date(created);
                rest.created = timestamp.toLocaleDateString();
                rest.id = collection_point_id;
                return rest;
            })}
            onSelect={handleSelectedOrder}
            renderExtraButtons={renderExtraButton}
        />:"NO DATA"}
    </div>
  )
}

export default OrderTab