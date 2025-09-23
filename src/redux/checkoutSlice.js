import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  address: "",
  phone: "",
};

const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    setCheckoutInfo: (state, action) => {
      return { ...state, ...action.payload };
    },
    clearCheckoutInfo: () => initialState,
  },
});

export const { setCheckoutInfo, clearCheckoutInfo } = checkoutSlice.actions;
export default checkoutSlice.reducer;
