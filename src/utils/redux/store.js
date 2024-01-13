"use client"
import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./features/authSlice";
import AddressReducer from "./features/addressSlice";
import OrdersReducer from './features/orderSlice'

export default configureStore({
  reducer: {
    auth: AuthReducer,
    savedAddress:AddressReducer,
    orders:OrdersReducer
  },
});