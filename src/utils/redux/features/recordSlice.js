"use client"
import apiClient from "@/utils/apiClient";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getRecords = createAsyncThunk(
    "records/all",
    async ({ toast, filter }, { rejectWithValue }) => {
        let toastId;
        try {
            if (toast) {
                toastId = toast.loading("Fetching Records");
            }
            const { data } = await apiClient.get('/api/records/', {
                params: {
                    filter: JSON.stringify(filter || {})
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
export const getRecordInfo = createAsyncThunk(
    "records/info",
    async ({ id, toast, filter }, { rejectWithValue }) => {
        let toastId;
        try {
            if (toast) {
                toastId = toast.loading("Fetching Record Info");
            }
            const { data } = await apiClient.get(`/api/record/${id}`, {
                params: {
                    filter: JSON.stringify(filter || {})
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

const recordSlice = createSlice({
    name: "record",
    initialState: {
        records: [],
        selectedRecord: null,
        loading: false,
        error: null
    },
    reducers: {
        setSelectedRecord: (state, action) => {
            state.selectedRecord = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getRecords.pending, (state) => {
                state.loading = true;
            })
            .addCase(getRecords.fulfilled, (state, action) => {
                state.loading = false;
                state.records = action.payload;
                state.error = null
            })
            .addCase(getRecords.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message
            })
            .addCase(getRecordInfo.pending, (state) => {
                state.loading = true;
            })
            .addCase(getRecordInfo.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedRecord = action.payload;
                state.error = null
            })
            .addCase(getRecordInfo.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message
            })
    }
})

export const { setSelectedRecord } = recordSlice.actions;

export default recordSlice.reducer;