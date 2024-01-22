import CreateOrder from '@/components/CreateOrder/CreateOrder'
import withAuth from '@/utils/withAuth'
import React from 'react'

const page = () => {
  return (
    <div className='pt-20 h-screen'>
      <CreateOrder/>
    </div>
  )
}

export default withAuth(page)