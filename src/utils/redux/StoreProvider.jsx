"use client"
import React, { ReactNode, useEffect, useState } from 'react'
import { Provider } from 'react-redux'
import store from './store'

const StoreProvider = ({children}) => {
  const [loadingCLient,setLoadingClient] = useState(true);
  useEffect(()=>{
    setLoadingClient(false);
  },[])
  return (
    <>
      {!loadingCLient && <Provider store={store}>{children}</Provider>}
    </>
  )
}

export default StoreProvider;