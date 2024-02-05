import InfoContainer from '@/components/InfoContainer';
import MapLoader, { DirectionMap } from '@/components/Maps'
import React, { useEffect, useMemo, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import apiClient from '@/utils/apiClient';
import GridView from '@/components/GridView/Gridview';

const RecordDetail = ({ data, setData }) => {
    const [srcCoordinates, setSrcCoordinates] = useState();
    const [itemList, setItemList] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { user } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const fetchWasteTypeDetails = async () => {
        try {
            const id = data.record_id.trim();
            const resData = await apiClient.get(`/api/record/${id}/items/`);
            setItemList(resData.data);
        } catch (error) {
            console.log(error);
            toast.error('Error fetching item Details!')
        }
    }
    useEffect(() => {
        fetchWasteTypeDetails();
    }, [data])

    // const InfoDescription = useMemo(() => {
    //     return (`
    //       <div style={{height:"100vh",width:"100vw",display:"flex",flexDirection:"column"}}>
    //         <b>Address</b> : ${data?.address}<br/>
    //         <b>Phone</b> : <a href="tel:${data?.optional_phone}" class="Blondie">${data?.optional_phone}</a><br/>
    //         <b>Locality</b> : ${data?.locality}<br/>
    //         <b>District</b> : ${data?.district}<br/>
    //         <b>Country</b> : ${data?.country}<br/>
    //       </div>
    //     `)
    // }, [data]);

    const handleGetDiection = async () => {
        navigator.geolocation.getCurrentPosition(function (position) {
            setSrcCoordinates({ latitude: position.coords.latitude, longitude: position.coords.longitude })
        });
    }
    const handleCancelDiection = async () => {
        setSrcCoordinates();
    }
    // const actions = [
    //     {
    //         label: 'Get Directions',
    //         eventHandler: handleGetDiection
    //     },
    //     {
    //         label: 'Cancel Directions',
    //         eventHandler: handleCancelDiection
    //     },
    // ]
    // const order = useMemo(() => {
    //     const { collection_point_id, customer_ref, waste_collector_ref, lattitude, longitude, updated, created, ...rest } = data
    //     const timestamp = new Date(created);
    //     rest.created = timestamp.toLocaleDateString();
    //     rest.id = collection_point_id;
    //     return rest;
    // }, [data]);



    return (
        <div className='h-full w-full'>
            {/* <div className='h-80 grid grid-cols-5'>
                <div className='col-span-3'>
                    <MapLoader>
                        <DirectionMap InfoDescription={InfoDescription} actions={actions} srcCoordinates={srcCoordinates} destCoordinates={data ? { latitude: data?.lattitude || data?.latitude, longitude: data?.longitude } : null} className={"h-full w-full"} />
                    </MapLoader>
                </div>
                <div className='col-span-2'>
                    <InfoContainer data={order} />
                </div>
            </div> */}
            <div className='w-full h-full'>
                <GridView data={itemList} />
            </div>

        </div>
    )
}

export default RecordDetail