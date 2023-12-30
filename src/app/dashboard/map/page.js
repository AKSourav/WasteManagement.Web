import BingMap from '@/components/Map/BingMap'
import React from 'react'

const page = () => {
  return (
    <div>
        <BingMap apiKey={process.env.NEXT_PUBLIC_BING_MAPS_API_KEY}/>
    </div>
  )
}

export default page