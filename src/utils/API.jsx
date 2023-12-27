"use client"
import React, { createContext, useContext, useEffect, useState } from 'react';
import Cookies from 'universal-cookie';
import axios from "axios";

const axiosContext= createContext();

const APIProvider = ({children}) => {
  const cookies = new Cookies();
  const [refreshToken,setRefreshToken] = useState(cookies.get('refresh') || null);
  const [accessToken,setAccessToken] = useState(cookies.get('access') || null);

  const apiClient = axios.create({ baseURL: "http://localhost:8000" });

  const [loadingCLient,setLoadingClient] = useState(true);
  useEffect(()=>{
    setLoadingClient(false);
  },[])

  useEffect(()=>{

    const axiosInterceptorRequest = apiClient.interceptors.request.use(
      (config) => {
        // Add the access token to the request headers
        if(accessToken)
          config.headers.Authorization = `Bearer ${accessToken}`;
        return config;
      },
      (error) => {
        // Handle request error
        return Promise.reject(error);
      }
    );
    const axiosInterceptorResponse = apiClient.interceptors.response.use(
      (config) => {
        console.log("This is just config:",config);
        return config;
      },
      async (error) => {
        console.log('iterceptor');
        const originalRequest = error.config;
        console.log(originalRequest);
        if (
          error.response.status === 401 &&
          originalRequest &&
          !originalRequest._isRetry &&
          refreshToken
        ) {
          originalRequest._isRetry = true;
          try {
            const {data}=await apiClient.post(`/api/token/refresh/`,{refresh:refreshToken});
            setAccessToken(data.access);
            setRefreshToken(data.refresh);
            // Set refresh cookie with a 90-day expiration
            cookies.set('refresh', data.refresh, { path: '/', maxAge: 90 * 24 * 60 * 60 });

            // Set access cookie with a 5-minute expiration
            cookies.set('access', data.access, { path: '/', maxAge: 5 * 60 });
            return apiClient.request(originalRequest);
          } catch (err) {
            setAccessToken(null);
            setRefreshToken(null);
            cookies.remove('access', { path: '/' });
            cookies.remove('refresh', { path: '/' });
            localStorage.remove('user');
            console.log(err.message);
          }
        }
        throw error;
      }
    );
    return () => {
      // Remove the interceptor when the component unmounts
      apiClient.interceptors.request.eject(axiosInterceptorRequest);
      apiClient.interceptors.response.eject(axiosInterceptorResponse);
    };

  },[refreshToken,accessToken]);
  return (
    <>
      {!loadingCLient && <axiosContext.Provider
        value={{
          setRefreshToken,
          setAccessToken,
          apiClient
        }}
      >
        {children}
      </axiosContext.Provider>}
    </>
  )
}

export const useAxiosContext = () => {
  return useContext(axiosContext);
};
export {axiosContext};
export default APIProvider;