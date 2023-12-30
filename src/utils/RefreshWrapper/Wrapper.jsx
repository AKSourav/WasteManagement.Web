"use client"
import React, { useEffect} from 'react';
import {useSelector,useDispatch} from 'react-redux';
import { getUser } from '../redux/features/authSlice';

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
            intervalThread=setInterval(fetchData,10000)
        }
        return()=>{
            clearInterval(intervalThread);
        }
    },[isAuthenticated])
  return (
    <>
        {children}
    </>
  )
}

export default Wrapper