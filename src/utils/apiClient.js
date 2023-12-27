"use client"
import Cookies from 'universal-cookie';
import axios from "axios";

const apiClient = axios.create({ baseURL: "http://localhost:8000" });
const cookies = new Cookies();

apiClient.interceptors.request.use(
    (config) => {
      // Add the access token to the request headers
      const accessToken= cookies.get('access') || null;
      if(accessToken)
        config.headers.Authorization = `Bearer ${accessToken}`;
      return config;
    },
    (error) => {
      // Handle request error
      return Promise.reject(error);
    }
  );
apiClient.interceptors.response.use(
    (config) => {
      console.log("This is just config:",config);
      return config;
    },
    async (error) => {
      console.log('iterceptor');
      const originalRequest = error.config;
      console.log(originalRequest);
      const refreshToken= cookies.get('refresh') || null;
      if (
        error.response.status === 401 &&
        originalRequest &&
        !originalRequest._isRetry &&
        refreshToken
      ) {
        originalRequest._isRetry = true;
        try {
          const {data}=await apiClient.post(`/api/token/refresh/`,{refresh:refreshToken});
          // Set refresh cookie with a 90-day expiration
          cookies.set('refresh', data.refresh, { path: '/', maxAge: 90 * 24 * 60 * 60 });

          // Set access cookie with a 5-minute expiration
          cookies.set('access', data.access, { path: '/', maxAge: 5 * 60 });
          return apiClient.request(originalRequest);
        } catch (err) {
          cookies.remove('access', { path: '/' });
          cookies.remove('refresh', { path: '/' });
          localStorage.remove('user');
          console.log(err.message);
        }
      }
      throw error;
    }
  );

  export default apiClient;