"use client"
import apiClient from "@/utils/apiClient";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import Cookies from 'universal-cookie';
const cookies = new Cookies();


// using Custom Hooks breaks in Thunk API breaks rule so i am not using Thunk API
export const login = createAsyncThunk(
  "auth/login",
  async ({ formValue }, { rejectWithValue }) => {
    try {
      const { data } = await apiClient.post('/api/login/', formValue);
      console.log("Login Data:",data);

      // Set refresh cookie with a 90-day expiration
      cookies.set('refresh', data.refresh, { path: '/', maxAge: 90 * 24 * 60 * 60 });

      // Set access cookie with a 5-minute expiration
      cookies.set('access', data.access, { path: '/', maxAge: 5 * 60 });

      return data.user;
    } catch (err) {
        console.log(err);
      return rejectWithValue(err.response.data);
    }
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async ({ formValue }, { rejectWithValue }) => {
    try {
      const { data } = await apiClient.post('/api/register/', formValue);
      return data.user;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getUser = createAsyncThunk(
  "auth/getUser",
  async (_, { rejectWithValue }) => {
    try {
      console.log("Yahooo!")
      const refreshToken=cookies.get('refresh');
      const { data } = await apiClient.get('/api/getuser/', {refresh:refreshToken});
      console.log(data);
      console.log("getUser:",data);
      return data.user;
    } catch (err) {
      console.log(err);
      return rejectWithValue(err.response.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: typeof window !== 'undefined' && cookies.get('refresh') && localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
    error: "",
    loading: false,
    isAuthenticated: typeof window !== 'undefined' && cookies.get('refresh')? true: false
  },
  reducers: {
    setUser: (state, action) => {
      
      state.user = action.payload;
      state.isAuthenticated=true;
      localStorage.setItem('user', JSON.stringify(action.payload));
    },
    setLogout: (state, action) => {
        state.user = null;
        state.isAuthenticated=false;
        cookies.remove('refresh', { path: '/' });
        cookies.remove('access', { path: '/' });
        localStorage.removeItem('user');
        const router= action?.payload?.router || null;
        if(router)
          router.replace('/');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        localStorage.setItem('user', JSON.stringify(action.payload));
        state.isAuthenticated=true;
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(register.pending, (state) => {
        state.loading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        localStorage.setItem('user', JSON.stringify(action.payload));
        state.user = action.payload;
      })
      ;
  },
});

export const { setUser, setLogout } = authSlice.actions;

export default authSlice.reducer;
