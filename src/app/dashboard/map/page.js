"use client"
import BingMap from '@/components/Map/BingMap'
import { getOrders, setSelectedOrder } from '@/utils/redux/features/orderSlice';
import React, { useEffect, useMemo, useState } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import Tabs from '@/components/Tabs/TabsComponent';
import MapLoader, { DirectionMap } from '@/components/Maps';
import GridView from '@/components/GridView/Gridview';
import toast,{Toaster} from 'react-hot-toast'
import withAuth from '@/utils/withAuth';

const page = () => {
  const [selectedIndex,setSelectedIndex] = useState();
  const [userCoordinates,setUserCoordinates] = useState();
  const {orders,selectedOrder} = useSelector(state=>state.orders);
  const dispatch= useDispatch();
  const handleOrderSelect = async ({item,index})=>{
    // console.log(item);
    setSelectedIndex(index);
    await dispatch(setSelectedOrder(orders[index]));
  }

  const InfoDescription= useMemo(()=>{
    return(`
      <div style={{height:"100vh",width:"100vw",display:"flex",flexDirection:"column"}}>
        <b>Address</b> : ${selectedOrder?.address}<br/>
        <b>Phone</b> : <a href="tel:${selectedOrder?.optional_phone}" class="Blondie">${selectedOrder?.optional_phone}</a><br/>
        <b>Locality</b> : ${selectedOrder?.locality}<br/>
        <b>District</b> : ${selectedOrder?.district}<br/>
        <b>City</b> : ${selectedOrder?.city}<br/>
        <b>Country</b> : ${selectedOrder?.country}<br/>
      </div>
    `)
  },[selectedOrder])

  const fetchUserLocation= async ()=>{
    try{
      window.navigator.geolocation.getCurrentPosition(function (position) {
        setUserCoordinates({
          latitude:position.coords.latitude,
          longitude: position.coords.longitude
        })
      });
    }catch(error){
      console.log(error);
    }
  }

  useEffect(()=>{
    fetchUserLocation();
    dispatch(getOrders({toast}));
  },[])
  return (
    <div style={{paddingTop: "4.6rem"}}className='h-screen flex justify-center'>
      <Toaster/>
      <MapLoader>
        <Tabs>
          <div label={"ALL"}>
            <BingMap apiKey={process.env.NEXT_PUBLIC_BING_MAPS_API_KEY} data={orders || []}/>
          </div>
          <div label={"CHOOSE"}>
            <div className="grid grid-cols-5 h-full">
              <div id="sideDrawer" className="col-span-2 h-full dark:bg-slate-800 bg-slate-300 overflow-y-scroll">
                <GridView
                  data={orders?.map((order)=>{
                    const {collection_point_id,date,slot,updated_by,customer_ref,waste_collector_ref,lattitude,longitude,updated,created,optional_phone,...rest}= order
                    const timestamp = new Date(created);
                    rest.created = timestamp.toLocaleDateString();
                    rest.id = collection_point_id;
                    rest.phone=optional_phone;
                    return rest;
                  })}
                  onSelect={handleOrderSelect}
                  selected={selectedIndex}
                />
              </div>
              <div className="col-span-3 h-full dark:bg-slate-700">
                <DirectionMap InfoDescription={InfoDescription} dest={selectedOrder} srcCoordinates={userCoordinates} destCoordinates={selectedOrder?{latitude:selectedOrder?.lattitude,longitude:selectedOrder?.longitude}:null} className={"h-full w-full"}/>
              </div>
            </div>
          </div>
        </Tabs>
      </MapLoader>
    </div>
  )
}

export default withAuth(page);