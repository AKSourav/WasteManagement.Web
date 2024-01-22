"use client"
import React, { useEffect} from 'react';
import {useSelector,useDispatch} from 'react-redux';
import { getUser } from '../redux/features/authSlice';
import toast, { Toaster } from 'react-hot-toast';

export const useToast= ()=>{
    return toast;
}

const Wrapper = ({children}) => {
    const {isAuthenticated} = useSelector((state)=>state.auth);
    const dispatch = useDispatch();
    useEffect(()=>{
        var intervalThread;
        console.log(isAuthenticated)
        const fetchData= async()=>{
            try {
                console.log("Inside!")
                await dispatch(getUser());
            } catch (error) {
                console.log("Error while getting UserInfo:",error)
            }
        }
        if(isAuthenticated)
        {
            fetchData();
            intervalThread=setInterval(fetchData,4*60*1000)
        }
        return()=>{
            clearInterval(intervalThread);
        }
    },[isAuthenticated])
  return (
    <>
        {children}
        <div style={{zIndex:999999999}}>
            <Toaster position="bottom-center"/>
        </div>
    </>
  )
}

export default Wrapper