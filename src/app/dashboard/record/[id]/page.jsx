"use client"
import React from 'react'
import withAuth from '@/utils/withAuth'
import DetailsLoader from './DetailsLoader'

const Page = ({ params }) => {
    return (
        <div
            className='h-screen w-full'
            style={{ paddingTop: "4.5rem" }}
        >
            <DetailsLoader id={params.id} />
        </div>
    )
}

export default withAuth(Page)