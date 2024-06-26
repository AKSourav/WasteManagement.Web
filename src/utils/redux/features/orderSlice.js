"use client"
import apiClient from "@/utils/apiClient";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getOrders = createAsyncThunk(
    "orders/all",
    async ({toast ,filter }, { rejectWithValue }) => {
      let toastId;
      try {
        if (toast) {
          toastId = toast.loading("Fetching Orders");
        }
        const { data } = await apiClient.get('/api/waste_collection_point/',{
          params:{
            filter:JSON.stringify(filter || {})
          }
        });
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
          console.log("Toast Triggered!")
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

export const acceptOrder = createAsyncThunk(
    "orders/accept",
    async ({id, toast, formValue }, { rejectWithValue }) => {
      let toastId;
      try {
        if (toast) {
          toastId = toast.loading("Accepting Order");
          // alert(toastId)
        }
        const { data } = await apiClient.put(`/api/waste_collection_point/${id}/`,formValue);
        if (toast) toast.success("Order Accepted", { id: toastId });
        return data;
      } catch (err) {
        if (toast) toast.error("Error occurred!", { id: toastId });
        return rejectWithValue(err.response.data);
      }
    }
  );


const orderSlice= createSlice({
    name: "orders",
    initialState:{
        orders:[],
        selectedOrder:null,
        loading:false,
        error: null
    },
    reducers: {
        setSelectedOrder:(state,action)=>{
            state.selectedOrder=action.payload;
        }
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
                if(item.collection_point_id==action.payload.collection_point_id) return action.payload;
                else return item;
            });
            })            
            .addCase(acceptOrder.fulfilled,(state,action)=>{
              state.orders=state.orders.map((item)=>{
                if(item.collection_point_id==action.payload.collection_point_id) return action.payload;
                else return item;
            });
            })            
    }
})

export const {setSelectedOrder} = orderSlice.actions;

export default orderSlice.reducer;