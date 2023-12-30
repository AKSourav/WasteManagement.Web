// "use client"
import Cookies from 'universal-cookie';
import axios from "axios";

const apiClient = axios.create({ baseURL: "http://localhost:8000" });
const cookies = new Cookies();

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

apiClient.interceptors.request.use(
  (config) => {
    // Add the access token to the request headers
    const accessToken = cookies.get('access') || null;
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    // Handle request error
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => {
    console.log("This is just response:", response);
    return response;
  },
  async (error) => {
    console.error('Interceptor error:', error);
    const originalRequest = error.config;

    if (error.response.status === 401 && originalRequest && !originalRequest._isRetry && originalRequest.url!=="/api/token/refresh/") {
      originalRequest._isRetry = true;

      if (!isRefreshing) {
        isRefreshing = true;

        try {
          const refreshToken = cookies.get('refresh') || null;
          if (refreshToken) {
            const { data } = await apiClient.post(`/api/token/refresh/`, { refresh: refreshToken });

            // Set refresh cookie with a 90-day expiration
            cookies.set('refresh', data.refresh, { path: '/', maxAge: 90 * 24 * 60 * 60 });

            // Set access cookie with a 5-minute expiration
            cookies.set('access', data.access, { path: '/', maxAge: 5 * 60 });

            // Retry the original request
            isRefreshing = false;
            processQueue(null, data.access);
            return apiClient.request(originalRequest);
          }
          else
          {
            cookies.remove('access', { path: '/' });
            cookies.remove('refresh', { path: '/' });
            window.location.reload();
          }
        } catch (err) {
          // Handle refresh token request error
          console.error('Refresh token error:', err.message);
          isRefreshing = false;
          processQueue(err, null);

          // Log out the user and redirect to the login page
          cookies.remove('access', { path: '/' });
          cookies.remove('refresh', { path: '/' });
          window.location.reload();
          // window.location.href = '/auth'; // Redirect to the login page
          throw err;
        }
      } else {
        // Queue the failed request for later retry
        const retryPromise = new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        });
        return retryPromise;
      }
    }

    throw error;
  }
);

export default apiClient;
