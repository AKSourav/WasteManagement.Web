"use client"
import Spinner from '@/utils/Spinner/Spinner';
import apiClient from '@/utils/apiClient';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import RecordDetail from './RecordDetail';

const DetailsLoader = ({ id }) => {
    const [record, setRecordInfo] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const fetchRecordDetails = async () => {
        try {
            const { data } = await apiClient.get(`/api/record/${id}/`);
            setRecordInfo(data);
            setError(null);
        } catch (error) {
            setError(error);
            toast.error(String(error))
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        setLoading(true);
        fetchRecordDetails();
    }, [id])
    return (<div className='h-full w-full'>
        {
            loading ? <div className=" inset-0 fixed w-full h-full"><Spinner /></div> : (
                error ? <h1>Error</h1> : (<RecordDetail setData={setRecordInfo} data={record} />)
            )
        }
    </div>)
}

export default DetailsLoader