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

    const InfoDescription = useMemo(() => {
        return (`
          <div style={{height:"100vh",width:"100vw",display:"flex",flexDirection:"column"}}>
            <b>Address</b> : ${data?.waste_collector_ref?.address}<br/>
            <b>Phone</b> : <a href="tel:${data?.waste_collector_ref?.optional_phone}" class="Blondie">${data?.waste_collector_ref?.optional_phone}</a><br/>
            <b>Locality</b> : ${data?.waste_collector_ref?.locality}<br/>
            <b>District</b> : ${data?.waste_collector_ref?.district}<br/>
            <b>Country</b> : ${data?.waste_collector_ref?.country}<br/>
          </div>
        `)
    }, [data]);

    const handleGetDiection = async () => {
        navigator.geolocation.getCurrentPosition(function (position) {
            setSrcCoordinates({ latitude: position.coords.latitude, longitude: position.coords.longitude })
        });
    }
    const handleCancelDiection = async () => {
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
    const record = useMemo(() => {
        const { record_id, collection_point_ref: { customer_ref, waste_collector_ref, lattitude, longitude }, collection_date, ...rest } = data
        const timestamp = new Date(collection_date);
        rest.raised_by = customer_ref
        rest.recieved_by = waste_collector_ref
        rest.collection_date = timestamp.toLocaleDateString();
        rest.id = record_id;
        return rest;
    }, [data]);



    return (
        <div className='h-full w-full'>
            <div className='md:mb-2 h-full md:h-96 md:grid md:grid-cols-5'>
                <div className='h-60 md:h-full md:col-span-3'>
                    <MapLoader>
                        <DirectionMap InfoDescription={InfoDescription} actions={actions} srcCoordinates={srcCoordinates} destCoordinates={data?.collection_point_ref ? { latitude: data?.collection_point_ref?.lattitude || data?.collection_point_ref?.latitude, longitude: data?.collection_point_ref?.longitude } : null} className={"h-full w-full"} />
                    </MapLoader>
                </div>
                <div className='md:col-span-2 md:h-full'>
                    <InfoContainer data={record} />
                </div>
            </div>
            <div className='w-full flex flex-col justify-start items-center dark:bg-slate-900'>
                <h1 className='text-lg font-extrabold flex items-center justify-center text-slate-950 dark:text-slate-300 m-3'>
                    ITEMS
                </h1>
                <GridView data={itemList} />
            </div>

        </div>
    )
}

export default RecordDetail