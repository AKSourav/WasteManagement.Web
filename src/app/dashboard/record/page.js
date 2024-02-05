"use client"
import React from 'react';
import withAuth from '@/utils/withAuth';
import RecordTab from './RecordTab';

const RecordsPage = () => {
    return (
        <div style={{ paddingTop: "4.6rem" }} className='h-screen'>
            <RecordTab />
        </div>
    )
}

export default withAuth(RecordsPage);