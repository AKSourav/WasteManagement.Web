"use client"
import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./features/authSlice";
import AddressReducer from "./features/addressSlice";

export default configureStore({
  reducer: {
    auth: AuthReducer,
    savedAddress:AddressReducer,
  },
});