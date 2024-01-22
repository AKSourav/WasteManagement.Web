import MapLoader, { DirectionMap } from '@/components/Maps'
import React, { useMemo, useState } from 'react'

const OrderDetail = ({data}) => {
    const [srcCoordinates,setSrcCoordinates] = useState();
    const InfoDescription= useMemo(()=>{
        return(`
          <div style={{height:"100vh",width:"100vw",display:"flex",flexDirection:"column"}}>
            <b>Address</b> : ${data?.address}<br/>
            <b>Phone</b> : <a href="tel:${data?.optional_phone}" class="Blondie">${data?.optional_phone}</a><br/>
            <b>Locality</b> : ${data?.locality}<br/>
            <b>District</b> : ${data?.district}<br/>
            <b>City</b> : ${data?.city}<br/>
            <b>Country</b> : ${data?.country}<br/>
          </div>
        `)
      },[data]);

    const handleGetDiection= async ()=>{
        navigator.geolocation.getCurrentPosition(function (position) {
            setSrcCoordinates({latitude:position.coords.latitude,longitude:position.coords.longitude})
        });
    }
    const handleCancelDiection= async ()=>{
        setSrcCoordinates();
    }
    const actions = [
        {
            label: 'Get Directions',
            eventHandler: handleGetDiection
        },
        {
            label: 'Cancel Directions',
            eventHandler: handleCancelDiection
        },
    ]
  return (
    <div className='h-full w-full'>
        <MapLoader>
            <DirectionMap InfoDescription={InfoDescription} actions={actions} srcCoordinates={srcCoordinates} destCoordinates={data?{latitude:data?.lattitude || data?.latitude,longitude:data?.longitude}:null} className={"h-full w-full"}/>
        </MapLoader>
    </div>
  )
}

export default OrderDetail