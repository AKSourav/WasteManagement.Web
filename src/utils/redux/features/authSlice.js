"use client"
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosContext, useAxiosContext } from "@/utils/API";
import Cookies from 'universal-cookie';
const cookies = new Cookies();


// using Custom Hooks breaks in Thunk API breaks rule so i am not using Thunk API
export const login = createAsyncThunk(
  "auth/login",
  async ({ formValue }, { rejectWithValue }) => {
    try {
      const { apiClient, setRefreshToken, setAccessToken } = useAxiosContext();
      const { data } = await apiClient.post('/api/login/', formValue);
      setAccessToken(data.access);
      setRefreshToken(data.refresh);
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
      const { apiClient } = axiosContext();
      const { data } = await apiClient.post('/api/register/', formValue);
      return data.user;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: typeof window !== 'undefined' && localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
    error: "",
    loading: false,
    isAuthenticated:false
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
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
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
      });
  },
});

export const { setUser, setLogout } = authSlice.actions;

export default authSlice.reducer;
