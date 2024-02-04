"use client"
import CreateOrder from '@/components/CreateOrder/CreateOrder'
import withAuth from '@/utils/withAuth'
import React from 'react'

const Page = () => {
  return (
    <div className='pt-20 h-screen'>
      <CreateOrder />
    </div>
  )
}

export default withAuth(Page)