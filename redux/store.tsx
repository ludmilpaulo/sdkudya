import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import busketReducer from "./slices/basketSlice";
import locationSlice from "./slices/locationSlice";
import driverLocationSlice from "./slices/driverLocationSlice";

export const store = configureStore({
  reducer: {
    busket: busketReducer,
    auth: authReducer,
    location: locationSlice,
    driverLocation : driverLocationSlice,
  },
});
