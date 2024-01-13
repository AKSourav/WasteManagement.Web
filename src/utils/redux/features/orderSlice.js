"use client"
import apiClient from "@/utils/apiClient";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getOrders = createAsyncThunk(
    "orders/all",
    async ({toast }, { rejectWithValue }) => {
      let toastId;
      try {
        if (toast) {
          toastId = toast.loading("Fetching Orders");
        }
        const { data } = await apiClient.get('/api/waste_collection_point/');
        if (toast) toast.success("Success", { id: toastId });
        return data;
      } catch (err) {
        console.log(err)
        if (toast) toast.error("Error occurred!", { id: toastId });
        return rejectWithValue(err.response.data);
      }
    }
  );
export const createOrder = createAsyncThunk(
    "orders/create",
    async ({ formValue, toast }, { rejectWithValue }) => {
      let toastId;
      try {
        if (toast) {
          toastId = toast.loading("Creating Order");
        }
        const { data } = await apiClient.post('/api/waste_collection_point/', formValue);
        if (toast) toast.success("Order Raised", { id: toastId });
        return data;
      } catch (err) {
        console.log(err)
        if (toast) toast.error("Error occurred!", { id: toastId });
        return rejectWithValue(err.response.data);
      }
    }
  );

export const cancelOrder = createAsyncThunk(
    "orders/delete",
    async ({id, toast }, { rejectWithValue }) => {
      let toastId;
      try {
        if (toast) {
          toastId = toast.loading("Canceling Order");
        }
        const { data } = await apiClient.delete(`/api/waste_collection_point/${id}/`);
        if (toast) toast.success("Order Canceled", { id: toastId });
        return data;
      } catch (err) {
        if (toast) toast.error("Error occurred!", { id: toastId });
        return rejectWithValue(err.response.data);
      }
    }
  );


const addressSlice= createSlice({
    name: "orders",
    initialState:{
        orders:[],
        loading:false,
        error: null
    },
    reducers: {
        // setCurrentAddress:(state,action)=>{
        //     state.current=action.payload;
        // }
    },
    extraReducers: (builder)=>{
        builder
            .addCase(getOrders.pending,(state)=>{
                state.loading=true;
            })
            .addCase(getOrders.fulfilled,(state,action)=>{
                state.loading=false;
                state.orders=action.payload;
                state.error=null
            })
            .addCase(getOrders.rejected,(state,action)=>{
                state.loading=false;
                state.error=action.payload?.message
            })
            .addCase(createOrder.pending,(state)=>{
                state.loading=true;
            })
            .addCase(createOrder.fulfilled,(state,action)=>{
                state.loading=false;
                state.orders=[...state.orders,action.payload];
                state.error=null
            })
            .addCase(createOrder.rejected,(state,action)=>{
                state.loading=false;
                state.error=action.payload?.message
            })
            .addCase(cancelOrder.fulfilled,(state,action)=>{
              state.orders=state.orders.map((item)=>{
                if(item.collection_point_id!=action.payload.collection_point_id) return action.payload;
            });
            })            
    }
})

export const {setCurrentAddress} = addressSlice.actions;

export default addressSlice.reducer;