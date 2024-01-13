"use client"
import apiClient from "@/utils/apiClient";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getAddress = createAsyncThunk(
    "address/all",
    async ({toast }, { rejectWithValue }) => {
      let toastId;
      try {
        if (toast) {
          toastId = toast.loading("Getting Address");
        }
        const { data } = await apiClient.get('/api/address/');
        if (toast) toast.success("Success", { id: toastId });
        return data;
      } catch (err) {
        if (toast) toast.error("Error occurred!", { id: toastId });
        return rejectWithValue(err.response.data);
      }
    }
  );
export const addAddress = createAsyncThunk(
    "address/add",
    async ({ formValue, toast }, { rejectWithValue }) => {
      let toastId;
      try {
        if (toast) {
          toastId = toast.loading("Saving Address");
        }
        const { data } = await apiClient.post('/api/address/', formValue);
        if (toast) toast.success("Successfully Saved", { id: toastId });
        return data;
      } catch (err) {
        if (toast) toast.error("Error occurred!", { id: toastId });
        return rejectWithValue(err.response.data);
      }
    }
  );
export const editAddress = createAsyncThunk(
    "address/edit",
    async ({ formValue,id, toast,close }, { rejectWithValue }) => {
      let toastId;
      try {
        if (toast) {
          toastId = toast.loading("Editing Address");
        }
        const { data } = await apiClient.put(`/api/address/${id}/`, formValue);
        if (toast) toast.success("Successfully Edited", { id: toastId });
        if(close) close();
        return data;
      } catch (err) {
        if (toast) toast.error("Error occurred!", { id: toastId });
        return rejectWithValue(err.response.data);
      }
    }
  );
export const deleteAddress = createAsyncThunk(
    "address/delete",
    async ({id, toast }, { rejectWithValue }) => {
      let toastId;
      try {
        if (toast) {
          toastId = toast.loading("Deleting Address");
        }
        const { data } = await apiClient.delete(`/api/address/${id}/`);
        if (toast) toast.success("Successfully Deleted", { id: toastId });
        return data;
      } catch (err) {
        if (toast) toast.error("Error occurred!", { id: toastId });
        return rejectWithValue(err.response.data);
      }
    }
  );


const addressSlice= createSlice({
    name: "savedAddress",
    initialState:{
        all:[],
        current:null,
        loading:false,
        error: null
    },
    reducers: {
        setCurrentAddress:(state,action)=>{
            state.current=action.payload;
        }
    },
    extraReducers: (builder)=>{
        builder
            .addCase(getAddress.pending,(state)=>{
                state.loading=true;
            })
            .addCase(getAddress.fulfilled,(state,action)=>{
                state.loading=false;
                state.all=action.payload;
                state.error=null
            })
            .addCase(getAddress.rejected,(state,action)=>{
                state.loading=false;
                state.error=action.payload.message
            })
            .addCase(addAddress.pending,(state)=>{
                state.loading=true;
            })
            .addCase(addAddress.fulfilled,(state,action)=>{
                state.loading=false;
                state.all=[...state.all,action.payload];
                state.error=null
            })
            .addCase(addAddress.rejected,(state,action)=>{
                state.loading=false;
                state.error=action.payload.message
            })
            .addCase(editAddress.pending,(state)=>{
                state.loading=true;
            })
            .addCase(editAddress.fulfilled,(state,action)=>{
                state.loading=false;
                state.all=state.all.map((item)=>{
                    if(item.saved_address_id==action.payload.saved_address_id) return action.payload;
                    else return item;
                });
                state.error=null
            })
            .addCase(editAddress.rejected,(state,action)=>{
                state.loading=false;
                state.error=action.payload.message
            })
            .addCase(deleteAddress.fulfilled,(state,action)=>{
              state.all=state.all.filter((item)=>{
                if(item.id!=action.payload.id) return item;
            });
            })            
    }
})

export const {setCurrentAddress} = addressSlice.actions;

export default addressSlice.reducer;