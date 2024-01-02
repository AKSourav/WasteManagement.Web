"use client"
import apiClient from "@/utils/apiClient";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

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
    async ({ formValue }, { rejectWithValue }) => {
      try {
        const { data } = await apiClient.put('/api/address/', formValue);
        return data;
      } catch (err) {
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
                    if(item.id==action.payload.id) return action.payload;
                    else return item;
                });
                state.error=null
            })
            .addCase(editAddress.rejected,(state,action)=>{
                state.loading=false;
                state.error=action.payload.message
            })
    }
})

export const {setCurrentAddress} = addressSlice.actions;

export default addressSlice.reducer;