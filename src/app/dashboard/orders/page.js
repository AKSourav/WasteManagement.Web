"use client"
import React from 'react';
import { useSelector } from 'react-redux'
import withAuth from '@/utils/withAuth';
import Tabs from '@/components/Tabs/TabsComponent';
import OrderTab from './OrderTab';

const Page = () => {
    const { user } = useSelector(state => state.auth.user)
    return (
        <div style={{ paddingTop: "4.6rem" }} className='h-screen'>
            <Tabs>
                <div label={"ALL"}>
                    <OrderTab />
                </div>
                <div label={"accepted"}>
                    <OrderTab TabTitle={"accepted"} />
                </div>
                <div label={"pending"}>
                    <OrderTab TabTitle={"pending"} />
                </div>
                {user?.user_type === "USER" && <div label={"canceled"}>
                    <OrderTab TabTitle={"cancel"} />
                </div>}
            </Tabs>
        </div>
    )
}

export default withAuth(Page);