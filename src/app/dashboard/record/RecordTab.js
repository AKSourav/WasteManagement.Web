"use client"
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import GridView from '@/components/GridView/Gridview';
import { getRecords, getRecordInfo } from '@/utils/redux/features/recordSlice';
import toast from 'react-hot-toast';
import { usePathname, useRouter } from 'next/navigation';

const OrderTab = ({ TabTitle }) => {
    const router = useRouter();
    const pathname = usePathname();
    const { records } = useSelector(state => state.records);
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.auth);
    const Filter = TabTitle ? { status__iregex: TabTitle } : {}
    const fetchOrders = async () => {
        const thunkResponse = await dispatch(getRecords({ toast, filter: { ...Filter } }));
        console.log(thunkResponse.meta.requestStatus);
    };

    const handleSelectedOrder = async ({ item, index }) => {
        router.push(`${pathname}/${records[index]?.record_id}`);
    }

    useEffect(() => {
        fetchOrders();
    }, [])
    return (
        <div>
            {records && records.length > 0 ? <GridView
                className={"dark:bg-slate-950 bg-slate-200"}
                data={records?.map(record => {
                    const { collection_date, collection_point_ref, ...rest } = record;
                    rest.customerId = collection_point_ref?.customer_ref;
                    rest.wasteCollectorId = collection_point_ref?.waste_collector_ref;
                    const timestamp = new Date(collection_date);
                    rest.created = timestamp.toLocaleDateString();
                    return rest;
                })}
                onSelect={handleSelectedOrder}
            /> : "NO DATA"}
        </div>
    )
}

export default OrderTab;

// {
//     "record_id": "record1549",
//         "collection_point_ref": {
//         "collection_point_id": "coll7511",
//             "date": "2024-01-20",
//                 "slot_time": "13:22:00",
//                     "status": "accepted",
//                         "optional_phone": "7481009993",
//                             "created": "2024-01-14T03:46:48.092284+05:30",
//                                 "updated": "2024-01-17T23:22:34.662129+05:30",
//                                     "address": "Anupam Ka Ghar",
//                                         "district": "Jamtara",
//                                             "pincode": 815354,
//                                                 "state": "Jharkhand",
//                                                     "country": "India",
//                                                         "lattitude": "23.859681931863914",
//                                                             "longitude": "86.87830644185503",
//                                                                 "locality": "Mihijam",
//                                                                     "customer_ref": "superuser2853",
//                                                                         "waste_collector_ref": "WC2345",
//                                                                             "updated_by": null
//     },
//     "collection_date": "2024-02-05T19:30:52.471127+05:30",
//         "total_price": 250
// }