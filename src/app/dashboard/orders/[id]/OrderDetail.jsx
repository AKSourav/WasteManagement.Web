import InfoContainer from '@/components/InfoContainer';
import MapLoader, { DirectionMap } from '@/components/Maps'
import { acceptOrder, cancelOrder } from '@/utils/redux/features/orderSlice';
import React, { useMemo, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import DateTimePicker from '../AssignSlot';
import Modal from '@/components/Modal/Modal';
import WasteForm from '@/components/Forms/WasteForm';

const OrderDetail = ({ data, setData }) => {
    const [srcCoordinates, setSrcCoordinates] = useState();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { user } = useSelector(state => state.auth);
    const dispatch = useDispatch();


    const handleOpenModal = () => {
        console.log("Open")
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const InfoDescription = useMemo(() => {
        return (`
          <div style={{height:"100vh",width:"100vw",display:"flex",flexDirection:"column"}}>
            <b>Address</b> : ${data?.address}<br/>
            <b>Phone</b> : <a href="tel:${data?.optional_phone}" class="Blondie">${data?.optional_phone}</a><br/>
            <b>Locality</b> : ${data?.locality}<br/>
            <b>District</b> : ${data?.district}<br/>
            <b>Country</b> : ${data?.country}<br/>
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
    const order = useMemo(() => {
        const { collection_point_id, customer_ref, waste_collector_ref, lattitude, longitude, updated, created, ...rest } = data
        const timestamp = new Date(created);
        rest.created = timestamp.toLocaleDateString();
        rest.id = collection_point_id;
        return rest;
    }, [data]);


    const handleCancelOrder = async ({ item }) => {
        console.log("cancel button")
        const thunkResponse = await dispatch(cancelOrder({ toast, id: data.collection_point_id }))
        console.log(thunkResponse)
        if (thunkResponse?.meta?.requestStatus === "fulfilled") {
            setData(thunkResponse?.payload)
        }
    }
    const handleAcceptOrder = async ({ item, formValue }) => {
        const thunkResponse = await dispatch(acceptOrder({ toast, id: data.collection_point_id, formValue: formValue }))
        console.log(thunkResponse)
        if (thunkResponse?.meta?.requestStatus === "fulfilled") {
            setData(thunkResponse?.payload)
        }
    }
    const renderExtraButton = ({ item }) => {
        return [
            {
                title: "Cancel",
                action: handleCancelOrder,
                visibility: (["USER", "WC"].includes(user?.user_type) && ["pending", "accepted"].includes(item?.status) && (user?.user_type === "WC" ? item?.status === "accepted" : true)),
                className: "p-3 font-bold dark:text-slate-300 text-slate-900 bg-red-500 rounded",
                prompt: `Confirm Delete Order Raised on ${item.created} with Id:${item.id} ?`

            }
            ,
            {
                title: "Accept",
                action: handleAcceptOrder,
                visibility: ["WC"].includes(user?.user_type) && ["pending"].includes(item?.status),
                className: "p-3 font-bold dark:text-slate-300 text-slate-900 bg-green-500 rounded",
                prompt: `Confirm Accept Order Raised on ${item.created} with Id:${item.id} ?`,
                Element: DateTimePicker
            }
            ,
            {
                title: "Complete",
                action: handleOpenModal,
                visibility: ["WC"].includes(user?.user_type) && ["accepted"].includes(item?.status),
                className: "p-3 font-bold dark:text-slate-300 text-slate-900 bg-green-500 rounded",
            }
        ]
    }
    return (
        <div className='h-full w-full'>
            <div className='md:mb-2 h-full md:h-96 md:grid md:grid-cols-5'>
                <div className='h-60 md:h-full md:col-span-3'>
                    <MapLoader>
                        <DirectionMap InfoDescription={InfoDescription} actions={actions} srcCoordinates={srcCoordinates} destCoordinates={data ? { latitude: data?.lattitude || data?.latitude, longitude: data?.longitude } : null} className={"h-full w-full"} />
                    </MapLoader>
                </div>
                <div className='md:col-span-2 md:h-full'>
                    <InfoContainer renderExtraButtons={renderExtraButton} data={order} />
                </div>
            </div>
            <Modal style={{ paddingTop: "4.6rem" }} title={"DATA ENTRY"} isOpen={isModalOpen} onClose={handleCloseModal}>
                <WasteForm id={data.collection_point_id} />
            </Modal>
        </div>
    )
}

export default OrderDetail