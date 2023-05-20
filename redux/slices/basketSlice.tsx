import { createSlice } from "@reduxjs/toolkit";
import { getAllCartFoods, getTotalCartItemPrice } from "../../utils/helpers";

const initialState = {
  items: [],
};

const basketSlice = createSlice({
  name: "busket",
  initialState,
  reducers: {
    updateBusket: (state, action) => {
      state.items = action.payload;
    },
  },
});

export const { updateBusket } = basketSlice.actions;

export const selectCartItems = (state: { busket: { items: any } }) =>
  state.busket.items;
export const selectTotalPrice = (state: { busket: { items: any } }) =>
  getTotalCartItemPrice(state.busket.items);
export const selectTotalItems = (state: { busket: { items: any } }) =>
  getAllCartFoods(state.busket.items);

export default basketSlice.reducer;
